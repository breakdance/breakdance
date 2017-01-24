'use strict';

var utils = require('./utils');

/**
 * Not used
 */

module.exports = function(pattern, data) {
  if (utils.isObject(pattern)) {
    data = pattern;
    pattern = null;
  }

  return function(file) {
    if (!utils.isValid(file, 'permalink', ['view', 'item', 'file'])) return;

    utils.define(file, 'permalink', function(dest, locals) {
      if (utils.isObject(dest)) {
        locals = dest;
        dest = null;
      }

      if (typeof file.emit === 'function') {
        file.emit('permalink', file);
      }

      file.options = file.options || {};
      file.data = file.data || {};

      var opts = utils.merge({}, data, file.options.permalinks);
      var ctx = utils.merge({}, opts, locals, file.data);
      if (!(ctx.regex instanceof RegExp)) {
        ctx.regex = /:([-\w (),._]+)/;
      }

      var paths = utils.copyPaths(file, ctx.parsePath);
      // merge in paths before context, so custom values
      // passed on the options will override parsed values
      ctx = utils.merge({}, paths, ctx);

      try {
        var fn = utils.placeholders(ctx);
        var str = dest || ctx.pattern || pattern || ':path';

        // set the pattern on `options.permalink`
        file.options.permalink = str;

        // add the rendered permalink (path) to `data.permalink`
        file.data.permalink = fn(str, ctx);
      } catch (err) {
        err.reason = 'permalinks parsing error';
        throw err;
      }
      return file.data.permalink;
    });
  };
};
