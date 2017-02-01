var Breakdance = require('..');
var breakdance = new Breakdance();

/**
 * Example for a custom <alert> element
 */

breakdance
  .set('alert', function(node) {
    // loop over the child `nodes` on `node`
    this.mapVisit(node);
  })
  .set('alert.open', function(node) {
    // emit the start of a blockquote
    this.emit('> ');
  })
  .set('alert.close', function(node) {
    // don't render the closing tag
    this.emit('');
  });

var ast = breakdance.parse('<alert>Heads up!</alert>');
var str = breakdance.compile(ast).output;
console.log(str);
// > Heads up!
