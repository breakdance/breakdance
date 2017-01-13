'use strict';

var isEqual = require('./support/is-equal');

describe('emphasis', function() {
  describe('strong inline', function() {
    var fixtures = [
      {
        it: 'should convert strong tags to markdown',
        fixtures: [
          {
            fixture: '<strong>This is bold!</strong>',
            expected: '**This is bold!**'
          },
          {
            fixture: '<p>Force an element to be shown or hidden (<strong>including for screen readers</strong>) with the use of <code>.show</code> and <code>.hidden</code> classes.',
            expected: 'Force an element to be shown or hidden (**including for screen readers**) with the use of `.show` and `.hidden` classes.'
          },
          {
            fixture: [
              '<div class="footer">',
              '  <strong>Strong text</strong>',
              '  <strong>Strong text</strong>',
              '  <strong>Strong text</strong>',
              '  <p>This is a paragraph</p>',
              '</div>'
            ].join('\n'),
            expected: [
              '**Strong text** **Strong text** **Strong text**',
              '',
              'This is a paragraph',
              ''
            ].join('\n')
          }
        ]
      },
      {
        it: 'should render leading spaces correctly',
        fixture: [
          '<strong> bold </strong> at the start of a line',
          '<strong>bold </strong> at the start of a line',
          '<strong>bold</strong> at the start of a line',
          '<strong>bold</strong>at the start of a line',
          '<strong><strong>nested</strong></strong>strong statement'
        ].join('\n'),
        expected: [
          '**bold** at the start of a line',
          '**bold** at the start of a line',
          '**bold** at the start of a line',
          '**bold** at the start of a line',
          '**nested** strong statement'
        ].join('\n')
      },
      {
        it: 'should render spaces correctly',
        fixture: '<p>A line with<strong> a bold statement </strong> in the middle.</p>',
        expected: 'A line with **a bold statement** in the middle.'
      },
      {
        it: 'should render spaces correctly between consecutive <strong> tags',
        fixture: [
          '<div>foo</div>',
          '<strong> xyz </strong>',
          '<strong>qux</strong>',
          '<div>bar</div>'
        ].join('\n'),
        expected: [
          'foo\n**xyz**\n**qux**\nbar'
        ].join('\n')
      },
      {
        // only: true,
        it: 'should correctly render in list items',
        fixture: [
          '<ul>',
          '<li><strong>bold list item</strong></li>',
          '<li><strong>bold list item</strong> trailing text</li>',
          '<li>leading text <strong>bold list item</strong></li>',
          '<li>leading text <strong>bold list item</strong> trailing text</li>',
          '</ul>',
          '',
          '<strong>This is bold!</strong>'
        ].join('\n'),
        expected: [
          '* **bold list item**',
          '* **bold list item** trailing text',
          '* leading text **bold list item**',
          '* leading text **bold list item** trailing text',
          '',
          '**This is bold!**\n'
        ].join('\n')
      },
      {
        it: 'should render surrounding spaces correctly',
        fixture: [
          '<p>A line with<strong> a bold statement at the end and weird spacing. </strong></p>',
          '<span> some text </span>',
          '<p>A line with <strong> a bold statement at the end</strong></p>',
          '<p>A line with <strong> <strong> a nested bold statement </strong></strong></p>'
        ].join('\n'),
        expected: [
          'A line with **a bold statement at the end and weird spacing.**',
          '',
          'some text',
          '',
          'A line with **a bold statement at the end**',
          '',
          'A line with **a nested bold statement**\n'
        ].join('\n')
      }
    ];

    var hasOnly = fixtures.some(function(ele) {
      if (Array.isArray(ele.fixtures)) {
        return ele.fixtures.some(function(e) {
          return e.only === true;
        });
      }
      return ele.only === true;
    });

    run(fixtures);

    function run(fixtures) {
      fixtures.forEach(function(unit) {
        if (Array.isArray(unit.fixtures)) {
          run(unit.fixtures);
          return;
        }

        if (hasOnly && unit.only !== true) {
          return;
        }

        it(unit.it || 'should convert strong tags to markdown', function() {
          isEqual.inline(unit.fixture, unit.expected);
        });
      });
    }
  });
});
