'use strict';

var cheerio = require('cheerio');
var extend = require('extend-shallow');
var utils = require('markdown-toc');

/**
 * Generate HTML navigation from headings
 */

module.exports = function(str, options) {
  var opts = extend({id: 'toc', selectors: 'h2,h3'}, options);
  var classes = extend({ol: '', li: '', a: ''}, opts.classes);
  var $ = cheerio.load(str);
  var headings = $(opts.selectors);
  var navigation = [];
  var slugs = {};

  headings.map(function(i, ele) {
    var $ele = $(ele);
    var text = $ele.text();
    if (!text.trim()) return;

    var slug = utils.slugify(text);
    if (slugs.hasOwnProperty(slug)) {
      slugs[slug] = slugs[slug] + 1;
      slug += '-' + slugs[slug];
    } else {
      slugs[slug] = 0;
    }

    var node = {
      text: text.trim(),
      slug: slug,
      $ele: $ele
    };

    var level = +ele.name.slice(1);
    var list = normalize(navigation, level, opts);
    node.level = level;
    list.push(node);
    $(this).prepend(anchor(slug));
  });

  var id = opts.id.charAt(0) !== '#' ? ('#' + opts.id) : opts.id;
  $(id).html(renderList(navigation, classes));
  return $.html();
};

function renderList(nodes, classes) {
  var str = '';
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    if (node.slug) {
      str = renderItem(str, node, classes);
    }
  }
  return `\n<ol class="${classes.ol}">${str}\n</ol>\n`;
}

function renderItem(str, node, classes) {
  var inner = node.children ? renderList(node.children, classes) : '';
  var a = node.text ? link(node, classes) : '';
  var res = `  <li class="${classes.li}">` + a + inner + '</li>';
  str += '\n';
  str += res;
  return str;
}

function normalize(navigation, level, options) {
  if (level <= 2) {
    return navigation;
  }
  var node = navigation[navigation.length - 1];
  if (typeof node === 'undefined') {
    throw new Error('navigation plugin cannot find selector(s): ' + options.selectors);
  }
  if (!node.children) {
    node.children = [];
  }
  return normalize(node.children, level - 1, options);
}

function link(node, classes) {
  return `<a href="#${node.slug}" class="${classes.a}">${node.text}</a>`;
}

function anchor(slug) {
  return `<a name="${slug}" aria-hidden="true"></a>`;
}
