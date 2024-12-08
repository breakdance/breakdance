import { isEqual } from './support/is-equal';

describe('head', () => {
  it('should render an empty string', () => isEqual('head'));

  it('should render <title> when `options.title` is true', () => {
    isEqual('head-title', { title: true });
  });
});
