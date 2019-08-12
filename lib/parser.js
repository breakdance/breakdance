'use strict';

const cheerio = require('cheerio');
const utils = require('./utils');

const {
  RE_BOM,
  RE_NEWLINES,
  RE_NON_BREAKING_SPACE,
  RE_TABS,
  RE_ZERO_WIDTH_SPACE
} = require('./constants');

exports.parse = (input, options = {}) => {
  const str = input.trim()
    .replace(RE_NON_BREAKING_SPACE, ' ')
    .replace(RE_ZERO_WIDTH_SPACE, '')
    .replace(RE_TABS, '  ');

  const lines = str
    .replace(RE_BOM, '')
    .split(RE_NEWLINES).map(line => {
      if (line.trim() === '') return '';
      return line;
    });

  let output = options.unindent !== false
    ? utils.unindent(lines.join('\n'))
    : lines.join('\n');

  let ast = cheerio.parseHTML(output, { normalizeWhitespace: false, ...options });
  let root = ast[0].root;

  utils.visit(root, node => {
    let isMatch = utils.pick(node, options);
    if (isMatch === true) {
      root = node;
      return false;
    }
  });

  return root;
};

