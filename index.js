'use strict';

var cheerio = require('cheerio');
var Snapdragon = require('snapdragon');
var define = require('define-property');
var extend = require('extend-shallow');
var parser = require('snapdragon-cheerio');
var compilers = require('./lib/compilers');
var defaults = require('./lib/defaults');
var html = require('./lib/html');

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

  this.define('cache', {});
  this.utils = Breakdance.utils;
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
 * Register a compiler plugin.
 *
 * ```js
 * // plugin example
 * function yourPlugin(options) {
 *   return function(breakdance) {
 *     // do stuff
 *   };
 * }
 * // usage
 * breakdance.use(yourPlugin());
 * ```
 *
 * @param {Function} `fn` Plugin function that takes an options object and returns a function that takes an instance of breakdance.
 * @return {Object} Returns the breakdance instance for chaining.
 * @api public
 */

Breakdance.prototype.use = function(fn) {
  if (Array.isArray(fn)) {
    this.plugins.fns = this.fns.concat(fn);
  } else {
    this.plugins.fns.push(fn);
  }
  return this;
};

/**
 * Set a non-enumerable property or method on the breakdance instance.
 * Useful in plugins for defining methods or properties to be made
 * available inside visitor functions.
 *
 * ```js
 * // plugin example
 * breakdance.use(function() {
 *   this.define('appendFoo', function(node) {
 *     node.val += 'Foo';
 *   });
 * });
 *
 * // then, in a compiler function
 * breakdance.visit('text', function(node) {
 *   if (node.something === true) {
 *     this.appendFoo(node);
 *   }
 *   this.emit(node.val);
 * });
 * ```
 * @param {String} `name` Name of the property or method being defined
 * @param {any} `val` Property value
 * @return {Object} Returns the instance for chaining.
 * @api public
 */

Breakdance.prototype.define = function(name, val) {
  define(this, name, val);
  return this;
};

/**
 * Register a visitor function to be called on a node of the given `type`.
 * Override a built-in visitor `type`, or register a new type.
 *
 * ```js
 * breakdance.visit('div', function(node) {
 *   // do stuff to node
 * });
 * ```
 * @param {String} `type` The `node.type` to call the visitor on. You can override built-in visitors by registering a visitor of the same name, or register a visitor for rendering a new type.
 * @param {Function} `fn` The visitor function
 * @return {Object} Returns the instance for chaining.
 * @api public
 */

Breakdance.prototype.visit = function(type, fn) {
  if (Array.isArray(type)) {
    for (var i = 0; i < type.length; i++) {
      this.visit(type[i], fn);
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
  if (Array.isArray(fn)) {
    this.plugins.preprocess = this.preprocess.concat(fn);
  } else {
    this.plugins.preprocess.push(fn);
  }
  return this;
};

/**
 * Register a function to be called on nodes of the given `type`
 * before _before_ calling the visitor registered for the type.
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

Breakdance.prototype.parse = function(val, options) {
  var opts = extend({}, defaults, this.options, options);
  this.$ = cheerio.load(val, opts);

  if (this.plugins.preprocess.length > 0) {
    for (var i = 0; i < this.plugins.preprocess; i++) {
      this.plugins.preprocess[i].call(this, this.$);
    }
  }

  opts.preprocess = html.preprocess(extend({}, opts));
  return this.snapdragon.parse(this.$, opts);
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

  var visitors = extend({}, this.plugins.visitors, opts.override);
  for (let key in visitors) {
    if (visitors.hasOwnProperty(key)) {
      snapdragon.compiler.set(key, visitors[key]);
    }
  }

  if (typeof ast === 'string') {
    ast = this.parse(ast, opts);
  }

  return snapdragon.compile(ast, opts);
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
 * Getter for lazily instantiating Snapdragon when `.parse` or
 * `.compile` is called.
 */

Object.defineProperty(Breakdance.prototype, 'snapdragon', {
  set: function(val) {
    this.cache.snapdragon = val;
  },
  get: function() {
    if (this.cache.snapdragon) {
      return this.cache.snapdragon;
    }
    var snapdragon = new Snapdragon(this.options);
    snapdragon.use(parser());
    this.cache.snapdragon = snapdragon;
    return snapdragon;
  }
});

/**
 * Expose `Breakdance`
 * @type {Constructor}
 */

module.exports = Breakdance;
module.exports.utils = require('./lib/utils');
