'use strict';

var isEqual = require('./support/is-equal');
var bd = require('..');

describe('pre', function() {
  it('should convert pre tags to markdown', function() {
    isEqual('pre');
    isEqual('pre-multiple');
    isEqual('pre-html');
  });

  describe('options.literalPre', function() {
    it('should not modify the contents of gfm', function() {
      isEqual('gfm-html', {literalPre: true});
    });
  });
});
