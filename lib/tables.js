'use strict';

var define = require('define-property');
var util = require('snapdragon-util');
var Node = require('snapdragon-node');

module.exports = function() {
  return function(compiler) {
    compiler.state.tables = compiler.state.tables || [];
    compiler.set('table', function(node) {
      if (/<h[1-6][^>]*>/.test(node.html)) {
        this.emit('\n', node);
        this.emit(node.html);
        return;
      }
      tableize(node);
      node.aligmentRow = [];
      this.state.tables.push(node);
      this.emit('\n\n');
      this.mapVisit(node);
      this.emit('\n');
    });
    compiler.set('table.open', util.noop);
    compiler.set('table.close', function(node) {
      this.state.tables.pop();
    });
  };
};

function tableize(ast) {
  util.visit(ast, {recurse: true}, function(node) {
    if (node.type === 'text') {
      node.val = node.val.trim();
    }
    return node;
  });

  if (!util.hasType(ast, 'thead')) {
    createHead(ast);
  }

  combineRows(ast);
  if (!util.hasType(ast, 'tbody')) {
    createBody(ast);
  }
  if (util.hasType(ast, 'tfoot')) {
    tfootNodes(ast);
  }

  util.mapVisit(ast, {recurse: true}, function(node) {
    if (node.type === 'br') {
      node.type = 'text';
      node.val = '';
    }
  });
}

/**
 * Add `thead` nodes if they don't exist
 */

function createHead(ast) {
  var thead = { type: 'thead', nodes: [] };
  define(thead, 'parent', ast);

  if (ast.nodes.length === 3) {
    var text = { type: 'text', val: '' };
    var th = { type: 'th', attribs: { align: 'center'}, nodes: [text] };
    define(text, 'parent', th);
    define(th, 'parent', thead);
    thead.nodes.push(th);
    util.wrapNodes(th, Node);
    util.wrapNodes(thead, Node);
    ast.nodes.splice(1, 0, thead);
    return ast;
  }

  for (var i = 0; i < ast.nodes.length; i++) {
    var node = ast.nodes[i];
    if (node.nodes && util.hasType(node, 'th')) {
      define(node, 'parent', thead);
      thead.nodes.push(node);
      util.wrapNodes(thead, Node);
      ast.nodes[i] = thead;
      break;
    }
  }

  return ast;
}

/**
 * Add `thead` nodes if they don't exist
 */

function tfootNodes(ast) {
  var nodes = [];
  var tfoot;

  for (var i = 0; i < ast.nodes.length; i++) {
    var node = ast.nodes[i];
    if (node.type === 'tfoot') {
      tfoot = node.nodes;
    } else {
      nodes.push(node);
    }
  }

  if (tfoot) {
    var tbody = util.firstOfType(ast.nodes, 'tbody');
    if (tbody) {
      var len = tfoot.length;
      var idx = -1;
      while (++idx < len) {
        var tok = tfoot[idx];
        define(tok, 'parent', tbody);
        tbody.nodes.push(tok);
      }
    }
  }

  ast.nodes = nodes;
  return ast;
}

function combineRows(ast) {
  var thead = util.firstOfType(ast.nodes, 'thead');

  if (!thead) return;

  var rows = thead.nodes.filter(function(node) {
    return node.type === 'tr';
  });

  if (rows.length === 1) return;

  // handle `<thead><th></th></thead>` (no `<tr>`)
  if (rows.length === 0) {
    var i = 1;
    var e = thead.nodes.length - 1;
    if (thead.nodes[i].type === 'text') i++;
    if (thead.nodes[e].type === 'text') e--;

    var tr = {type: 'tr', nodes: thead.nodes.slice(i, e)};
    tr.nodes.forEach(function(node) {
      define(node, 'parent', tr);
    });

    define(tr, 'parent', thead);
    thead.nodes.splice(i, thead.nodes.length - tr.nodes.length, tr);
    util.wrapNodes(tr, Node);
    return;
  }

  var firstRow = rows.shift();
  var len = rows.length;
  var idx = -1;
  while (++idx < len) {
    var row = rows[idx];
    row.nodes.forEach(function(col, i) {
      if (col.type !== 'th') return;
      var firstTh = firstRow.nodes[i];
      var firstThOpen = firstTh.nodes.shift();
      var firstThClose = firstTh.nodes.pop();
      var nodes = firstTh.nodes;
      var br = {type: 'text', val: '<br>', prev: {}, next: {}};
      define(br, 'parent', firstTh);
      nodes.push(br);

      col.nodes.forEach(function(node, ci) {
        if (ci === 0 || ci === col.nodes.length - 1) return;
        define(node, 'parent', firstTh);
        nodes.push(node);
      });

      firstTh.nodes = [firstThOpen].concat(nodes);
      firstTh.nodes.push(firstThClose);
    });
  }
  thead.nodes = [firstRow];
  util.wrapNodes(thead, Node);
}

/**
 * Add `tbody` nodes if they don't exist
 */

function createBody(ast) {
  if (util.hasType(ast, 'tbody')) return;
  var open = ast.nodes.shift();
  var close = ast.nodes.pop();
  var started;
  var nodes = [];
  var tbody;

  var len = ast.nodes.length;
  var idx = -1;
  while (++idx < len) {
    var node = ast.nodes[idx];
    if (node.type === 'tr' && !started) {
      started = true;
      tbody = { type: 'tbody', nodes: [] };
      define(tbody, 'parent', ast);
      nodes.push(tbody);
    }

    if (started) {
      define(node, 'parent', tbody);
      tbody.nodes.push(node);
    } else {
      nodes.push(node);
    }
  }

  if (tbody) {
    util.wrapNodes(tbody, Node);
  }

  ast.nodes = [open];
  ast.nodes = ast.nodes.concat(nodes);
  ast.nodes.push(close);
}
