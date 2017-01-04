'use strict';

var extend = require('extend-shallow');
var parse = require('snapdragon-cheerio');
var Snapdragon = require('snapdragon');
var renderers = require('./lib/renderers');
var utils = require('./lib/utils');

module.exports = function(html, options) {
  if (typeof html !== 'string') {
    throw new TypeError('expected a string of HTML');
  }

  var opts = extend({}, options);
  function fn() {
    var snapdragon = new Snapdragon(opts);
    snapdragon.use(renderers(opts));

    var ast = parse(html, opts);
    if (ast.canonical && !opts.domain) {
      opts.domain = ast.canonical;
    }

    snapdragon.options = extend({}, snapdragon.options, opts);
    var res = snapdragon.compile(ast, snapdragon.options);
    return res.output;
  }

  if (Array.isArray(opts.pick)) {
    var str = '';
    for (var i = 0; i < opts.pick.length; i++) {
      var p = opts.pick[i];
      var opt = extend({}, opts, {pick: p});
      str += fn(opt) + '\n\n';
    }
    return utils.condense(str);
  }

  return fn();
};
