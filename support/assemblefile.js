'use strict';

var path = require('path');
var verb = require('verb');
var rename = require('middleware-rename-file');
var pageData = require('assemble-middleware-page-variable');
var geopattern = require('helper-geopattern');
var reflinks = require('verb-reflinks');
var helpers = require('handlebars-helpers');
var assemble = require('assemble');
var uncss = require('gulp-uncss');
var sass = require('gulp-sass');
var del = require('delete');
var Pkg = require('expand-pkg');
var pkg = new Pkg();

/**
 * Local dependencies
 */

var verbfile = require('./verbfile');
var pipeline = require('./build/pipeline');
var defaults = require('./build/defaults');
var tools = require('./build/tools');

/**
 * Build variables
 */

var dest = path.join.bind(path, __dirname, '../docs');
var css = path.join.bind(path, dest('assets/css'));
var src = path.join.bind(path, __dirname, 'src');
var tmpl = path.join.bind(path, src('templates'));
var assets = path.join.bind(path, dest('assets'));

/**
 * App
 */

var app = module.exports = assemble({
  exts: ['md', 'hbs', 'html', 'xml', 'txt']
});

/**
 * Custom collections
 */

app.create('includes', {viewType: 'partial'});
app.create('examples', {viewType: 'partial'});
app.create('files');

/**
 * Listen for errors
 */

app.on('error', function(err) {
  console.log(err);
});

/**
 * Options
 */

app.option('helper.remarkable', defaults);
app.option('geopatterns.generator', 'sine_waves');
app.option('geopatterns.color', '#13a1cc');
app.option('gradient', false);
app.option('assets', assets());
app.option('dest', dest());

/**
 * Helpers
 */

app.helpers(helpers());
app.helpers(require('./build/helpers'));
app.asyncHelpers(require('./build/helpers/async'));
app.helper('geopattern', geopattern(app.options));
app.helper('geoColor', geopattern.color(app.options));

/**
 * Data
 */

app.data({site: pkg.expand(require('../package'))});
app.data('site.title', app.data('site.name'));
app.data('site.repo', 'breakdance/breakdance');
app.data('site.nav.main', ['docs', 'plugins']);
app.data('site.nav.dropdown', ['examples', 'recipes', 'contributing', 'about']);
app.data('site.google_analytics', 'UA-33358518-18');

/**
 * Middleware
 */

app.preRender(/(api|options)/, reflinks(app.options));
app.onLoad(/\.(md|hbs)$/, rename());
app.onLoad(/\.(md|hbs)$/, pageData(app));
app.onLoad(/\.(md|hbs)$/, function(file, next) {
  file.extname = '.html';
  next();
});

/**
 * Pre-load templates
 */

app.task('preload-templates', function(cb) {
  app.partials(tmpl('partials/*.hbs'));
  app.layouts(tmpl('layouts/*.hbs'));
  app.includes('../.github/contributing.md');
  app.includes(tmpl('includes/*.md'));
  app.examples(tmpl('examples/*.md'));
  app.pages(tmpl('pages/*.md'));
  cb();
});

/**
 * Generate HTML
 */

app.task('site', ['preload-templates'], function() {
  return app.toStream('pages')
    .pipe(pipeline.reflinks(app.options))
    .pipe(pipeline.markdown(defaults))
    .pipe(pipeline.unescape())
    .pipe(app.renderFile('hbs', {layout: 'default'}))
    .pipe(pipeline.cheerio())
    .pipe(pipeline.sidenav({selectors: 'h2,h3'}))
    .pipe(pipeline.prettify())
    .pipe(app.dest(dest()));
});

/**
 * Generate API documentation using Verb
 */

app.task('verb', function(cb) {
  verbfile(verb(), cb);
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
  return app.copy(src('root/*'), dest(), {dot: true});
});

app.task('copy-assets', function() {
  return app.copy(src('assets/**/*'), assets(), {dot: true});
});

var config = {
  vendors: ['bryanbraun/anchorjs', 'leafo/sticky-kit', 'zenorocha/clipboard.js', 'HubSpot/tether'],
  scripts: ['anchorjs/anchor.min.js', 'sticky-kit/dist/sticky-kit.min.js', 'clipboard.js/dist/clipboard.min.js', 'tether/dist/js/tether.min.js']
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
  del(dest(), {force: true}, cb);
});

/**
 * Default task
 */

app.task('default', ['clean', 'copy-*', 'verb', 'site', 'sass']);
