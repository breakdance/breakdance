#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var breakdance = require('..');
var extend = require('extend-shallow');
var resolve = require('resolve-dir');
var argv = require('yargs-parser')(process.argv.slice(2));
var name = argv._[0];

var fp = path.resolve(resolve('~/dev/html'), name + '.html');
var fp = path.resolve(argv.d || resolve('~/dev/html'), name + '.html');
var str = fs.readFileSync(fp, 'utf8');
var opts = extend({}, argv);
var res = '';

if (argv.wiki) {
  opts = extend({}, require('../lib/plugins/wikipedia'), argv);
  res = breakdance(str, opts);
} else if (argv.moz) {
  opts = extend({}, require('../lib/plugins/mozilla'), argv);
  res = breakdance(str, opts);
} else {
  res = breakdance(str, extend({}, {
    prettify: true,
    reflinks: true
  }, argv));
}

console.log(res);
