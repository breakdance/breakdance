'use strict';

var isEqual = require('./support/is-equal');

describe('strike', function() {
  it('should convert <strike> tags', function() {
    isEqual.inline('<p><strike>This line of text is meant to be treated as no longer accurate.</strike></p>', '~~This line of text is meant to be treated as no longer accurate.~~');

    isEqual.inline('<p><strike>This line of text is meant to be treated as deleted text.</strike></p>', '~~This line of text is meant to be treated as deleted text.~~');

    isEqual.inline('<p>Foo <strike> This line of text is meant to be treated as deleted text. </strike></p>', 'Foo ~~This line of text is meant to be treated as deleted text.~~');

    isEqual.inline('<p>Foo<strike> This line of text is meant to be treated as deleted text. </strike></p>', 'Foo ~~This line of text is meant to be treated as deleted text.~~');
  });
});
