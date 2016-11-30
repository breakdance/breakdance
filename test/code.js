'use strict';

var isEqual = require('./support/is-equal');

describe('code', function() {
  describe('<code>', function() {
    it('should convert code tags to markdown', function() {
      isEqual('code');
    });
  });

  describe('<pre>', function() {
    it('should convert pre tags to markdown', function() {
      isEqual('pre');
      isEqual('pre-multiple');
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
