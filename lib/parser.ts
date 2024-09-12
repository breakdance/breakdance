import cheerio from 'cheerio';
import * as utils from './utils';
import {
  RE_BOM,
  RE_NEWLINES,
  RE_NON_BREAKING_SPACE,
  RE_TABS,
  RE_ZERO_WIDTH_SPACE
} from './constants';

export const parse = (input: string, options: any = {}): any => {
  const str = input.trim()
    .replace(RE_NON_BREAKING_SPACE, ' ')
    .replace(RE_ZERO_WIDTH_SPACE, '')
    .replace(RE_TABS, '  ');

  const lines = str
    .replace(RE_BOM, '')
    .split(RE_NEWLINES).map(line => {
      if (line.trim() === '') return '';
      return line;
    });

  const output = options.unindent !== false
    ? utils.unindent(lines.join('\n'))
    : lines.join('\n');

  const ast = cheerio.parseHTML(output, { normalizeWhitespace: false, ...options });
  let root = ast[0].root;

  utils.visit(root, (node: any) => {
    const isMatch = utils.pick(node, options);
    if (isMatch === true) {
      root = node;
      return false;
    }
  });

  return root;
};

export default parse;
