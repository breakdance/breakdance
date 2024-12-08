import { isEqual } from './support/is-equal';

describe('title', () => {
  it('should not output <title> by default', () => {
    isEqual.inline('<title>This is a title</title>', '');
  });

  it('should output <title> when `options.title` is true', () => {
    isEqual.inline('<title>This is a title</title>', '# This is a title\n', { title: true });
  });
});
