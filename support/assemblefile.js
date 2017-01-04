'use strict';

var path = require('path');
var Pkg = require('expand-pkg');
var clone = require('gh-clone');
var helpers = require('handlebars-helpers');
var assemble = require('assemble');
var md = require('gulp-remarkable');
var uncss = require('gulp-uncss');
var sass = require('gulp-sass');
var del = require('delete');

/**
 * Local dependencies
 */

var middleware = require('./build/middleware');
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
app.option('geopatterns.generator', 'hexagons');
app.option('geopatterns.baseColor', '#900');
app.option('geopatterns.color', '#127896');
app.option('nav', ['home', 'examples', 'options', 'customize', 'edge-cases']);
// app.option('gradient', 'EasyMed');

/**
 * Helpers
 */

app.helpers(helpers());
app.helpers(require('./build/helpers'));

/**
 * Options
 */

app.option('dest', 'dist');

/**
 * Middleware
 */

app.onLoad(/\.md$/, middleware.pageData(app));

/**
 * Tasks
 */

app.task('render', function() {
  app.partials('src/templates/partials/*.hbs');
  app.layouts('src/templates/layouts/*.hbs');
  app.pages('src/content/*.md');
  return app.toStream('pages')
    .pipe(md(utils.markdownOptions))
    .pipe(app.renderFile({layout: 'default'}))
    .pipe(app.dest('dist'));
});

app.task('sass', function () {
  return app.src('src/sass/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(app.dest('dist/assets/css'))
});

app.task('uncss', function() {
  var css = path.join.bind(path, 'dist/assets/css');
  return app.src('styles.css', {cwd: css()})
    .pipe(uncss({html: 'dist/*.html'}))
    .pipe(app.dest(css('uncss.css')));
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
