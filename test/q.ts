import { isEqual } from './support/is-equal';

describe('q', () => {
  describe('quoted inline text', () => {
    it('should convert inline quotes to markdown', () => {
      isEqual.inline('<div>This is an <q>inline quote</q>.</div>', 'This is an <q>inline quote</q>.\n');
    });

    it('should retain spacing in inline quotes', () => {
      isEqual.inline('<div>This is another<q> inline quote </q>.</div>', 'This is another <q>inline quote</q>.\n');
    });
  });
});
