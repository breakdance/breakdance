'use strict';

var isEqual = require('./support/is-equal');

describe('abbr', function() {
  it('should strip attributes from <abbr> tags', function() {
    isEqual.inline('<abbr title="HyperText Markup Language" class=initialism>HTML</abbr>', '<abbr>HTML</abbr>');
  });
});
