'use strict';

var get = require('get-value');
var define = require('define-property');
var extend = require('extend-shallow');
var repeat = require('repeat-string');
var unescape = require('unescape');
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
      indent: '',
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

    snapdragon.compiler.state = state;
    snapdragon.compiler.indentList = '';

    /**
     * Customize snapdragon's `.emit` method
     */

    var visit = snapdragon.compiler.visit;
    snapdragon.compiler.visit = function(node, nodes, i) {
      if (helpers.isOpen(node)) helpers.addType(state, node);
      if (helpers.isClose(node)) helpers.removeType(state, node);
      return visit.apply(snapdragon.compiler, arguments);
    };

    /**
     * Compilers
     */

    snapdragon.compiler

      /**
       * Beginning of string
       */

      .set('bos', helpers.noop)

      /**
       * Directives and comments
       */

      .set('doctype', helpers.noop)
      .set('comment', function(node) {
        if (this.options.comments === true) {
          this.emit('<!--' + node.val + '-->', node);
        }
      })

      /**
       * Root element <html>
       */

      .set('html', block('', ''))

      /**
       * Text nodes
       */

      .set('text', compilers.text(options, state))

      /**
       * Document metadata
       */

      .set('base', helpers.noop)
      .set('head', block('', ''))
      .set('link', helpers.noop)
      .set('meta', helpers.noop)
      .set('style', helpers.noop)
      .set('title', function(node) {
        if (this.options.title === true) {
          this.emit('# ' + node.val + '\n\n');
        }
      })

      /**
       * Scripting
       */

      .set('noscript', block('', ''))
      .set('script', helpers.noop)

      /**
       * Sections
       */

      .set('address', block('\n<address>\n', '\n</address>\n')) // contact information
      .set('article', block('', '')) // article
      .set('aside', helpers.noop)    // tangential/related content
      .set('body', block('', ''))    // document body
      .set('footer', block('', ''))  // footer
      .set('main', block('', ''))    // main content of the <body>
      .set('nav', block('', ''))     // group of navigational links
      .set('section', block('', '')) // section of content

      /**
       * Headings (WC3 "section" elements)
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
       * Content grouping
       */

      .set('div', block('', ''))
      .set('figure', block('', ''))
      .set('figcaption', block('', ''))

      /**
       * Paragraphs (W3C "Grouping content")
       */

      .set('p', function(node) {
        node.newline = helpers.isInside(state, node, ['blockquote', 'li']) ? '' : '\n';
        this.mapVisit(node.nodes, function(tok) {
          if (tok.type === 'text' && tok.val.charAt(0) === '\n') {
            tok.val = utils.trimLeft(tok.val);
          }
          if (tok.type === 'text' && tok.val.slice(-1) === '\n') {
            tok.val = utils.trimRight(tok.val);
          }
        });
      })
      .set('p.open', function(node) {
        this.emit(node.parent.newline + node.parent.newline, node);
      })
      .set('p.close', function(node) {
        this.emit(node.parent.newline, node);
        if (helpers.isInside(state, node.parent, ['blockquote'])) {
          this.emit('\n');
        }
      })

      /**
       * Horizontal rules ("thematic breaks")
       */

      .set('hr', helpers.emit('\n\n***\n\n'))

      /**
       * Line and word breaks
       */

      .set('br', helpers.emit('<br>\n'))
      .set('wbr', helpers.emit('<wbr>'))

      /**
       * Pre-formatted text
       */

      .set('pre', compilers.pre(options))
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
        node.delim = /`/.test(node.text) ? '``' : '`';
        var html = node.html;

        if (html) {
          var type = node.parent.type;
          node.lang = type === 'pre' ? helpers.getLang(node.attribs) : '';
          var text = {type: 'text', val: unescape(html)};
          if (node.lang) {
            text.val = node.text;
          }

          define(text, 'parent', node);
          define(text, 'prev', {});
          define(text, 'next', {});
          node.nodes = [text];
          helpers.wrapNodes(node);
        }
        this.mapVisit(node.nodes);
      })
      .set('code.open', function(node) {
        var parent = node.parent;
        if (!opts().literalPre && helpers.isType(parent.parent, 'pre')) {
          this.emit('\n\n', node);
          this.emit('```');
          this.emit(node.parent.lang || '');
          this.emit('\n');
        } else {
          var prefix = !/[\s\[_*]$/.test(this.output) ? ' ' : '';
          this.emit(prefix + node.parent.delim, node);
        }
      })
      .set('code.close', function(node, nodes, i) {
        var parent = node.parent;
        if (!opts().literalPre && helpers.isType(parent.parent, 'pre')) {
          this.emit('\n', node);
          this.emit('```');
          this.emit('\n\n');
        } else {
          this.emit(node.parent.delim, node);
        }
      })

      /**
       * Keyboard
       */

      .set('kbd', block('<kbd>', '</kbd>'))

      /**
       * Computer output
       */

      .set('samp', block('<samp>', '</samp>'))
      .set('var', block('<var>', '</var>'))

      /**
       * Blockquotes
       */

      .set('blockquote', function(node) {
        normalize.call(this, node, state, options);
        this.emit('\n');
        this.mapVisit(node.nodes);
      })
      .set('blockquote.open', function(node) {
        state.blockquotes++;
        this.emit(repeat('>', state.blockquotes) + ' ', node);
      })
      .set('blockquote.close', function(node) {
        state.blockquotes--;
        this.emit('', node);
      })

      /**
       * Inline quoted text
       */

      .set('q', block('<q>', '</q>'))

      /**
       * Cited title of a work
       */

      .set('cite', block('<cite>', '</cite>'))

      /**
       * Ordered list
       */

      .set('ol', function(node) {
        normalize.call(this, node, state, options);
        this.mapVisit(node.nodes);
      })
      .set('ol.open', function(node) {
        if (state.lists.length) state.indent += '  ';
        this.emit('', node);
        state.lists.push('ol');
        state.ol.push(1);
      })
      .set('ol.close', function(node) {
        state.indent = state.indent.slice(2);
        state.lists.pop();
        state.ol.pop();
        if (!state.lists.length) {
          var newline = node.parent.newline;
          this.emit(newline + newline, node);
        } else {
          this.emit('', node);
        }

        // remove trailing empty list item
        if (/[0-9]\.\s+$/.test(this.output)) {
          this.output = this.output.replace(/[0-9]\.\s+$/, '\n');
        }
      })

      /**
       * Unordered lists
       */

      .set('ul', function(node) {
        normalize.call(this, node, state, options);
        this.mapVisit(node.nodes);
      })
      .set('ul.open', function(node) {
        if (state.lists.length) state.indent += '  ';
        this.emit('', node);
        state.lists.push('ul');
      })
      .set('ul.close', function(node) {
        state.indent = state.indent.slice(2);
        state.lists.pop();
        if (!state.lists.length) {
          var newline = node.parent.newline;
          this.emit(newline + newline, node);
        } else {
          this.emit('', node);
        }

        // remove trailing empty list item
        if (/[-*+]\s+$/.test(this.output)) {
          this.output = this.output.replace(/[-*+]\s+$/, '\n');
        }
      })

      /**
       * List items
       */

      .set('li', function(node) {
        if (node.text.trim()) {
          this.emit('\n', node);
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

        var opts = this.options.ol || {};
        var type = state.lists[len - 1];

        if (type === 'ol' && opts.one === true) {
          ch = '1.';
        } else if (type === 'ol') {
          var n = state.ol.pop();
          ch = (n++) + '.';
          state.ol.push(n);
        } else if (len) {
          ch = bullets[len - 1 % bullets.length];
        }

        // emit indentation and bullet
        this.emit(state.indent, node);
        this.emit(ch + ' ', node);
      })
      .set('li.close', function(node) {
        this.output = this.output.replace(/\s+$/, '');
        this.emit('', node);
      })

      /**
       * Definition lists
       */

      .set('dl', function(node) {
        this.emit('\n', node);
        this.emit(node.html);
      })
      .set('dt', block('<dt>', '</dt>'))
      .set('dd', block('<dd>', '</dd>'))

      /**
       * Tables
       */

      .set('table', function(node) {
        if (/<h[1-6][^>]*>/.test(node.html)) {
          this.emit('\n', node);
          this.emit(node.html);
          return;
        }

        helpers.visit(node, function(tok) {
          if (tok.type === 'br') {
            tok.type = 'text';
            tok.val = '';
          }
        });

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
       * Table caption
       */

      .set('caption', block('<caption>', '</caption>\n\n'))

      /**
       * Table columns and groups
       */

      .set('col', block('', ''))
      .set('colgroup', block('', ''))

      /**
       * Table head
       */

      .set('thead', function(node) {
        this.mapVisit(node.nodes);
      })
      .set('thead.open', helpers.noop)
      .set('thead.close', helpers.noop)

      /**
       * Table body
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
       * Table footer
       */

      .set('tfoot', function(node) {
        this.mapVisit(node.nodes);
      })
      .set('tfoot.open', helpers.noop)
      .set('tfoot.close', helpers.noop)

      /**
       * Table row
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
       * Table header
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
       * Table cell
       */

      .set('td', function(node) {
        this.mapVisit(node.nodes);
      })
      .set('td.open', helpers.noop)
      .set('td.close', function(node) {
        this.emit(' | ', node);
      })

      /**
       * Generic span
       */

      .set('span', block('', ''))

      /**
       * Anchors / hyperlinks (text-level semantics)
       */

      .set('a', function(node) {
        var attribs = node.attribs || {};
        var name = attribs.name || attribs.id;
        if (name && !attribs.href) {
          node.anchor = helpers.slugify(name);
        }
        this.mapVisit(node.nodes);
      })
      .set('a.open', function(node) {
        if (node.parent.anchor) {
          this.emit('<a name="' + node.parent.anchor + '">', node);
          return;
        }
        if (/\w$/.test(this.output)) {
          this.emit(' ');
        }
        this.emit('[', node);
      })
      .set('a.close', function(node) {
        if (node.parent.anchor) {
          this.emit('</a>', node);
          return;
        }
        var href = helpers.resolveLink(node, 'href', state, this.ast, opts());
        this.output = this.output.replace(/\s+$/, '');
        this.emit(']' + href, node);
      })

      /**
       * Emphatic stress (text-level semantics)
       */

      .set('em', function(node) {
        node.delim = helpers.isInside(state, node, 'em') ? '' : '_';
        if (/[-\w_.]/.test(this.output.slice(-1))) {
          this.emit(' ');
        }
        this.mapVisit(node.nodes);
      })
      .set('em.open', function(node) {
        this.emit(node.parent.delim, node);
      })
      .set('em.close', function(node) {
        this.emit(node.parent.delim, node);
      })

      /**
       * Strong importance (text-level semantics)
       */

      .set('strong', function(node) {
        node.delim = helpers.isInside(state, node, 'strong') ? '' : '**';
        if (/[-\w_.]/.test(this.output.slice(-1))) {
          this.emit(' ');
        }
        this.mapVisit(node.nodes);
      })
      .set('strong.open', function(node, nodes, i) {
        this.emit(node.parent.delim, node);
      })
      .set('strong.close', function(node) {
        this.emit(node.parent.delim, node);
      })

      /**
       * Small print, subscript and superscript
       */

      .set('small', block('<small>', '</small>'))
      .set('sub', block('<sub>', '</sub>'))
      .set('sup', block('<sup>', '</sup>'))

      /**
       * Italics (offset text conventionally styled in italic)
       */

      .set('i', emphasis('<i>'))
      .set('i.open', helpers.emit('<i>'))
      .set('i.close', helpers.emit('</i>'))

      /**
       * Bold (offset text conventionally styled in bold)
       */

      .set('b', emphasis('<b>'))
      .set('b.open', helpers.emit('<b>'))
      .set('b.close', helpers.emit('</b>'))

      /**
       * Underline (offset text conventionally styled with an underline)
       */

      .set('u', emphasis('<u>'))
      .set('u.open', helpers.emit('<u>'))
      .set('u.close', helpers.emit('</u>'))

      /**
       * Insert and delete
       */

      .set('ins', block('++', '++'))
      .set('del', block('~~', '~~'))

      /**
       * Strike (struck text)
       */

      .set('strike', block('~~', '~~'))
      .set('s', block('~~', '~~'))

      /**
       * Abbreviations
       */

      .set('abbr', block('<abbr>', '</abbr>'))

      /**
       * BiDi isolate and override
       */

      .set('bdi', block('<bdi>', '</bdi>'))
      .set('bdo', block('<bdo>', '</bdo>'))

      /**
       * Defining instance
       */

      .set('dfn', block('<dfn>', '</dfn>'))

      /**
       * Highlighted text
       */

      .set('mark', block('<mark>', '</mark>'))

      /**
       * Time
       */

      .set('time', block('<time>', '</time>'))

      /**
       * Embedded content
       */

      .set('area', helpers.noop)   // image-map hyperlink
      .set('audio', helpers.noop)  // audio stream
      .set('canvas', helpers.noop) // canvas for dynamic graphics
      .set('embed', helpers.noop)  // integration point for plugins
      .set('iframe', helpers.noop) // nested browsing context (inline frame)
      .set('map', helpers.noop)    // image-map definition
      .set('object', helpers.noop) // generic external content
      .set('param', helpers.noop)  // initialization parameters for plugins
      .set('source', helpers.noop) // media source
      .set('track', helpers.noop)  // supplementary media track
      .set('video', helpers.noop)  // video

      /**
       * Images
       */

      .set('img', function(node) {
        var attribs = node.attribs || {};
        if (attribs.src) {
          this.emit('![' + (attribs.alt || '').trim(), node);
          this.mapVisit(node.nodes);
          var src = helpers.resolveLink(node, 'src', state, this.ast, opts());
          this.emit(']' + src, node);
        }
      })

      /**
       * Form-related elements
       */

      .set('button', helpers.noop)     // button
      .set('datalist', helpers.noop)   // predefined options for other controls
      .set('fieldset', block('', ''))  // set of related form controls
      .set('form', helpers.noop)       // user-submittable form
      .set('keygen', helpers.noop)     // key-pair generator/input control (deprecated)
      .set('label', block('', ''))     // caption for a form control
      .set('legend', block('', ''))    // title or explanatory caption
      .set('meter', helpers.noop)      // scalar gauge
      .set('optgroup', block('', ''))  // group of options
      .set('option', block('', ''))    // option
      .set('output', block('', ''))    // result of a calculation in a form
      .set('progress', helpers.noop)   // progress indicator
      .set('select', block('', ''))    // option-selection form control
      .set('textarea', block('', ''))  // text input area

      /**
       * Input control (only "checklists" are rendered)
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

        switch (type) {
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
       * Interactive elements
       */

      .set('command', helpers.noop) //<= deprecated in favor of <menuitem>
      .set('details', block('<details>', '</details>'))
      .set('menu', block('', ''))
      .set('menuitem', block('', ''))

      /**
       * Ruby annotation, parenthesis and text
       */

      .set('ruby', helpers.noop)
      .set('rb', helpers.noop)
      .set('rp', helpers.noop)
      .set('rt', helpers.noop)
      .set('rtc', helpers.noop)

      /**
       * Obsolete, deprecated or other elements we don't want to render
       * (please create an issue to discuss if we should reconsider any
       * of these, or to let us know if we missed something)
       */

      .set('acronym', block('<acronym>', '</acronym>'))
      .set('big', helpers.noop)
      .set('data', helpers.noop)
      .set('dialog', helpers.noop)
      .set('math', helpers.noop)
      .set('svg', helpers.noop)
      .set('template', helpers.noop)
      .set('tt', helpers.noop)

      /**
       * End-of-string
       */

      .set('eos', function(node) {
        var opt = opts();

        if (this.output.trim !== false) {
          this.output = this.output.trim();
        }

        if (opt.reflinks) {
          this.output = helpers.generateReflinks(this.output, state);
        }

        if (opt.unsmarty !== false) {
          this.output = this.output
            .replace(/[‘’]/g, '\'')
            .replace(/[“”]/g, '"')
            .replace(/[\u2026…]/g, '...')
            .replace(/«/g, '<<')
            .replace(/»/g, '>>');
        }

        if (opt.prettify === true) {
          this.output = prettify(this.output, this.options);

        } else if (this.output) {
          if (opt.condense !== false) {
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

    if (typeof options.compilers === 'function') {
      snapdragon.use(options.compilers);
    }

    function opts() {
      return extend({}, snapdragon.options, options);
    }

    function block(prefix, suffix, visitor) {
      return function(node, nodes, i) {
        if (helpers.isEmptyNodes(node, prefix)) return;
        if (this.options[node.type] === false) {
          return;
        }

        if (typeof this.options[node.type] === 'function') {
          return this.options[node.type].apply(this, arguments);
        }

        var omit = this.options.omitTags;
        var type = node.type;

        if (Array.isArray(omit) && omit.indexOf(type) !== -1) {
          return;
        }

        var isVoid = helpers.isSelfClosing(node);
        if (!isVoid && !this.compilers.hasOwnProperty(type + '.open')) {
          this.set(type + '.open', helpers.noop);
          this.set(type + '.close', helpers.noop);
        }

        // convert headings to bold see: edge-cases.md - headings #1
        if (/^h[1-6]$/.test(type)) {
          helpers.visit(node, function(tok) {
            helpers.trimVal(tok);
          });

          if (helpers.isInside(state, node, ['a', 'li', 'table'])) {
            node.type = 'strong';
            prefix = '**';
            suffix = '**';
          }
        }

        if (typeof visitor === 'function') {
          visitor.call(this, node, nodes, i);
        }

        this.emit(prefix, node);
        this.mapVisit(node.nodes);
        this.emit(suffix, node);
      };
    }

    function normalize(node, state, options) {
      if (options.normalize === false) return;
      var self = this;

      if (node.type === 'ul' || node.type === 'ol') {
        node.newline = helpers.isInside(state, node, 'table') ? '' : '\n';
        if (!state.lists.length) {
          this.emit(node.newline, node);
        }
      }

      if (node.type === 'blockquote') {
        helpers.mapVisit(node.nodes, function(tok) {
          if (tok.type === 'text' && !tok.prev) {
            tok.val = utils.trimLeft(tok.val);
          }
        });
      }
    }

    function emphasis(openTag) {
      return function(node) {
        if (helpers.isEmptyNodes(node, openTag)) return;
        if (/(^|\w)$/.test(this.output)) this.emit(' ');
        this.mapVisit(node.nodes);
        var next = node.next || {val: ''};
        var ch = next.val.charAt(0);
        if (next.type === 'text' && !utils.isPunctuation(ch, true)) {
          this.emit(' ');
        }
      };
    }
  };
};

