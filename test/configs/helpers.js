'use strict';

var typeOf = require('kind-of');
var define = require('define-property');
var stripColor = require('strip-color');

/**
 * Pick the first node of the given `type` from an array of `nodes`.
 * @param {Array} `array` nodes
 * @param {String} `type`
 * @return {*}
 */

exports.pickFirst = function(nodes, type) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].type === type) {
      return nodes[i];
    }
  }
};

/**
 * Get the "title" from a markdown link
 */

exports.getTitle = function(str) {
  if (/^\[[^\]]+\]\(/.test(str)) {
    var m = /^\[([^\]]+)\]/.exec(str);
    if (m) return m[1];
  }
  return str;
};

/**
 * Slugify the url part of a markdown link.
 *
 * @name  options.slugify
 * @param  {String} `str` The string to slugify
 * @param  {Object} `options` Pass a custom slugify function on `options.slugify`
 * @return {String}
 * @api public
 */

exports.slugify = function(str, options) {
  options = options || {};
  if (options.slugify === false) return str;
  if (typeof options.slugify === 'function') {
    return options.slugify(str, options);
  }
  str = exports.getTitle(str);
  str = stripColor(str);
  str = str.toLowerCase();
  str = str.split(/ /).join('-');
  str = str.split(/\t/).join('--');
  str = str.split(/[|$&`~=\\\/@+*!?({[\]})<>=.,;:'"^]/).join('');
  str = str.split(/[。？！，、；：“”【】（）〔〕［］﹃﹄“ ”‘’﹁﹂—…－～《》〈〉「」]/).join('');
  return str;
};

/**
 * Return true if node is the given `type`
 */

exports.isType = function(node, type) {
  if (!node) return false;
  if (Array.isArray(type)) {
    let types = type.slice();
    for (let i = 0; i < types.length; i++) {
      if (exports.isType(node, types[i])) {
        return true;
      }
    }
    return false;
  }

  if (typeof type === 'string') {
    return node.type === type;
  }

  if (typeOf(type) === 'regexp') {
    return type.test(node.type);
  }

  throw new TypeError('isType expects type to be an array, string or regexp');
};

/**
 * Push an anchor node onto the `nodes` array of the given `node`
 *
 * @param {Object} `node`
 * @param {Object} `attribs`
 * @return {Object} Returns the created anchor node
 * @api public
 */

exports.pushAnchor = function(node, attribs) {
  attribs = attribs || {};
  var id = attribs.id || '';
  var text = {type: 'text', val: ''};
  var a = {
    type: 'a',
    attribs: {name: exports.formatAnchor(id)},
    nodes: [text]
  };
  define(text, 'parent', node);
  define(text, 'prev', {});
  define(text, 'next', a);
  exports.wrapNodes(a);
  node.nodes.splice(1, 0, a);
  return a;
};

exports.formatAnchor = function(href) {
  var prefix = '';
  if (href.charAt(0) === '#') {
    prefix = '#';
    href = href.slice(1);
  }
  return prefix + exports.slugify(href.split('_').join(' '));
};

exports.removeAnchor = function(node) {
  var nodes = node.parent.nodes;
  var i = 0;
  for (; i < nodes.length; i++) {
    if (nodes[i].type === 'a') {
      break;
    }
  }
  nodes.splice(i - 1, 3);
};

exports.wrapNodes = function(node) {
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
};
