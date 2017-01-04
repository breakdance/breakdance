'use strict';

var camelcase = require('camel-case');
var extend = require('extend-shallow');
var isObject = require('isobject');
var geo = require('geopattern');

module.exports = function(word, options) {
  var appOpts = this.app.option('geopatterns') || {};
  var opts = extend({}, appOpts, options, options.hash);
  if (typeof generator === 'string') {
    opts.generator = generator;
  }

  if (typeof opts.generator === 'string') {
    opts.generator = camelcase(opts.generator);
  }

  delete opts.data;
  delete opts.hash;
  return geo.generate(word, opts).toDataUrl();
};
