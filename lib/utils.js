'use strict';

var url = require('url');
var typeOf = require('kind-of');
var wordRegex = require('word-regex');
var isSelfClosing = require('is-self-closing')
var diacritics = require('diacritics-map');
var stripColor = require('strip-color');
var util = require('snapdragon-util');

/**
 * Expose `utils`
 */

var utils = module.exports;

/**
 * Wrapper for creating the visitors for compiling a tag with open and
 * close nodes in a single function call.
 */

utils.block = function(open, close, visitor, state) {
  if (typeof visitor !== 'function') {
    state = visitor;
    visitor = null;
  }

  return function(node, nodes, i) {
    if (util.isEmptyNodes(node, open)) return;
    var type = node.type;
    var isVoid = isSelfClosing(node.type);

    if (!isVoid && !this.compilers.hasOwnProperty(type + '.open')) {
      this.set(type + '.open', util.noop);
      this.set(type + '.close', util.noop);
    }

    // convert headings to bold see: edge-cases.md - headings #1
    if (/^h[1-6]$/.test(type)) {
      if (util.isInside(state, node, ['a', 'li', 'table'])) {
        node.type = 'strong';
        open = '**';
        close = '**';
      }
    }

    if (typeof visitor === 'function') {
      visitor.call(this, node, nodes, i);

      // allow visitor to override opening tag
      if (node.open) {
        open = node.open;
      }
    }

    if (!/^(sup|sub)$/.test(node.type) && /[a-z0-9]/i.test(this.output.slice(-1))) {
      this.emit(' ');
    }

    this.emit(open, node);
    this.mapVisit(node);
    this.emit(close, node);
  };
};

/**
 * Stringify an object of attributes.
 */

utils.toAttribs = function(attribs, names) {
  if (!attribs) return '';
  var attr = '';

  for (var key in attribs) {
    if (attribs.hasOwnProperty(key)) {
      if (names && names.indexOf(key) === -1) {
        continue;
      }

      var val = attribs[key];
      attr = ' ' + key;

      if (typeof val !== 'boolean') {
        attr += '="' + val + '"';
      }
    }
  }
  return attr;
};

/**
 * Attempt to get a "language" value from the given attributes.
 * Used with code/pre tags
 */

utils.getLang = function(attribs) {
  var lang = attribs['data-lang'];
  if (!lang && attribs.class && /lang/.test(attribs.class)) {
    lang = attribs.class.replace(/^lang(uage)?-/, '');
  }
  return lang;
};

/**
 * Get the "title" from a markdown link
 */

utils.getTitle = function(str) {
  if (/^\[[^\]]+\]\(/.test(str)) {
    var m = /^\[([^\]]+)\]/.exec(str);
    if (m) return m[1];
  }
  return str;
};

/**
 * Helper for handling spacing around emphasis tags.
 */

utils.emphasis = function(openTag) {
  return function(node) {
    if (this.options.whitespace === false) {
      return this.mapVisit(node);
    }

    if (util.isEmptyNodes(node, openTag)) return;
    if (/(^|\w)$/.test(this.output)) this.emit(' ');
    this.mapVisit(node);
  };
};

/**
 * Slugify the url part of a markdown link.
 *
 * @name  options.slugify
 * @param  {String} `str` The string to slugify
 * @param  {Object} `options` Pass a custom slugify function on `options.slugify`
 * @return {String}
 */

utils.slugify = function(str, options) {
  options = options || {};
  if (options.slugify === false) return str;
  if (typeof options.slugify === 'function') {
    return options.slugify(str, options);
  }

  str = utils.getTitle(str);
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

/**
 * Replace diacritics in the given string with english language
 * equivalents. This is necessary for slugifying headings to
 * be conformant with how github slugifies headings.
 */

function replaceDiacritics(str) {
  return str.replace(/[À-ž]/g, function(ch) {
    return diacritics[ch] || ch;
  });
}

/**
 * Resolve the "src" or "href" attribute on the given `node`.
 */

utils.resolveLink = function(node, key, state, ast, options) {
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
    link = '#' + utils.slugify(link.slice(1), options);
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

/**
 * Generate reference links
 */

utils.generateReflinks = function(compiler, state) {
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
        compiler.output += '\n\n';
      }
      compiler.output += '[' + key + '-' + i + ']: ' + links[i] + '\n';
    }
  }
  return compiler.output;
};

/**
 * Return true if `val` is an object
 */

utils.isObject = function(val) {
  return typeOf(val) === 'object';
};

/**
 * Return true if `val` matches the given regex string.
 */

utils.isMatch = function isMatch(str, val) {
  return utils.toRegex(val).test(str);
};

utils.toRegex = function toRegex(val) {
  return new RegExp('^(?:' + utils.stringify(val).split(',').join('|') + '$');
};

/**
 * Cast `val` to an array
 */

utils.arrayify = function arrayify(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
};

/**
 * String utils
 */

utils.isWrappingChar = function(str) {
  return /[*_"'`]/.test(str);
};

utils.isStartingChar = function(str) {
  return /[$@#~]/.test(str) || utils.isOpeningChar(str);
};

utils.isOpeningChar = function(str) {
  return /[<([{]/.test(str);
};

utils.isClosingChar = function(str) {
  return /[\])}>]/.test(str);
};

utils.isEndingChar = function(str) {
  return /[%!?.,;:]/.test(str) || utils.isClosingChar(str);
};

utils.isWordChar = function(str) {
  return wordRegex().test(str);
};

utils.isSpecialChar = function(str) {
  return /[‘’“”،、‹›«»†‡°″¡¿※#№\‱¶′‴§‖¦]/.test(str);
};

utils.isOperator = function(str) {
  return /[=+÷×‰&^~|]/.test(str);
};

utils.isSeparator = function(str) {
  return utils.isLooseSeparator(str) || utils.isTightSeparator(str);
};

utils.isTightSeparator = function(str) {
  return /[-‒−–—―\\\/⁄]/.test(str);
};

utils.isLooseSeparator = function(str) {
  return /[\s·•|]/.test(str);
};

utils.stringify = function stringify(val) {
  return utils.arrayify(val).join(',');
};

utils.trimLeft = function(str) {
  return str.replace(/^[ \t]+/, '');
};

utils.trimRight = function(str) {
  return str.replace(/[ \t]+$/, '');
};

utils.stripNewlines = function(str) {
  return str.replace(/\n/g, '');
};

/**
 * Condense newlines in the given string.
 * @param {String} `str`
 * @return {*}
 */

utils.condense = function(str) {
  return str.split('\n').map(function(line) {
    return line.trim() === '' ? '' : line;
  })
  .join('\n').replace(/\n{3,}/g, '\n\n');
};
