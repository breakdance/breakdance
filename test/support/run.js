'use strict';

require('mocha');
const isEqual = require('./is-equal');
const isObject = val => val && typeof val === 'object' && !Array.isArray(val);

module.exports = fixtures => {
  for (let i = 0; i < fixtures.length; i++) {
    let fixture = fixtures[i];

    if (Array.isArray(fixture)) {
      let options = fixture.find(ele => isObject(ele)) || {};
      fixture = fixture.filter(v => v !== options);
      fixtures[i] = {
        it: fixture[2] || '',
        fixture: fixture[0],
        expected: fixture[1],
        options
      }
    }
  }

  function run(units, parent) {
    for (const unit of units) {
      if (Array.isArray(unit.fixtures)) {
        run(unit.fixtures, unit);
        continue;
      }

      it(unit.it || parent && parent.it || 'should work', function() {
        isEqual.inline(unit.fixture, unit.expected, unit.options, unit.it);
      });
    }
  }

  run(filter(fixtures));
};

function filter(fixtures) {
  let unit = fixtures.find(child => {
    if (child.only === true) {
      return child;
    }
    if (child.fixtures) {
      return filter(child.fixtures);
    }
  });
  return unit ? [unit] : fixtures;
}

