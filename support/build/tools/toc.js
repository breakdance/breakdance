'use strict';

/**
 * anchorize
 */

var path = require('path');
var cheerio = require('cheerio');
var extend = require('extend-shallow');
var repeat = require('repeat-string');
var toc = require('markdown-toc');

module.exports = function(str, options) {
  str = str.replace(/(?:<p>)?\s*&lt;!--(.*?)--&gt;\s*(?:<\/p>)?/g, '<!--$1-->');
  var opts = extend({}, options);
  var tmpl = opts.template || require(path.join(__dirname, 'template.js'));
  var $ = cheerio.load(str);
  var tags = opts.tags || '.main-content h2,h3,h4';

  var stack = [];
  $(tags).each(function(idx, ele) {
    var m = /h([1-6])/.exec(ele.name);
    var lvl = m[1];
    var text = $(ele).html();
    var slug = toc.slugify(text);
    var tok = {slug: slug, text: text, lvl: lvl, prev: stack[stack.length - 1]};

    stack.push(tok);
    $(ele).append(tmpl(slug));
  });

  var res = '\n<ul id="toc">\n';
  var prefix = '  ';
  var first = stack[0];
  var prevLi;

  for (var i = 0; i < stack.length; i++) {
    var tok = stack[i];
    var next = stack[i + 1];

    var li = `<li><a href="#${tok.slug}">` + tok.text + `</a>`;
    if (tok.prev && (tok.prev.lvl < tok.lvl)) {
      prefix += '  ';
      var l = '\n' + prefix + '<ul>\n';
      prefix += '  ';
      l += prefix + li;
      if (next && next.lvl === tok.lvl) {
        l += '</li>\n';
      }
      li = l;
    } else if (next && (next.lvl < tok.lvl)) {
      li = prefix + li + '</li>\n';
      prefix = prefix.slice(2);
      li += prefix + '</ul>\n';
      prefix = prefix.slice(2);
      li += prefix + '</li>\n';
    } else if (next && (next.lvl > tok.lvl)) {
      li = prefix + li;

    } else {
      li = prefix + li + '</li>\n';
    }

    prevLi = li;
    res += li;
  }

  str = $.html();
  res += '</ul>';
  res += '\n';

  if (opts.details) {
    var details = `<${opts.details === 'open' ? 'details open' : 'details'}>\n  <summary>Table of contents</summary>`
      + res.split('\n').map(function(line) {
        return '  ' + line;
      }).join('\n').replace(/\s+$/, '')
      + '\n</details>';
    res = details;
  }

  res += '<br>';

  if (/<!-- toc -->/.test(str)) {
    return str.replace(/\s*<!-- toc -->/, res);
  }

  return res + str;
};
