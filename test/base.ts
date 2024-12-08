import { isEqual } from './support/is-equal';

describe('base', () => {
  it('should prefix urls with the "href" attribute from the <base> tag', () => {
    isEqual('base');
  });
});
