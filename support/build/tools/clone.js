'use strict';

var path = require('path');
var each = require('async-each');
var clone = require('gh-clone');
var utils = require('./utils');

module.exports = function(repos, destDir, cb) {
  var dest = path.join.bind(path, destDir);
  each(utils.arrayify(repos), function(repo, next) {
    clone({repo: repo, dest: dest(path.basename(repo))}, next);
  }, cb);
};
