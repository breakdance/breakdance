'use strict';

require('mocha');
var isEqual = require('./support/is-equal');

describe('anchors', function() {
  it('should not convert links inside code', function() {
    isEqual.inline('<code><a href="/some-link">Foo</a></code>', '`<a href="/some-link">Foo</a>`\n');
  });

  it('should convert links to markdown', function() {
    isEqual.inline('<a href="/some-link">Foo</a>', '[Foo](/some-link)\n');
    isEqual.inline('<a href="https://some-link.com">Foo</a>', '[Foo](https://some-link.com)\n');
  });

  it('should convert links without text to markdown', function() {
    isEqual.inline('<a href="/some-link"></a>', '[](/some-link)\n');
    isEqual.inline('<a href="https://some-link.com"></a>', '[](https://some-link.com)\n');
  });

  it('should retain text spacing', function() {
    isEqual.inline('<a href="/"> Click me </a>', '[Click me](/)\n');
  });

  it('should convert a named anchor to markdown', function() {
    isEqual.inline('<a name="/some-link">Foo</a>', '<a name="some-link"></a>Foo\n');
  });

  it('should convert an anchor with attributes to markdown', function() {
    isEqual.inline('<a class="nav-item nav-link " href="/" onclick="ga(\'send\', \'event\', \'Navbar\', \'Community links\', \'Bootstrap\');">Bootstrap</a>', '[Bootstrap](/)\n');
  });

  it.only('should convert an anchor with children to markdown', function() {
    isEqual('a-children');
  });

  it('should render the title attribute', function() {
    isEqual.inline('<a href="/" title="Whoohooo!"> Click me </a>', '[Click me](/ "Whoohooo!")\n');
  });
});
