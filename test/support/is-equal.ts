import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import read from './read';
import { breakdance } from '~/breakdance';

export const isEqual = (name, expectedName, options, description) => {
  if (typeof expectedName !== 'string') {
    options = expectedName;
    expectedName = null;
  }

  const destName = expectedName || name;
  const actual = breakdance(read(path.join('fixtures', `${name}.html`)), options);
  const expectedPath = path.join(__dirname, '../expected', `${destName}.md`);

  if (!fs.existsSync(expectedPath)) {
    console.log('expected path does not exist:', expectedPath);
    process.exit(1);
  }

  const expected = read(expectedPath);
  assert.equal(actual, expected, description);
};

export const inline = (html, markdown, options, description) => {
  const actual = breakdance(html, options);
  assert.equal(actual.replace(/\n$/, ''), markdown.replace(/\n$/, ''), description);
};

isEqual.inline = inline;
export default isEqual;
