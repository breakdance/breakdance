'use strict';

var through = require('through2');
var PluginError = require('plugin-error');
var Remarkable = require('remarkable');

module.exports = function(options) {
  return through.obj(function(file, enc, next) {
    if (file.isNull()) {
      next(null, file);
      return;
    }

    try {
      var md = new Remarkable(options);
      file.contents = new Buffer(md.render(file.contents.toString()));
      file.extname = '.html';
    } catch (err) {
      this.emit('error', new PluginError('gulp-remarkable', err, {fileName: file.path}));
      return;
    }

    next(null, file);
  });
};
