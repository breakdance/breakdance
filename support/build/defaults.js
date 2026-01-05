
const hljs = require('highlight.js');

/**
 * Defaults for the markdown plugin
 */

module.exports = {
  html: true,
  highlight(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, code).value;
      } catch (err) {}
    }

    try {
      return hljs.highlightAuto(code).value;
    } catch (err) {}
    return code;
  }
};
