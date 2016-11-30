'use strict';

var isEqual = require('./support/is-equal');

describe('emphasis', function() {
  describe('em', function() {
    it('should convert em tags to markdown', function() {
      isEqual.inline('<em>This is italicized!</em>', '_This is italicized!_\n');
    });
  });

  describe('strong', function() {
    var fixtures = [
      {
        fixture: '<strong>This is bold!</strong>',
        expected: '**This is bold!**\n'
      },
      {
        it: '1. should render spaces correctly',
        fixture: '<p>A line with<strong> a bold statement </strong> in the middle.</p>',
        expected: 'A line with**a bold statement** in the middle.\n'
      },
      {
        it: '2. should render spaces correctly',
        fixture: [
          '<div>foo</div>',
          '<strong> xyz </strong>',
          '<strong>qux</strong>',
          '<div>bar</div>',
        ].join('\n'),
        expected: [
          'foo',
          '**xyz**',
          '**qux**',
          'bar\n',
        ].join('\n')
      },
      {
        it: 'should correctly render in list items',
        fixture: [
          '<ul>',
            '<li><strong>bold list item</strong></li>',
            '<li><strong>bold list item</strong> trailing text</li>',
            '<li>leading text <strong>bold list item</strong></li>',
            '<li>leading text <strong>bold list item</strong> trailing text</li>',
          '</ul>',
          '',
          '<strong>This is bold!</strong>',
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
        only: true,
        it: 'should render surrounding spaces correctly',
        fixture: [
          '<p>A line with<strong> a bold statement at the end and weird spacing. </strong></p>',
          '<span> some text </span>',
          '<p>A line with <strong> a bold statement at the end</strong></p>',
          '<p>A line with <strong> <strong> a nested bold statement </strong></strong></p>',
        ].join('\n'),
        expected: [
          'A line with**a bold statement at the end and weird spacing.**',
          'some text',
          'A line with **a bold statement at the end**',
          '',
          'A line with **a nested bold statement**\n',
        ].join('\n')
      }
    ];

    fixtures.forEach(function(unit) {
      if (!unit.only) return;
      it(unit.it || 'should convert strong tags to markdown', function() {
        isEqual.inline(unit.fixture, unit.expected);
      });
    });

    it('should convert strong tags to markdown', function() {
      isEqual('strong');
    });

    it('should render leading spaces correctly', function() {
      isEqual('strong-line-start');
    });
  });
});
