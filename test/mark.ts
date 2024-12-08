import { isEqual } from './support/is-equal';

describe('mark', () => {
  it('should convert <mark>', () => {
    isEqual.inline('<p>You can use the mark tag to <mark>highlight</mark> text.</p>', 'You can use the mark tag to <mark>highlight</mark> text.');
  });
});
