'use strict';

var merge = require('mixin-deep');
var utils = require('breakdance-util');

module.exports = function(options) {
  return function(node, nodes, i) {
    var opts = merge({}, this.options, options);

    // if whitespace handling is disabled, or we're inside
    // a <pre> or <code> tag, just emit the string
    if (opts.whitespace === false || this.isInside(node, ['code', 'pre'])) {
      return this.emit(node.val);
    }

    if (this.isInside(node, ['p', 'li'])) {
      node.val = node.val.split(/\s+/).join(' ');
    }

    node.val = node.val.replace(/\&#\xA0;/g, ' ');
    var type = node.parent.type;
    var val = node.val;

    var lastChar = this.output.slice(-1);
    if (/\s/.test(lastChar)) {
      val = utils.trimLeft(val);
    }

    if (this.isInside(node, ['table', 'dl'])) {
      val = val.replace(/\s+/, ' ');
    }

    if (this.isInside(node, 'a') || type === 'a') {
      this.output = this.output.replace(/\[\s+$/, '[');
      val = val.replace(/^\[\s+/, '[').replace(/\s+/g, ' ');
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
        val = val.split(/[ \t]+/).join(' ');
        if (/[\w>`*._)\]]/.test(lastChar) && /[.`*_\w]/.test(val.charAt(0))) {
          this.emit(' ');
        }
        return this.emit(val);

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
        return this.emit(val);

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
        return this.emit(val.split(/[ \t]+/).join(' '));

      // heading wrappers
      case 'header':
      case 'hgroup':
        return this.emit(val);

      // content grouping
      case 'div':
      case 'figure':
      case 'figcaption':
        this.output = utils.trimRight(this.output);
        val = val.replace(/^\s+/, '');
        val = val.replace(/\n\s+$/, '\n');

        if (val && needsSpace(this.output, val)) {
          this.emit(' ');
        }
        return this.emit(val);

      // code and pre-formatted text
      case 'code':
      case 'pre':
        return this.emit(node.val);

      // keyboard and computer output
      case 'kbd':
      case 'samp':
      case 'var':
        return this.emit(val);

      // inline quoted text
      case 'q':
        return this.emit(val);

      // blockquotes
      case 'blockquote':
        return this.emit(val.trim());

      // cited title of a work
      case 'cite':
        return this.emit(val);

      // lists and list items
      case 'ol':
      case 'ul':
      case 'li':
        val = utils.stripNewlines(val);
        val = utils.trimRight(val);
        return this.emit(val);

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
        if (val === '<br>' || type === 'caption') {
          return this.emit(val);
        }

        if (!/\|\s+$/.test(this.output)) {
          this.output = this.output.replace(/\n[ \t]+$/, '\n');
        }

        val = val.replace(/^\s+/, '');
        if (val && needsSpace(this.output, val)) {
          this.emit(' ');
        }
        return this.emit(val);

      // anchor
      case 'a':
        val = utils.stripNewlines(val);
        if (lastChar === '[') {
          val = val.replace(/^\s+/, '');
        }
        if (/\w/.test(this.output.slice(-1)) && !/\s/.test(val.charAt(0))) {
          val = ' ' + val;
        }
        return this.emit(val);

      // span
      case 'span':
        return this.emit(val);

      // emphasis
      case 'em':
      case 'strong':
        this.output = this.output.replace(/\s+$/, '');
        val = val.replace(/\n/, '').trim();
        var ch = this.output.slice(-1);
        var isStart = (type === 'em' && ch === '_')
          || (type === 'strong' && ch === '*');

        if (!isStart && !/^\s/.test(val)) {
          if (val && needsSpace(this.output, val)) {
            this.emit(' ');
          }
        }
        return this.emit(val);

      // definition lists
      case 'dl':
      case 'dt':
      case 'dd':
        return this.emit(val.trim());

      // small print, subscript and superscript
      case 'small':
      case 'sub':
      case 'sup':
        return this.emit(val.trim());

      // italics (offset text conventionally styled in italic)
      case 'i':
        return this.emit(val.trim());

      // bold (offset text conventionally styled in bold)
      case 'b':
        return this.emit(val.trim());

      // underline (offset text conventionally styled with an underline)
      case 'u':
        return this.emit(val.trim());

      // insert and delete
      case 'ins':
      case 'del':
        return this.emit(val.trim());

      // strike (struck text)
      case 'strike':
      case 's':
        return this.emit(val.trim());

      // abbreviations
      case 'abbr':
        return this.emit(utils.trimLeft(val));

      // bidi isolate and override
      case 'bdi':
      case 'bdo':
        return this.emit(val.trim());

      // defining instance
      case 'dfn':
        return this.emit(val.trim());

      // highlighted text
      case 'mark':
        return this.emit(val.trim());

      // time
      case 'time':
        return this.emit(val.trim());

      // form-related elements
      case 'fieldset':
      case 'label':
      case 'legend':
      case 'optgroup':
      case 'option':
      case 'output':
      case 'select':
      case 'textarea':
        if (val && needsSpace(lastChar, val.charAt(0))) {
          this.emit(' ');
        }
        return this.emit(val);

      // interactive elements
      case 'details':
      case 'menu':
      case 'menuitem':
        return this.emit(val.trim());

      default: {
        return this.emit(val.split(/\s+/).join(' '));
      }
    }
  };
};

/**
 * a => ending character
 * b => starting character
 */

function needsSpace(a, b) {
  var aa = a.slice(-1);
  var bb = b.charAt(0);

  if (bb === '.' && /\w/.test(b.charAt(1)) && aa !== '\n') {
    return true;
  }

  if (utils.isEndingChar(bb)) {
    return false;
  }

  if (aa === '`' && !/\s/.test(a.charAt(a.length - 2))) {
    return true;
  }

  if (/[*_]/.test(aa) && /\w/.test(bb)) {
    return true;
  }

  if (utils.isOpeningChar(aa)) {
    return false;
  }

  if (utils.isTightSeparator(aa) || utils.isTightSeparator(bb)) {
    return false;
  }

  if ((utils.isLooseSeparator(aa) || utils.isLooseSeparator(bb)) && !/\s/.test(aa)) {
    return true;
  }

  if (/\s/.test(aa) && utils.isStartingChar(bb)) {
    return false;
  }

  if (utils.isWrappingChar(aa) && utils.isStartingChar(bb)) {
    return true;
  }

  if (utils.isEndingChar(aa) && !/<br>$/.test(a) && !/\s/.test(bb) && !utils.isEndingChar(bb)) {
    return true;
  }

  if ((utils.isStartingChar(bb) || utils.isWrappingChar(bb) || utils.isWrappingChar(aa)) && !utils.isStartingChar(aa)) {
    return true;
  }

  if (utils.isWordChar(aa) && utils.isWordChar(bb)) {
    return true;
  }

  if (/\W/.test(bb) && !utils.isStartingChar(bb) && !utils.isOpeningChar(bb) && !utils.isEndingChar(bb) && !utils.isSpecialChar(bb) && !utils.isSeparator(bb) && !utils.isStartingChar(aa)) {
    return true;
  }

  return false;
}
