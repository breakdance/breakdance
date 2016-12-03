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

  describe('<pre>', function() {
    it('should convert pre tags to markdown', function() {
      isEqual('pre');
      isEqual('pre-multiple');
      isEqual('pre-html');
    });
  });

  describe('gfm', function() {
    it('should convert gfm tags to markdown', function() {
      isEqual('gfm');
    });
  });

  describe('options.literalPre', function() {
    it('should not modify the contents of gfm', function() {
      isEqual('gfm-html', {literalPre: true});
    });
  });
});
