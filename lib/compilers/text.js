'use strict';

var merge = require('mixin-deep');
var whitespace = require('./whitespace');
var helpers = require('../helpers');
var utils = require('../utils');

module.exports = function(options, state) {
  return function(node, nodes, i) {
    var opts = merge({}, this.options, options);

    if (typeof opts.text === 'function') {
      return opts.text.apply(this, arguments);
    }

    if (opts.text === false || helpers.isInside(state, node, ['code', 'pre'])) {
      return this.emit(node.val, node);
    }

    node.val = node.val.replace(/\&#\xA0;/g, ' ');
    var type = node.parent.type;
    var val = node.val;

    var lastChar = this.output.slice(-1);
    var firstChar = val.charAt(0);

    // console.log(type, [this.output, lastChar, node]);
    // console.log(type, [lastChar, node]);
    // console.log('----');

    if (/\s/.test(lastChar)) {
      val = utils.trimLeft(val);
    }

    if (helpers.isInside(state, node, 'a') || type === 'a') {
      this.output = this.output.replace(/\[\s+$/, '[');
      val = val.replace(/^\[\s+/, '[');
    }

    switch (type) {
      case 'string':
      case 'doctype':
      case 'base':
      case 'body':
      case 'head':
      case 'html':
      case 'link':
      case 'meta':
      case 'style':
      case 'script':
      case 'noscript':
      case 'title':
      case 'comment':
        // val = utils.stripNewlines(val);
        val = val.split(/[ \t]+/).join(' ');
        if (/[\w>`*._)\]]/.test(lastChar) && /[.`*_\w]/.test(val.charAt(0))) {
          this.emit(' ');
        }
        return this.emit(val, node);

      // sections
      case 'address':
      case 'article':
      case 'aside':
      case 'footer':
      case 'main':
      case 'nav':
      case 'section':
        val = utils.trimLeft(utils.stripNewlines(val));
        if (this.output && this.output.slice(-1) !== '\n') {
          this.emit(' ');
        }
        return this.emit(val, node);

      // headings
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        this.output = this.output.replace(/\s+$/, '');
        if (/[\w>`*_).?!:;,\]]/.test(lastChar) && /[.`*_\w]/.test(val.charAt(0))) {
          this.emit(' ');
        }
        val = ' ' + val.trim() + ' ';
        return this.emit(val.split(/[ \t]+/).join(' '), node);

      // heading wrappers
      case 'header':
      case 'hgroup':
        return this.emit(val, node);

      // content grouping
      case 'div':
      case 'figure':
      case 'figcaption':
        this.output = utils.trimRight(this.output);
        val = val.replace(/^\s+/, '');
        val = val.replace(/\n\s+$/, '\n');

        if (val && whitespace.needsSpace(this.output, val)) {
          this.emit(' ');
        }

        return this.emit(val, node);

      // paragraph text
      case 'p':
        return this.emit(val.replace(/^\n[ \t]+/, '\n'), node);

      // code and pre-formatted text
      case 'code':
      case 'pre':
        return this.emit(node.val, node);

      // keyboard and computer output
      case 'kbd':
      case 'samp':
      case 'var':
        return this.emit(val, node);

      // inline quoted text
      case 'q':
        return this.emit(val, node);

      // blockqutes
      case 'blockquote':
        return this.emit(val.trim(), node);

      // cited title of a work
      case 'cite':
        return this.emit(val, node);

      // lists and list items
      case 'ol':
      case 'ul':
      case 'li':
        val = utils.stripNewlines(val);
        val = utils.trimRight(val);
        // if (/(^|\n)\s*[-+*]\s+$/.test(this.output)) {
        //   // val = utils.trimLeft(val);
        //   // console.log(node)
        //   // process.exit()
        // }
        return this.emit(val, node);

      case 'table':
      case 'caption':
      case 'col':
      case 'colgroup':
      case 'thead':
      case 'tbody':
      case 'tfoot':
      case 'tr':
      case 'th':
      case 'td':
        if (val === '<br>') {
          return this.emit(val, node);
        }

        if (!/\|\s+$/.test(this.output)) {
          this.output = this.output.replace(/\n[ \t]+$/, '\n');
        }

        val = val.replace(/^\s+/, '');
        if (type !== 'caption' && val && whitespace.needsSpace(this.output, val)) {
          this.emit(' ');
        }
        // if (/[\w`*._)\]]/.test(lastChar) && /[`.*_\w]/.test(firstChar)) {
        //   this.emit(' ');
        // }
        return this.emit(val, node);

      // anchor
      case 'a':
        val = utils.stripNewlines(val);
        if (lastChar === '[') {
          val = val.replace(/^\s+/, '');
        }
        return this.emit(val, node);

      // span
      case 'span':
        throw new Error('not implemented yet: "' + type + '"');

      // emphasis
      case 'em':
      case 'strong':
        this.output = this.output.replace(/\s+$/, '');
        val = val.replace(/\n/, '').trim();
        var ch = this.output.slice(-1);
        var isStart = (type === 'em' && ch === '_')
          || (type === 'strong' && ch === '*')

        if (!isStart && !/^\s/.test(val)) {
          if (val && whitespace.needsSpace(this.output, val)) {
            this.emit(' ');
          }
        }

        return this.emit(val, node);

      // definition lists
      case 'dl':
      case 'dt':
      case 'dd':
        throw new Error('not implemented yet: "' + type + '"');

      // small print, subscript and superscript
      case 'small':
      case 'sub':
      case 'sup':
        return this.emit(val.trim(), node);

      // italics (offset text conventionally styled in italic)
      case 'i':
        return this.emit(val.trim(), node);

      // bold (offset text conventionally styled in bold)
      case 'b':
        return this.emit(val.trim(), node);

      // underline (offset text conventionally styled with an underline)
      case 'u':
        return this.emit(val.trim(), node);

      // insert and delete
      case 'ins':
      case 'del':
        return this.emit(val.trim(), node);

      // strike (struck text)
      case 'strike':
      case 's':
        return this.emit(val.trim(), node);

      // abbreviations
      case 'abbr':
        val = utils.trimLeft(val)
        return this.emit(val, node);

      // bidi isolate and override
      case 'bdi':
      case 'bdo':
        throw new Error('not implemented yet: "' + type + '"');

      // defining instance
      case 'dfn':
        throw new Error('not implemented yet: "' + type + '"');

      // highlighted text
      case 'mark':
        return this.emit(val.trim(), node);

      // time
      case 'time':
        return this.emit(val.trim(), node);

      // form-related elements
      case 'fieldset':
      case 'label':
      case 'legend':
      case 'optgroup':
      case 'option':
      case 'output':
      case 'select':
      case 'textarea':
        if (val && whitespace.needsSpace(lastChar, val.charAt(0))) {
          this.emit(' ');
        }
        return this.emit(val, node);

      // interactive elements
      case 'details':
      case 'menu':
      case 'menuitem':
        return this.emit(val.trim(), node);

      default: {
        throw new Error('not implemented yet: "' + type + '"');
        // return this.emit(val.split(/\s+/).join(' '), node);
      }
    }
  };
};

