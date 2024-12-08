const ast = {
  type: 'root',
  nodes: [
    {
      // "beginning-of-string"
      type: 'bos'
    },
    {
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

let str = '';

const handlers = {
  bos() {
    // do nothing
  },
  text(node) {
    str += node.val;
  },
  strong(node) {
    mapVisit(node.nodes);
  },
  'strong.open'() {
    str += '**';
  },
  'strong.close'() {
    str += '**';
  },
  eos() {
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
