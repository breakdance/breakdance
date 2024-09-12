'use strict';

/**
 * Example of how to override the `<button>` compiler
 */

var helpers = require('../lib/helpers');
var Breakdance = require('..')
var bd = new Breakdance()
  .set('button', helpers.block('<button>', '</button>'))

var str = bd.render('<button>Click me!</button>');
console.log(str);
//=> **The Freaks Come Out at Night!**\n
