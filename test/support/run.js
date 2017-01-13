'use strict';

require('mocha');
var isEqual = require('./is-equal');

module.exports = function(fixtures) {
  var hasOnly = only(fixtures);

  function run(units) {
    var arr = units.fixtures || units;
    var msg = units.msg;

    arr.forEach(function(unit, i) {
      if (Array.isArray(unit.fixtures)) {
        return run(unit);
      }

      if (hasOnly && unit.only !== true) {
        return;
      }

      it((i + 1) + '. ' + (unit.it || units.it), function() {
        isEqual.inline(unit.fixture, unit.expected);
      });
    });
  }

  run(fixtures);
};

function only(fixtures) {
  for (var i = 0; i < fixtures.length; i++) {
    var fixture = fixtures[i];
    if (fixture.only === true) {
      return true;
    }
    if (Array.isArray(fixture.fixtures) && only(fixture.fixtures)) {
      return true;
    }
  }
  return false;
}
