'use strict';

var Remarkable = require('remarkable');
var extend = require('extend-shallow');

module.exports = function(str, options, cb) {
  if (typeof str !== 'string') {
    cb = options;
    options = str;
    str = null;
  }

  try {
    var opts = extend({}, this.options.remarkable, options.hash);
    var md = new Remarkable(opts);

    if (typeof options.fn !== 'function') {
      cb(null, md.render(str));
    } else {
      cb(null, md.render(options.fn(this)));
    }
  } catch (err) {
    cb(err);
  }
};
