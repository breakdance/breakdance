'use strict';

var isPunctuation = require('is-punctuation');
var isWhitespace = require('is-whitespace');
var wordRegex = require('word-regex');
var typeOf = require('kind-of');

/**
 * Expose `utils`
 */

var utils = module.exports;
utils.typeOf = typeOf;

utils.isObject = function(val) {
  return typeOf(val) === 'object';
};

/**
 * Matching utils
 * --------------
 */

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

utils.isPunctuation = isPunctuation;
utils.trimTrailing = require('trim-trailing-lines');
utils.trimLeading = require('trim-leading-lines');

utils.isWrappingChar = function(str) {
  return /[*_"'`]/.test(str);
};

utils.isStartingChar = function(str) {
  return /[$@#]/.test(str) || utils.isOpeningChar(str);
};

utils.isOpeningChar = function(str) {
  return /[<([{]/.test(str);
};

utils.shouldAddTrailingWhitespace = function(str) {
  return (!isWhitespace(str) && !utils.isSeparator(str))
    || utils.isWrappingChar(str)
    || utils.isSpecialChar(str)
    || utils.isEndingChar(str);
};

utils.isClosingChar = function(str) {
  return /[\])}]/.test(str);
};

utils.isEndingChar = function(str) {
  return /[%!?.,;:]/.test(str) || utils.isClosingChar(str);
};

utils.isWordChar = function(str) {
  return wordRegex().test(str);
};

utils.isSpecialChar = function(str) {
  return /[‘’“”،、‹›«»†‡°″¡¿※#№\‱¶′‴§‖¦]/.test(str);
};

utils.isOperator = function(str) {
  return /[=+÷×‰&^~|]/.test(str);
};

utils.isSeparator = function(str) {
  return /[-‒−–—―\\\/⁄\s·•]/.test(str);
};

utils.stringify = function stringify(val) {
  return utils.arrayify(val).join(',');
};

utils.trimLeft = function(str) {
  return str.replace(/^[ \t]+/, '');
};

utils.trimRight = function(str) {
  return str.replace(/[ \t]+$/, '');
};

utils.stripNewlines = function(str) {
  return str.replace(/\n/g, '');
};

/**
 * Condense newlines in the given string.
 * @param {String} `str`
 * @return {*}
 */

utils.condense = function(str) {
  return str.split('\n').map(function(line) {
    return line.trim() === '' ? '' : line;
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
