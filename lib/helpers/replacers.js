'use strict';

const constants = require('../constants');
const replace = module.exports = exports;

const {
  CHAR_ELLIPSIS,
  CHAR_FORWARD_SLASH,
  CHAR_THREE_DOTS,
  CHAR_EM_DASH,

  RE_ELLIPSIS,
  RE_SLASHES
} = constants;

replace.smartQuotes = (str, options = {}) => {
  if (options.replaceSmartQuotes !== false) {
    str = str.replace(/(&ldquo;|&rdquo;|&#822[01];|\u201C|\u201D|[“”])/g, '"');
    str = str.replace(/(&lsquo;|&rsquo;|&#8217;|&apos;|\u2019|[‘’])/g, "'");
  }
  return str;
};

replace.ellipsis = (str, options = {}) => {
  let ellipsis = options.unsmarty ? CHAR_THREE_DOTS : CHAR_ELLIPSIS;
  return str.replace(RE_ELLIPSIS, ellipsis);
};

replace.slashes = str => {
  return str.replace(RE_SLASHES, CHAR_FORWARD_SLASH);
};

replace.angles = (str, options = {}) => {
  if (!options.unsmarty) return str;
  return str
    .replace(/[⟨‹]/g, '<')
    .replace(/[›⟩]/g, '>')
    .replace(/[«]/g, '"')
    .replace(/[»]/g, '"');
};

replace.chars = (str, options) => {
  str = replace.slashes(str, options);
  str = replace.smartQuotes(str, options);
  str = replace.ellipsis(str, options);
  str = replace.angles(str, options);
  return str
    .replace(/(\u2014|&#x2014;|&#8212;|&mdash;)/g, CHAR_EM_DASH)
    .replace(/&ndash;/g, '–')
    .replace(/&amp;/g, '&')
    .replace(/&middot;/g, '·')
    .replace(/&rsaquo;/g, '›')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&le;/g, '≤')
    .replace(/&ge;/g, '≥');
};

// replace. = (input, options = {}) => {

// };
