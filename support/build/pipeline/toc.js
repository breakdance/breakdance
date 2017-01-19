'use strict';

var through = require('through2');
var tools = require('../tools');

module.exports = function(options) {
  return through.obj(function(file, enc, next) {
    var str = file.contents.toString();
    file.contents = new Buffer(tools.toc(str, {details: true}));
    next(null, file);
  })
};
