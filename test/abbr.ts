import { isEqual } from './support/is-equal';

describe('abbr', () => {
  it('should strip attributes except for `title` from <abbr> tags', () => {
    isEqual.inline('<abbr title="HyperText Markup Language" class=initialism>HTML</abbr>', '<abbr title="HyperText Markup Language">HTML</abbr>');
  });
});
