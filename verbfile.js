'use strict';

var path = require('path');
var assemblefile = require('./support/assemblefile');
var cwd = process.cwd();

module.exports = function(verb) {
  verb.use(require('verb-generate-readme'));

  verb.task('assemble', function(cb) {
    process.chdir(path.join(__dirname, 'support'));
    assemblefile.build(cb);
  });

  verb.task('docs', function(cb) {
    process.chdir(cwd);
    verb.build('readme', cb);
  });

  verb.task('default', ['docs', 'assemble']);
};
