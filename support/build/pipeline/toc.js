'use strict';

var through = require('through2');
var nav = require('../tools/nav');

module.exports = function(options) {
  return through.obj(function(file, enc, next) {
    if (file.isNull()) {
      next(null, file);
      return;
    }

    file.contents = new Buffer(nav(file.contents.toString(), options));
    next(null, file);
  });
};
