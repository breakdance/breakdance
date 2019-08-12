'use strict';

const parser = require('./lib/parser');
const compiler = require('./lib/compiler');
const utils = require('./lib/utils');

exports.render = (input, options = {}) => {
  let ast = parser.parse(input, options);
  return compiler.render(ast.picked || ast, options);
};

exports.Compiler = compiler;
exports.Parser = parser;
