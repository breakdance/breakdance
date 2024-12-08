// 'use strict';

//
// const assert = require('assert');
// const Breakdance = require('..');
// let breakdance;

// describe('.use', () => {
//   beforeEach(function() {
//     breakdance = new Breakdance();
//   });

//   it('should be a function', () => {
//     assert.equal(typeof breakdance.use, 'function');
//   });

//   it('should expose an instance of Breakdance', () => {
//     var count = 0;
//     breakdance.use(function(compiler) {
//       assert.equal(compiler.constructor.name, 'Breakdance');
//       count++;
//     });

//     breakdance.render('<strong>foo</strong>');
//     assert.equal(count, 1);
//   });

//   it('should expose an instance of Breakdance as "this"', () => {
//     var count = 0;
//     breakdance.use(function() {
//       assert.equal(this.constructor.name, 'Breakdance');
//       count++;
//     });

//     breakdance.render('<strong>foo</strong>');
//     assert.equal(count, 1);
//   });

//   it('should expose breakdance methods', () => {
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

//   it('should support registering custom compilers', () => {
//     breakdance.use(function() {
//       this.set('text', function(node) {
//         this.emit(node.val.toUpperCase(), node);
//       });
//     });
//     assert.equal(breakdance.render('<strong>foo</strong>'), '**FOO**\n');
//   });
// });
