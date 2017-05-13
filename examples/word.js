#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var util = require('util');
var breakdance = require('..');
var argv = require('yargs-parser')(process.argv.slice(2));
var name = argv._[0];

var fp = path.join(process.cwd(), 'test/fixtures', name + '.html');
var str = fs.readFileSync(fp, 'utf8');

/**
 * Convert MS Word documents to markdown (this is not finished,
 * but it works)
 */

var res = breakdance(str, {
  preprocess: function fn(node, prev, $) {
    if (node.name === 'html' && node.attribs) {
      if (/office:word$/.test(node.attribs['xmlns:w'])) {
        fn.isOffice = true;
      }
    }

    if (!fn.isOffice) return;

    if (node.name === 'p' && node.attribs.class === 'MsoTitle') {
      node.type = 'h1';
      var text = $('span', node).text().trim();
      if (!text) node.type = 'text';
      node.val = text;
      delete node.name;
      delete node.tag;

    } else if (/^h[1-6]/.test(node.name)) {
      node.name = node.name.replace(/^h([1-5])/, function(m, $1) {
        return 'h' + (+$1 + 1);
      })
    }
  }
});

console.log(res.replace(/Õ/g, '\''));
