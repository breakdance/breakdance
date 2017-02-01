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

var ast = parse('a.b,c');
console.log(ast);
