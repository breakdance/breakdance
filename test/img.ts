import { isEqual } from './support/is-equal';

describe('img', () => {
  it('should convert img tags to markdown', () => {
    isEqual.inline('<img src="hammer.gif">', '![](hammer.gif)\n');
    isEqual.inline('<img src="hammer.gif" />', '![](hammer.gif)\n');
    isEqual.inline('<img src="hammer.gif"/>', '![](hammer.gif)\n');
  });

  it('should use the alt attribute', () => {
    isEqual.inline('<img src="hammer.gif" alt="Can\'t touch this">', '![Can\'t touch this](hammer.gif)\n');
  });

  it('should use the title attribute', () => {
    isEqual.inline('<img src="hammer.gif" title="Foo bar" alt="Can\'t touch this">', '![Can\'t touch this](hammer.gif "Foo bar")\n');
  });

  it('should not render when img has no src', () => {
    isEqual.inline('<img alt="foo"/>', '');
    isEqual.inline('<img data-src="holder.js/200x200" class="img-thumbnail" alt="foo" />', '');
  });
});
