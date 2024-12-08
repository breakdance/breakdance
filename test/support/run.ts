import { isEqual } from './is-equal';

const isObject = val => val && typeof val === 'object' && !Array.isArray(val);

export const run = fixtures => {
  for (let i = 0; i < fixtures.length; i++) {
    let fixture = fixtures[i];

    if (Array.isArray(fixture)) {
      const options = fixture.find(ele => isObject(ele)) || {};
      fixture = fixture.filter(v => v !== options);
      fixtures[i] = {
        it: fixture[2] || '',
        fixture: fixture[0],
        expected: fixture[1],
        options
      };
    }
  }

  function execute(units, parent) {
    for (const unit of units) {
      if (Array.isArray(unit.fixtures)) {
        execute(unit.fixtures, unit);
        continue;
      }

      it(unit.it || parent && parent.it || 'should work', () => {
        isEqual.inline(unit.fixture, unit.expected, unit.options, unit.it);
      });
    }
  }

  execute(filter(fixtures));
};

function filter(fixtures) {
  const unit = fixtures.find(child => {
    if (child.only === true) {
      return child;
    }

    if (child.fixtures) {
      return filter(child.fixtures);
    }

    return false;
  });

  return unit ? [unit] : fixtures;
}

export default run;
