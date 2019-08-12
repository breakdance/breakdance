'use strict';

const isEqual = require('./support/is-equal');

describe('del', function() {
  it('should convert <del> tags', function() {
    isEqual.inline('<p><del>This line of text is meant to be treated as deleted text.</del></p>', '~~This line of text is meant to be treated as deleted text.~~');

    isEqual.inline('<p>Foo <del> This line of text is meant to be treated as deleted text. </del></p>', 'Foo ~~This line of text is meant to be treated as deleted text.~~');

    isEqual.inline('<p>Foo<del> This line of text is meant to be treated as deleted text. </del></p>', 'Foo ~~This line of text is meant to be treated as deleted text.~~');

    isEqual.inline('<p>Foo<del> This line of text is meant <br> to be treated as deleted text. </del></p>', 'Foo ~~This line of text is meant <br>\nto be treated as deleted text.~~');
  });
});
