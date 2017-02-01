This document will help familiarize you with the breakdance API, as well as how the code works "under the hood", to equip you with the information you need to customize the generated output or [author plugins](plugins.html).

Please [let us know]({{@site.bugs.url}}) if you have any suggestions for improving the docs.

## First things first

Although this document describes a few different core concepts, everything really centers around the breakdance <abbr title="Abstract Syntax Tree">AST</abbr>. Before proceding, we recommend you take a moment to actually log out the <abbr title="Abstract Syntax Tree">AST</abbr> to get a first-hand look at what the <abbr title="Abstract Syntax Tree">AST</abbr> is, and how it works.

Add the following snippet of code to a local file, such as `ast.js`, then run `$ node ast`:

```js
var Breakdance = require('breakdance');
var breakdance = new Breakdance(/* options */);
var ast = breakdance.parse('<strong>The Freaks Come Out at Night!</strong>');
console.log(ast);

var str = breakdance.compile(ast);
console.log(str);
//=> '**The Freaks Come Out at Night!**'
```
 
### Parser

The parser's job is the create the <abbr title="Abstract Syntax Tree">AST</abbr> that will eventually be passed to the compiler.

**Example**

First, we start with the "root" <abbr title="Abstract Syntax Tree">AST</abbr> object that will be used for storing nodes.

```js
var ast = {
  type: 'root',
  nodes: []
};
```

Next, we need to create the `parse` function that is responsible for adding nodes to `ast.nodes`. Again, this is pseudo-code, but similar principles apply to breakdance.

```js
var parsers = [
  function(str) {
    var match = /^[a-z]/.exec(str);
    if (match) {
      return {type: 'text', val: match[0]};
    }
  },
  function(str) {
    var match = /^\./.exec(str);
    if (match) {
      return {type: 'dot', val: match[0]};
    }
  },
  function(str) {
    var match = /^,/.exec(str);
    if (match) {
      return {type: 'comma', val: match[0]};
    }
  }
];

function parse(str) {
  var ast = {type: 'root', nodes: []};

  // add a "beginning-of-string" node
  ast.nodes.push({type: 'bos'});

  while (str.length) {
    // capture length of nodes before parsing
    var beforeLength = ast.nodes.length;

    for (var i = 0; i < parsers.length; i++) {
      var fn = parsers[i];
      var node = fn(str);
      if (node) {
        ast.nodes.push(node);
        // slice the matched valued off of the string
        str = str.slice(node.val.length);
        break;
      }
    }

    // if no new nodes were added to `ast.nodes`, we know
    // that none of the parsers found a match
    if (ast.nodes.length === beforeLength) {
      throw new Error('no parsers registered for ' + str);
    }
  }

  // add a "end-of-string" node
  ast.nodes.push({type: 'eos'});
  return ast;
}

var ast = parse('abc');
console.log(ast);
// {
//   type: 'root',
//   nodes: [
//     {
//       // "beginning-of-string"
//       type: 'bos',
//     },
//     {
//       type: 'text',
//       val: 'a'
//     },
//     {
//       type: 'text',
//       val: 'b'
//     },
//     {
//       type: 'text',
//       val: 'c'
//     },
//     {
//       // "end-of-string"
//       type: 'eos'
//     }
//   ]
// }
```

### Compiler

The breakdance compiler is responsible for iterating over the <abbr title="Abstract Syntax Tree">AST</abbr> and generating a new string based on the information contained within each node (or child object) of the <abbr title="Abstract Syntax Tree">AST</abbr>.

1. "visit" each node on the <abbr title="Abstract Syntax Tree">AST</abbr> (this will be explained through the following examples)
2. Look for a registered handler that matches the `node.type`
3. Call the handler with the `node`

Which might look something like this (again, in pseudo-code):

```js
var str = '';

var handlers = {
  bos: function(node) {
    str += '<';
  },
  comma: function(node) {
    str += '-'; // we can change it to whatever we want
  },
  dot: function(node) {
    str += '-'; // and again...
  },
  text: function(node) {
    str += node.val.toUpperCase();
  },
  eos: function(node) {
    str += '>';
  }
};

function compile(ast) {
  ast.nodes.forEach(function(node) {
    // get the handler for the node "type" and call it on the node
    // this is what "visit" means
    handlers[node.type](node);
  });
}

// continuing with the AST that was created in the "parser" example 
compile(ast);
console.log(str);
//=> '<A-B-C>'
```

In principle, this is how the breakdance compiler works, along with conveniences for adding handlers, and so on.

### AST

The breakdance <abbr title="Abstract Syntax Tree">AST</abbr> works the same way as in the earlier examples, with one addition: each node on the AST can have one of the following (never both):

- `nodes`: an array of child nodes (just like the AST itself)
- `val`: a string value

In fact, the AST itself is just another node. An AST with both types of nodes might look something like this:

```js
// given the string "<strong>foo</strong>", breakdance's AST
// would look something like this:
var ast = {
  type: 'root',
  nodes: [
    {
      // "beginning-of-string"
      type: 'bos',
    },
    {
      // since <strong> elements have open and close tags,
      // the `strong` node will have a `nodes` array, for
      // storing child nodes
      type: 'strong',
      nodes: [
        {
          type: 'strong.open',
          val: ''
        },
        {
          // this could be a "text" node, or another type of tag
          // that has a `nodes` array, like `strong` itself
          type: 'text',
          val: 'foo'
        },
        {
          type: 'strong.close',
          val: ''
        }
      ]
    },
    {
      // "end-of-string"
      type: 'eos'
    }
  ]
};
```

### All together

To see how all of these pieces fit together, we need to add one more thing. 

In the compiler example, since none of the nodes in our example had a `nodes` array, let's review how that would work.

**Visiting arrays of nodes**

```js
var str = '';

var handlers = {
  bos: function(node) {
    // do nothing
  },
  text: function(node) {
    str += node.val;
  },
  strong: function(node) {
    mapVisit(node.nodes);
  },
  'strong.open': function(node) {
    str += '**';
  },
  'strong.close': function(node) {
    str += '**';
  },
  eos: function(node) {
    // do nothing
  }
};

function visit(node) {
  if (node.nodes) {
    mapVisit(node.nodes);
  } else {
    handlers[node.type](node);
  }
}

function mapVisit(nodes) {
  nodes.forEach(function(node) {
    visit(node);
  });
}

function compile(ast) {
  visit(ast);
}

compile(ast);
console.log(str);
//=> '**foo**'
```

This concludes the overview of core concepts in breakdance. If you feel like something is missing (no matter how "obvious" or not), please [let us know about it]({{@site.bugs.url}}) so we can improve this documentation for you and the next person. Thanks!