'use strict';

var url = require('url');
var typeOf = require('kind-of');
var diacritics = require('diacritics-map');
var stripColor = require('strip-color');
var define = require('define-property');

/**
 * Expose `helpers`
 */

var helpers = module.exports;

/**
 * Return true if the given `node` is for a self-closing tag
 */

helpers.isSelfClosing = require('is-self-closing');

helpers.block = function(prefix, suffix, visitor, state) {
  if (typeof visitor !== 'function') {
    state = visitor;
    visitor = null;
  }

  return function(node, nodes, i) {
    if (helpers.isEmptyNodes(node, prefix)) return;
    var type = node.type;
    var isVoid = helpers.isSelfClosing(node.type);

    if (!isVoid && !this.compilers.hasOwnProperty(type + '.open')) {
      this.set(type + '.open', helpers.noop);
      this.set(type + '.close', helpers.noop);
    }

    // convert headings to bold see: edge-cases.md - headings #1
    if (/^h[1-6]$/.test(type)) {
      if (helpers.isInside(state, node, ['a', 'li', 'table'])) {
        node.type = 'strong';
        prefix = '**';
        suffix = '**';
      }
    }

    if (typeof visitor === 'function') {
      visitor.call(this, node, nodes, i);
    }

    if (!/^(sup|sub)$/.test(node.type) && /[a-z0-9]/i.test(this.output.slice(-1))) {
      this.emit(' ');
    }

    this.emit(prefix, node);
    this.mapVisit(node);
    this.emit(suffix, node);
  };
};

/**
 * Return the first node from `nodes` of the given `type`
 *
 * ```js
 * breakdance.set('div', function(node) {
 *  var textNode = breakdance.helpers.firstOfType(node.nodes, 'text');
 *  if (textNode) {
 *    // do stuff with text node
 *  }
 * });
 * ```
 * @param {Array} `nodes`
 * @param {String} `type`
 * @return {Object} Returns a node, if found
 * @api public
 */

helpers.firstOfType = function(nodes, type) {
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    if (node.type === type) {
      return node;
    }
  }
};

helpers.getLang = function(attribs) {
  var lang = attribs['data-lang'];
  if (!lang && attribs.class && /lang/.test(attribs.class)) {
    lang = attribs.class.replace(/^lang(uage)?-/, '');
  }
  return lang;
};

helpers.wrapNodes = function(node) {
  if (!node.nodes) return;
  var open = { type: node.type + '.open', val: ''};
  var close = { type: node.type + '.close', val: ''};

  define(open, 'parent', node);
  define(open, 'next', node.nodes[0]);
  define(open, 'prev', null);

  define(close, 'parent', node);
  define(close, 'next', null);
  define(close, 'prev', node.nodes[node.nodes.length - 1]);

  node.nodes.unshift(open);
  node.nodes.push(close);
};

helpers.noop = function(node) {
  this.emit('', node);
};

helpers.emit = function(val) {
  return function(node) {
    this.emit(val, node);
  };
};

/**
 * Visit `node` with the given `fn`
 */

helpers.visit = function(node, fn) {
  if (node.type === 'code' || node.type === 'pre') {
    return node;
  }
  node = fn(node) || node;
  if (node.nodes) {
    helpers.mapVisit(node, fn);
  }
  return node;
};

/**
 * Map visit over array of `nodes`.
 */

helpers.mapVisit = function(node, fn) {
  if (!Array.isArray(node.nodes)) {
    throw new TypeError('.mapVisit: exected nodes to be an array');
  }
  for (var i = 0; i < node.nodes.length; i++) {
    var tok = node.nodes[i];
    define(tok, 'parent', node);
    helpers.visit(tok, fn);
  }
  return node;
};

/**
 * Add the given `node` to the `state.inside` stack for that type.
 */

helpers.addType = function(state, node) {
  var type = node.type.replace(/\.open$/, '');
  if (!state.inside.hasOwnProperty(type)) {
    state.inside[type] = [];
  }
  state.inside[type].push(node);
};

/**
 * Remove the given `node` from the `state.inside` stack for that type.
 */

helpers.removeType = function(state, node) {
  var type = node.type.replace(/\.close$/, '');
  if (!state.inside.hasOwnProperty(type)) {
    throw new Error('expected state.inside.' + type + ' to be an array');
  }
  state.inside[type].pop();
};

/**
 * Return true if `nodes` has the given `type`
 */

helpers.hasType = function(nodes, type) {
  var len = nodes.length;
  var idx = -1;
  while (++idx < len) {
    if (nodes[idx].type === type) {
      return true;
    }
  }
  return false;
};

/**
 * Return true if `node.nodes` contains only open and close nodes,
 * or open, close and an empty text node.
 */

helpers.isEmptyNodes = function(node, prefix) {
  var len = node.nodes.length;
  var first = node.nodes[1];
  if (len === 2) {
    return true;
  }
  if (len === 3) {
    return helpers.isType(first, 'text') && !first.val.trim();
  }
  return false;
};

