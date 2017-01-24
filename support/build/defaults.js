'use strict';

var extend = require('extend-shallow');
var hljs = require('highlight.js');

/**
 * Defaults for the markdown plugin
 */

module.exports = function(options) {
  return extend({}, {
    html: true,
    escapeText: false,
    highlight: function(str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (err) {}
      }

      try {
        return hljs.highlightAuto(str).value;
      } catch (err) {}

      return ''; // use external default escaping
    }
  }, options);
};
