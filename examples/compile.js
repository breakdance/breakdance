import Breakdance from '..';
const bd = new Breakdance();
const ast = bd.parse('<strong>The Freaks Come Out at Night!</strong>');
const str = bd.compile(ast);
console.log(str);
//=> **The Freaks Come Out at Night!**\n
