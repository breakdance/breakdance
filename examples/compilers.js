'use strict';

var Breakdance = require('..')
var bd = new Breakdance()
  .use(function(compiler) {
    console.log(compiler, this);
  })
  .before('strong', function(node) {
    console.log(node, this);
  })
  .after('strong', function(node) {
    console.log(node, this);
  })

var str = bd.render('<strong>The Freaks Come Out at Night!</strong>');
// console.log(str);
//=> **The Freaks Come Out at Night!**\n
