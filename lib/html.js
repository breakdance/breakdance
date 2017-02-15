'use strict';

var util = require('snapdragon-util');
var Node = require('snapdragon-node');
var isSelfClosing = require('is-self-closing');
var detectIndent = require('detect-indent');
var stripAttr = require('strip-attributes');
var define = require('define-property');
var unescape = require('unescape');

/**
 * This function is passed on `options.preprocess` to
 * snapdragon-cheerio (the library that creates the AST for this lib).
 */

exports.preprocess = function(options) {
  return function($, node, ast, opts) {
    // if the user defined a preprocess function
    // on the options, run it now
    if (typeof options.preprocess === 'function') {
      node = options.preprocess.apply(null, arguments) || node;
    }

    // if `node.process` was set to false by an `options.preprocess`
    // function, don't process the node
    if (node.process === false) {
      return node;
    }

    if (node.type === 'tag') {
      if (node.name === 'title') {
        node.val = node.data = $(node).text().trim();
      }

      if (node.name === 'code') {
        node.html = unescape($(node).html());
      }

      if ((node.name === 'table' || node.name === 'dl')) {
        node.html = stripAttr($.html(node));
        var indent = detectIndent(node.html).indent;
        var last = node.html.split('\n').pop();
        if (last.slice(0, indent.length) === indent) {
          node.html = node.html.replace(new RegExp('^' + indent, 'gm'), '');
        }
      }

      if (node.name === 'li') {
        $('p', node).each(function(i, ele) {
          var str = $(this).html().trim();
          if (i > 0) str = ' ' + str;
          var span = $('<span></span>').html(str);
          $(this).replaceWith(span);
        });
      }

      if ((node.name === 'ul' || node.name === 'ol' || node.name === 'li')) {
        node.text = $(node).text();
        if (!node.text.trim()) {
          util.toNoop(node, true);
        }
      }

      if (node.name === 'pre') {
        node.outer = stripAttr($.html(node));
        var html = $(node).html();

        if (html) {
          var code = $('code', node) || {};
          var codeInner = opts.literalPre === true
            ? code.html && code.html()
            : code.text && code.text();

          var text = codeInner || $(node).text();

          node.gfm = true;
          node.text = '\n' + text.trim() + '\n';
          node.html = '\n' + (code ? text : html).trim() + '\n';
          node.attr = (code.attr && code.attr());
        } else {
          var tok = { type: 'text', val: html };
          node.nodes = [tok];
          define(tok, 'parent', node);
          if (!isSelfClosing(node.type)) {
            util.wrapNodes(node, Node);
          }
        }
      } else if (node.name === 'code') {
        node.html = $(node).html();
        node.text = $(node).text();
      }
    }

    if (opts.literalPre && node.type === 'pre') {
      node.normalize = false;
    }

    if (node.name === 'link' && node.attribs && node.attribs.rel === 'canonical') {
      ast.canonical = node.attribs.href;
    }
    return node;
  };
};
