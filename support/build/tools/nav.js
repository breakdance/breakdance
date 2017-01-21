'use strict';

var cheerio = require('cheerio');
var extend = require('extend-shallow');
var utils = require('markdown-toc');

module.exports = function(str, options) {
  var opts = extend({id: 'toc', selectors: 'h2,h3'}, options);
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
    var list = normalize(navigation, level);
    node.level = level;
    list.push(node);
    $(this).prepend(anchor(slug));
  });

  var id = opts.id.charAt(0) !== '#' ? ('#' + opts.id) : opts.id;
  $(id).html(renderList(navigation));
  return $.html();
};

function renderItem(str, node) {
  var inner = node.children ? renderList(node.children) : '';
  var a = node.text ? link(node) : '';
  var res = '  <li>' + a + inner + '</li>';
  str += '\n';
  str += res;
  return str;
}

function renderList(nodes) {
  var str = '';
  for (var i = 0; i < nodes.length; i++) {
    str = renderItem(str, nodes[i]);
  }
  return `\n<ol>${str}\n</ol>\n`;
}

function normalize(navigation, level) {
  if (level <= 2) {
    return navigation;
  }
  var node = navigation[navigation.length - 1];
  if (!node.children) {
    node.children = [];
  }
  return normalize(node.children, level - 1);
}

function link(node) {
  return `<a href="#${node.slug}">${node.text}</a>`;
}

function anchor(slug) {
  return `<a name="${slug}" aria-hidden="true"></a>`;
}
