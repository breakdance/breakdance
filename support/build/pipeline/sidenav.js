'use strict';

var through = require('through2');
var PluginError = require('plugin-error');
var sidenav = require('../tools/sidenav');

/**
 * Add navigation to page
 */

module.exports = function(options) {
  return through.obj(function(file, enc, next) {
    if (file.isNull()) {
      next(null, file);
      return;
    }
    try {
      file.contents = new Buffer(sidenav(file.contents.toString(), options));
    } catch (err) {
      this.emit('error', new PluginError('navigation', err, {fileName: file.path}));
      return;
    }
    next(null, file);
  });
};
