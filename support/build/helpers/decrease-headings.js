'use strict';

module.exports = function(str) {
  return str.replace(/^#{1,5}/gm, function(m) {
    return '#' + m;
  });
};
