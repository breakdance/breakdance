'use strict';

var through = require('through2');
var format = require('gulp-format-md');

module.exports = function(verb) {
  verb.use(require('verb-generate-readme'));
  verb.task('apidocs', function(cb) {
    return verb.src('support/api/apidocs.md', {cwd: __dirname})
      .pipe(verb.renderFile('md'))
      .pipe(format())
      .pipe(through.obj(function(file, enc, next) {
        var url = 'https://github.com/breakdance/breakdance/blob/master/';
        var str = file.contents.toString();
        var re = /(# \[.*?\]\()(?:\.\/)?(index|lib\/[^\/]+)\.js/gm;
        str = str.replace(re, function(m, $1, $2) {
          return $1 + url + $2 + '.js';
        });
        file.contents = new Buffer(str);
        next(null, file);
      }))
      .pipe(verb.dest('support/src/content/includes'));
  });
  verb.task('default', ['readme', 'apidocs']);
};
