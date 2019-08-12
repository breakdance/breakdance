'use strict';

const isEqual = require('./support/is-equal');

describe('indentation', function() {
  it('should fix indentation', function() {
    isEqual('indent-single-space');
    isEqual('indent-wrong-first-line');
  });
});
