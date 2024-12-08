
/**
 * Example of how to override the `<button>` compiler
 */

const helpers = require('../lib/helpers');
import Breakdance from '..';
const bd = new Breakdance()
  .set('button', helpers.block('<button>', '</button>'));

const str = bd.render('<button>Click me!</button>');
console.log(str);
//=> **The Freaks Come Out at Night!**\n
