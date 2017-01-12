'use strict';

var Breakdance = require('..')
var bd = new Breakdance()
  .set('strong', function(node) {
    node.nodes = [node.nodes[1]];
    this.emit('@@');
    this.mapVisit(node.nodes);
    this.emit('@@');
  })

var str = bd.render('<strong>The Freaks Come Out at Night!</strong>');
console.log(str);
//=> **The Freaks Come Out at Night!**\n
