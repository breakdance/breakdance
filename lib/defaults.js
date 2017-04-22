'use strict';

var merge = require('mixin-deep');
var defaults = {
  omitEmpty: [
    'a',
    'b',
    'del',
    'div',
    'em',
    'i',
    'li',
    'ol',
    's',
    'span',
    'strong',
    'section',
    'u',
    'ul'
  ]
};

/**
 * Default options
 */

module.exports = function(options) {
  var opts = merge({}, defaults, options);
  if (opts.keepEmpty) {
    var keep = typeof opts.keepEmpty === 'string'
      ? opts.keepEmpty
      : [opts.keepEmpty];

    for (var i = 0; i < keep.length; i++) {
      opts.omitEmpty.splice(i, 1);
    }
  }
  return opts;
};
