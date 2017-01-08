'use strict';

var merge = require('mixin-deep');
var isPunctuation = require('is-punctuation');
var isWhitespace = require('is-whitespace');
var helpers = require('../helpers');
var helpers = require('../helpers');
var utils = require('../utils');

function isClosingChar(str) {
  return /[)\]]$/.test(str);
}

function isWordChar(str) {
  return /^[\w\d]/.test(str);
}

module.exports = function(options, state) {
  var last;

  return function(node, nodes, i) {
    var opts = merge({}, this.options, options);

    if (typeof opts.text === 'function') {
      return opts.text.apply(this, arguments);

    } else if (opts.text === false || opts.normalizeWhitespace === false) {
      return this.emit(node.val, node);
    }

    if (helpers.isInside(state, node, ['code', 'pre'])) {
      return this.emit(node.val, node);
    }

    // if (helpers.isType(this.prev, ['code', 'pre'])) {
    //   return this.emit(node.val, node);
    // }

    if (this.output.slice(-2) === '**' && !helpers.isInside(state, node, 'strong')) {
      return this.emit(fixLeadingSpace.call(this, node.val), node);
    }

    if (this.output.slice(-2) === '__' && !helpers.isInside(state, node, 'em')) {
      return this.emit(fixLeadingSpace.call(this, node.val), node);
    }

    if (node.parent.type === 'strong' || node.parent.type === 'em') {
      if (/\.open$/.test(this.prev.type)) {
        return this.emit(node.val.trim(), node);
      }
      return this.emit(fixLeadingSpace.call(this, node.val), node);
    }

    var next = this.next || {};
    var prev = this.prev || {};
    var parent = node.parent;
    var prevChar = this.output.slice(-1);
    var val = node.val || '';

    // if the next tag is <(br|hr)>, we can probably
    // safely remove trailing whitespace characters
    if (helpers.isType(next, ['hr', 'br'])) {
      val = utils.trimRight(val);
    }

    if (node.parent.type === 'div') {
      val = fixDivWhitespace(val);
    }

    if (helpers.isInside(state, node, ['ul', 'ol', 'li', 'blockquote'])) {
      val = fixListWhitespace.call(this, val, node);
    }

    // fix leading whitespace and newlines inside <a> tags
    // - remove all newlines
    // - strip whitespace immediately following the `[` character
    if (helpers.isInside(state, node, 'a') && /[\s\[]+$/.test(this.output)) {
      this.output = this.output.replace(/\s+$/, '');
      val = val.replace(/\n/g, '');
      val = val.replace(/^\s+/, '');
    }

    // fix trailing whitespace from the previous value,
    // and leading whitespace from the current value
    if (this.output.slice(-1) === '\n') {
      this.output = this.output.replace(/ *(\n+)/g, '$1');

      if (!val.trim()) {
        val = val.replace(/[ \t]+/g, '');
      } else {

        // here, we strip whitespace before the `lead` check,
        // then re-add newlines if the check is truthy
        var lead = /^\n+/.exec(val);
        val = val.replace(/^\s+/, '');
        if (lead) {
          val = lead[0] + val;
        }
      }
    }

    // fix leading whitespace on the current value
    var newlines = /^\n+/.exec(val);

    // in this case, since it's less specific, we only want to
    // strip non-newline whitespace if the check is truthy
    if (newlines) {
      val = newlines[0] + val.replace(/^\s+/, '');
    }

    // prevent two consecutive spaces
    if (this.output.slice(-1) === ' ' && val.charAt(0) === ' ') {
      val = val.replace(/ +/, '');
    }

    // fix whitespace in checklist items
    if (/\[[x ]\]\s+$/.test(this.output)) {
      val = val.trim();
    }

    // special case for <address> tag
    if (helpers.isInside(state, node, ['address'])) {
      val = val.replace(/\n/g, '');
    }

    // add a space if the last character was a type
    // of punctuation or closing character
    if (val && !/^[-—\)\]`.!,:\ss]/.test(val) && /[-—\)\]`.!,:]$/.test(this.output)) {
      val = ' ' + val;
    }

    return this.emit(val, node);
  };
};

function fixLeadingSpace(val) {
  var ch = val.charAt(0);
  if (!isPunctuation(ch, true) && !isWhitespace(ch)) {
    return ' ' + val;
  }
  if (ch === '\n') {
    return val.replace(/^\s+/, '');
  }
  return val;
}

/**
 * Strip most whitespace inside `div` tags. If the HTML had whitepace
 * explicitly defined, we want to keep a single whitespace character,
 * otherwise we strip it out.
 */

function fixDivWhitespace(val) {
  val = val.replace(/^\s+/, function(m) {
    return m ? ' ' : '';
  });
  val = val.replace(/\s+$/, function(m) {
    return m ? ' ' : '';
  });
  return val;
}

/**
 * Attempt to normalize whitespace directly inside `<li>` tags, meaning
 * that the value is _not_ nested inside another tag inside the `<li>`.
 * This makes it a bit easier to reason about, but don't expect this to
 * work miracles - this is still HTML...
 */

function fixListWhitespace(val, node) {
  if (!val.trim()) return '';
  if (val && helpers.isType(node.parent, 'li') && /[-*+]\s+$/.test(this.output)) {
    this.output = this.output.replace(/\s+$/, '');
    if (!/^[-\s)\]`.!,:]/.test(val)) {
      val = ' ' + val;
    }
  }
  return val.replace(/\n/g, '');
}
