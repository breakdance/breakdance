import { isEqual } from './support/is-equal';

describe('integration - header', () => {
  it('should convert headers with nav and lists to markdown', () => {
    isEqual('header1');
    isEqual('header2');
  });
});
