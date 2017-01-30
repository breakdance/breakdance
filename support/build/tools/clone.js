'use strict';

var path = require('path');
var del = require('delete');
var each = require('async-each');
var clone = require('gh-clone');
var utils = require('./utils');

module.exports = function(repos, destDir, cb) {
  var dest = path.join.bind(path, destDir);
  each(utils.arrayify(repos), function(repo, next) {
    var destDir = dest(path.basename(repo));

    del(destDir, function(err) {
      if (err) {
        next(err);
        return;
      }
      clone({repo: repo, dest: destDir}, next);
    });
  }, cb);
};
