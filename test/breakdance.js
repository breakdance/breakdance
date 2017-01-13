'use strict';

require('mocha');
var assert = require('assert');
var Breakdance = require('..');
var breakdance;

describe('breakdance', function() {
  beforeEach(function() {
    breakdance = new Breakdance();
  });

  it('should export a function', function() {
    assert.equal(typeof Breakdance, 'function');
  });

  it('should throw an error when invalid args are passed', function(cb) {
    try {
      breakdance.render();
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert.equal(err.message, 'expected a string of HTML');
      cb();
    }
  });
});
