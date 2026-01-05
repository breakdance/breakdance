
/**
 * Helper for debugging
 */

module.exports = function() {
  const args = [].slice.call(arguments);
  args.pop();
  console.log.apply(console, args);
};
