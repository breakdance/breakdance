'use strict';

const isEqual = require('./support/is-equal');

describe('horizontal rules', function() {
  it('should convert a horizontal rule to markdown', function() {
    isEqual.inline('<hr>', '***\n');
  });

  it('should convert multiple hrs to markdown', function() {
    var fixture = [
      '<hr> foo <hr>bar<hr> baz',
      '',
      '',
      '',
      '',
      '<hr>'
    ].join('\n');

    isEqual.inline(fixture, [
      '***',
      '',
      'foo ',
      '',
      '***',
      '',
      'bar',
      '',
      '***',
      '',
      'baz',
      '',
      '***\n'
    ].join('\n'));
  });
});
