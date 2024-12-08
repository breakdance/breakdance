import { isEqual } from './support/is-equal';

describe('code', () => {
  describe('<code>', () => {
    it('should convert code tags to markdown', () => isEqual('code'));

    it('should use double backticks when a backticks exist in code', () => {
      isEqual.inline('<code>foo`bar</code>', '``foo`bar``\n');
      isEqual.inline('<code>foo`a`b`bar</code>', '``foo`a`b`bar``\n');
    });

    it('should not render empty code tags', () => {
      isEqual.inline('foo<code></code> bar', 'foo bar\n');
    });
  });

  describe('gfm', () => {
    it('should convert gfm tags to markdown', () => isEqual('gfm'));
  });
});
