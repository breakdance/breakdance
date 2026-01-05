
const path = require('path');
const del = require('delete');
const each = require('async-each');
const clone = require('gh-clone');
const utils = require('./utils');

module.exports = function(repos, destDir, cb) {
  const dest = path.join.bind(path, destDir);
  each(utils.arrayify(repos), function(repo, next) {
    const destDir = dest(path.basename(repo));

    del(destDir, function(err) {
      if (err) {
        next(err);
        return;
      }
      clone({ repo, dest: destDir }, next);
    });
  }, cb);
};
