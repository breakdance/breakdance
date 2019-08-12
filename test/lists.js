'use strict';

const isEqual = require('./support/is-equal');

describe('lists', () => {
  describe('li', () => {
    it('should convert a list item to markdown', () => {
      isEqual.inline('<li>Lorem ipsum dolor sit amet</li>', '- Lorem ipsum dolor sit amet\n');
    });
  });

  describe('ul', () => {
    it('should convert an unordered list to markdown', () => {
      isEqual.inline('<ul><li>Lorem ipsum dolor sit amet</li></ul>', '- Lorem ipsum dolor sit amet\n');
      isEqual('list-ul');
    });

    it('should convert an unordered list with attributes to markdown', () => {
      isEqual('list-ul-attributes', 'list-ul-attributes');
    });

    it('should convert an unordered list item with an anchor', () => {
      isEqual('list-ul-anchor');
    });

    it('should convert an unordered list item with anchor and code tags', () => {
      isEqual('list-ul-anchor-code');
      const fixture = `
        <ul>
          <li><a href="#foo">HTML <code> [hidden] </code> attribute</a></li>
        </ul>`;

      isEqual.inline(fixture, '- [HTML ` [hidden] ` attribute](#foo)');
    });

    it('should convert an unordered list with code', () => {
      isEqual('list-li-code');
    });

    it('should convert an unordered list with anchors to markdown', () => {
      isEqual('list-ul-anchors');
    });

    it('should handle text nodes in complex nested lists', () => {
      isEqual('list-nav-nested');
    });
  });

  describe('ol', () => {
    let opts = { keepListItemNumbers: true };
    it('should convert an ordered list to markdown', () => {
      isEqual('list-ol', opts);
    });

    it('should convert an ordered list with attributes to markdown', () => {
      isEqual('list-ol-attributes', opts);
    });

    it('should convert nested lists to markdown', () => {
      isEqual('list-nested', opts);
    });

    it('should convert multiple nested lists separated by text to markdown', () => {
      isEqual('list-nested-text', opts);
    });
  });
});
