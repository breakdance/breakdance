'use strict';

module.exports = function(pattern, str) {
  return str.split(pattern).join('<br>' + pattern);
};
