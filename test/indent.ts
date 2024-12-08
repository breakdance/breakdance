import { isEqual } from './support/is-equal';

describe('indentation', () => {
  it('should fix indentation', () => {
    isEqual('indent-single-space');
    isEqual('indent-wrong-first-line');
  });
});
