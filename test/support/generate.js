'use strict';

var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio');
var dashcase = require('dashify');
var breakdance = require('../..');
var write = require('write');
var cwd = path.resolve.bind(path, __dirname);
var fp = cwd('../fixtures/mozilla-html-elements.html');
var html = fs.readFileSync(fp, 'utf8');

var $ = cheerio.load(html);
var stack = [];

$('h2,table').each(function(i, ele) {
  if (ele.name === 'h2') {
    stack.push('mozilla-html-' + dashcase($(this).text().trim()) + '');
  } else {
    var name = stack.pop();
    var expected = cwd('../expected', name + '.md');
    var fixture = cwd('../fixtures', name + '.html');
    var html = $.html(this);
    write.sync(fixture, html);
    write.sync(expected, breakdance(html));
    console.log('wrote:', name);
  }
});
