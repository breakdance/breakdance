'use strict';

exports.arrayify = function(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
};
