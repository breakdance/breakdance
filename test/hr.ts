import { isEqual } from './support/is-equal';

describe('horizontal rules', () => {
  it('should convert a horizontal rule to markdown', () => {
    isEqual.inline('<hr>', '***\n');
  });

  it('should convert multiple hrs to markdown', () => {
    const fixture = [
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
