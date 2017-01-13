'use strict';

var path = require('path');
var Pkg = require('expand-pkg');
var clone = require('gh-clone');
var through = require('through2');
var extend = require('extend-shallow');
var unescape = require('unescape');
var reflinks = require('gulp-reflinks');
var pageData = require('assemble-middleware-page-variable');
var geopattern = require('helper-geopattern');
var helpers = require('handlebars-helpers');
var assemble = require('assemble');
var md = require('gulp-remarkable');
var uncss = require('gulp-uncss');
var sass = require('gulp-sass');
var del = require('delete');

/**
 * Local dependencies
 */

var tools = require('./build/tools');
var utils = require('./build/utils');

/**
 * App
 */

var app = assemble();
var pkg = new Pkg();

/**
 * Helpers and dta
 */

app.data({site: pkg.expand(require('../package'))});
app.data('site.title', app.data('site.name'));
app.option('geopatterns.generator', 'sine_waves');
app.option('geopatterns.color', '#13a1cc');
app.option('nav', ['index', 'examples', 'options', 'customize', 'edge-cases', 'about']);
app.option('gradient', false);

/**
 * Helpers
 */

app.helpers(helpers());
app.helpers(require('./build/helpers'));
app.helper('octicon', require('helper-octicon'));
app.helper('geopattern', geopattern(app.options));
app.helper('geoColor', geopattern.color(app.options));

/**
 * Options
 */

app.option('dest', 'dist');

/**
 * Middleware
 */

app.onLoad(/\.md$/, pageData(app));

/**
 * Tasks
 */

app.task('render', function() {
  app.partials('src/templates/partials/*.hbs');
  app.layouts('src/templates/layouts/*.hbs');
  app.pages('src/content/*.md');
  return app.toStream('pages')
    .pipe(reflinks(app.options))
    .pipe(md(utils.markdownOptions))
    .pipe(through.obj(function(file, enc, next) {
      var str = file.contents.toString();
      str = str.replace(/(\{{2,4})([^}]+)(\}{2,4})/g, function(m, open, inner, close) {
        return open + unescape(inner) + close;
      });
      file.contents = new Buffer(str);
      next(null, file);
    }))
    .pipe(app.renderFile({layout: 'default'}))
    .pipe(through.obj(function(file, enc, next) {
      var str = file.contents.toString();
      file.contents = new Buffer(tools.toc(str, {details: true}));
      next(null, file);
    }))
    .pipe(app.dest('dist'))
});

app.task('sass', function() {
  return app.src('src/sass/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(app.dest('dist/assets/css'))
});

app.task('sass-lint', function() {
  return app.src('src/sass/p*.scss')
    .pipe(lint({configFile: 'src/sass/.sass-lint.yml'}))
    .pipe(lint.format())
    .pipe(lint.failOnError())
});

app.task('uncss', function() {
  var css = path.join.bind(path, 'dist/assets/css');
  return app.src('styles.css', {cwd: css()})
    .pipe(uncss({html: ['dist/*.html']}))
    .pipe(app.dest(css('uncss')));
});

app.task('clone', function(cb) {
  clone({repo: 'ghosh/uiGradients', dest: 'src/vendor/uigradients'}, cb);
});

app.task('copy', function() {
  return app.copy('src/assets/**/*', 'dist/assets');
});

app.task('clean', function(cb) {
  del('dist/', cb);
});

app.task('default', ['clean', 'copy', 'render', 'sass']);

module.exports = app;
