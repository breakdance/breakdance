'use strict';

const isEqual = require('./support/is-equal');

describe('integration - header', function() {
  it('should convert headers with nav and lists to markdown', function() {
    isEqual('header1');
    isEqual('header2');
  });
});
