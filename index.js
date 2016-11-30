'use strict';

var extend = require('extend-shallow');
var parse = require('snapdragon-cheerio');
var Snapdragon = require('snapdragon');
var compilers = require('./lib/compilers');
var utils = require('./lib/utils');

function Sledgehammer() {
  if (typeof val === 'string') {
    var proto = Object.create(Sledgehammer.prototype);
    Sledgehammer.call(proto);

    return proto.render.apply(proto, arguments);
  }

}

Sledgehammer.prototype.compile = function() {

};

Sledgehammer.prototype.parse = function() {

};


module.exports = function(html, options) {
  if (typeof html !== 'string') {
    throw new TypeError('expected a string of HTML');
  }

  var opts = extend({}, options);

  function fn(opts) {
    var snapdragon = new Snapdragon(opts);
    snapdragon.use(compilers(opts));

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

var Sledgehammer = require('sledgehammer');
var sledgehammer = new Sledgehammer()
  .use(function(sledgehammer) {
    sledgehammer.parser(function() {

    });
    sledgehammer.compiler(function() {

    });
  })
  .use(wikipedia())
  .parser(function() {

  })
  .compiler(function() {

  })

console.log(sledgehammer.render('<h1>Foo</h1>'))
