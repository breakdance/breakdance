'use strict';

const isEqual = require('./support/is-equal');

describe('code', function() {
  describe('<code>', function() {
    it('should convert code tags to markdown', () => isEqual('code'));

    it('should use double backticks when a backticks exist in code', function() {
      isEqual.inline('<code>foo`bar</code>', '``foo`bar``\n');
      isEqual.inline('<code>foo`a`b`bar</code>', '``foo`a`b`bar``\n');
    });

    it('should not render empty code tags', function() {
      isEqual.inline('foo<code></code> bar', 'foo bar\n');
    });
  });

  describe('gfm', function() {
    it('should convert gfm tags to markdown', () => isEqual('gfm'));
  });
});
