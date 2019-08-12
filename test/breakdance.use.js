// 'use strict';

// require('mocha');
// const assert = require('assert');
// const Breakdance = require('..');
// let breakdance;

// describe('.use', function() {
//   beforeEach(function() {
//     breakdance = new Breakdance();
//   });

//   it('should be a function', function() {
//     assert.equal(typeof breakdance.use, 'function');
//   });

//   it('should expose an instance of Breakdance', function() {
//     var count = 0;
//     breakdance.use(function(compiler) {
//       assert.equal(compiler.constructor.name, 'Breakdance');
//       count++;
//     });

//     breakdance.render('<strong>foo</strong>');
//     assert.equal(count, 1);
//   });

//   it('should expose an instance of Breakdance as "this"', function() {
//     var count = 0;
//     breakdance.use(function() {
//       assert.equal(this.constructor.name, 'Breakdance');
//       count++;
//     });

//     breakdance.render('<strong>foo</strong>');
//     assert.equal(count, 1);
//   });

//   it('should expose breakdance methods', function() {
//     var count = 0;
//     breakdance.use(function(bd) {
//       assert.equal(typeof bd.set, 'function');
//       assert.equal(typeof bd.before, 'function');
//       assert.equal(typeof bd.after, 'function');

//       assert.equal(typeof this.set, 'function');
//       assert.equal(typeof this.before, 'function');
//       assert.equal(typeof this.after, 'function');
//       count++;
//     });

//     breakdance.render('<strong>foo</strong>');
//     assert.equal(count, 1);
//   });

//   it('should support registering custom compilers', function() {
//     breakdance.use(function() {
//       this.set('text', function(node) {
//         this.emit(node.val.toUpperCase(), node);
//       });
//     });
//     assert.equal(breakdance.render('<strong>foo</strong>'), '**FOO**\n');
//   });
// });
