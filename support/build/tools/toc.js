'use strict';

/**
 * anchorize
 */

var path = require('path');
var define = require('define-property');
var cheerio = require('cheerio');
var extend = require('extend-shallow');
var repeat = require('repeat-string');
var toc = require('markdown-toc');

/**
 * Default anchor template
 */

var template = require(path.join(__dirname, 'template.js'));

/**
 * Generate a HTML TOC from the given `str` and `options`.
 *
 * @param {String} `str`
 * @param {Object} `options`
 * @return {String} Returns the HTML string with the TOC injected
 * @api public
 */

// module.exports = function(str, options) {
//   str = str.replace(/(?:<p>)?\s*&lt;!--(.*?)--&gt;\s*(?:<\/p>)?/g, '<!--$1-->');
//   var opts = extend({}, options);
//   var tmpl = opts.template || template;
//   var $ = cheerio.load(str);
//   var tags = opts.tags || '.main-content h2,h3';

//   var rootNode = { type: 'toc', level: 0, indent: 0, nodes: [] };
//   var nodes = [rootNode];
//   var stack = [];

//   var headings = [];
//   var slugs = {};

  // function prev(n) {
  //   return stack.length > 0 ? last(stack, n) : last(nodes, n);
  // }

//   function Node(type, level, indent, parent) {
//     this.type = type;
//     this.indent = indent;
//     this.level = level;
//     define(this, 'parent', parent);
//   }

//   function openList(ele, last, parent) {
//     let ul = new Node('ul', level, last.indent + 2, parent);
//     ul.nodes = [];

//     let open = new Node('ul.open', ul.level, ul.indent, ul);
//     ul.nodes.push(open);

//     let li = { type: 'li', level: level, indent: ul.indent + 2, ele: ele };
//     define(li, 'parent', ul);
//     ul.nodes.push(li);
//   }

//   function closeList(ele, last, parent) {
//   }

//   function openItem(ele, last, parent) {
//     let li = new Node('li', parent.level, parent.indent + 2, parent);
//     li.ele = ele;
//     parent.nodes.push(li);
//   }

//   function closeItem(ele, last, parent) {
//     var li = last.nodes[last.nodes]
//   }

//   $(tags).each(function(idx, ele) {
//     let m = /h([2-3])/.exec(ele.name);
//     let level = m[1];
//     let text = $(ele).html();
//     let slug = toc.slugify(text);
//     ele.text = text;
//     ele.slug = slug;

//     if (slugs.hasOwnProperty(slug)) {
//       slugs[slug] = slugs[slug] + 1;
//       slug += '-' + slugs[slug];
//     } else {
//       slugs[slug] = 0;
//     }

//     var last = prev();
//     var type = 'ul';


//     if (level > last.level) {
//       // console.log(last);
//       // console.log(ele.name);
//       // console.log(text);

//       let ul = { type: 'ul', level: level, indent: last.indent + 2, nodes: [] };
//       let open = { type: 'ul.open', level: ul.level, indent: ul.indent };
//       define(open, 'parent', ul);
//       ul.nodes.push(open);

//       let li = { type: 'li', level: level, indent: ul.indent + 2, val: text };
//       define(li, 'parent', ul);
//       ul.nodes.push(li);

//       nodes.push(ul);
//       last.nodes.push(ul);

//     } else if (level < last.level) {
//       let ul = stack.pop();
//       ul.nodes.push({ type: 'ul.close', level: ul.level, indent: ul.indent });

//       last = prev();
//       let li = { type: 'li', level: level, indent: last.indent + 2, val: text };
//       define(li, 'parent', last);
//       // last.nodes.push(li);


//     } else {

//       // console.log(last);
//       // console.log(text);

//     }

//     $(ele).append(tmpl(slug));
//   });

//   console.log(nodes[0].nodes[0].nodes);

//   var list = '\n<ul id="toc">\n';
//   var prefix = '  ';
//   var first = headings[0];
//   var prevLi;

//   return '';

//   // for (let i = 0; i < headings.length; i++) {
//   //   let tok = headings[i];
//   //   let next = headings[i + 1];

//   //   let li = `<li><a href="#${tok.slug}">` + tok.text + `</a>`;
//   //   if (tok.prev && (tok.prev.level < tok.level)) {
//   //     prefix += '  ';
//   //     let l = '\n' + prefix + '<ul>\n';
//   //     prefix += '  ';
//   //     l += prefix + li;
//   //     if (next && next.level === tok.level) {
//   //       l += '</li>\n';
//   //     }
//   //     li = l;
//   //   } else if (next && (next.level < tok.level)) {
//   //     li = prefix + li + '</li>\n';
//   //     prefix = prefix.slice(2);
//   //     li += prefix + '</ul>\n';
//   //     prefix = prefix.slice(2);
//   //     li += prefix + '</li>\n';
//   //   } else if (next && (next.level > tok.level)) {
//   //     li = prefix + li;

