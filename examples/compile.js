'use strict';

var Breakdance = require('..');
var bd = new Breakdance();
var ast = bd.parse('<strong>The Freaks Come Out at Night!</strong>');
var str = bd.compile(ast);
console.log(str);
//=> **The Freaks Come Out at Night!**\n
