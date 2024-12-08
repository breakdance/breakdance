#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import parse from 'yargs-parser';
import { breakdance } from '..';

const argv = parse(process.argv.slice(2));
const name = argv._[0];

const fp = path.join(process.cwd(), 'test/fixtures', name + '.html');
const str = fs.readFileSync(fp, 'utf8');

/**
 * Convert MS Word documents to markdown (this is not finished,
 * but it works)
 */

const res = breakdance(str, {
  preprocess: function fn(node, prev, $) {
    if (node.name === 'html' && node.attribs) {
      if (/office:word$/.test(node.attribs['xmlns:w'])) {
        fn.isOffice = true;
      }
    }

    if (!fn.isOffice) return;

    if (node.name === 'p' && node.attribs.class === 'MsoTitle') {
      node.type = 'h1';
      const text = $('span', node).text().trim();
      if (!text) node.type = 'text';
      node.val = text;
      delete node.name;
      delete node.tag;

    } else if (/^h[1-6]/.test(node.name)) {
      node.name = node.name.replace(/^h([1-5])/, function(m, $1) {
        return 'h' + (Number($1) + 1);
      });
    }
  }
});

console.log(res.replace(/Õ/g, '\''));
