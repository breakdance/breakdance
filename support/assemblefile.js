'use strict';

var path = require('path');
var Pkg = require('expand-pkg');
var reflinks = require('gulp-reflinks');
var prettify = require('gulp-prettify');
var pageData = require('assemble-middleware-page-variable');
var geopattern = require('helper-geopattern');
var helpers = require('handlebars-helpers')();
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
var assets = path.join.bind(path, dest('assets'));

/**
 * App
 */

var app = module.exports = assemble();
var pkg = new Pkg();

/**
 * Listen for errors
 */

app.on('error', function(err) {
  console.log(err);
});

/**
 * Options
 */

app.option(defaults());
app.option('geopatterns.generator', 'sine_waves');
app.option('geopatterns.color', '#13a1cc');
app.option('gradient', false);
app.option('assets', assets());
app.option('dest', dest());

/**
 * Helpers
 */

app.helpers(helpers);
app.helpers(require('./build/helpers'));
app.helper('octicon', require('helper-octicon'));
app.helper('geopattern', geopattern(app.options));
app.helper('geoColor', geopattern.color(app.options));
app.helper('link-to', require('helper-link-to'));
app.helper('md', helpers.md.sync);

/**
 * Data
 */

app.data({site: pkg.expand(require('../package'))});
app.data('site.title', app.data('site.name'));
app.data('site.content', 'page-content');
app.data('site.repo', 'breakdance/breakdance');
app.data('site.nav.main', ['docs', 'plugins']);
app.data('site.nav.dropdown', ['recipes', 'contributing', 'about']);

/**
 * Middleware
 */

app.onLoad(/\.md$/, pageData(app));
app.onLoad(/\.md$/, function(file, next) {
  file.extname = '.html';
  next();
});

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
    .pipe(pipeline.sidenav({selectors: 'h2,h3'}))
    // .pipe(pipeline.toc({selectors: 'h2,h3'}))
    .pipe(prettify())
    .pipe(app.dest('dist'));
});

/**
 * Styles
 */

app.task('sass', function() {
  return app.src('src/sass/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(app.dest(css()));
});

app.task('uncss', function() {
  return app.src('*.css', {cwd: css()})
    .pipe(uncss({html: [dest('*.html')]}))
    .pipe(app.dest(css()));
});

/**
 * Copy
 */

app.task('copy-root', function() {
  return app.copy(src('root/*'), dest());
});

app.task('copy-assets', function() {
  return app.copy(src('assets/**/*'), assets());
});


var config = {
  vendors: ['bryanbraun/anchorjs', 'leafo/sticky-kit', 'zenorocha/clipboard.js', 'HubSpot/tether'],
  scripts: ['anchorjs/anchor.min.js', 'sticky-kit/dist/sticky-kit.min.js', 'clipboard.js/dist/clipboard.min.js', 'tether/dist/js/tether.min.js'],
};

app.task('vendor-scripts', function() {
  return app.copy(config.scripts, path.resolve(assets('js/vendor')), {
    cwd: 'src/vendor'
  });
});

app.task('clone', function(cb) {
  tools.clone(config.vendors, 'src/vendor', cb);
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

app.task('default', ['clean', 'copy-*', 'render', 'sass']);
