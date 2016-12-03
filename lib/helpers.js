'use strict';

var url = require('url');
var stripColor = require('strip-color');
var define = require('define-property');
var get = require('get-value');

/**
 * Expose `helpers`
 */

var helpers = module.exports;

/**
 * Push an anchor node onto the `nodes` array of the given `node`
 *
 * @param {Object} `node`
 * @param {Object} `attribs`
 * @return {Object} Returns the created anchor node
 * @api public
 */

helpers.pushAnchor = function(node, attribs) {
  attribs = attribs || {};
  var id = attribs.id || '';
  var text = {type: 'text', val: ''};
  var a = {
    type: 'a',
    attribs: {name: helpers.formatAnchor(id)},
    nodes: [text]
  };
  define(text, 'parent', node);
  define(text, 'prev', {});
  define(text, 'next', a);
  helpers.wrapNodes(a);
  node.nodes.splice(1, 0, a);
  return a;
};

helpers.formatAnchor = function(href) {
  var prefix = '';
  if (href.charAt(0) === '#') {
    prefix = '#';
    href = href.slice(1);
  }
  return prefix + helpers.slugify(href.split('_').join(' '));
};

helpers.removeAnchor = function(node) {
  var nodes = node.parent.nodes;
  var i = 0;
  for (; i < nodes.length; i++) {
    if (nodes[i].type === 'a') {
      break;
    }
  }
  nodes.splice(i - 1, 3);
};

helpers.hasVal = function(node, prop, val) {
  var res = get(node, prop) || '';
  if (res === val) {
    return true;
  }
  return res.split(' ').indexOf(val) > -1;
};

helpers.getLang = function(attribs) {
  var lang = attribs['data-lang'];
  if (!lang && attribs.class && /lang/.test(attribs.class)) {
    lang = attribs.class.replace(/^lang(uage)?-/, '');
  }
  return lang;
};

helpers.createAttribs = function(attribs) {
  var str = '';
  for (var key in attribs) {
    if (attribs[key]) str += ' ' + key + '="' + attribs[key] + '"';
  }
  return str;
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

helpers.compile = function(node) {
  this.mapVisit(node.nodes);
};

helpers.identity = function(node) {
  this.emit(node.val || '', node);
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
  node = fn(node) || node;
  var tok = node.nodes ? helpers.mapVisit(node.nodes, fn) : fn(node);
  return tok || node;
};

/**
 * Map visit over array of `nodes`.
 */

helpers.mapVisit = function(nodes, fn) {
  var len = nodes.length;
  var idx = -1;
  while (++idx < len) {
    helpers.visit(nodes[idx], fn);
  }
  return nodes;
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
  if (!prefix || !/^</.test(prefix)) return false;
  var len = node.nodes.length;
  var first = node.nodes[1];
  return len === 2 || (len === 3 && first.type === 'text' && !first.val.trim());
};

/**
 * Return true if inside the current `type`
 */

helpers.isInside = function(state, type) {
  var arr = helpers.getValue(state.tags, type);
  if (arr) {
    return arr.length > 0;
  }
  return false;
};

/**
 * Return true if node is for an "open" tag
 */

helpers.isOpen = function(node) {
  return node.type.slice(-5) === '.open';
};

/**
 * Return true if node is for a "close" tag
 */

helpers.isClose = function(node) {
  return node.type.slice(-6) === '.close';
};

/**
 * Return true if node is the given `type`
 */

helpers.isType = function(node, type) {
  if (Array.isArray(type)) {
    return type.some(function(t) {
      return helpers.isType(node, t);
    });
  }
  return node ? node.type === type : false;
};

/**
 * Set a `nextVal` property on the given `node`
 */

helpers.nextVal = function(node) {
  node.nextVal = '';

  if (node.next && node.next.type === 'text') {
    node.nextVal = node.next.val || '';
    return;
  }

  if (node.next && node.next.nodes) {
    var len = node.next.nodes.length;
    var idx = -1;
    while (++idx < len) {
      var tok = node.next.nodes[idx];
      var val = helpers.nextVal(tok);
      if (val) {
        node.nextVal = val;
        return;
      }
    }
  }
};

helpers.pushTag = function(state, node) {
  var type = node.parent.type;
  state.tags[type] = state.tags[type] || [];
  state.tags[type].push(node.parent);
};

helpers.popTag = function(state, node) {
  state.tags[node.parent.type].pop();
};

helpers.getValue = function(obj, prop) {
  if (typeof prop === 'string') {
    return obj[prop];
  }
  if (prop instanceof RegExp) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key) && prop.test(key)) {
        return obj[key];
      }
    }
  }
  return null;
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
  str = str.split(/ /).join('-');
  str = str.split(/\t/).join('--');
  str = str.split(/[|$&`~=\\\/@+*!?({[\]})<>=.,;:'"^]/).join('');
  str = str.split(/[。？！，、；：“”【】（）〔〕［］﹃﹄“ ”‘’﹁﹂—…－～《》〈〉「」]/).join('');
  return str;
};

/**
 * Get the last element from `array`
 * @param {Array} `array`
 * @return {*}
 */

helpers.resolveLink = function(node, key, state, options) {
  state.links[key] = state.links[key] || [];
  var attribs = (node.type === 'img' ? node.attribs : node.parent.attribs) || {};
  var link = (attribs[key] || '').trim();
  var alt = attribs.alt || '';

  // <img> is self-closing
  var isAnchor = node.parent.type === 'a';
  var isImage = node.type === 'img';

  if (typeof options.url === 'function') {
    link = options.url(node, key, state);

  } else if (link && options.domain && !/(?:^#|:\/\/)/.test(link)) {
    link = url.resolve(options.domain, link);

  } else if (link === '#' && state.title) {
    link = '#' + helpers.slugify(state.title, options);
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
    link = '[' + key + '-' + idx + ']';
  } else {
    link = '(' + link + text + ')';
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
