'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function(fp) {
  return fs.readFileSync(path.join(__dirname, '..', fp), 'utf8');
};
