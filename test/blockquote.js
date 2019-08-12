'use strict';

const isEqual = require('./support/is-equal');

describe('blockquotes', function() {
  it('should convert a blockquote to markdown', function() {
    isEqual.inline('<blockquote> Lorem ipsum. </blockquote>', '> Lorem ipsum.\n');
  });

  it('should convert a blockquote with nested `<p>` tag', function() {
    isEqual.inline('<blockquote><p>Lorem ipsum.</p></blockquote>', '> Lorem ipsum.\n');
  });

  it('should convert a blockquote with nested `<strong>` tag', function() {
    isEqual.inline('<blockquote>Foo <strong>Lorem ipsum</strong> bar.</blockquote>', '> Foo **Lorem ipsum** bar.\n');
  });

  it('should convert nested blockquotes to markdown', function() {
    isEqual('blockquote-markup');
    isEqual('blockquote-nested');
  });
});
