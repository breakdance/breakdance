'use strict';

var cheerio = require('cheerio');
var Snapdragon = require('snapdragon');
var extend = require('extend-shallow');
var parse = require('snapdragon-cheerio');
var compilers = require('./lib/compilers');
var defaults = require('./lib/defaults');

/**
 * Create an instance of `Breakdance` with the given `options`.
 *
 * ```js
 * var bd = new Breakdance();
 * var ast = bd.parse('<strong>The Freaks Come Out at Night!</strong>');
 * var str = bd.compile(ast);
 * console.log(str);
 * //=> 'The Freaks Come Out at Night!'
 * ```
 * @param {Object} `options`
 * @api public
 */

function Breakdance(options) {
  if (typeof options === 'string') {
    let proto = Object.create(Breakdance.prototype);
    Breakdance.call(proto);
    return proto.render.apply(proto, arguments);
  }

  if (!(this instanceof Breakdance)) {
    let proto = Object.create(Breakdance.prototype);
    Breakdance.call(proto);
    return proto;
  }

  this.utils = Breakdance.utils;
  this.helpers = Breakdance.helpers;
  this.options = extend({}, options);
  this.plugins = {
    fns: [],
    preprocess: [],
    visitors: {},
    before: {},
    after: {}
  };
}

/**
 * Register a plugin that will be called with an instance of the compiler
 * when `.compile` or `.render` are run.
 *
 * @param {Function} `fn` Plugin function
 * @return {Object} Returns the instance for chaining.
 * @api public
 */

Breakdance.prototype.use = function(fn) {
  this.plugins.fns.push(fn);
  return this;
};

/**
 * Override a built-in node type `type`, or register a new type.
 *
 * @param {String} `type` The `node.type` to override or register.
 * @param {Function} `fn` Visitor function
 * @return {Object} Returns the instance for chaining.
 * @api public
 */

Breakdance.prototype.set = function(type, fn) {
  if (Array.isArray(type)) {
    for (var i = 0; i < type.length; i++) {
      this.set(type[i], fn);
    }
  } else {
    this.plugins.visitors[type] = fn;
  }
  return this;
};

/**
 * Register a plugin that will be called with an instance of the compiler
 * when `.compile` or `.render` are run.
 *
 * @param {Function} `fn` Plugin function
 * @return {Object} Returns the instance for chaining.
 * @api public
 */

Breakdance.prototype.preprocess = function(fn) {
  this.plugins.preprocess.push(fn);
  return this;
};

/**
 * Register a plugin to use before calling one of the other methods.
 *
 * @param {Function} `fn` Plugin function
 * @return {Object} Returns the instance for chaining.
 * @api public
 */

Breakdance.prototype.before = function(type, fn) {
  if (Array.isArray(type)) {
    for (var i = 0; i < type.length; i++) {
      this.before(type[i], fn);
    }
  } else {
    this.plugins.before[type] = fn;
  }
  return this;
};

/**
 * Register a plugin to use before calling one of the other methods.
 *
 * @param {Function} `fn` Plugin function
 * @return {Object} Returns the instance for chaining.
 * @api public
 */

Breakdance.prototype.after = function(type, fn) {
  if (Array.isArray(type)) {
    for (var i = 0; i < type.length; i++) {
      this.after(type[i], fn);
    }
  } else {
    this.plugins.after[type] = fn;
  }
  return this;
};

/**
 * Parses a string of `html` and returns an AST.
 *
 * @param {String} `html`
 * @param {Object} `options`
 * @return {Object} Abstract syntax tree
 * @api public
 */

Breakdance.prototype.parse = function(html, options) {
  var opts = extend(defaults, this.options, options);
  var $ = cheerio.load(html, opts);

  if (this.plugins.preprocess.length > 0) {
    for (var i = 0; i < this.plugins.preprocess; i++) {
      this.plugins.preprocess[i].call(this, $);
    }
  }
  return parse($, opts);
};

/**
 * Converts a string of HTML to markdown with the specified `options`
 *
 * @param {String} `html`
 * @param {Object} `options`
 * @return {String} Returns a markdown string.
 * @api public
 */

Breakdance.prototype.render = function(html, options) {
  if (typeof html !== 'string') {
    throw new TypeError('expected a string of HTML');
  }

  var ast = this.parse(html, options);
  var res = this.compile(ast, options);
  return res.output;
};

/**
 * Convert the a breakdance AST from [.parse](#parse) to markdown
 * with the specified `options`
 *
 * @param {String} `ast`
 * @param {Object} `options`
 * @return {Object} Returns the AST and compiled markdown string on the `.output` property, in case you need the object for post-processing.
 * @api public
 */

Breakdance.prototype.compile = function(ast, options) {
  if (typeof ast === 'string') {
    throw new TypeError('Breakdance#compile expects an AST (try render instead)');
  }

  let opts = extend({}, this.options, options);
  let snapdragon = opts.snapdragon || new Snapdragon(options);
  Object.defineProperty(snapdragon, 'parser', {
    get: function() {
      throw new Error('breakdance does not use the Snapdragon parser');
    }
  });

  snapdragon._plugins = this.plugins;
  snapdragon.use(compilers(opts));

  for (let i = 0; i < this.plugins.fns.length; i++) {
    this.plugins.fns[i].call(this, this);
  }

  for (let key in this.plugins.visitors) {
    if (this.plugins.visitors.hasOwnProperty(key)) {
      snapdragon.compiler.set(key, this.plugins.visitors[key]);
    }
  }

  if (typeof ast === 'string') {
    ast = this.parse(ast, opts);
  }

  return snapdragon.compile(ast, opts);
};

/**
 * Expose `Breakdance`
 * @type {Constructor}
 */

module.exports = Breakdance;
module.exports.helpers = require('./lib/helpers');
module.exports.utils = require('./lib/utils');

