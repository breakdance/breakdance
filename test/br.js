'use strict';

const isEqual = require('./support/is-equal');

describe('br', function() {
  it('should convert a break to markdown', function() {
    isEqual.inline('<br>', '<br>\n');
  });

  it('should convert multiple breaks to markdown', function() {
    isEqual.inline([
      '<br> foo <br>bar<br> baz',
      '',
      '',
      '',
      '',
      '<br>'
    ].join('\n'), [
      '<br>',
      'foo <br>',
      'bar<br>',
      'baz',
      '',
      '<br>'
    ].join('\n'));

    isEqual.inline([
      '<br>',
      'foo <br>bar<br> baz<br>',
      '',
      '',
      '',
      '',
      ''
    ].join('\n'), [
      '<br>',
      'foo <br>',
      'bar<br>',
      'baz<br>'
    ].join('\n'));
  });
});
