#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var util = require('util');
var sledgehammer = require('..');
var helpers = require('../lib/helpers');
var utils = require('../lib/utils');
var argv = require('yargs-parser')(process.argv.slice(2));
var name = argv._[0];

var fp = path.join(process.cwd(), 'test/fixtures', name + '.html');
var str = fs.readFileSync(fp, 'utf8');

var res = sledgehammer(str, require('../lib/plugins/wikipedia'));
console.log(res);
