'use strict';

var isEqual = require('./support/is-equal');

describe('options', function() {
  describe('compilers', function() {
    it('should disable the given compiler', function() {
      isEqual.inline('<strong>Foo</strong>', '****', {compiler: {text: false}});
      isEqual.inline('<strong>Foo</strong>', '', {compiler: {strong: false}});
    });

    it('should use a custom compiler', function() {
      isEqual.inline('<strong>Foo</strong>', '**FOO**', {
        compiler: {
          text: function(node) {
            this.emit(node.val.toUpperCase(), node);
          }
        }
      });

      isEqual.inline('<strong>Foo</strong>', '@Foo@', {
        compiler: {
          strong: function(node) {
            this.mapVisit(node);
          },
          ['strong.open']: function(node) {
            this.emit('@', node);
          },
          ['strong.close']: function(node) {
            this.emit('@', node);
          }
        }
      });
    });
  });

  describe('.omit', function() {
    it('should strip the given elements from HTML before converting', function() {
      isEqual('options.omit', {omit: ['.ciu-panel-wrap'], title: true});
    });
  });

  describe('.override', function() {
    it('should override a visitor', function() {
      isEqual.inline('<title>This is a title</title>', '', {
        override: {
          title: function(node) {
            this.emit('');
          }
        }
      });

      isEqual.inline('<title>This is a title</title>', 'foo', {
        override: {
          title: function(node) {
            this.emit('foo');
          }
        }
      });

      isEqual.inline('<title>This is a title</title>', '# This is a title', {
        override: {
          title: function(node) {
            this.emit('# ' + node.val);
          }
        }
      });
    });
  });

  describe('domain', function() {
    it('should prepend the given domain name to non-anchor hrefs', function() {
      isEqual.inline('<a href="/some-link"></a>', '[](https://github.com/some-link)\n', {domain: 'https://github.com'});
      isEqual.inline('<a href="some-link"></a>', '[](https://github.com/some-link)\n', {domain: 'https://github.com'});
      isEqual.inline('<a href="./some-link"></a>', '[](https://github.com/some-link)\n', {domain: 'https://github.com'});
      isEqual.inline('<a href="#some-link"></a>', '[](#some-link)\n', {domain: 'https://github.com'});
    });

    it('should prepend the given domain name to src urls', function() {
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
});
