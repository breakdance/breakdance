
const path = require('path');
const extend = require('extend-shallow');
const PluginError = require('plugin-error');
const Remarkable = require('remarkable');
const unescape = require('unescape');
const through = require('through2');

/**
 * convert markdown to HTML
 */

module.exports = function(options) {
  const opts = extend({}, options);
  return through.obj(function(file, enc, next) {
    if (file.isNull()) {
      next(null, file);
      return;
    }

    if (path.extname(file.history[0]) !== '.md') {
      next(null, file);
      return;
    }

    try {
      const md = new Remarkable(opts);
      let str = md.render(file.contents.toString());
      str = str.replace(/(\{{2,4})([^}]+)(\}{2,4})/g, function(m, open, inner, close) {
        return open + unescape(inner) + close;
      });
      file.contents = new Buffer(str);
      file.extname = '.html';
    } catch (err) {
      this.emit('error', new PluginError('remarkable', err, { fileName: file.path }));
      return;
    }
    next(null, file);
  });
};
