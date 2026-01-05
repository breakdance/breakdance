
const cheerio = require('cheerio');
const extend = require('extend-shallow');
const utils = require('markdown-toc');

/**
 * Generate HTML navigation from headings
 */

module.exports = function(str, options) {
  const opts = extend({ id: 'toc', selectors: 'h1,h2' }, options);
  const classes = extend({ ol: '', li: '', a: 'toc-link' }, opts.classes);
  const $ = cheerio.load(str);
  const headings = $(opts.selectors);
  const navigation = [];
  const slugs = {};

  headings.map(function(i, ele) {
    const $ele = $(ele);
    const text = $ele.text();
    if (!text.trim()) return;

    let slug = utils.slugify(text);
    if (slugs.hasOwnProperty(slug)) {
      slugs[slug] = slugs[slug] + 1;
      slug += '-' + slugs[slug];
    } else {
      slugs[slug] = 0;
    }

    const node = {
      text: text.trim(),
      level: Number(ele.name.slice(1)),
      slug,
      $ele
    };

    const list = normalize(navigation, node.level, opts);
    list.push(node);
    $(this).before(anchor(node));
  });

  // var id = opts.id.charAt(0) !== '#' ? ('#' + opts.id) : opts.id;
  // $(id).html(renderList(navigation, classes));
  return $.html();
};

function renderList(nodes, classes) {
  let str = '';
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.slug) {
      str = renderItem(str, node, classes);
    }
  }
  return `\n<ol class="${classes.ol}">${str}\n</ol>\n`;
}

function renderItem(str, node, classes) {
  const inner = node.children ? renderList(node.children, classes) : '';
  const a = node.text ? link(node, classes) : '';
  const res = `  <li class="${classes.li}">` + a + inner + '</li>';
  str += '\n';
  str += res;
  return str;
}

function normalize(navigation, level, options) {
  if (level <= 2) {
    return navigation;
  }
  const node = navigation[navigation.length - 1];
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

function anchor(node, active) {
  return `<a class="toc-item" id="${node.slug}" title="${node.text}"></a>`;
}