/**
 * Return true if node is the given `type`
 */

helpers.isType = function(node, type) {
  if (!node) return false;
  if (Array.isArray(type)) {
    let types = type.slice();
    for (let i = 0; i < types.length; i++) {
      if (helpers.isType(node, types[i])) {
        return true;
      }
    }
    return false;
  }

  if (typeof type === 'string') {
    return node.type === type;
  }

  if (typeOf(type) === 'regexp') {
    return type.test(node.type);
  }

  throw new TypeError('isType expects type to be an array, string or regexp');
};

/**
 * Return true if inside the current `type`
 */

helpers.isInsideType = function(state, type) {
  return state.inside.hasOwnProperty(type) && state.inside[type].length > 0;
};

helpers.isInside = function(state, node, type) {
  if (Array.isArray(type)) {
    for (var i = 0; i < type.length; i++) {
      if (helpers.isInside(state, node, type[i])) {
        return true;
      }
    }
    return false;
  }

  var parent = node.parent || {};
  if (typeof type === 'string') {
    return helpers.isInsideType(state, type) || parent.type === type;
  }

  if (typeOf(type) === 'regexp') {
    if (parent.type && type.test(parent.type)) {
      return true;
    }

    for (var key in state) {
      if (state.hasOwnProperty(key) && type.test(key)) {
        if (state[key] === true) {
          return true;
        }
      }
    }
  }
  return false;
};

/**
 * Return true if node is for an "open" tag
 */

helpers.isOpen = function(node) {
  return (node && node.type) ? node.type.slice(-5) === '.open' : false;
};

/**
 * Return true if node is for a "close" tag
 */

helpers.isClose = function(node) {
  return (node && node.type) ? node.type.slice(-6) === '.close' : false;
};

/**
 * Get the "title" from a markdown link
 */

helpers.getTitle = function(str) {
  if (/^\[[^\]]+\]\(/.test(str)) {
    var m = /^\[([^\]]+)\]/.exec(str);
    if (m) return m[1];
  }
  return str;
};

/**
 * Slugify the url part of a markdown link.
 *
 * @name  options.slugify
 * @param  {String} `str` The string to slugify
 * @param  {Object} `options` Pass a custom slugify function on `options.slugify`
 * @return {String}
 * @api public
 */

helpers.slugify = function(str, options) {
  options = options || {};
  if (options.slugify === false) return str;
  if (typeof options.slugify === 'function') {
    return options.slugify(str, options);
  }

  str = helpers.getTitle(str);
  str = stripColor(str);
  str = str.toLowerCase();

  // `.split()` is often (but not always) faster than `.replace()`
  str = str.split(/ /).join('-');
  str = str.split(/\t/).join('--');
  str = str.split(/[|$&`~=\\\/@+*!?({[\]})<>=.,;:'"^]/).join('');
  str = str.split(/[。？！，、；：“”【】（）〔〕［］﹃﹄“ ”‘’﹁﹂—…－～《》〈〉「」]/).join('');
  str = replaceDiacritics(str);
  if (options.num) {
    str += '-' + options.num;
  }
  return str;
};

function replaceDiacritics(str) {
  return str.replace(/[À-ž]/g, function(ch) {
    return diacritics[ch] || ch;
  });
}

/**
 * Get the last element from `array`
 * @param {Array} `array`
 * @return {*}
 */

helpers.resolveLink = function(node, key, state, ast, options) {
  state.links[key] = state.links[key] || [];
  var attribs = node.attribs || node.parent.attribs || {};
  var link = (attribs[key] || '').trim();

  if (typeof options.url === 'function') {
    link = options.url(node, key, state);

  } else if (link && options.domain && !/(?:(?:^#)|(?::?\/\/))/.test(link)) {
    link = url.resolve(options.domain, link);

  } else if (link === '#' && state.title) {
    link = '#' + state.title;

  } else if (link.charAt(0) === '#') {
    link = link.split('_').join('-');
    link = '#' + helpers.slugify(link.slice(1), options);
  }

  var text = '';
  if (attribs.title) {
    text = ' "' + attribs.title.trim() + '"';
  }

  if (link && !/(^#|mailto:)/.test(link) && options.reflinks) {
    var idx = state.links[key].indexOf(link);
    if (link && idx === -1) {
      state.links[key].push(link);
      idx = state.links[key].length - 1;
    }
    link = '[' + key.trim() + '-' + idx + ']';
  } else {
    link = '(' + link.trim() + text + ')';
  }

  return link;
};

helpers.generateReflinks = function(output, state) {
  var keys = Object.keys(state.links);
  var len = keys.length;
  var idx = -1;
  var padded;

  while (++idx < len) {
    var key = keys[idx];
    var links = state.links[key];

    for (var i = 0; i < links.length; i++) {
      // add padding, now that we know that links exist
      if (!padded) {
        padded = true;
        output += '\n\n';
      }
      output += '[' + key + '-' + i + ']: ' + links[i] + '\n';
    }
  }
  return output;
};
