'use strict';

var prettify = require('pretty-remarkable');
var Remarkable = require('remarkable');

module.exports = function(str, options) {
  return new Remarkable(options)
    .use(prettify)
    .render(str);
};
