'use strict';

var assert = require('assert');
var isEqual = require('./support/is-equal');

describe('regex', function() {
  it('should test for leading characters', function() {
    assert(!/(^$|[\S\n])/.test(' '))
    assert(/(^$|[\S\n])/.test(''))
    assert(/(^$|[\S\n])/.test('a'))
    assert(/(^$|[\S\n])/.test('\n'))
  });
});
