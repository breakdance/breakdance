'use strict';

var extend = require('extend-shallow');
var merge = require('mixin-deep');
var path = require('path');

module.exports = function(app) {
  return function(file, next) {
    file.extname = '.html';
    var page = file.data.page = {};

    page.dest = path.resolve(app.cwd, app.options.dest);
    page.cwd = file.cwd;
    page.base = file.base;
    page.path = path.join(page.dest, file.relative);
    page.dirname = path.dirname(page.path);
    page.relative = file.relative;
    page.basename = file.basename;
    page.stem = file.stem;
    page.extname = file.extname;

    var obj = merge({}, page, file.data);
    delete obj.page;
    file.data.page = obj;
    next();
  };
};
