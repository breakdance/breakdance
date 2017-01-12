'use strict';

var Breakdance = require('..');
var bd = new Breakdance();
var ast = bd.parse('<strong>The Freaks Come Out at Night!</strong>');
console.log(ast);
//=> **The Freaks Come Out at Night!**\n
