'use strict';

var isEqual = require('./support/is-equal');

describe('abbr', function() {
  it('should strip attributes except for `title` from <abbr> tags', function() {
    isEqual.inline('<abbr title="HyperText Markup Language" class=initialism>HTML</abbr>', '<abbr title="HyperText Markup Language">HTML</abbr>');
  });
});
