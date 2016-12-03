'use strict';

var isEqual = require('./support/is-equal');

describe('quotes', function() {
  describe('blockquotes', function() {
    it('should convert a blockquote to markdown', function() {
      isEqual.inline('<blockquote> Lorem ipsum. </blockquote>', '> Lorem ipsum.\n');
    });

    it('should convert a blockquote with nested `<p>` tag', function() {
      isEqual.inline('<blockquote><p>Lorem ipsum.</p></blockquote>', '> Lorem ipsum.\n');
    });

    it('should convert nested blockquotes to markdown', function() {
      isEqual('blockquote-markup');
      isEqual('blockquote-nested');
    });
  });
});
