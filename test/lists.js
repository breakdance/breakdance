'use strict';

var isEqual = require('./support/is-equal');
var plugins = require('../lib/plugins/');

describe('lists', function() {
  describe('li', function() {
    it('should convert a list item to markdown', function() {
      isEqual.inline('<li>Lorem ipsum dolor sit amet</li>', 'Lorem ipsum dolor sit amet\n');
    });
  });

  describe('ul', function() {
    it('should convert an unordered list to markdown', function() {
      isEqual.inline('<ul><li>Lorem ipsum dolor sit amet</li></ul>', '* Lorem ipsum dolor sit amet\n');
      isEqual('list-ul');
    });

    it('should convert an unordered list with attributes to markdown', function() {
      isEqual('list-ul-attributes', 'list-ul-attributes');
    });

    it('should convert an unordered list item with an anchor', function() {
      isEqual('list-ul-anchor');
    });

    it('should convert an unordered list item with an anchor and code tag', function() {
      isEqual('list-ul-anchor-code');
    });

    it('should convert an unordered list with anchors to markdown', function() {
      isEqual('list-ul-anchors');
    });

    it('should handle text nodes in complex nested lists', function() {
      isEqual('list-nav-nested', plugins.mozilla);
    });
  });

  describe('ol', function() {
    it('should convert an ordered list to markdown', function() {
      isEqual('list-ol');
    });

    it('should convert an ordered list with attributes to markdown', function() {
      isEqual('list-ol-attributes', 'list-ol-attributes');
    });

    it('should convert nested lists to markdown', function() {
      isEqual('list-nested', 'list-nested');
    });

    it('should convert multiple nested lists separated by text to markdown', function() {
      isEqual('list-nested-text', 'list-nested-text');
    });
  });
});
