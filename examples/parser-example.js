const define = require('define-property');
const parsers = [
  function(str) {
    const match = /^{/.exec(str);
    if (match) {
      const node = {
        type: 'open.brace',
        match: match[0]
      };

      const brace = {
        type: 'brace',
        nodes: [node]
      };

      define(node, 'parent', brace);
      this.stack.push(brace);
      return brace;
    }
  },
  function(str) {
    const match = /^}/.exec(str);
    if (match) {
      const brace = this.stack.pop();
      const node = {
        type: 'close.brace',
        match: match[0]
      };

      define(node, 'parent', brace);
      brace.nodes.push(node);
      return node;
    }
  },
  function(str) {
    const match = /^[a-z]/.exec(str);
    if (match) {
      return { type: 'text', match: match[0] };
    }
  },
  function(str) {
    const match = /^\./.exec(str);
    if (match) {
      return { type: 'dot', match: match[0] };
    }
  },
  function(str) {
    const match = /^\//.exec(str);
    if (match) {
      return { type: 'slash', match: match[0] };
    }
  },
  function(str) {
    const match = /^,/.exec(str);
    if (match) {
      return { type: 'comma', match: match[0] };
    }
  }
];

function parse(str) {
  const ast = { type: 'root', tokens: [], nodes: [], stack: [] };

  ast.parent = function() {
    return ast.stack.length ? ast.stack[ast.stack.length - 1] : ast;
  };

  // add a "beginning-of-string" node
  ast.nodes.push({ type: 'bos' });

  while (str.length) {
    const parent = ast.parent();

    // capture length of nodes before parsing
    const len = str.length;

    for (let i = 0; i < parsers.length; i++) {
      const fn = parsers[i];
      const node = fn.call(ast, str);
      if (node) {
        const tok = node.nodes ? node.nodes[0] : node;

        // slice the matched valued off of the string
        str = str.slice(tok.match[0].length);

        // push the node onto ast.tokens
        ast.tokens.push(tok);

        // push the node onto ast.nodes
        if (node.parent) {
          ast.stack.pop();
        } else {
          define(node, 'parent', parent);
          parent.nodes.push(node);
        }
        break;
      }
    }

    // if no new nodes were added to `ast.nodes`, we know
    // that none of the parsers found a match
    if (str.length === len) {
      throw new Error('no parsers registered for ' + str);
    }
  }

  // add a "end-of-string" node
  ast.nodes.push({ type: 'eos' });
  return ast;
}

const ast = parse('a/{b,c}/d');
console.log(ast);
