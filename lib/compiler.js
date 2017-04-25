'use strict';

var util = require('snapdragon-util');
var Node = require('snapdragon-node');
var utils = require('breakdance-util');
var trimTrailing = require('trim-trailing-lines');
var trimLeading = require('trim-leading-lines');
var define = require('define-property');
var repeat = require('repeat-string');
var condense = require('condense-newlines');
var unescape = require('unescape');
var handlers = require('./handlers/');
var tables = require('./tables');
var block = utils.block;

/**
 * Register snapdragon compilers
 */

module.exports = function(breakdance, options) {
  options = options || {};

  return function(compiler) {
    // inside this function, "this" is the snapdragon instance

    var bullets = ['*', '-', '+'];
    var visit = compiler.visit;
    var before = breakdance.run('before', compiler);
    var after = breakdance.run('after', compiler);

    /**
     * Add the `isInside` method to the compiler instance
     */

    compiler.isInside = function(node, types) {
      return util.isInside(this.state, node, types);
    };

    /**
     * Wrap snapdragon's `visit` method, so that we can call
     * breakdance's "before" and "after" methods
     */

    compiler.visit = function(node, nodes, i) {
      // register a noop handler if an unrecognized HTML element is encountered
      if (!this.compilers[node.type] && this.options.knownOnly !== true) {
        this.set(node.type, util.noop);
      }

      var compilerOpts = this.options.compiler || {};
      var visitor = compilerOpts[node.type];
      if (visitor === false) {
        return;
      }

      // run any registered "before" plugins
      node = before.call(this, node) || node;

      // add or remove this node type from `state.types`
      if (util.isOpen(node)) util.addType(this.state, node);
      if (util.isClose(node)) util.removeType(this.state, node);

      if (typeof visitor === 'function') {
        node = visitor.apply(this, arguments) || node;
      } else {
        node = visit.apply(this, arguments) || node;
      }

      // run any registered "after" plugins
      node = after.call(this, node) || node;
      return node;
    };

    /**
     * Snapdragon compilers
     */

    compiler

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
          this.emit('<!--' + node.val + '-->');
        }
      })

      /**
       * Root element <html>
       */

      .set('html', block('', ''))

      /**
       * Text nodes
       */

      .set('text', handlers.text(options))

      /**
       * Document metadata
       */

      .set('head', block('', ''))
      .set('link', util.noop)
      .set('meta', util.noop)
      .set('style', util.noop)
      .set('title', function(node) {
        if (this.options.title === true) {
          this.emit('# ' + node.val + '\n\n');
        }
      })
      .set('base', function(node) {
        if (node.attribs && node.attribs.href && !this.options.domain) {
          this.options.domain = node.attribs.href;
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
      .set('aside', util.noop)       // tangential/related content
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
        this.mapVisit(node);
      })
      .set('p.open', function(node) {
        if (!this.isInside(node.parent, 'blockquote')) {
          this.emit('\n\n');
        }
      })
      .set('p.close', function(node) {
        this.emit('\n');
      })

      /**
       * Horizontal rules ("thematic breaks")
       */

      .set('hr', function(node) {
        this.emit('\n\n***\n\n');
      })

      /**
       * Line and word breaks
       */

      .set('br', function(node) {
        if (!this.isInside(node, /^h[1-6]$/)) {
          this.emit('<br>\n');
        }
      })
      .set('wbr', function(node) {
        this.emit('<wbr>');
      })

      /**
       * Pre-formatted text
       */

      .set('pre', handlers.pre(options))
      .set('pre.open', function(node) {
        this.emit(node.parent.gfm ? '' : '\n\n<pre>\n');
      })
      .set('pre.close', function(node) {
        this.emit(node.parent.gfm ? '' : '\n</pre>\n\n');
      })

      /**
       * Code
       */

      .set('code', function(node) {
        if (util.isEmptyNodes(node)) {
          adjustTrailingSpace(this);
          return;
        }

        node.delim = /`/.test(node.text) ? '``' : '`';
        if (node.html) {
          var type = node.parent.type;
          node.lang = type === 'pre' ? utils.getLang(node.attribs) : '';
          var text = {type: 'text', val: unescape(node.html)};
          if (node.lang) {
            text.val = node.text;
          }

          define(text, 'parent', node);
          define(text, 'prev', {});
          define(text, 'next', {});
          node.nodes = [text];
          util.wrapNodes(node, Node);
        }
        this.mapVisit(node);
      })
      .set('code.open', function(node) {
        adjustTrailingSpace(this);

        var parent = node.parent;
        if (!this.options.literalPre && util.isType(parent.parent, 'pre')) {
          this.emit('\n\n', node);
          this.emit('```');
          this.emit(langMap(node.parent.lang, this.options));
          this.emit('\n');
        } else {
          this.emit(node.parent.delim);
        }
      })
      .set('code.close', function(node) {
        var parent = node.parent;
        if (!this.options.literalPre && util.isType(parent.parent, 'pre')) {
          if (this.output.slice(-1) !== '\n') {
            this.emit('\n');
          }
          this.emit('```');
          this.emit('\n\n');
        } else {
          this.emit(node.parent.delim);
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
        normalize.call(this, node, options);
        this.emit('\n');
        this.mapVisit(node);
      })
      .set('blockquote.open', function(node) {
        this.state.blockquotes++;
        this.emit(repeat('>', this.state.blockquotes) + ' ');
      })
      .set('blockquote.close', function(node) {
        this.state.blockquotes--;
      })

      /**
       * Cited title of a work
       */

      .set('cite', block('<cite>', '</cite>'))

      /**
       * Ordered list
       */

      .set('ol', function(node) {
        normalize.call(this, node, options);
        this.mapVisit(node);
      })
      .set('ol.open', function(node) {
        if (this.state.lists.length) this.state.indent += '  ';
        this.state.lists.push('ol');
        this.state.ol.push(1);
      })
      .set('ol.close', function(node) {
        this.state.indent = this.state.indent.slice(2);
        this.state.lists.pop();
        this.state.ol.pop();
        if (!this.state.lists.length) {
          var newline = node.parent.newline;
          this.emit(newline + newline);
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
        normalize.call(this, node, options);
        this.mapVisit(node);
      })
      .set('ul.open', function(node) {
        if (this.state.lists.length) this.state.indent += '  ';
        this.state.lists.push('ul');
      })
      .set('ul.close', function(node) {
        this.state.indent = this.state.indent.slice(2);
        this.state.lists.pop();
        if (!this.state.lists.length) {
          var newline = node.parent.newline;
          this.emit(newline + newline);
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
          this.emit('\n');
          this.mapVisit(node);
        }
      })
      .set('li.open', function(node) {
        var len = this.state.lists.length;
        var ch = '';

        var opts = this.options.ol || {};
        var type = this.state.lists[len - 1];

        if (type === 'ol') {
          if (opts.one === true) {
            ch = '1.';
          } else {
            var n = this.state.ol.pop();
            ch = (n++) + '.';
            this.state.ol.push(n);
          }
        } else {
          ch = bullets[(len ? len - 1 : 0) % bullets.length];
        }

        // emit indentation and bullet
        this.emit(this.state.indent);
        this.emit(ch + ' ');
      })
      .set('li.close', function(node) {
        this.output = this.output.replace(/\s+$/, '');
      })

      /**
       * Definition lists
       */

      .set('dl', function(node) {
        this.emit('\n');
        this.emit(node.html);
      })
      .set('dt', block('<dt>', '</dt>'))
      .set('dd', block('<dd>', '</dd>'))

      /**
       * Tables (use `breakdance-tables` plugin)
       */

      .use(tables())

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
        var table = util.last(this.state.tables);
        var row = table.aligmentRow;
        if (row.length) {
          this.emit('| ');
          this.emit(row.join(' | '));
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
        this.emit('| ');
      })
      .set('tr.close', function(node) {
        this.emit('\n');
      })

      /**
       * Table header
       */

      .set('th', function(node) {
        var table = util.last(this.state.tables);
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
        this.output = this.output.replace(/\s+$/, ' ');
        this.emit(' | ');
      })

      /**
       * Table cell
       */

      .set('td', function(node) {
        this.mapVisit(node);
      })
      .set('td.open', util.noop)
      .set('td.close', function(node) {
        this.output = this.output.replace(/\s+$/, ' ');
        this.emit(' | ');
      })

      /**
       * Generic span
       */

      .set('span', block('', ''))

      /**
       * Anchors / hyperlinks (text-level semantics)
       */

      .set('a', function(node) {
        this.output = this.output.replace(/\n[ \t]+$/, ' ');
        var attribs = node.attribs || {};
        var name = attribs.name || attribs.id;
        var href = attribs.href;
        if (!name && !href) return;
        if (name && !href) {
          node.anchor = utils.slugify(name);
        }
        this.mapVisit(node);
      })
      .set('a.open', function(node) {
        if (node.parent.anchor) {
          this.emit('<a name="' + node.parent.anchor + '">');
          return;
        }
        // attempt to fix spacing around links, since HTML tags are more
        // forgiving of whitespace inconsistencies
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
        this.emit('[');
      })
      .set('a.close', function(node) {
        if (node.parent.anchor) {
          this.emit('</a>');
          return;
        }
        var href = utils.formatLink(node.parent, 'href', this);
        this.output = this.output.replace(/(?!\w)\s+$/, '');
        this.emit(']' + href);
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
        this.emit(node.parent.delim);
      })
      .set('em.close', function(node) {
        this.emit(node.parent.delim);
      })

      /**
       * Strong importance (text-level semantics)
       */

      .set('strong', function(node) {
        node.delim = this.isInside(node, 'strong') ? '' : '**';
        this.mapVisit(node);
      })
      .set('strong.open', function(node) {
        var ch = this.output.slice(-1);
        if (this.output && /[^\s\(\[]/.test(ch)) {
          if (!(this.isInside(node, 'em') && ch === '_')) {
            this.emit(' ');
          }
        }
        this.emit(node.parent.delim);
      })
      .set('strong.close', function(node) {
        this.emit(node.parent.delim);
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

      .set('i', block('_', '_'))

      /**
       * Bold (offset text conventionally styled in bold)
       */

      .set('b', block('**', '**'))

      /**
       * Underline (offset text conventionally styled with an underline)
       */

      .set('u', utils.emphasis('<u>'))
      .set('u.open', util.emit('<u>'))
      .set('u.close', util.emit('</u>'))

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

      .set('abbr', block('<abbr>', '</abbr>', function(node) {
        var attr = utils.toAttribs(node.attribs, ['title']);
        if (attr) {
          node.open = '<abbr' + attr + '>';
        }
      }))

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
          this.emit('![' + (attribs.alt || '').trim());
          this.mapVisit(node);
          var src = utils.formatLink(node, 'src', this);
          this.emit(']' + src);
        }
      })

      /**
       * Form-related elements
       */

      .set('button', util.noop)        // button
      .set('datalist', util.noop)      // predefined options for other controls
      .set('fieldset', block('', ''))  // set of related form controls
      .set('form', util.noop)          // user-submittable form
      .set('input', util.noop)         // input control
      .set('keygen', util.noop)        // key-pair generator/input control (deprecated)
      .set('label', block('', ''))     // caption for a form control
      .set('legend', block('', ''))    // title or explanatory caption
      .set('meter', util.noop)         // scalar gauge
      .set('optgroup', block('', ''))  // group of options
      .set('option', block('', ''))    // option
      .set('output', block('', ''))    // result of a calculation in a form
      .set('progress', util.noop)      // progress indicator
      .set('select', block('', ''))    // option-selection form control
      .set('textarea', block('', ''))  // text input area

      /**
       * SVG
       */

      .set('svg', util.noop)

      /**
       * Interactive elements
       */

      .set('command', util.noop) //<= WC3 deprecated in favor of <menuitem>
      .set('details', block('<details>', '</details>'))
      .set('menu', block('', ''))
      .set('menuitem', block('', ''))

      /**
       * Ruby annotation, parenthesis and text (not rendered)
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
      .set('template', util.noop)
      .set('tt', util.noop)

      /**
       * End-of-string
       */

      .set('eos', function(node) {
        if (this.output.trim !== false) {
          this.output = this.output.trim();
        }

        if (this.options.unsmarty !== false) {
          this.output = this.output
            .replace(/[‘’]/g, '\'')
            .replace(/[“”]/g, '"')
            .replace(/[\u2026…]/g, '...')
            .replace(/«/g, '<<')
            .replace(/»/g, '>>');
        }

        if (this.output) {
          if (this.output.leadingNewline === true) {
            this.output = '\n' + trimLeading(this.output);
          }

          if (this.options.condense !== false) {
            this.output = condense(this.output, this.options);
          }

          if (this.output.trailingWhitespace !== false) {
            this.output = this.output.replace(/[ \t]+(\n|$)$/gm, '$1');
          }

          if (this.output.trailingNewline !== false) {
            this.output = trimTrailing(this.output) + '\n';
          }
        }
      });

    function langMap(lang, options) {
      if (!lang) return '';

      if (options.normalizeGfmLang === false) {
        return lang;
      }

      lang = lang.toLowerCase();

      switch (lang) {
        case 'js':
        case 'javascript':
          return 'js';
        case 'md':
        case 'mdown':
        case 'mkdown':
        case 'markdown':
          return 'md';
        default: {
          return lang;
        }
      }
    }

    function normalize(node, options) {
      if (node.type === 'ul' || node.type === 'ol') {
        node.newline = this.isInside(node, ['table', 'dl']) ? '' : '\n';
        if (!this.state.lists.length) {
          this.emit(node.newline);
        }
      }
    }

    function adjustTrailingSpace(parser) {
      parser.output = stripTrailing(parser.output);

      switch (parser.output.slice(-2)) {
        case ' *':
        case ' _':
        case '**':
        case '__':
          if (/[ \t]?([*_]{1,2}(?![*_]))[^*_]+\1$/.test(parser.output)) {
            parser.output += ' ';
          }
          break;
        default:
          if (/[^-—(\[\s]$/.test(parser.output)) {
            parser.output += ' ';
          }
          break;
      }
    }

    function stripTrailing(str) {
      return str.replace(/[^\S\n]*\n[^\S\n]*$/, '');
    }
  };
};
