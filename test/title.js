'use strict';

const isEqual = require('./support/is-equal');

describe('title', function() {
  it('should not output <title> by default', function() {
    isEqual.inline('<title>This is a title</title>', '');
  });

  it('should output <title> when `options.title` is true', function() {
    isEqual.inline('<title>This is a title</title>', '# This is a title\n', {title: true});
  });
});
