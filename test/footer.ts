import { isEqual } from './support/is-equal';

describe('integration - footer', () => {
  it('should convert footers with nav and lists to markdown', () => {
    isEqual('footer1');
    isEqual('footer2');
  });

  it('should convert empty footers', () => {
    isEqual.inline('<footer></footer>', '\n');
  });
});
