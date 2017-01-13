'use strict';

var helpers = require('./helpers');

module.exports = {
  preprocess: function(node, prev, $) {
    var attribs = node.attribs || {};
    var href = attribs.href || '';

    if (node.name === 'a' && href && href.charAt(0) === '#') {
      node.attribs.href = helpers.formatAnchor(href);
    }

    switch (attribs.class) {
      case 'article-meta':
      case 'nav-sec':
      case 'main-nav':
      case 'document-head':
      case 'main-nav-search':
      case 'nav-search-link':
      case 'page-buttons':
      case 'search-wrap':
      case 'title toggler':
      case 'wiki-block contributors':
        toTextNode(node);
        break;
    }

    switch (attribs.id) {
      case 'nav-access':
      case 'main-header':
        toTextNode(node);
        break;
    }
    return node;
  }
};

function toTextNode(node) {
  node.attribs = {};
  node.nodes = [];
  node.type = 'text';
  node.val = '';
}
