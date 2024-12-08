import { isEqual } from './support/is-equal';

describe('blockquotes', () => {
  it('should convert a blockquote to markdown', () => {
    isEqual.inline('<blockquote> Lorem ipsum. </blockquote>', '> Lorem ipsum.\n');
  });

  it('should convert a blockquote with nested `<p>` tag', () => {
    isEqual.inline('<blockquote><p>Lorem ipsum.</p></blockquote>', '> Lorem ipsum.\n');
  });

  it('should convert a blockquote with nested `<strong>` tag', () => {
    isEqual.inline('<blockquote>Foo <strong>Lorem ipsum</strong> bar.</blockquote>', '> Foo **Lorem ipsum** bar.\n');
  });

  it('should convert nested blockquotes to markdown', () => {
    isEqual('blockquote-markup');
    isEqual('blockquote-nested');
  });
});
