import { isEqual } from './support/is-equal';

describe('comments', () => {
  it('should not render code comments by default', () => {
    isEqual.inline('<p>This is a document <!-- foo --> with comments</p>', 'This is a document with comments\n');
  });

  it('should render code comments when `options.comments` is true', () => {
    isEqual.inline('<p>This is a document <!-- foo --> with comments</p>', 'This is a document <!-- foo --> with comments\n', { comments: true });
  });
});
