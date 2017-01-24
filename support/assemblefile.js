'use strict';

var path = require('path');
var Pkg = require('expand-pkg');
var clone = require('gh-clone');
var through = require('through2');
var extend = require('extend-shallow');
var reflinks = require('gulp-reflinks');
var apidocs = require('helper-apidocs');
var pageData = require('assemble-middleware-page-variable');
var geopattern = require('helper-geopattern');
var helpers = require('handlebars-helpers');
var assemble = require('assemble');
var uncss = require('gulp-uncss');
var sass = require('gulp-sass');
var del = require('delete');

/**
 * Local dependencies
 */

var pipeline = require('./build/pipeline');
var defaults = require('./build/defaults');
var tools = require('./build/tools');

/**
 * Build variables
 */

var dest = path.join.bind(path, 'dist');
var css = path.join.bind(path, dest('assets/css'));
var src = path.join.bind(path, __dirname, 'src');
var tmpl = path.join.bind(path, src('templates'));

/**
 * App
 */

var app = module.exports = assemble();
var pkg = new Pkg();

/**
 * Options
 */

app.option('geopatterns.generator', 'sine_waves');
app.option('geopatterns.color', '#13a1cc');
app.option('gradient', false);
app.option('dest', 'dist');

/**
 * Helpers
 */

app.helpers(helpers());
app.helpers(require('./build/helpers'));
app.helper('octicon', require('helper-octicon'));
app.helper('geopattern', geopattern(app.options));
app.helper('geoColor', geopattern.color(app.options));
app.helper('link-to', require('helper-link-to'));
app.helper('apidocs', apidocs(app));

/**
 * Data
 */

app.data({site: pkg.expand(require('../package'))});
app.data('site.title', app.data('site.name'));
app.data('site.repo', 'jonschlinkert/micromatch');
app.data('site.content', 'page-content');
app.data('site.nav.links', ['docs', 'plugins', 'api', 'examples']);
app.data('site.nav.dropdown', ['options', 'edge-cases', 'about']);

/**
 * Middleware
 */

app.onLoad(/\.md$/, pageData(app));

/**
 * Generate HTML
 */

app.task('preload-templates', function(cb) {
  app.partials(tmpl('partials/*.hbs'));
  app.layouts(tmpl('layouts/*.hbs'));
  app.pages('src/content/*.md');
  cb();
});

app.task('render', ['preload-templates'], function() {
  app.emit('render');
  return app.toStream('pages')
    .pipe(reflinks(app.options))
    .pipe(pipeline.markdown(defaults()))
    .pipe(pipeline.unescape())
    .pipe(app.renderFile({layout: 'default'}))
    .pipe(pipeline.toc({
      selectors: `.${app.data('site.content')} h2,h3`,
      classes: {
        a: 'toc-link',
        li: 'toc-item',
        ol: 'nav sidenav flex-column'
      }
    }))
    .pipe(app.dest('dist'))
});

/**
 * Styles
 */

app.task('sass', function() {
  return app.src('src/sass/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(app.dest(css()))
});

app.task('sass-lint', function() {
  return app.src('src/sass/*.scss')
    .pipe(lint({configFile: 'src/sass/.sass-lint.yml'}))
    .pipe(lint.format())
    .pipe(lint.failOnError())
});

app.task('uncss', function() {
  return app.src('*.css', {cwd: css()})
    .pipe(uncss({html: [dest('*.html')]}))
    .pipe(app.dest(css()));
});

/**
 * Copy
 */

app.task('copy', ['vendor-scripts'], function() {
  return app.copy('src/assets/**/*', 'dist/assets');
});

app.task('vendor-scripts', function() {
  return app.copy(['src/vendor/sticky-kit/dist/sticky-kit.js'], 'dist/assets/js/vendor');
});

app.task('clone', function(cb) {
  tools.clone(['ghosh/uiGradients', 'leafo/sticky-kit'], 'src/vendor', cb);
});

/**
 * Clean
 */

app.task('clean', function(cb) {
  del('dist/', cb);
});

/**
 * Default task
 */

app.task('default', ['clean', 'copy', 'render', 'sass']);