//   //   } else {
//   //     li = prefix + li + '</li>\n';
//   //   }

//   //   prevLi = li;
//   //   list += li;
//   // }

//   // str = $.html();
//   // list += '</ul>';
//   // list += '\n';

//   // if (opts.details) {
//   //   let details = `<${opts.details === 'open' ? 'details open' : 'details'}>\n  <summary>Table of contents</summary>`
//   //     + list.split('\n').map(function(line) {
//   //       return '  ' + line;
//   //     }).join('\n').replace(/\s+$/, '')
//   //     + '\n</details>';
//   //   list = details;
//   // }

//   // list += '<br>';

//   // if (/<!-- toc -->/.test(str)) {
//   //   return str.replace(/\s*<!-- toc -->/, list);
//   // }

//   // return list + str;
// };

// function last(arr, n) {
//   return arr[arr.length - (n || 1)];
// }

// function Node(type, parent, level, indent) {
//   this.type = type;
//   this.indent = indent;
//   this.level = level;
//   define(this, 'parent', parent);
// }

// function Parser() {
//   var toc = { type: 'toc', level: 0, indent: 0, nodes: [] };
//   this.nodes = [toc];
//   this.stack = [];
// }

// Parser.prototype.prev = function() {
//   return this.stack.length > 0
//     ? last(this.stack, n)
//     : last(this.nodes, n);
// };

// Parser.prototype.openList = function(last, parent, ele) {
//   let ul = new Node('ul', parent, level, last.indent + 2);
//   ul.nodes = [];

//   let open = new Node('ul.open', ul);
//   ul.nodes.push(open);

//   let li = { type: 'li', level: level, indent: ul.indent + 2, ele: ele };
//   define(li, 'parent', ul);
//   ul.nodes.push(li);
// };

// Parser.prototype.closeList = function(last, parent, ele) {
// };

// Parser.prototype.openItem = function(last, parent, ele) {
//   let li = new Node('li', parent.level, parent.indent + 2, parent);
//   li.ele = ele;
//   parent.nodes.push(li);
// };

// Parser.prototype.closeItem = function(last, parent, ele) {
// };

// function openItem(last, parent, ele) {
//   var li = last(parent.nodes);
//   var close = new Node('li.close');
// }


// // Generate TOC HTML from an array of heading objects.
// function toc(headings, options) {
//   var cursor = 0;
//   var levels = [];
//   var tocs = [''];

//   for (var i = 0; i < headings.length; i++) {
//     var heading = headings[i];

//     while (heading.level < levels[0]) {
//       levels.shift();
//       cursor++;
//     }

//     var current = tocs[cursor];

//     if (levels.length === 0 || heading.level > levels[0]) {
//       levels.unshift(heading.level);
//       heading.depth = levels.length;
//       current += options.openUL(heading);
//       tocs.push(options.closeLI(heading) + options.closeUL(heading));
//     } else {
//       heading.depth = levels.length;
//       current += options.closeLI(heading);
//     }

//     current += options.openLI(heading);
//   }

//   return options.TOC({toc: tocs.join('')});
// };


var Templates = require('templates');
var tmpl = new Templates();
tmpl.engine('hbs', require('engine-handlebars'));

tmpl.on('view', function(view) {
  view.engine = 'hbs';
});

tmpl.create('partials', {viewType: 'partial'});
tmpl.create('pages');
tmpl.page('example', '{{partial "toc"}}');

tmpl.partial('toc', {
  data: {items: ['a', 'b', 'c']},
  content: [
    '<details>',
    '  {{partial "ul" .}}',
    '</details>'
  ].join('\n')
});

tmpl.partial('ul', {
  data: {text: 'foo'},
  content: [
    '<ul>',
    '    {{#each items as |item|}}',
    '    {{partial "li" item}}',
    '    {{/each}}',
    '  </ul>'
  ].join('\n'),
});

tmpl.partial('li', '<li>{{.}}</li>');

tmpl.render('example', function(err, page) {
  if (err) return console.log(err);
  console.log(page.contents.toString());
});

// var context = {};
// if (Array.isArray(locals) || typeof locals === 'string') {
//   context = locals;
// } else {
//   // calculate context
// }


var Handlebars = require('handlebars');
var fn = Handlebars.compile('{{#each items}}- {{.}}\n{{/each}}');
console.log(fn({items: ['a', 'b', 'c']}));
