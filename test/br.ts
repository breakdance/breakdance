import { isEqual } from './support/is-equal';

describe('br', () => {
  it('should convert a break to markdown', () => {
    isEqual.inline('<br>', '<br>\n');
  });

  it('should convert multiple breaks to markdown', () => {
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
