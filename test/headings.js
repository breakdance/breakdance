'use strict';

var isEqual = require('./support/is-equal');

describe('headings', function() {
  it('should add a space before and after headings', function() {
    isEqual('headings-spacing');
  });

  it('should strip newlines from headings', function() {
    isEqual('headings-newlines');
  });

  var fixtures = [
    ['<h1>AAA</h1>', '# AAA\n', 'should convert h1 headings to markdown'],
    ['<h2>BBB</h2>', '## BBB\n', 'should convert h2 headings to markdown'],
    ['<h3>CCC</h3>', '### CCC\n', 'should convert h3 headings to markdown'],
    ['<h4>DDD</h4>', '#### DDD\n', 'should convert h4 headings to markdown'],
    ['<h5>EEE</h5>', '##### EEE\n', 'should convert h5 headings to markdown'],
    ['<h6>FFF</h6>', '###### FFF\n', 'should convert h6 headings to markdown'],
    {
      it: 'should convert headings inside anchor tags',
      fixture: '<a href="#foo"><h2>ABC</h2></a>',
      expected: '[**ABC**](#foo)\n'
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
        '</div>'
      ].join('\n'),
      expected: '[**Foo**](#qux)\n\nBar baz.\n'
    }
  ];

  var hasOnly = fixtures.some(function(ele) {
    return ele.only === true;
  });

  fixtures.forEach(function(unit, i) {
    if (hasOnly && unit.only !== true) {
      return;
    }

    it(unit.it || unit[2] || 'should convert headings ' + i, function() {
      if (Array.isArray(unit)) {
        isEqual.inline(unit[0], unit[1]);
      } else {
        isEqual.inline(unit.fixture, unit.expected);
      }
    });
  });
});
