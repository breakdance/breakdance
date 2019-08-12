'use strict';

module.exports = {
  BULLETS: ['-', '*', '+'],
  CHAR_ELLIPSIS: '…',
  CHAR_THREE_DOTS: '...',
  CHAR_FORWARD_SLASH: '/',
  CHAR_EM_DASH: '—',

  RE_ALL_WHITESPACE: /\s+/g,
  RE_ATTRIBUTE: /^\s*([^=]+)="([^"]+)(?<!\\)"\s*/,
  RE_BOM: /^\ufeff/, // byte-order marks
  RE_CODE_TAG: /(?:`{3,4}|<code>)\s*([\s\S]+?)\s*(?:`{3,4}|<\/code>)/,
  RE_DIACRITICS: /[À-ž]/g,
  RE_ELLIPSIS: /(&hellip;|&#x2026;|[\u2026…⋯])/g,
  RE_LANGUAGE: /(?:lang(?:uage)?|highlight|source|brush:\s*)-?(.+)$/,
  RE_LANGUAGE_DATA_KEY: /data-lang(uage)?/,
  RE_LEADING_WHITESPACE: /^[ \t]*/gm,
  RE_NEWLINES: /\r*\n/g,
  RE_NON_BREAKING_SPACE: /(&#xA0;|&#160;|&nbsp;)/gi,
  RE_NON_NEWLINE_SPACE: /^[^\S\n]+/, // all whitespace besides newlines
  RE_QUOTES: /^["' ]+|["' ]+$/g,
  RE_RST_PARAGRAPH: /¶\s*/g,
  RE_SLASHES: /[⧸⁄]/g,
  RE_TABS: /\t/g,
  RE_ZERO_WIDTH_SPACE: /\u200b/g,
};

