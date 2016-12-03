'use strict';

var isEqual = require('./support/is-equal');

describe('comments', function() {
  it('should not render code comments by default', function() {
    isEqual.inline('<p>This is a document <!-- foo --> with comments</p>', 'This is a document  with comments\n');
  });

  it('should render code comments when `options.comments` is true', function() {
    isEqual.inline('<p>This is a document <!-- foo --> with comments</p>', 'This is a document <!-- foo --> with comments\n', { comments: true });
  });
});
