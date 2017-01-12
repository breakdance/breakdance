'use strict';

var log = require('log-utils');
var diff = require('diff');
var path = require('path');
var assert = require('assert');
var read = require('./read');
var breakdance = require('../..');

module.exports = function(name, expectedName, options) {
  if (typeof expectedName !== 'string') {
    options = expectedName;
    expectedName = null;
  }
  var actual = breakdance(read(path.join('fixtures', name + '.html')), options);
  // console.log(actual)
  var expected = read(path.join('expected', (expectedName || name) + '.md'));
  if (actual !== expected) {
    // process.stderr.write('\n\n');
    // process.stderr.write(name);
    // process.stderr.write('\n');
    // process.stderr.write('----')
    // process.stderr.write('\n');
    stringDiff(actual, expected);
    // process.exit();
  }
  // assert.strictEqual(actual, expected);
};

module.exports.inline = function(html, markdown, options) {
  assert.strictEqual(breakdance(html, options).replace(/\n$/, ''), markdown.replace(/\n$/, ''));
};


function stringDiff(a, b, method) {
  diff[method || 'diffWords'](a, b).forEach(function(stat) {
  // diff[method || 'diffWordsWithSpace'](a, b).forEach(function(stat) {
    process.stderr.write(log.colors[color(stat)](stat.value));
  });
  console.error();
}

function color(stat) {
  if (stat.removed) return 'red';
  if (stat.added) return 'green';
  return 'gray';
}
