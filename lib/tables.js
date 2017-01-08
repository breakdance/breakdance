'use strict';

var define = require('define-property');

function normalize(ast) {
  if (ast.type !== 'table') return;

  visit(ast, function(node) {
    if (node.type === 'text') {
      node.val = node.val.trim();
    }
    return node;
  });

  if (!hasType(ast.nodes, 'thead')) {
    createHead(ast);
  }

  combineRows(ast);
  if (!hasType(ast.nodes, 'tbody')) {
    createBody(ast);
  }
  if (hasType(ast.nodes, 'tfoot')) {
    tfootNodes(ast);
  }
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
    wrapNodes(th);
    wrapNodes(thead);
    ast.nodes.splice(1, 0, thead);
    return ast;
  }

  for (var i = 0; i < ast.nodes.length; i++) {
    var node = ast.nodes[i];
    if (node.nodes && hasType(node.nodes, 'th')) {
      define(node, 'parent', thead);
      thead.nodes.push(node);
      wrapNodes(thead);
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
    var tbody = pluck(ast.nodes, 'tbody');
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
  var thead = pluck(ast.nodes, 'thead');

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
    wrapNodes(tr);
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
  wrapNodes(thead);
}

/**
 * Add `tbody` nodes if they don't exist
 */

function createBody(ast) {
  if (hasType(ast.nodes, 'tbody')) return;
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
    wrapNodes(tbody);
  }

  ast.nodes = [open];
  ast.nodes = ast.nodes.concat(nodes);
  ast.nodes.push(close);
}

/**
 * Visit `node` with the given `fn`
 */

function pluck(nodes, type) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].type === type) {
      return nodes[i];
    }
  }
}

/**
 * Visit `node` with the given `fn`
 */

function visit(node, fn) {
  node = fn(node);
  node.nodes ? mapVisit(node.nodes, fn) : fn(node);
  return node;
}

/**
 * Map visit over array of `nodes`.
 */

function mapVisit(nodes, fn) {
  var len = nodes.length;
  var idx = -1;
  while (++idx < len) {
    visit(nodes[idx], fn);
  }
  return nodes;
}

/**
 * Visit `node` with the given `fn`
 */

function wrapNodes(node) {
  if (!node.nodes) return;
  var open = { type: node.type + '.open', val: ''};
  var close = { type: node.type + '.close', val: ''};

  define(open, 'parent', node);
  define(open, 'next', node.nodes[0]);
  define(open, 'prev', null);

  define(close, 'parent', node);
  define(close, 'next', null);
  define(close, 'prev', node.nodes[node.nodes.length - 1]);

  node.nodes.unshift(open);
  node.nodes.push(close);
}

function hasType(nodes, type) {
  var len = nodes.length;
  var idx = -1;
  while (++idx < len) {
    if (nodes[idx].type === type) {
      return true;
    }
  }
  return false;
}

/**
 * Expose `normalize`
 */

module.exports = normalize;
