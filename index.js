'use strict';

var extend = require('extend-shallow');
var parse = require('snapdragon-cheerio');
var Snapdragon = require('snapdragon');
var compilers = require('./lib/renderers');
var utils = require('./lib/utils');

module.exports = function breakdance(html, options) {
  if (typeof html !== 'string') {
    throw new TypeError('expected a string of HTML');
  }

  var opts = extend({stripEmpty: ['ul', 'ol', 'li', 'span', 'div', 'em', 'strong', 'b', 'i', 'u']}, options);

  function fn() {
    var snapdragon = opts.snapdragon || new Snapdragon(opts);
    snapdragon.use(compilers(opts));

    if (typeof opts.compilers === 'function') {
      snapdragon.use(opts.compilers(opts));
    }

    var ast = parse(html, opts);
    if (ast.canonical && !opts.domain) {
      opts.domain = ast.canonical;
    }

    var res = snapdragon.compile(ast, opts);
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
