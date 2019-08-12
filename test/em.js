'use strict';

const isEqual = require('./support/is-equal');

describe('em', () => {
  let fixtures = [
    {
      it: 'should convert em tags to markdown',
      fixtures: [
        {
          fixture: '<em>This is italicized!</em>',
          expected: '_This is italicized!_'
        },
        {
          // only: true,
          fixture: '<p>Force an element to be shown or hidden (<em>including for screen readers</em>) with the use of <code>.show</code> and <code>.hidden</code> classes.',
          expected: 'Force an element to be shown or hidden (_including for screen readers_) with the use of `.show` and `.hidden` classes.'
        },
        {
          fixture: [
            '<div class="footer">',
            '  <em>Italics text</em>',
            '  <em>Italics text</em>',
            '  <em>Italics text</em>',
            '  <p>This is a paragraph</p>',
            '</div>'
          ].join('\n'),
          expected: [
            '_Italics text_ _Italics text_ _Italics text_',
            '',
            'This is a paragraph',
            ''
          ].join('\n')
        }
      ]
    },
    {
      it: 'should convert consecutive emphasis tags',
      fixture: `
        <div class="footer">
          <strong>Bold text</strong>
          <em>Italicized text</em>
          <p>This is a paragraph</p>
        </div>`,
      expected: [
        '**Bold text** _Italicized text_',
        '',
        'This is a paragraph',
        '',
      ].join('\n')
    },
    {
      it: 'should render spaces correctly between consecutive <em> tags',
      fixture: `
        <div class="footer">
          <em>Italicized text</em>
          <em>Italicized text</em>
          <em>Italicized text</em>
          <p>This is a paragraph</p>
        </div>`,
      expected: [
        '_Italicized text_ _Italicized text_ _Italicized text_',
        '',
        'This is a paragraph\n'
      ].join('\n')
    },
    {
      it: 'should convert em tags to markdown',
      fixture: '<em>This is italicized!</em>',
      expected: '_This is italicized!_\n'
    }
  ];

  let hasOnly = fixtures.some((ele) => {
    if (Array.isArray(ele.fixtures)) {
      return ele.fixtures.some((e) => {
        return e.only === true;
      });
    }
    return ele.only === true;
  });

  run(fixtures);

  function run(fixtures, parent = {}) {
    fixtures.forEach((unit) => {
      if (Array.isArray(unit.fixtures)) {
        run(unit.fixtures, unit);
        return;
      }

      if (hasOnly && unit.only !== true) {
        return;
      }

      it(unit.it || parent.it || 'should convert <em> tags to markdown', () => {
        if (unit.skip) {
          this.skip();
          return;
        }
        isEqual.inline(unit.fixture, unit.expected);
      });
    });
  }
});
