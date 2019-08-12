'use strict';

const isEqual = require('./support/is-equal');

describe('s', function() {
  it('should convert <s> tags', function() {
    isEqual.inline('<p><s>This line of text is meant to be treated as no longer accurate.</s></p>', '~~This line of text is meant to be treated as no longer accurate.~~');

    isEqual.inline('<p><s>This line of text is meant to be treated as deleted text.</s></p>', '~~This line of text is meant to be treated as deleted text.~~');

    isEqual.inline('<p>Foo <s> This line of text is meant to be treated as deleted text. </s></p>', 'Foo ~~This line of text is meant to be treated as deleted text.~~');

    isEqual.inline('<p>Foo<s> This line of text is meant to be treated as deleted text. </s></p>', 'Foo ~~This line of text is meant to be treated as deleted text.~~');
  });
});
