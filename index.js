'use strict';

var cheerio = require('cheerio');
var isObject = require('isobject');
var Snapdragon = require('snapdragon');
var define = require('define-property');
var extend = require('extend-shallow');
var parser = require('snapdragon-cheerio');
var defaults = require('./lib/defaults');
var compiler = require('./lib/compiler');
var html = require('./lib/html');

/**
 * Create an instance of `Breakdance` with the given `options`.
 *
 * {{example "Breakdance"}}
 *
 * @param {Object|String} `options` Pass options if you need to instantiate Breakdance, or a string to convert HTML to markdown.
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
  this.options = extend({}, options);
  this.plugins = {
    fns: [],
    preprocess: [],
    handlers: {},
    before: {},
    after: {}
  };
}

/**
 * Register a compiler plugin `fn`. Plugin functions should take an
 * options object, and return a function that takes an instance of
 * breakdance.
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
 * @param {Function} `fn` plugin function
 * @return {Object} Returns the breakdance instance for chaining.
 * @api public
 */

Breakdance.prototype.use = function(fn) {
  this.plugins.fns = this.plugins.fns.concat(fn);
  return this;
};

/**
 * Register a plugin to be called when `.parse` is run, after the AST
 * is created by [cheerio][], but before the AST is converted to a breakdance
 * AST. `preprocess` functions are passed an instance of breakdance
 * and the cheerio instance that was created to parse the HTML.
 *
 * ```js
 * var Breakdance = require('breakdance');
 * var breakdance = new Breakdance();
 *
 * breakdance.preprocess(function($) {
 *   // do stuff with cheerio AST
 * });
 * ```
 * @param {Function} `fn` Plugin function
 * @return {Object} Returns the instance for chaining.
 * @api public
 */

Breakdance.prototype.preprocess = function(fn) {
  this.plugins.preprocess = this.plugins.preprocess.concat(fn);
  return this;
};

/**
 * Set a non-enumerable property or method on the breakdance instance.
 * Useful in plugins for defining methods or properties for to be used
 * inside compiler handler functions.
 *
 * ```js
 * // plugin example
 * breakdance.use(function() {
 *   this.define('appendFoo', function(node) {
 *     node.val += 'Foo';
 *   });
 * });
 *
 * // then, in a compiler "handler" function
 * breakdance.set('text', function(node) {
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
 * Register a handler function to be called on a node of the given `type`.
 * Override a built-in handler `type`, or register a new type.
 *
 * ```js
 * breakdance.set('div', function(node) {
 *   // do stuff to node
 * });
 * ```
 * @param {String} `type` The `node.type` to call the handler on. You can override built-in handlers by registering a handler of the same name, or register a handler for rendering a new type.
 * @param {Function} `fn` The handler function
 * @return {Object} Returns the instance for chaining.
 * @api public
 */

Breakdance.prototype.set = function(type, fn) {
  if (Array.isArray(type)) {
    for (var i = 0; i < type.length; i++) {
      this.set(type[i], fn);
    }
  } else {
    this.plugins.handlers[type] = fn;
  }
  return this;
};

/**
 * Register a handler that will be called by the compiler on every node
 * of the given `type`, _before other handlers are called_ on that node.
 *
 * ```js
 * breakdance.before('div', function(node) {
 *   // do stuff to node
 * });
 *
 * // or
 * breakdance.before(['div', 'span'], function(node) {
 *   // do stuff to node
 * });
 *
 * // or
 * breakdance.before({
 *   div: function(node) {
 *     // do stuff to node
 *   },
 *   span: function(node) {
 *     // do stuff to node
 *   }
 * });
 * ```
 * @param {String|Object|Array} `type` Handler name(s), or an object of handlers
 * @param {Function} `fn` Handler function, if `type` is a string or array. Otherwise this argument is ignored.
 * @return {Object} Returns the instance for chaining.
 * @api public
 */

Breakdance.prototype.before = function(type, fn) {
  if (isObject(type)) {
    for (var key in type) {
      if (type.hasOwnProperty(key)) {
        this.before(key, type[key]);
      }
    }
  } else if (Array.isArray(type)) {
    for (var i = 0; i < type.length; i++) {
      this.before(type[i], fn);
    }
  } else {
    this.plugins.before[type] = (this.plugins.before[type] || []).concat(fn);
  }
  return this;
};

/**
 * Register a handler that will be called by the compiler on every node
 * of the given `type`, _after other handlers are called_ on that node.
 *
 * ```js
 * breakdance.after('div', function(node) {
 *   // do stuff to node
 * });
 *
 * // or
 * breakdance.after(['div', 'span'], function(node) {
 *   // do stuff to node
 * });
 *
 * // or
 * breakdance.after({
 *   div: function(node) {
 *     // do stuff to node
 *   },
 *   span: function(node) {
 *     // do stuff to node
 *   }
 * });
 * ```
 * @param {String|Object|Array} `type` Handler name(s), or an object of handlers
 * @param {Function} `fn` Handler function, if `type` is a string or array. Otherwise this argument is ignored.
 * @return {Object} Returns the instance for chaining.
 * @api public
 */

