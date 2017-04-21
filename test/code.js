'use strict';

var isEqual = require('./support/is-equal');

describe('code', function() {
  describe('<code>', function() {
    it('should convert code tags to markdown', function() {
      isEqual('code');
    });

    it('should use double backticks when a backticks exist in code', function() {
      isEqual.inline('<code>foo`bar</code>', '``foo`bar``\n');
      isEqual.inline('<code>foo`a`b`bar</code>', '``foo`a`b`bar``\n');
    });
  });

  describe('gfm', function() {
    it('should convert gfm tags to markdown', function() {
      isEqual('gfm');
    });
  });
});
