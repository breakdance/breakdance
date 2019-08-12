'use strict';

const isEqual = require('./support/is-equal');
const bd = require('..');

describe('pre', function() {
  it('should convert pre tags to markdown', () => {
    isEqual('pre');
    isEqual('pre-multiple');
    isEqual('pre-html');
  });

  describe('options.literalPre', function() {
    it('should not modify the contents of gfm', () => {
      isEqual('pre-gfm-html', { literalPre: true });
    });
  });
});
