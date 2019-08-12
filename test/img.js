'use strict';

const isEqual = require('./support/is-equal');

describe('img', function() {
  it('should convert img tags to markdown', function() {
    isEqual.inline('<img src="hammer.gif">', '![](hammer.gif)\n');
    isEqual.inline('<img src="hammer.gif" />', '![](hammer.gif)\n');
    isEqual.inline('<img src="hammer.gif"/>', '![](hammer.gif)\n');
  });

  it('should use the alt attribute', function() {
    isEqual.inline('<img src="hammer.gif" alt="Can\'t touch this">', '![Can\'t touch this](hammer.gif)\n');
  });

  it('should use the title attribute', function() {
    isEqual.inline('<img src="hammer.gif" title="Foo bar" alt="Can\'t touch this">', '![Can\'t touch this](hammer.gif "Foo bar")\n');
  });

  it('should not render when img has no src', function() {
    isEqual.inline('<img alt="foo"/>', '');
    isEqual.inline('<img data-src="holder.js/200x200" class="img-thumbnail" alt="foo" />', '');
  });
});
