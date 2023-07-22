'use strict';

const parser = require('./lib/parser');
const compiler = require('./lib/compiler');

exports.parse = (input, options = {}) => {
  const ast = parser.parse(input, options);
  return ast.picked || ast;
};

exports.render = (input, options = {}) => {
  return compiler.render(exports.parse(input, options), options);
};

exports.Compiler = compiler;
exports.Parser = parser;
