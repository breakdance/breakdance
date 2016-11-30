'use strict';

var isEqual = require('./support/is-equal');

describe('headings', function() {
  it('should convert h1-h6 headings to markdown', function() {
    isEqual.inline('<h1>AAA</h1>', '# AAA\n');
    isEqual.inline('<h2>BBB</h2>', '## BBB\n');
    isEqual.inline('<h3>CCC</h3>', '### CCC\n');
    isEqual.inline('<h4>DDD</h4>', '#### DDD\n');
    isEqual.inline('<h5>EEE</h5>', '##### EEE\n');
    isEqual.inline('<h6>FFF</h6>', '###### FFF\n');
  });

  it('should add a space before and after headings', function() {
    isEqual('headings-spacing');
  });

  var fixtures = [
    {
      it: 'should convert headings inside anchor tags',
      fixture: '<a href="#foo"><h2>Foo</h2></a>',
      expected: '[**Foo**](#foo)\n'
    },
    {
      it: 'should convert headings inside anchor tags',
      fixture: [
        '<div class="baz">',
        '  <a href="#qux">',
        '    <h2 class="foo">',
        '      Foo',
        '    </h2></a>',
        '  <p class="bar">',
        '    Bar baz.',
        '  </p>',
        '</div>',
      ].join('\n'),
      expected: '[**Foo**](#qux)\n\nBar baz.\n'
    }
  ];

  fixtures.forEach(function(unit, i) {
    it(unit.it || 'should convert headings ' + i, function() {
      isEqual.inline(unit.fixture, unit.expected);
    });
  });
});
