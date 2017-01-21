'use strict';

var util = require('snapdragon-util');
var trimTrailing = require('trim-trailing-lines');
var trimLeading = require('trim-leading-lines');
var define = require('define-property');
var extend = require('extend-shallow');
var repeat = require('repeat-string');
var unescape = require('unescape');
var prettify = require('./prettify');
var compilers = require('./compilers/');
var tableize = require('./tables');
var helpers = require('./helpers');
var utils = require('./utils');
var block = helpers.block;

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
    var plugins = snapdragon._plugins;

    snapdragon.compiler.isInside = function(node, types) {
      return util.isInside(state, node, types);
    };

    snapdragon.compiler.visit = function(node, nodes, i) {
      var compilerOpts = this.options.compiler || {};
      var compiler = compilerOpts[node.type];
      if (compiler === false) {
        return;
      }

      var before = plugins.before[node.type];
      var after = plugins.after[node.type];
      var newNode;

      if (typeof before === 'function') {
        before.apply(snapdragon.compiler, arguments);
      }

      if (helpers.isOpen(node)) helpers.addType(state, node);
      if (helpers.isClose(node)) helpers.removeType(state, node);
      state.nodes.push(node);

      if (typeof compiler === 'function') {
        newNode = compiler.apply(snapdragon.compiler, arguments) || node;
      } else {
        newNode = visit.apply(snapdragon.compiler, arguments) || node;
      }

      if (typeof after === 'function') {
        return after.call(snapdragon.compiler, newNode, nodes, i);
      }
      return newNode;
    };

    /**
     * Compilers
     */

    snapdragon.compiler

      /**
       * Beginning of string
       */

      .set('bos', util.noop)

      /**
       * Directives and comments
       */

      .set('doctype', util.noop)
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

      .set('base', util.noop)
      .set('head', block('', ''))
      .set('link', util.noop)
      .set('meta', util.noop)
      .set('style', util.noop)
      .set('title', function(node) {
        if (this.options.title === true) {
          this.emit('# ' + node.val + '\n\n');
        }
      })

      /**
       * Scripting
       */

      .set('noscript', block('', ''))
      .set('script', util.noop)

      /**
       * Sections
       */

      .set('address', block('\n<address>\n', '\n</address>\n')) // contact information
      .set('article', block('', '')) // article
      .set('aside', util.noop)    // tangential/related content
      .set('body', block('', ''))    // document body
      .set('footer', block('', ''))  // footer
      .set('main', block('', ''))    // main content of the <body>
      .set('nav', block('', ''))     // group of navigational links
      .set('section', block('', '')) // section of content

      /**
       * Headings (WC3 "section" elements)
       */

      .set('h1', block('\n\n# ', '\n\n', state))
      .set('h2', block('\n\n## ', '\n\n', state))
      .set('h3', block('\n\n### ', '\n\n', state))
      .set('h4', block('\n\n#### ', '\n\n', state))
      .set('h5', block('\n\n##### ', '\n\n', state))
      .set('h6', block('\n\n###### ', '\n\n', state))
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
        node.newline = this.isInside(node, ['blockquote', 'li']) ? '' : '\n';
        this.mapVisit(node, function(tok) {
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
        if (this.isInside(node.parent, ['blockquote'])) {
          this.emit('\n');
        }
      })

      /**
       * Horizontal rules ("thematic breaks")
       */

      .set('hr', function(node) {
        this.emit('\n\n***\n\n', node);
      })

      /**
       * Line and word breaks
       */

      .set('br', function(node) {
        if (!this.isInside(node, /^h[1-6]$/)) {
          this.emit('<br>\n', node);
        }
      })
      .set('wbr', function(node) {
        this.emit('<wbr>', node);
      })

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
        var ch = this.output.slice(-1);
        var addPrefix = !utils.isSeparator(ch)
          && !utils.isWrappingChar(ch)
          && !utils.isStartingChar(ch);

        if (utils.isWrappingChar(ch) && !this.isInside(node, ['strong', 'em'])) {
          addPrefix = true;
        }

        node.prefix = addPrefix ? ' ' : '';
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
        this.mapVisit(node);
      })
      .set('code.open', function(node) {
        var parent = node.parent;
        if (!opts().literalPre && helpers.isType(parent.parent, 'pre')) {
          this.emit('\n\n', node);
          this.emit('```');
          this.emit(node.parent.lang || '');
          this.emit('\n');
        } else {
          this.emit(node.parent.prefix + node.parent.delim, node);
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
       * Inline quoted text
       */

      .set('q', block('<q>', '</q>'))

      /**
       * Blockquotes
       */

      .set('blockquote', function(node) {
        normalize.call(this, node, state, options);
        this.emit('\n');
        this.mapVisit(node);
      })
      .set('blockquote.open', function(node) {
        state.blockquotes++;
        this.emit(repeat('>', state.blockquotes) + ' ', node);
      })
      .set('blockquote.close', function(node) {
        state.blockquotes--;
      })

      /**
       * Cited title of a work
       */

      .set('cite', block('<cite>', '</cite>'))

      /**
       * Ordered list
       */

      .set('ol', function(node) {
        normalize.call(this, node, state, options);
        this.mapVisit(node);
      })
      .set('ol.open', function(node) {
        if (state.lists.length) state.indent += '  ';
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
        this.mapVisit(node);
      })
      .set('ul.open', function(node) {
        if (state.lists.length) state.indent += '  ';
        state.lists.push('ul');
      })
      .set('ul.close', function(node) {
        state.indent = state.indent.slice(2);
        state.lists.pop();
        if (!state.lists.length) {
          var newline = node.parent.newline;
          this.emit(newline + newline, node);
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
          this.mapVisit(node);
        }
      })
      .set('li.open', function(node) {
        var len = state.lists.length;
        var ch = '';

        var opts = this.options.ol || {};
        var type = state.lists[len - 1];

        if (type === 'ol') {
          if (opts.one === true) {
            ch = '1.';
          } else {
            var n = state.ol.pop();
            ch = (n++) + '.';
            state.ol.push(n);
          }
        } else {
          ch = bullets[(len ? len - 1 : 0) % bullets.length];
        }

        // emit indentation and bullet
        this.emit(state.indent, node);
        this.emit(ch + ' ', node);
      })
      .set('li.close', function(node) {
        this.output = this.output.replace(/\s+$/, '');
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
        this.mapVisit(node);
        this.emit('\n');
      })
      .set('table.open', util.noop)
      .set('table.close', function(node) {
        state.tables.pop();
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
        this.mapVisit(node);
      })
      .set('thead.open', util.noop)
      .set('thead.close', util.noop)

      /**
       * Table body
       */

      .set('tbody', function(node) {
        this.mapVisit(node);
      })
      .set('tbody.open', function(node) {
        var table = utils.last(state.tables);
        var row = table.aligmentRow;
        if (row.length) {
          this.emit('| ');
          this.emit(row.join(' | '), node);
          this.emit(' | ');
          this.emit('\n');
        }
      })
      .set('tbody.close', util.noop)

      /**
       * Table footer
       */

      .set('tfoot', function(node) {
        this.mapVisit(node);
      })
      .set('tfoot.open', util.noop)
      .set('tfoot.close', util.noop)

      /**
       * Table row
       */

      .set('tr', function(node) {
        this.mapVisit(node);
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
        this.mapVisit(node);
      })
      .set('th.open', util.noop)
      .set('th.close', function(node) {
        this.emit(' | ', node);
      })

      /**
       * Table cell
       */

      .set('td', function(node) {
        this.mapVisit(node);
      })
      .set('td.open', util.noop)
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
        this.mapVisit(node);
      })
      .set('a.open', function(node) {
        if (node.parent.anchor) {
          this.emit('<a name="' + node.parent.anchor + '">', node);
          return;
        }

        if (/[)\]\w.]$/.test(this.output)) {
          this.emit(' ');
        } else if (/\*$/.test(this.output) && !this.isInside(node, 'strong')) {
          this.emit(' ');
        } else if (/\_$/.test(this.output) && !this.isInside(node, 'em')) {
          this.emit(' ');
        } else if (/\|$/.test(this.output) && this.isInside(node, 'table')) {
          this.emit(' ');
        } else {
          this.output = this.output.replace(/\n[ \t]+$/, '\n');
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
        node.delim = this.isInside(node, 'em') ? '' : '_';
        this.mapVisit(node);
      })
      .set('em.open', function(node) {
        var ch = this.output.slice(-1);
        if (this.output && /[^\s\(\["]/.test(ch)) {
          if (!(this.isInside(node, 'strong') && ch === '*')) {
            this.emit(' ');
          }
        }
        this.emit(node.parent.delim, node);
      })
      .set('em.close', function(node) {
        this.emit(node.parent.delim, node);
      })

      /**
       * Strong importance (text-level semantics)
       */

      .set('strong', function(node) {
        node.delim = this.isInside(node, 'strong') ? '' : '**';
        this.mapVisit(node);
      })
      .set('strong.open', function(node, nodes, i) {
        var ch = this.output.slice(-1);
        if (this.output && /[^\s\(\[]/.test(ch)) {
          if (!(this.isInside(node, 'em') && ch === '_')) {
            this.emit(' ');
          }
        }
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

      .set('area', util.noop)   // image-map hyperlink
      .set('audio', util.noop)  // audio stream
      .set('canvas', util.noop) // canvas for dynamic graphics
      .set('embed', util.noop)  // integration point for plugins
      .set('iframe', util.noop) // nested browsing context (inline frame)
      .set('map', util.noop)    // image-map definition
      .set('object', util.noop) // generic external content
      .set('param', util.noop)  // initialization parameters for plugins
      .set('source', util.noop) // media source
      .set('track', util.noop)  // supplementary media track
      .set('video', util.noop)  // video

      /**
       * Images
       */

      .set('img', function(node) {
        var attribs = node.attribs || {};
        if (attribs.src) {
          this.emit('![' + (attribs.alt || '').trim(), node);
          this.mapVisit(node);
          var src = helpers.resolveLink(node, 'src', state, this.ast, opts());
          this.emit(']' + src, node);
        }
      })

      /**
       * Form-related elements
       */

      .set('button', util.noop)     // button
      .set('datalist', util.noop)   // predefined options for other controls
      .set('fieldset', block('', ''))  // set of related form controls
      .set('form', util.noop)       // user-submittable form
      .set('input', util.noop)      // input control
      .set('keygen', util.noop)     // key-pair generator/input control (deprecated)
      .set('label', block('', ''))     // caption for a form control
      .set('legend', block('', ''))    // title or explanatory caption
      .set('meter', util.noop)      // scalar gauge
      .set('optgroup', block('', ''))  // group of options
      .set('option', block('', ''))    // option
      .set('output', block('', ''))    // result of a calculation in a form
      .set('progress', util.noop)   // progress indicator
      .set('select', block('', ''))    // option-selection form control
      .set('textarea', block('', ''))  // text input area

      /**
       * Interactive elements
       */

      .set('command', util.noop) //<= deprecated in favor of <menuitem>
      .set('details', block('<details>', '</details>'))
      .set('menu', block('', ''))
      .set('menuitem', block('', ''))

      /**
       * Ruby annotation, parenthesis and text
       */

      .set('ruby', util.noop)
      .set('rb', util.noop)
      .set('rp', util.noop)
      .set('rt', util.noop)
      .set('rtc', util.noop)

      /**
       * Obsolete, deprecated or other elements we don't want to render
       * (please create an issue to discuss if we should reconsider any
       * of these, or to let us know if we missed something)
       */

      .set('acronym', block('<acronym>', '</acronym>'))
      .set('big', util.noop)
      .set('data', util.noop)
      .set('dialog', util.noop)
      .set('math', util.noop)
      .set('svg', util.noop)
      .set('template', util.noop)
      .set('tt', util.noop)

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
          if (this.output.leadingNewline === true) {
            this.output = '\n' + trimLeading(this.output);
          }

          if (opt.condense !== false) {
            this.output = utils.condense(this.output);
          }

          if (this.output.trailingWhitespace !== false) {
            this.output = this.output.replace(/[ \t]+(\n|$)$/gm, '$1');
          }

          if (this.output.trailingNewline !== false) {
            this.output = trimTrailing(this.output) + '\n';
          }
        }
      });

    if (typeof options.compilers === 'function') {
      snapdragon.use(options.compilers);
    }

    function opts() {
      return extend({}, snapdragon.options, options);
    }

    function normalize(node, state, options) {
      if (options.normalize === false) return;
      if (node.type === 'ul' || node.type === 'ol') {
        node.newline = this.isInside(node, 'table') ? '' : '\n';
        if (!state.lists.length) {
          this.emit(node.newline, node);
        }
      }
    }

    function emphasis(openTag) {
      return function(node) {
        if (helpers.isEmptyNodes(node, openTag)) return;
        if (/(^|\w)$/.test(this.output)) this.emit(' ');
        this.mapVisit(node);
      };
    }
  };
};
