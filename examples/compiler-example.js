var ast = {
  type: 'root',
  nodes: [
    {
      // "beginning-of-string"
      type: 'bos',
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
