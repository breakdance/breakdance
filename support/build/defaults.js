'use strict';

var hljs = require('highlight.js');

/**
 * Defaults for the markdown plugin
 */

module.exports = {
  html: true,
  escapeText: false,
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, code).value;
      } catch (err) {

        if (!/Unknown language/i.test(err.message)) {
          throw err;
        }
      }
    }

    try {
      return hljs.highlightAuto(code).value;
    } catch (err) {}

    return code;
  }
};
