import parser from './lib/parser';
import compiler from './lib/compiler';

interface Parser {
  parse(input: string, options: Options): ASTNode;
}

interface Compiler {
  render(ast: ASTNode, options: Options): string;
}

interface Options {
  [key: string]: any; // Since the options type is unknown
}

interface ASTNode {
  picked?: ASTNode;
  [key: string]: any; // Assuming there might be other unknown properties
}

export const parse = (input: string, options: Options = {}): ASTNode => {
  const ast: ASTNode = parser.parse(input, options);
  return ast.picked || ast;
};

export const render = (input: string, options: Options = {}): string => {
  return compiler.render(parse(input, options), options);
};

export const breakdance = (input: string, options: Options = {}): string => {
  return render(input, options);
};

export default breakdance;
