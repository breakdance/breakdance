
import Breakdance from '..';
const bd = new Breakdance();
const ast = bd.parse('<strong>The Freaks Come Out at Night!</strong>');
console.log(ast);
//=> **The Freaks Come Out at Night!**\n
