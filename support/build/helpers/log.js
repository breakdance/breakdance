'use strict';

module.exports = function() {
  var args = [].slice.call(arguments);
  args.pop();
  console.log.apply(console, args);
};
