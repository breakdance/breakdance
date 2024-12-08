
import Breakdance from '..';
const bd = new Breakdance()
  .use(function(compiler) {
    console.log(compiler, this);
  })
  .before('strong', function(node) {
    console.log(node, this);
  })
  .after('strong', function(node) {
    console.log(node, this);
  });

const str = bd.render('<strong>The Freaks Come Out at Night!</strong>');
console.log(str);
//=> **The Freaks Come Out at Night!**\n
