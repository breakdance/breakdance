'use strict';

require('mocha');
const isEqual = require('./support/is-equal');

describe('a', () => {
  it('should convert solitary links directly inside code tags', () => {
    isEqual.inline('<code><a href="/some-link">Foo</a></code>', '**[Foo](/some-link)**\n');
  });

  it('should convert links to markdown', () => {
    isEqual.inline('<a href="/some-link">Foo</a>', '[Foo](/some-link)\n');
    isEqual.inline('<a href="https://some-link.com">Foo</a>', '[Foo](https://some-link.com)\n');
  });

  it('should convert links without text to markdown', () => {
    isEqual.inline('<a href="/some-link"></a>', '[](/some-link)', { keepEmpty: 'a' });
    isEqual.inline('<a href="https://some-link.com"></a>', '[](https://some-link.com)', { keepEmpty: 'a' });
  });

  it('should retain text spacing', () => {
    isEqual.inline('<a href="/"> Click me </a>', '[Click me](/)\n');
  });

  it('should convert a named anchor to markdown', () => {
    isEqual.inline('<a name="/some-link">Foo</a>', '<a name="/some-link">Foo</a>\n');
  });

  it('should convert an anchor with attributes to markdown', () => {
    isEqual.inline('<a class="nav-item nav-link " href="/" onclick="ga(\'send\', \'event\', \'Navbar\', \'Community links\', \'Bootstrap\');">Bootstrap</a>', '[Bootstrap](/)\n');
  });

  it('should convert an anchor with children to markdown', () => {
    isEqual('a-children');
  });

  it('should render the title attribute', () => {
    isEqual.inline('<a href="/" title="Whoohooo!"> Click me </a>', '[Click me](/ "Whoohooo!")\n');
  });
});
