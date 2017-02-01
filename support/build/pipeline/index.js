var pipeline = module.exports = require('export-files')(__dirname);

// expose plugins from node_modules
pipeline.reflinks = require('gulp-reflinks');
pipeline.prettify = require('gulp-prettify');
