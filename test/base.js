'use strict';

var isEqual = require('./support/is-equal');

describe('base', function() {
  it('should prefix urls with the "href" attribute from the <base> tag', function() {
    isEqual('base');
  });
});
