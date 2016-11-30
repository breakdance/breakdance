'use strict';

require('mocha');
var assert = require('assert');
var sledgehammer = require('..');

describe('sledgehammer', function() {
  it('should export a function', function() {
    assert.equal(typeof sledgehammer, 'function');
  });

  it('should throw an error when invalid args are passed', function(cb) {
    try {
      sledgehammer();
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected a string of HTML');
      cb();
    }
  });
});
