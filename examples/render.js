'use strict';

var Breakdance = require('../breakdance');
var bd = new Breakdance();
var str = bd.render('<strong>The Freaks Come Out at Night!</strong>');
console.log(str);
//=> **The Freaks Come Out at Night!**\n
