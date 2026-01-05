
const camelcase = require('camel-case');

/**
 * Helper for sorting pages before rendering
 */

module.exports = function(items, order, options) {
  if (!Array.isArray(order)) {
    return items;
  }
  const len = order.length;
  const arr = new Array(len);
  for (let i = 0; i < len; i++) {
    const item = filterItem(items, order[i]);
    if (item) {
      arr.push(item);
    }
  }
  return arr;
};

function filterItem(items, name) {
  const len = items.length;
  for (let i = 0; i < len; i++) {
    const item = items[i];
    if (camelcase(item.stem) === camelcase(name)) {
      return item;
    }
  }
}
