import { isEqual } from './support/is-equal';

describe('pre', () => {
  it('should convert pre tags to markdown', () => {
    isEqual('pre');
    isEqual('pre-multiple');
    isEqual('pre-html');
  });

  describe('options.literalPre', () => {
    it('should not modify the contents of gfm', () => {
      isEqual('pre-gfm-html', { literalPre: true });
    });
  });
});
