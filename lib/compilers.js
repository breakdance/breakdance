'use strict';

var get = require('get-value');
var define = require('define-property');
var extend = require('extend-shallow');
var repeat = require('repeat-string');
var inline = require('inline-elements');
var blocks = require('block-elements');
var prettify = require('./prettify');
var compilers = require('./compilers/');
var tableize = require('./tables');
var helpers = require('./helpers');
var utils = require('./utils');

/**
 * Register snapdragon compilers
 */

module.exports = function(options) {
  options = options || {};

  return function(snapdragon) {
    var bullets = ['*', '-', '+'];
    var state = {
      blockquotes: 0,
      title: '',
      indent: 0,
      tags: {},
      links: {},
      inside: {},
      tables: [],
      lists: [],
      nodes: [],
      types: [],
      pre: [],
      ol: []
    };

    function opts() {
      return extend({}, snapdragon.options, options);
    }

    var emitFn = snapdragon.compiler.emit;
    snapdragon.compiler.emit = function(val, node) {
      var type = node && node.parent && node.parent.type;
      if (node && helpers.isOpen(node)) {
        state.types.push(type);
        state.nodes.push(node.parent);
        this.inside = type;
        state.inside[type] = true;
        helpers.pushTag(state, node);
      }
      if (node && helpers.isClose(node)) {
        state.inside[type] = false;
        state.nodes.pop();
        state.types.pop();
        helpers.popTag(state, node);
      }
      return emitFn.call(snapdragon.compiler, val || '', node);
    };

    snapdragon.compiler.use(function() {
      this.whitespace = function(node) {
        if (this.output && !/\s$/.test(this.output)) {
          this.emit(' ');
        }
      };
    });

    snapdragon.compiler

      /**
       * Beginning of string
       */

      .set('bos', helpers.noop)

      /**
       * Document
       */

      .set('doctype', helpers.noop)
      .set('directive', helpers.noop)
      .set('comment', helpers.noop)
      .set('custom', helpers.noop)
      .set('tag', helpers.compile)

      /**
       * html
       */

      .set('html', helpers.compile)
      .set('html.open', helpers.noop)
      .set('html.close', helpers.noop)

      /**
       * head
       */

      .set('head', helpers.compile)
      .set('head.open', helpers.noop)
      .set('head.close', helpers.noop)

      /**
       * head tags
       */

      .set('noscript', block('', ''))
      .set('script', helpers.noop)
      .set('link', helpers.noop)
      .set('meta', helpers.noop)

      /**
       * title
       */

      .set('title', block('# ', '\n\n'))

      /**
       * body
       */

      .set('body', helpers.compile)
      .set('body.open', helpers.noop)
      .set('body.close', helpers.noop)
      .set('main', block('', ''))

      /**
       * div
       */

      .set('div', helpers.compile)
      .set('div.open', helpers.noop)
      .set('div.close', helpers.noop)

      /**
       * span
       */

      .set('span', helpers.compile)
      .set('span.open', helpers.noop)
      .set('span.close', helpers.noop)

      /**
       * Blockquotes
       */

      .set('blockquote', function(node) {
        this.mapVisit(node.nodes);
      })
      .set('blockquote.open', function(node) {
        this.emit('\n');
        this.emit((state.indent ? repeat('>', state.indent) : '') + '> ', node);
        state.blockquotes++;
        state.indent++;
      })
      .set('blockquote.close', function(node) {
        state.blockquotes--;
        state.indent--;
        this.emit('', node);
      })

      /**
       * Inline quotes
       */

      .set('q', function(node) {
        this.mapVisit(node.nodes);
      })
      .set('q.open', function(node) {
        this.emit('"', node);
      })
      .set('q.close', function(node) {
        this.emit('"', node);
      })

      /**
       * Delete and insert
       */

      .set('s', block('~~', '~~'))
      .set('del', block('~~', '~~'))
      .set('strike', block('~~', '~~'))
      .set('ins', block('++', '++'))

      /**
       * Keyboard
       */

      .set('kbd', block('<kbd>', '</kbd>'))

      /**
       * Pre-formatted text
       */

      .set('pre', function(node) {
        var replaceRe = /(?:lang(uage)?|highlight|source|brush)[-:]?| /g;
        var testRe = /(?:lang(uage)?|highlight|source|brush)/;

        var pre = opts().literalPre;
        if (!pre && !helpers.hasType(node.nodes, 'code')) {
          pre = true;
        }

        if (pre) {
          var lang = (node.attr && node.attr['data-lang']) || '';
          var attribs = node.attribs;

          if (!lang && attribs && attribs.class) {
            var cls = attribs.class;
            if (cls && testRe.test(cls)) {
              lang = cls.replace(replaceRe, '');
            }
          }

          var parent = node.parent || {};
          if (!lang && parent && parent.attribs) {
            cls = parent.attribs.class;
            if (cls && testRe.test(cls)) {
              lang = cls.replace(replaceRe, '');
            }
          }

          this.emit('\n\n```', node);
          this.emit(lang);
          this.emit(pre ? node.html : node.text, node);
          this.emit('```\n\n', node);
        } else if (node.nodes) {
          this.mapVisit(node.nodes);
        }
      })
      .set('pre.open', function(node) {
        this.emit(node.parent.gfm ? '' : '\n\n<pre>\n', node);
      })
      .set('pre.close', function(node) {
        this.emit(node.parent.gfm ? '' : '\n</pre>\n\n', node);
      })

      /**
       * Code
       */

      .set('code', function(node) {
        var html = node.parent.text || node.html;
        if (html) {
          var text = {type: 'text', val: html.trim()};
          define(text, 'parent', node);
          define(text, 'prev', {});
          define(text, 'next', {});
          node.nodes = [text];
          helpers.wrapNodes(node);
        }
        return helpers.compile.apply(this, arguments);
      })
      .set('code.open', function(node) {
        var parent = node.parent;
        if (!opts().literalPre && parent && helpers.isType(parent.parent, 'pre')) {
          var lang = parent.attribs['data-lang'];
          this.emit('\n\n```', node);
          this.emit(lang || '');
          this.emit('\n');
        } else {
          this.emit(!/[\s\[]$/.test(this.output) ? ' `' : '`', node);
        }
      })
      .set('code.close', function(node, nodes, i) {
        var parent = node.parent;
        if (!opts().literalPre && parent && helpers.isType(parent.parent, 'pre')) {
          this.emit('\n```\n\n', node);
        } else {
          this.emit('`', node);
        }
      })

      /**
       * Headings
       */

      .set('h1', block('\n\n# ', '\n\n'))
      .set('h2', block('\n\n## ', '\n\n'))
      .set('h3', block('\n\n### ', '\n\n'))
      .set('h4', block('\n\n#### ', '\n\n'))
      .set('h5', block('\n\n##### ', '\n\n'))
      .set('h6', block('\n\n###### ', '\n\n'))
      .set('header', block('', '\n\n'))
      .set('hgroup', block('', ''))

      /**
       * Horizontal rules and breaks
       */

      .set('hr', helpers.emit('\n\n***\n\n'))
      .set('br', helpers.emit('\n\n<br>\n\n'))
      .set('wbr', helpers.emit('<wbr>'))

      /**
       * Anchors
       */

      .set('a', function(node) {
        var attribs = node.attribs || {};
        var name = attribs.name || attribs.id;
        if (!attribs.href && name) {
          node.isAnchor = true;
          this.emit('<a name="' + helpers.slugify(name) + '"></a>', node);
        }
        this.mapVisit(node.nodes);
      })
      .set('a.open', function(node) {
        if (node.parent.isAnchor) {
          this.emit('', node);
          return;
        }
        if (!/(?:[\s*`_[\]]|<[^>]+?>)$/.test(this.output)) {
          this.emit(' ');
        }
        this.emit('[', node);
      })
      .set('a.close', function(node) {
        if (node.parent.isAnchor) {
          this.emit('', node);
          return;
        }
        var href = helpers.resolveLink(node, 'href', state, opts());
        this.emit(']' + href, node);
      })

      /**
       * Images
       */

      .set('img', function(node) {
        var attribs = node.attribs || {};
        if (attribs.src) {
          this.emit('![' + (attribs.alt || '').trim(), node);
          this.mapVisit(node.nodes);
          var src = helpers.resolveLink(node, 'src', state, opts());
          this.emit(']' + src, node);
        }
      })

      /**
       * Paragraphs
       */

      .set('p', function(node) {
        node.delim = (node.parent.type === 'li' || helpers.isType(node.parent, 'blockquote'))
          ? ''
          : '\n';

        this.emit(node.delim);
        this.mapVisit(node.nodes);
        this.emit(node.delim);
      })
      .set('p.open', helpers.noop)
      .set('p.close', function(node) {
        return this.emit(node.parent.delim ? '' : '\n', node);
      })

      /**
       * Navigation and menus
       */

      .set('nav', block('', ''))
      .set('menu', block('', ''))
      .set('menuitem', block('', ''))

      /**
       * Ordered lists
       */

      .set('ol', function(node) {
        node.delim = helpers.isInside(state, 'table') ? '' : '\n';
        if (!state.lists.length) this.emit(node.delim, node);
        this.mapVisit(node.nodes);
      })
      .set('ol.open', function(node) {
        this.emit('', node);
        state.lists.push('ol');
        state.ol.push(0);
        state.indent++;
      })
      .set('ol.close', function(node) {
        var delim = node.parent.delim;
        state.lists.pop();
        state.ol.pop();
        state.indent--;
        if (!state.lists.length) {
          this.emit(delim + delim, node);
        } else {
          this.emit('', node);
        }
      })

      /**
       * Unordered lists
       */

      .set('ul', function(node) {
        node.delim = helpers.isInside(state, 'table') ? '' : '\n';
        if (!state.lists.length) this.emit(node.delim, node);
        this.mapVisit(node.nodes);
      })
      .set('ul.open', function(node) {
        this.emit('', node);
        state.lists.push('ul');
        state.indent++;
      })
      .set('ul.close', function(node) {
        var delim = node.parent.delim;
        state.lists.pop();
        state.indent--;
        if (!state.lists.length) {
          this.emit(delim + delim, node);
        } else {
          this.emit('', node);
        }
      })

      /**
       * List items
       */

      .set('li', function(node) {
        var first = node.nodes[1];
        var last = utils.last(node.nodes, 2);
        if (first.type === 'text') {
          first.val = first.val.replace(/^\s+/, '');
        }
        if (last.type === 'text') {
          last.val = last.val.replace(/\s+$/, '');
        }
        if (node.text.trim()) {
          this.emit('\n');
          this.mapVisit(node.nodes);
        }
      })
      .set('li.open', function(node) {
        if (!node.parent.parent) {
          this.emit('', node);
          return;
        }

        var len = state.lists.length;
        var ch = '';

        var type = state.lists[len - 1];
        var opts = this.options.ol || {};

        if (type === 'ol') {
          var n = state.ol.pop();
          ch = (opts.one === true ? '1' : ++n) + '.';
          state.ol.push(n);
        } else if (len) {
          ch = bullets[len - 1 % bullets.length];
        }

        // emit indentation and bullet
        this.emit(repeat('  ', state.indent - 1), node);
        var hasText = !!node.parent.text.trim();
        this.emit(ch + ' ', node);
      })
      .set('li.close', function(node) {
        this.emit('', node);
      })

      /**
       * Emphasis
       */

      .set('em', function(node) {
        node.delim = helpers.isInside(state, 'em') ? '' : '_';
        this.mapVisit(node.nodes);
      })
      .set('em.open', function(node) {
        this.emit(node.parent.delim, node);
      })
      .set('em.close', function(node) {
        this.emit(node.parent.delim, node);
      })

      /**
       * Bold
       */

      .set('strong', function(node) {
        node.delim = helpers.isInside(state, 'strong') ? '' : '**';
        this.mapVisit(node.nodes);
      })
      .set('strong.open', function(node, nodes, i) {
        this.emit(node.parent.delim, node);
      })
      .set('strong.close', function(node) {
        this.emit(node.parent.delim, node);
      })

      /**
       * Tags we don't wan to render
       */

      .set('area', helpers.noop)
      .set('aside', helpers.noop)
      .set('button', helpers.noop)
      .set('embed', helpers.noop)
      .set('iframe', helpers.noop)
      .set('style', helpers.noop)
      .set('svg', helpers.noop)
      .set('time', helpers.noop)

      /**
       * Misc literal tags
       */

      .set('abbr', block('<abbr>', '</abbr>'))
      .set('address', block('\n<address>\n', '\n</address>\n'))
      .set('article', block('', ''))
      .set('b', block('<b>', '</b>'))
      .set('bdi', block('<bdi>', '</bdi>'))
      .set('bdo', block('<bdo>', '</bdo>'))
      .set('caption', block('<caption>', '</caption>\n'))
      .set('figcaption', block('', ''))
      .set('figure', block('', ''))
      .set('i', block('<i>', '</i>'))
      .set('samp', block('<samp>', '</samp>'))
      .set('section', block('', ''))
      .set('small', block('<small>', '</small>'))
      .set('sub', block('<sub>', '</sub>'))
      .set('sup', block('<sup>', '</sup>'))
      .set('u', block('<u>', '</u>'))
      .set('var', block('<var>', '</var>'))

      /**
       * Non-standard
       */

      .set('include-fragment', helpers.noop)
      .set('relative-time', helpers.noop)
      .set('time-ago', helpers.noop)
      .set('picture', helpers.noop)

      /**
       * Forms
       */

      .set('fieldset', block('', ''))
      .set('form', helpers.noop)
      .set('label', block('', ''))
      .set('legend', block('', ''))
      .set('optgroup', block('', ''))
      .set('option', block('', ''))
      .set('output', block('', ''))
      .set('select', block('', ''))
      .set('textarea', block('', ''))

      /**
       * Checklists
       */

      .set('input', function(node) {
        var type = get(node, 'attribs.type');
        var prefix = '';

        if (get(node.attribs, 'checked') === '') {
          type = 'checkbox checked';

        } else if (node.parent.type !== 'li') {
          var cls = get(node.parent.attribs, 'class');
          var m = /checkbox\s*(checked|active)?/.exec(cls);
          if (m) {
            type = m[1] ? 'checkbox checked' : 'checkbox';
            prefix = '* ';
          }
        }

        switch(type) {
          case 'checkbox checked':
          case 'checkbox active':
            this.emit(prefix + '[x] ', node);
            break;
          case 'checkbox':
            this.emit(prefix + '[ ] ', node);
            break;
          default:
            this.emit('', node);
            break;
        }
      })

      /**
       * Definition lists
       */

      .set('dl', block('<dl>', '</dl>'))
      .set('dt', block('<dt>', '</dt>'))
      .set('dd', block('<dd>', '</dd>'))
      .set('dfn', block('<dfn>', '</dfn>'))

      /**
       * Tables
       */

      .set('table', function(node) {
        tableize(node);
        node.aligmentRow = [];
        state.tables.push(node);
        this.emit('\n\n');
        this.mapVisit(node.nodes);
        this.emit('\n');
      })
      .set('table.open', function(node) {
        this.emit('', node);
      })
      .set('table.close', function(node) {
        state.tables.pop();
        this.emit('', node);
      })

      /**
       * <thead>
       */

      .set('thead', function(node) {
        this.mapVisit(node.nodes);
      })
      .set('thead.open', helpers.noop)
      .set('thead.close', helpers.noop)

      /**
       * <tbody>
       */

      .set('tbody', function(node) {
        this.mapVisit(node.nodes);
      })
      .set('tbody.open', function(node) {
        var table = utils.last(state.tables);
        var row = table.aligmentRow;
        if (row.length) {
          this.emit('| ');
          this.emit(row.join(' | '), node);
          this.emit(' | ');
          this.emit('\n');
        } else {
          this.emit('', node);
        }
      })
      .set('tbody.close', helpers.noop)

      /**
       * <tfoot>
       */

      .set('tfoot', function(node) {
        this.mapVisit(node.nodes);
      })
      .set('tfoot.open', helpers.noop)
      .set('tfoot.close', helpers.noop)

      /**
       * <tr>
       */

      .set('tr', function(node) {
        this.mapVisit(node.nodes);
      })
      .set('tr.open', function(node) {
        this.emit('| ', node);
      })
      .set('tr.close', function(node) {
        this.emit('\n', node);
      })

      /**
       * <th>
       */

      .set('th', function(node) {
        var table = utils.last(state.tables);
        switch (node.attribs.align) {
          case 'center':
            table.aligmentRow.push(':---:');
            break;
          case 'left':
            table.aligmentRow.push(':---');
            break;
          case 'right':
            table.aligmentRow.push('---:');
            break;
          default:
            table.aligmentRow.push('---');
            break;
        }
        this.mapVisit(node.nodes);
      })
      .set('th.open', helpers.noop)
      .set('th.close', function(node) {
        this.emit(' | ', node);
      })

      /**
       * <td>
       */

      .set('td', function(node) {
        this.mapVisit(node.nodes);
      })
      .set('td.open', helpers.noop)
      .set('td.close', function(node) {
        this.emit(' | ', node);
      })
      .set('col', block('', ''))
      .set('colgroup', block('', ''))

      /**
       * Text
       */

      .set('text', compilers.text(state, options))

      /**
       * Footers
       */

      .set('footer', helpers.compile)
      .set('footer.open', helpers.identity)
      .set('footer.close', helpers.identity)

      /**
       * <cite>
       */

      .set('cite', helpers.compile)
      .set('cite.open', function(node) {
        this.whitespace();
        this.emit(node.val, node);
      })
      .set('cite.close', function(node) {
        this.emit(node.val, node);
      })

      /**
       * Newlines
       */

      .set('newline', helpers.identity)

      /**
       * End-of-string
       */

      .set('eos', function(node) {
        if (this.output.trim !== false) {
          this.output = this.output.trim();
        }
        if (opts().reflinks) {
          this.output = helpers.generateReflinks(this.output, state);
        }

        if (opts().prettify === true) {
          this.output = prettify(this.output, this.options);

        } else if (this.output) {
          if (opts().condense !== false) {
            this.output = utils.condense(this.output);
          }

          if (this.output.leadingNewline === true) {
            this.output = '\n' + utils.trimLeading(this.output);
          }
          if (this.output.trailingNewline !== false) {
            this.output = utils.trimTrailing(this.output) + '\n';
          }
        }
      });

    blocks.forEach(function(name) {
      if (!snapdragon.compiler.compilers.hasOwnProperty(name)) {
        snapdragon.compiler.set(name, block('<' + name + '>', '</' + name + '>'));
      }
    });

    inline.forEach(function(name) {
      if (!snapdragon.compiler.compilers.hasOwnProperty(name)) {
        snapdragon.compiler.set(name, block('', ''));
      }
    });

    if (typeof options.compilers === 'function') {
      snapdragon.use(options.compilers);
    }

    function block(prefix, suffix) {
      return function(node) {
        var tags = this.options.omitTags;
        var type = node.type;

        if (Array.isArray(tags) && tags.indexOf(type) !== -1) {
          return;
        }
        if (!this.compilers.hasOwnProperty(type + '.open')) {
          this.set(type + '.open', helpers.noop);
          this.set(type + '.close', helpers.noop);
        }

        // see: edge-cases.md - headings #1
        if (/^h[1-6]/.test(type) && helpers.isType(node.parent, ['a', 'li'])) {
          prefix = '**';
          suffix = '**';
        }

        this.emit(prefix, node);
        this.mapVisit(node.nodes);
        this.emit(suffix, node);
      };
    }
  };
};

