'use strict';

var through = require('through2');
var unescape = require('unescape');

/**
 * Unescape template delimiters that were escaped when markdown was converted
 */

module.exports = function(options) {
  return through.obj(function(file, enc, next) {
    file.extname = '.html';
    var str = file.contents.toString();
    str = str.replace(/(\{{2,4})([^}]+)(\}{2,4})/g, function(m, open, inner, close) {
      return open + unescape(inner) + close;
    });
    file.contents = new Buffer(str);
    next(null, file);
  });
};
