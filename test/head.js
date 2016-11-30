'use strict';

var isEqual = require('./support/is-equal');

describe('head', function() {
  it('should ignore everything but the title', function() {
    isEqual('head');
  });

  it('should convert title to markdown', function() {
    isEqual('title');
  });
});
