import * as parser from '~/parser';
import { Compiler } from '~/Compiler';
export { Compiler };

interface Options {
  [key: string]: any;
}

interface ASTNode {
  picked?: ASTNode;
  [key: string]: any;
}

export const parse = (input: string, options: Options = {}): ASTNode => {
  const ast: ASTNode = parser.parse(input, options);
  return ast.picked || ast;
};

export const render = (input: string, options: Options = {}): string => {
  return Compiler.render(parse(input, options), options);
};

export const breakdance = (input: string, options: Options = {}): string => {
  return render(input, options);
};

export class Breakdance {
  constructor(options = {}) {
    this.options = options;
  }

  parse(input, options) {
    return parse(input, { ...this.options, ...options });
  }

  render(input, options) {
    return render(input, { ...this.options, ...options });
  }

  static parse(input, options) {
    return parse(input, options);
  }

  static render(input, options) {
    return render(input, options);
  }
}

export default Breakdance;
