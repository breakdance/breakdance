'use strict';

/**
 * Expose `utils`
 */

var utils = module.exports;

utils.isPunctuation = require('is-punctuation');
utils.trimTrailing = require('trim-trailing-lines');
utils.trimLeading = require('trim-leading-lines');

utils.selfClosing = function(node) {
  var tags = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
  return tags.indexOf(node.type) !== -1;
};

/**
 * Condense newlines in the given string.
 * @param {String} `str`
 * @return {*}
 */

utils.condense = function(str) {
  return str.split('\n').map(function(line) {
    return /^\s+$/.test(line) ? '' : line;
  })
  .join('\n').replace(/\n{3,}/g, '\n\n');
};

/**
 * Pick the first node of the given `type` from an array of `nodes`.
 * @param {Array} `array` nodes
 * @param {String} `type`
 * @return {*}
 */

utils.pickFirst = function(nodes, type) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].type === type) {
      return nodes[i];
    }
  }
};

/**
 * Create a HTML tag of the given `type` with optional `attrs` and `text`
 * @param {String} `tag` Tag name
 * @param {Object} `attrs` object of attributes as key-value pairs
 * @param {String} `text` Optional text
 * @return {*}
 */

utils.toTag = function(tag, attrs, text) {
  var html = '<' + tag + utils.createAttribs(attrs);
  if (typeof text === 'boolean' && text === true) {
    html += '></' + tag + '>';
    return html;
  }
  html += text ? '>' + text + '</' + tag + '>' : '>';
  return html;
};

/**
 * Get the last element from `array`
 * @param {Array} `array`
 * @return {*}
 */

utils.last = function(arr, n) {
  return arr[arr.length - (n || 1)];
};
