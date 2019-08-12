'use strict';

const path = require('path');
const assemblefile = require('./support/assemblefile');
const cwd = process.cwd();

module.exports = verb => {
  verb.use(require('verb-generate-readme'));

  // run Assemble to generate docs
  verb.task('assemble', cb => {
    process.chdir(path.join(__dirname, 'support'));
    assemblefile.build(cb);
  });

  // build breakdance documentation
  verb.task('docs', cb => {
    process.chdir(cwd);
    verb.build('readme', cb);
  });

  verb.task('default', ['docs', 'assemble']);
};
