'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert').strict;
const write = require('write');
const read = require('./read');
const breakdance = require('../..');

module.exports = (name, expectedName, options, description) => {
  if (typeof expectedName !== 'string') {
    options = expectedName;
    expectedName = null;
  }

  let destName = expectedName || name;
  let actual = breakdance.render(read(path.join('fixtures', `${name}.html`)), options);
  let expectedPath = path.join(__dirname, '../expected', `${destName}.md`);
  if (!fs.existsSync(expectedPath)) {
    console.log('expected path does not exist:', expectedPath);
    process.exit();
  }

  let expected = read(expectedPath);
  assert.equal(actual, expected, description);
};

module.exports.inline = (html, markdown, options, description) => {
  let actual = breakdance.render(html, options);
  assert.equal(actual.replace(/\n$/, ''), markdown.replace(/\n$/, ''), description);
};

