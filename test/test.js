'use strict';

require('mocha');
var assert = require('assert');
var breakdance = require('..');

describe('breakdance', function() {
  it('should export a function', function() {
    assert.equal(typeof breakdance, 'function');
  });

  it('should throw an error when invalid args are passed', function(cb) {
    try {
      breakdance();
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected a string of HTML');
      cb();
    }
  });
});
