'use strict';

const isEqual = require('./support/is-equal');

describe('options', () => {
  describe('.handlers', () => {
    it('should disable the given handlers', () => {
      isEqual.inline('<strong>Foo</strong>', '', { handlers: { text: false } });
      isEqual.inline('<strong>Foo</strong>', '', { handlers: { strong: false } });
    });

    it('should use a custom handlers', () => {
      isEqual.inline('<strong>Foo</strong>', '**FOO**', {
        handlers: {
          text(node) {
           return node.value.toUpperCase();
          }
        }
      });

      isEqual.inline('<strong>Foo</strong>', '@Foo@', {
        handlers: {
          strong(node) {
            return `@${this.mapVisit(node)}@`;
          }
        }
      });
    });

    it('should override a handler', () => {
      isEqual.inline('<title>This is a title</title>', '', {
        handlers: {
          title(node) {
           return '';
          }
        }
      });

      isEqual.inline('<title>This is a title</title>', 'foo', {
        handlers: {
          title(node) {
           return 'foo';
          }
        }
      });

      isEqual.inline('<title>This is a title</title>', '# This is a title', {
        handlers: {
          title(node) {
           return '# ' + this.mapVisit(node);
          }
        }
      });
    });
  });

  describe('.comments', () => {
    it('should include code comments in generated markdown', () => {
      isEqual.inline('<div>Foo<!-- bar --></div>', 'Foo<!-- bar -->', { comments: true });
      isEqual.inline('<strong>Foo</strong> <!-- bar -->', '**Foo** <!-- bar -->', { comments: true });
    });
  });

  describe('.omit', () => {
    it.skip('should strip the given elements from HTML before converting', () => {
      isEqual('options.omit', { omit: ['.ciu-panel-wrap'], title: true });
    });
  });

  describe('.keepEmpty', () => {
    it('should keep the given tags when empty', () => {
      isEqual.inline('<a href="/some-link"></a>', '[](/some-link)\n', { keepEmpty: 'a' });
      isEqual.inline('<a href="/some-link"></a>', '[](https://github.com/some-link)\n', {
        domain: 'https://github.com',
        keepEmpty: 'a'
      });
      isEqual.inline('<a href="https://some-link.com"></a>', '[](https://some-link.com)\n', { keepEmpty: 'a' });
    });
  });

  describe('domain', () => {
    it('should prepend the given domain name to non-anchor hrefs', () => {
      isEqual.inline('<a href="/some-link">link</a>', '[link](https://github.com/some-link)\n', {
        domain: 'https://github.com'
      });
      isEqual.inline('<a href="some-link">link</a>', '[link](https://github.com/some-link)\n', {
        domain: 'https://github.com'
      });
      isEqual.inline('<a href="./some-link">link</a>', '[link](https://github.com/some-link)\n', {
        domain: 'https://github.com'
      });
      isEqual.inline('<a href="#some-link">link</a>', '[link](#some-link)\n', { domain: 'https://github.com' });
    });

    it('should prepend the given domain name to src urls', () => {
      isEqual.inline('<img src="foo.jpg">', '![](https://github.com/foo.jpg)\n', {
        domain: 'https://github.com'
      });

      isEqual.inline('<img src="foo.jpg">', '![](https://github.com/foo.jpg)\n', {
        domain: 'https://github.com'
      });

      isEqual.inline('<img src="foo.jpg">', '![](https://github.com/foo.jpg)\n', {
        domain: 'https://github.com'
      });
    });
  });

  describe('options.postprocess', () => {
    // it.skip('should post process nodes', () => {
    //   isEqual('art-of-war', {
    //     postprocess(value, node) {
    //       return value
    //         .replace(/([\w,;!?:])\n(\w)/g, '$1 $2')
    //         .replace(/<br>\n\[/g, '<br> [')
    //     }
    //   });
    // });
  });
});
