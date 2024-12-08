import Breakdance from '..';
const breakdance = new Breakdance();

/**
 * Example for a custom <alert> element
 */

breakdance
  .set('alert', function(node) {
    // loop over the child `nodes` on `node`
    this.mapVisit(node);
  })
  .set('alert.open', function() {
    // emit the start of a blockquote
    this.emit('> ');
  })
  .set('alert.close', function() {
    // don't render the closing tag
    this.emit('');
  });

const ast = breakdance.parse('<alert>Heads up!</alert>');
const str = breakdance.compile(ast).output;
console.log(str);
// > Heads up!
