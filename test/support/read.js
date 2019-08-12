'use strict';

const fs = require('fs');
const path = require('path');

module.exports = filepath => {
  return fs.readFileSync(path.resolve(__dirname, '..', filepath), 'utf8');
};
