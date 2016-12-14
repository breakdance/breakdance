'use strict';

var define = require('define-property');
var helpers = require('../helpers');
var utils = require('../utils');

module.exports = {
  // domain: 'http://wikipedia.com/',
  reflinks: true,
  preprocess: function fn(node, prev, $) {
    var attribs = node.attribs || {};
    var href = attribs.href || '';
    if (node.name === 'span' && attribs.class === 'tocnumber') {
      node.children = [];
    }
    if (node.name === 'a' && href && href.charAt(0) === '#') {
      node.attribs.href = helpers.formatAnchor(href);
    }
  },
  process: function fn(node, prev, $) {
    var attribs = node.attribs || {};
    var id = attribs.id;

    if (node.type === 'ul' && helpers.isType(node.parent, 'td')) {
      node.type = 'span';

      helpers.visit(node, function(tok) {
        if (tok.type === 'text' && tok.val.trim() === '') {
          tok.val = '';
          return tok;
        }

        if (tok.type === 'li') {
          tok.type = 'span';

          var t = tok.nodes[1];
          if (t.type === 'text' && t.val.trim() === '') {
            t.val = ' · ';
          } else {

            var text = {type: 'text', val: ' · '};
            var open = tok.nodes[0];

            define(text, 'parent', tok);
            define(text, 'prev', {});
            tok.nodes.splice(1, 0, text);
            define(text, 'next', open);
            define(open, 'prev', text);
          }
        } else if (tok.type === 'ul.open' || tok.type === 'li.open') {
          tok.type = 'span.open';
        } else if (tok.type === 'ul.close' || tok.type === 'li.close') {
          tok.type = 'span.close';
        }

        return tok;
      });

    } else if (node.type === 'a') {
      var tok = node.nodes[1];
      if (tok.type === 'text' && tok.val === 'edit') {
        helpers.removeAnchor(node);
      }

    } else if (node.type === 'li' && /^cite_note/.test(id)) {
      helpers.pushAnchor(node, attribs);

    } else if (node.type === 'sup' && attribs.class === 'reference') {
      var note = utils.pickFirst(node.nodes, 'a');
      if (note.attribs.href && /^#cite/.test(note.attribs.href)) {
        note.attribs.name = helpers.formatAnchor(note.attribs.href).slice(1);
      }
      if (node.attribs.id) {
        node.attribs.name = helpers.formatAnchor(node.attribs.id);
      }
      helpers.pushAnchor(node, attribs);
    }
  }
};
