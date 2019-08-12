'use strict';

const isEqual = require('./support/is-equal');
const run = require('./support/run');

describe('headings', function() {
  it('should convert headings to bold inside list items', function() {
    isEqual.inline('<li><h1>foo<span class="bar"></span></h1></li>', '- **foo**');
    isEqual.inline('<li><h2>foo<span class="bar"></span></h2></li>', '- **foo**');
    isEqual.inline('<li><h3>foo<span class="bar"></span></h3></li>', '- **foo**');
    isEqual.inline('<li><h4>foo<span class="bar"></span></h4></li>', '- **foo**');
    isEqual.inline('<li><h5>foo<span class="bar"></span></h5></li>', '- **foo**');
  });

  it('should add a space before and after headings', () => isEqual('headings-spacing'));
  it('should strip newlines from headings', () => isEqual('headings-newlines'));

  const fixtures = [
    ['<h1>AAA</h1>', '# AAA\n', 'should convert h1 headings'],
    ['<h2>BBB</h2>', '## BBB\n', 'should convert h2 headings'],
    ['<h3>CCC</h3>', '### CCC\n', 'should convert h3 headings'],
    ['<h4>DDD</h4>', '#### DDD\n', 'should convert h4 headings'],
    ['<h5>EEE</h5>', '##### EEE\n', 'should convert h5 headings'],
    ['<h6>FFF</h6>', '###### FFF\n', 'should convert h6 headings'],
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
    },
    {
      it: 'should convert headings inside anchor tags',
      fixture: [
        '<div class="baz">',
        '  <a href="#qux">',
        '    <h2 class="foo">',
        '      <div>Foo </div>',
        '      <div>Bar</div>',
        '    </h2></a>',
        '  <p class="bar">',
        '    Bar baz.',
        '  </p>',
        '</div>'
      ].join('\n'),
      expected: '[**Foo Bar**](#qux)\n\nBar baz.\n'
    }
  ];

  run(fixtures);
});
