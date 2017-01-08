'use strict';

/**
 * Expose `utils`
 */

var utils = module.exports;

utils.isPunctuation = require('is-punctuation');
utils.trimTrailing = require('trim-trailing-lines');
utils.trimLeading = require('trim-leading-lines');

utils.isMatch = function isMatch(type, val) {
  return utils.toRegex(val).test(type);
};

utils.toRegex = function toRegex(val) {
  return new RegExp('^(?:' + utils.stringify(val).split(',').join('|') + '$');
};

/**
 * Array utils
 * -----------
 */

/**
 * Cast `val` to an array
 */

utils.arrayify = function arrayify(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
};

/**
 * Get the last element from `array`
 * @param {Array} `array`
 * @return {*}
 */

utils.last = function(arr, n) {
  return arr[arr.length - (n || 1)];
};

/**
 * String utils
 */

utils.stringify = function stringify(val) {
  return utils.arrayify(val).join(',');
};

utils.trimLeft = function(str) {
  return str.replace(/^[ \t]+/, '');
};

utils.trimRight = function(str) {
  return str.replace(/[ \t]$/, '');
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
 * Create a HTML tag of the given `type` with optional `attrs` and `text`
 * @param {String} `tag` Tag name
 * @param {Object} `attrs` object of attributes as key-value pairs
 * @param {String} `text` Optional text
 * @return {*}
 */

utils.toTag = function(tag, attribs, text) {
  var html = '<' + tag + utils.createAttribs(attribs);
  if (text === true) {
    return html + '></' + tag + '>';
  }
  return html + (text ? ('>' + text + '</' + tag + '>') : '>');
};

utils.createAttribs = function(attribs) {
  var str = '';
  for (var key in attribs) {
    if (attribs.hasOwnProperty(key)) {
      if (str) str += ' ';
      str += key + '=' + attribs[key];
    }
  }
  return str;
};
