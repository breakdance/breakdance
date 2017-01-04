'use strict';

var isEqual = require('./support/is-equal');

describe('checklists', function() {
  var fixtures = [
    {
      it: 'should create a checkbox from an input',
      fixture: '<input type="checkbox" />Lorem ipsum dolor sit amet',
      expected: '[ ] Lorem ipsum dolor sit amet\n'
    },
    {
      it: 'should create a checked checkbox from an input',
      fixture: '<input type="checkbox checked" />Lorem ipsum dolor sit amet',
      expected: '[x] Lorem ipsum dolor sit amet\n'
    },
    {
      it: 'should create a checkbox from a list item',
      fixture: '<li><input type="checkbox" />Lorem ipsum dolor sit amet</li>',
      expected: '[ ] Lorem ipsum dolor sit amet\n'
    },
    {
      it: 'should create a checked checkbox from a list item',
      fixture: '<li><input type="checkbox checked" />Lorem ipsum dolor sit amet</li>',
      expected: '[x] Lorem ipsum dolor sit amet\n'
    },
    {
      it: 'should create a checkbox from list item `type`',
      fixture: '<ul><li><input type="checkbox" />Lorem ipsum dolor sit amet</li></ul>',
      expected: '* [ ] Lorem ipsum dolor sit amet\n'
    },
    {
      it: 'should create a checked checkbox from list item `type`',
      fixture: '<ul><li><input type="checkbox checked" />Lorem ipsum dolor sit amet</li></ul>',
      expected: '* [x] Lorem ipsum dolor sit amet\n'
    },
    {
      it: 'should create an active checkbox from list item `type`',
      fixture: '<ul><li><input type="checkbox active" />Lorem ipsum dolor sit amet</li></ul>',
      expected: '* [x] Lorem ipsum dolor sit amet\n'
    },
    {
      it: 'should create a checkbox from the class on a parent div',
      fixture: [
        '<div class="ui checkbox">',
        '  <input type="checkbox" name="example" />',
        '  <label>Make my profile visible</label>',
        '</div>',
      ].join('\n'),
      expected: '* [ ] Make my profile visible\n'
    },
    {
      it: 'should create a checked checkbox from the class on a parent div',
      fixture: [
        '<div class="ui checkbox checked">',
        '  <input type="checkbox" name="example" />',
        '  <label>Make my profile visible</label>',
        '</div>',
      ].join('\n'),
      expected: '* [x] Make my profile visible\n'
    },
    {
      only: true,
      it: 'should toggle state using the `checked` attribute',
      fixture: [
        '<ul class="contains-task-list">',
        '  <li class="task-list-item">',
        '    <input type="checkbox" class="task-list-item-checkbox" disabled=""> foo',
        '  </li>',
        '  <li class="task-list-item">',
        '    <input type="checkbox" class="task-list-item-checkbox" checked="" disabled=""> bar',
        '  </li>',
        '  <li class="task-list-item">',
        '    <input type="checkbox" class="task-list-item-checkbox" disabled=""> baz',
        '  </li>',
        '</ul>',
      ].join('\n'),
      expected: '* [ ] foo\n* [x] bar\n* [ ] baz\n'
    }
  ];

  fixtures.forEach(function(unit) {
    it(unit.it || 'should convert a list item to markdown', function() {
      isEqual.inline(unit.fixture, unit.expected);
    });
  });
});
