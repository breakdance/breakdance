'use strict';

var helpers = require('../helpers');
var utils = require('../utils');

module.exports = function(options) {
  var last;

  return function(node, nodes, i) {
    if (!node.val.trim()) return;
    if (/<!--\s*\/\*\s*Font\s*Definitions/.test(node.val)) return;
    if (typeof this.options.text === 'function') {
      return this.options.text.apply(this, arguments);
    }

    var val = node.val || '';
    if (utils.isPunctuation(val.trim(), true)) {
      val = val.replace(/^(\n*)([ \t]+)/, '$1');
      val = val.replace(/([ \t]+)(\n*)$/, '$2');
      return this.emit(val, node);
    }

    if (/^(h[1-6]|dd|dt|dl)$/.test(node.parent.type)) {
      return this.emit(val.trim(), node);
    }

    var parent = node.parent;
    var inline = ['a', 'b', 'i', 'caption', 'em', 'strong', 'title', 'string'];
    var tags = [
      'a',
      'address',
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
        var prev = nodes[i - 1].type;
        if (prev === 'code') {
          val = ' ' + val;
        }
      } else {
        val = val.replace(/\n/g, '');
      }
    }

    if (parent.type === 'p') {
      if (parent.parent.type === 'li') {
        val = val.trim();
      } else {
        val = val.replace(/^(\n+)([ \t]+)/, '$1');
        val = val.replace(/(?:[ \t]+)(\n+)$/, '$1');
      }
    }

    last = val;
    return this.emit(val, node);
  };
};