Breakdance.prototype.after = function(type, fn) {
  if (isObject(type)) {
    for (var key in type) {
      if (type.hasOwnProperty(key)) {
        this.after(key, type[key]);
      }
    }
  } else if (Array.isArray(type)) {
    for (var i = 0; i < type.length; i++) {
      this.after(type[i], fn);
    }
  } else {
    this.plugins.after[type] = (this.plugins.after[type] || []).concat(fn);
  }
  return this;
};

/**
 * Private method for running plugin functions on a node of the
 * given `type`.
 *
 * @param {String} `type` Either `before` or `after`
 * @param {Object} `compiler` Snapdragon compiler instance
 * @return {Function} Returns a function that takes a `node`. Any plugins registered for that `node.type` will be run on the node.
 */

Breakdance.prototype.run = function(type, compiler) {
  var plugins = this.plugins[type];
  return function(node) {
    var fns = plugins[node.type] || [];

    for (var i = 0; i < fns.length; i++) {
      var plugin = fns[i];
      if (typeof plugin !== 'function') {
        var err = new TypeError('expected plugin to be a function:' + plugin);
        err.node = node;
        err.type = type;
        throw err;
      }
      node = plugin.call(compiler, node) || node;
    }
    return node;
  };
};

/**
 * Parses a string of `html` and returns an AST.
 *
 * ```js
 * var breakdance = new Breakdance();
 * var ast = breakdance.parse('<strong>The Freaks Come Out at Night!</strong>');
 * ```
 * @param {String} `html` HTML string
 * @param {Object} `options`
 * @return {Object} Abstract syntax tree
 * @api public
 */

Breakdance.prototype.parse = function(str, options) {
  var opts = defaults(extend({}, this.options, options));
  this.$ = cheerio.load(str.trim(), opts);
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
 * ```js
 * var breakdance = new Breakdance();
 * var ast = breakdance.parse('<strong>The Freaks Come Out at Night!</strong>');
 * var str = breakdance.compile(ast);
 * console.log(str);
 * //=> 'The Freaks Come Out at Night!'
 * ```
 * @param {String} `ast`
 * @param {Object} `options`
 * @return {Object} Returns the AST and compiled markdown string on the `.output` property, in case you need the object for post-processing.
 * @api public
 */

Breakdance.prototype.compile = function(ast, options) {
  if (typeof ast === 'string') {
    throw new TypeError('Breakdance#compile expects an AST (try render instead)');
  }

  this.ast = typeof ast === 'string' ? this.parse(ast, opts) : ast;
  var opts = this.compiler.options = extend({}, this.options, options);

  if (opts.before) {
    this.before(opts.before);
  }

  if (opts.after) {
    this.after(opts.after);
  }

  this.compiler.plugins = this.plugins;
  this.compiler.use(compiler(this, opts));

  for (var i = 0; i < this.plugins.fns.length; i++) {
    this.plugins.fns[i].call(this, this);
  }

  var handlers = extend({}, this.plugins.handlers, opts.handlers);
  for (var key in handlers) {
    if (handlers.hasOwnProperty(key)) {
      this.compiler.set(key, handlers[key]);
    }
  }

  return this.compiler.compile(this.ast, opts);
};

/**
 * Converts a string of HTML to markdown with the specified `options`. Wraps
 * the [parse](#parse) and [compile](#compile) to simplify converting HTML to markdown
 * with a single function call.
 *
 * ```js
 * var breakdance = new Breakdance();
 * var str = breakdance.render('<strong>The Freaks Come Out at Night!</strong>');
 * console.log(str);
 * //=> 'The Freaks Come Out at Night!'
 * ```
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
 * Getter for getting the `breakdance.compiler`.
 */

Object.defineProperty(Breakdance.prototype, 'compiler', {
  configurable: true,
  set: function(val) {
    this.cache.compiler = val;
  },
  get: function() {
    var compiler = this.cache.compiler || this.snapdragon.compiler;

    /**
     * Prime the state
     */

    compiler.state = {
      blockquotes: 0,
      title: '',
      indent: '',
      tags: {},
      links: {},
      inside: {},
      tables: [],
      lists: [],
      nodes: [],
      types: [],
      pre: [],
      ol: []
    };

    return compiler;
  }
});

/**
 * Expose `Breakdance`
 * @type {Constructor}
 */

module.exports = Breakdance;
