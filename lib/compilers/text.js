'use strict';

var helpers = require('../helpers');
var utils = require('../utils');
var last;

module.exports = function(state) {
  return function(node, nodes, i) {
    if (!node.val.trim()) return;
    if (/<!--\s*\/\*\s*Font\s*Definitions/.test(node.val)) return;
    if (typeof this.options.text === 'function') {
      return this.options.text.apply(this, arguments);
    }

    var val = node.val || '';
    if (utils.isPunctuation(val.trim())) {
      val = val.replace(/^(\n*)([ \t]+)/, '$1');
      val = val.replace(/([ \t]+)(\n*)$/, '$2');
      return this.emit(val, node);
    }

    var parent = node.parent;
    var prev = node.prev && node.prev.type || '';
    var next = node.next && node.next.type || '';
    var inline = ['a', 'b', 'i', 'caption', 'em', 'strong', 'title', 'string'];
    var tags = [
      'a',
      'b',
      'blockquote',
      'caption',
      'div',
      'em',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'i',
      'li',
      'string', // <= root
      'strong',
      'table',
      'tbody',
      'td',
      'tfoot',
      'th',
      'thead',
      'title',
      'tr'
    ];

    if (helpers.isType(parent, tags) || utils.selfClosing(parent)) {
      if (/\s$/.test(this.output) || inline.indexOf(parent.type) !== -1) {
        val = val.trim();

        // brittle, this needs to check for other types
        if (nodes[i - 1].type === 'code') {
          val = ' ' + val;
        }
      }
    }

    if (/^h[1-6]$/.test(parent.type)) {
      val = val.trim();
    }

    if (parent.type === 'p') {
      val = val.replace(/^(\n+)([ \t]+)/, '$1');
      val = val.replace(/([ \t]+)(\n+)$/, '$2');
    }

    last = val;
    return this.emit(val, node);
  };
};

