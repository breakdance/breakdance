---
title: Recipes
geopattern: o
---

# Breakdance recipes

Examples and code snippets to help you get up and get down with breakdance as quickly as possible. [pull requests](contributing.html) to add more recipes are very welcome!


## Bootstrap's examples

_Customize output in breakdance to retain HTML in bootstrap's documentation examples_.

In [bootstrap's documentation](https://github.com/twbs/bootstrap), most `code` blocks are preceded by an example of some kind. By default, breakdance doesn't retain `div`s or other HTML that doesn't convert to a markdown equivalent (like `button` etc), so we would effectively lose these examples when converting to markdown.

However, if we wanted to retain the examples for some reason, we can easily modify breakdance's behavior with only a few lines of code.

More specifically, we're going to pass the following options to breakdance:

- `preprocess`: The proprocess option gives us access to the [cheerio][] AST before passing it to breakdance for compiling. We'll use this to 1) check for bootstrap's examples, 2) when found, use cheerio's API to get the outer HTML for the example, and 3)  set the HTML string on the node, so we can grab it later on when we're compiling.
- `before.div`: this registers a handler that will be called by the compiler on every `div` node, _before other handlers are called_ on that node. This allows us to check the node to see if it's one of our "example" nodes, and if so we want to add the `node.html` string to the `compiler.output` string by calling `.emit()`, instead of recursing down into the child nodes of the `div`. Since we've already rendered the contents of the `div` as literal HTML, we've done all we can do with this node, and we need to prevent any other handlers that might be called on the node from recursing over child nodes on the `div` and emittering their contents. We can do this by simply setting `node.nodes` to an empty array.

```js
var md = breakdance(html, {
  preprocess: function($, node) {
    var attr = node.attribs || {};
    if (/bd-example/.test(attr.class)) {
      node.html = $.html(node);
      node.isBootstrapExample = true;
    }
  },
  before: {
    div: function(node) {
      if (node.isBootstrapExample) {
        this.emit(node.html);
        node.nodes = [];
      }
    }
  }
});
```


## Normalize whitespace

This plugin would overwrite the built-in `text` handler and normalize all consecutive whitepaces in a string to a single whitespace (including newlines):

```js
module.exports = function() {
  return function(breakdance) {
    breakdance.set('text', function(node) {
      this.emit(node.val.replace(/\s+/g, ' '));
    });
  };
};
```

And we're done! Really, that's all you need to do to create a basic whitespace normalization plugin.


## Override an existing handler

You can customize the output for any HTML tag by overriding breakdance's built-in handler. 

For example, you can change how pre-formatted text (`<pre>`) is handled using the code in the following snippet.

**Example**

```js
var Breakdance = require('..');
var breakdance = new Breakdance();

breakdance
  .set('pre', function(node) {
    // console.log(node)
    // <pre> has open and close tags, so `node` will have a `node.nodes`
    // array with "child" nodes. We need to iterate over those child nodes
    // to output the inner contents of the pre tag
    this.mapVisit(node);
  })
  .set('pre.open', function(node) {
    this.emit('```\n');
  })
  .set('pre.close', function(node) {
    this.emit('\n```');
  })

  // we don't want to override the text node just for <pre> tags
  // since that would change how text is output for everything,
  // so instead we will register a "before" handler, so we can modify
  // the text output before anything else
  .before('text', function(node) {
    if (this.isInside(node, 'pre')) {
      // do stuff to inner contents of `<pre>` tag,
      // and don't "emit" the string here, since
      // that will already be done by the "text" handler
      node.val = node.val.replace(/^var /g, 'const ');
    }
  })

var ast = breakdance.parse('<div><pre>var foo = "bar";</pre></div>');
var str = breakdance.compile(ast).output;
console.log(str);
// ```
// const foo = "bar";
// ```
```

**Self-closing example**

TODO

```js
breakdance.set('img', function(node) {

});
```


## Register a new handler

By default, instead of throw an error if an unrecognized HTML element is encountered, breakdance will register a "noop" handler that just ignores the element (which means it won't be rendered). 

However, since custom elements are fairly common these days, breakdance makes it easy to register custom handlers if you do in fact want to render the contents of a custom element.

**Example**

Let's say you created a custom HTML `<alert>` element for displaying notifications. We can register a custom handler to convert the contents of alert tags into blockquotes.

```js
var Breakdance = require('..');
var breakdance = new Breakdance();

breakdance
  .set('alert', function(node) {
    // loop over the child `nodes` on `node`
    this.mapVisit(node);
  })
  .set('alert.open', function(node) {
    // emit the start of a blockquote
    this.emit('> ');
  })
  .set('alert.close', function(node) {
    // don't render the closing tag
    this.emit('');
  });

var ast = breakdance.parse('<alert>Heads up!</alert>');
var str = breakdance.compile(ast).output;
console.log(str);
// > Heads up!
```
