'use strict';

var isEqual = require('./support/is-equal');

describe('q', function() {
  describe('quoted inline text', function() {
    it('should convert inline quotes to markdown', function() {
      isEqual.inline('<div>This is an <q>inline quote</q>.</div>', 'This is an <q>inline quote</q>.\n');
    });

    it('should retain spacing in inline quotes', function() {
      isEqual.inline('<div>This is another<q> inline quote </q>.</div>', 'This is another<q> inline quote </q>.\n');
    });
  });
});
