'use strict';

var isEqual = require('./support/is-equal');

describe('mark', function() {
  it('should convert <mark>', function() {
    isEqual.inline('<p>You can use the mark tag to <mark>highlight</mark> text.</p>', 'You can use the mark tag to <mark>highlight</mark> text.');
  });
});
