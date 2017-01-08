'use strict';

var merge = require('mixin-deep');
var isWhitespace = require('is-whitespace');
var helpers = require('../helpers');
var helpers = require('../helpers');
var utils = require('../utils');

function isClosingChar(str) {
  return /[)\]]/.test(str);
}

module.exports = function(options, state) {
  var last;

  return function(node, nodes, i) {
    var opts = merge({}, this.options, options);

    if (helpers.isInside(state, node, ['code', 'pre'])) {
      return this.emit(node.val, node);
    }

    if (typeof opts.text === 'function') {
      return opts.text.apply(this, arguments);

    } else if (opts.text === false || opts.normalizeWhitespace === false) {
      return this.emit(node.val, node);
    }

    var parent = node.parent;
    var prevChar = this.output.slice(-1);
    var val = node.val || '';

    var leadingSpace = /^\s+/g.exec(val);
    var trailingSpace = /\s+$/g.exec(val);
    var leading = leadingSpace ? leadingSpace[1] : '';
    var trailing = trailingSpace ? trailingSpace[2] : '';

    // if the next tag is <(br|hr)>, we can probably
    // safely remove trailing whitespace characters
    if (helpers.isType(this.next, ['hr', 'br'])) {
      val = utils.trimRight(val);
    }

    // if the previous tag was <(br|hr)>, we can probably
    // safely remove leading whitespace characters
    if (helpers.isType(this.prev, ['hr', 'br'])) {
      val = utils.trimLeft(val);
    }

    if (val.trim() && isClosingChar(prevChar)) {
      val = ' ' + utils.trimRight(val);
    }

    if (helpers.isInside(state, node, /^(a|em|strong)$/)) {
      val = val.trim();
      // console.log('parent:', node.parent)
      // console.log('prev:', this.prev);
      // console.log('next:', this.next);
      // console.log('node:', node);
      // console.log('----');
    }

    if (/^a$/.test(this.prev.type)) {

    // console.log('prev:', this.prev);
    // console.log('next:', this.next);
    // console.log('----');

    } else {
      // console.log('node:', node);

    }

    // if (val && !node.parent.nodes) {
    //   val = val.replace(/^(\n)?[ \t]+/, '$1');
    //   val = val.replace(/\s+$/, '');
    // }

    // if (/[ \t]/.test(this.output.slice(-1))) {
    //   this.output = utils.trimRight(this.output);
    //   val = ' ' + utils.trimLeft(val);
    // }

    // val = val.replace(/(\n)[ \t]+/g, '$1');

    // var noNewlines = ['li', 'ul', 'ol', 'th', 'td'];

    // if (helpers.isInside(state, node, noNewlines)) {
    //   if (!node.val.trim()) return;
    //   node.val = node.val.replace(/\n/g, '');
    // }

    // var parent = node.parent;
    // var prev = nodes[i - 1].type;
    // var prevChar = this.output.slice(-1);
    // var val = node.val ? node.val.trim() : '';

    // if (/[-a-zA-Z_.]/.test(prevChar)) {
    //   // check if `node.val` is just whitespace inside the following tags
    //   if (helpers.isInside(state, node, noNewlines) && !node.val.trim()) {
    //     return this.emit('', node);
    //   }
    //   return this.emit(node.val, node);
    // }

    // // if (prevChar === ')' && val && prev && prev.type === 'a') {
    // //   this.emit(' ');
    // // }

    // if (utils.isPunctuation(val, true)) {
    //   val = val.replace(/^(\n*)([ \t]+)/, '$1');
    //   val = val.replace(/([ \t]+)(\n*)$/, '$2');
    //   return this.emit(val, node);
    // }

    // if (/^(h[1-6]|dd|dt|dl)$/.test(node.parent.type)) {
    //   return this.emit(val.trim(), node);
    // }

    // var inline = ['a', 'b', 'i', 'caption', 'em', 'strong', 'title', 'string'];
    // var tags = [
    //   'a',
    //   'address',
    //   'b',
    //   'blockquote',
    //   'caption',
    //   'div',
    //   'em',
    //   'h1',
    //   'h2',
    //   'h3',
    //   'h4',
    //   'h5',
    //   'h6',
    //   'i',
    //   'li',
    //   'string', // <= root
    //   'strong',
    //   'table',
    //   'tbody',
    //   'td',
    //   'tfoot',
    //   'th',
    //   'thead',
    //   'title',
    //   'tr'
    // ];

    // if (helpers.isType(parent, tags) || utils.isSelfClosing(parent)) {
    //   if (/\s$/.test(this.output) || inline.indexOf(parent.type) !== -1) {

    //     // brittle, this needs to check for other types
    //     if (prev === 'code') {
    //       val = ' ' + val;
    //     }
    //   } else {
    //     val =  node.val
    //       .replace(/\s+$/, '')
    //       .replace(/\n/g, '')
    //   }
    // }

    // if (parent.type === 'p' && parent.parent.type !== 'li') {
    //   val = val.replace(/^(\n+)([ \t]+)/, '$1');
    //   val = val.replace(/(?:[ \t]+)(\n+)$/, '$1');
    // }

    // last = val;
    return this.emit(val, node);
  };
};

