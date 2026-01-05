import colors from 'ansi-colors';
import diacritics from 'diacritics-map';

import {
  // RE_NEGATIVE_SCORE_ATTR,
  // RE_NEGATIVE_SCORE,
  RE_LANGUAGE_DATA_KEY,
  RE_DIACRITICS,
  RE_LANGUAGE,
  RE_LEADING_WHITESPACE,
  RE_NON_NEWLINE_SPACE,
  RE_QUOTES
} from '~/constants';

export const lastLine = (arr: string[]) => arr[arr.length - 1];

export const define = (obj: any, key: string, value = obj[key], enumerable = false) => {
  Reflect.defineProperty(obj, key, { enumerable, value });
};

export const pick = (node: any, options: any = {}) => {
  if (node.attribs && options.pick) {
    const query = options.pick;
    if (query === node.type) return true;

    const name = query.slice(1);
    const char = query[0];
    const type: { [key: string]: string } = { '.': 'class', '#': 'id' };
    let ele = node.attribs[type[char]];
    if (!ele) return false;

    if (typeof ele === 'string') {
      ele = ele.split(' ');
    }

    if (char && name && type[char]) {
      return ele.includes(name);
    }

    if (node.type === query) {
      throw new Error(`Cannot find: "${query}"`);
    }
  }
};

// const parseAttributes = (input = '') => {
//   const attribs = {};
//   let match;
//   while ((match = /^\s*([^=]+)="([^"]+)(?<!\\)"\s*/.exec(input))) {
//     if (match) {
//       attribs[match[1].toLowerCase()] = match[2];
//       input = input.slice(match[0].length);
//     }
//   }
//   return attribs;
// };

const attributes = (hash: any, keys: string[] | boolean) => {
  if (keys === true) keys = [];

  if (typeof keys === 'string') {
    keys = [keys];
  }

  if (!hash) {
    return '';
  }

  const attribs: string[] = [];

  for (const key of Object.keys(hash)) {
    if (keys && keys.length && !keys.includes(key)) continue;
    const value = String(hash[key]).replace(RE_QUOTES, '').replace(/\s+/g, ' ');
    attribs.push(`${key}="${value}"`);
  }

  return attribs.join(' ');
};

export { attributes };

const replaceDiacritics = (str: string) => {
  return str.replace(RE_DIACRITICS, ch => diacritics[ch] || ch);
};

const langMap = (lang: string, options: any = {}) => {
  if (!lang) return '';

  if (options.normalizeLanguage === false) {
    return lang;
  }

  lang = lang.toLowerCase();

  switch (lang) {
    case 'js':
    case 'javascript':
      return 'js';
    case 'md':
    case 'mdown':
    case 'mkdown':
    case 'markdown':
      return 'md';
    default: {
      return lang;
    }
  }
};

export const mapCheerioKeys = (node: any) => {
  if (node.mapped === true) return node;

  if (node.name) {
    node.type = node.name;
    delete node.name;
  }

  if (node.data && !node.value) {
    node.value = node.data;
    delete node.data;
  }

  if (node.children) {
    node.nodes = node.children.map((n: any) => {
      n = mapCheerioKeys(n);
      define(n, 'siblings', node.children);
      return n;
    });
    delete node.children;
  }

  if (node.attribs && typeof node.attribs.class === 'string') {
    node.attribs.class = node.attribs.class.split(' ');
  }

  node.stringify = () => stringify(node);
  define(node, 'root');
  define(node, 'parent');
  define(node, 'prev');
  define(node, 'next');
  define(node, 'mapped', true);
  return node;
};

export const mapKeys = (node: any) => {
  return mapCheerioKeys(node);
  // if (node.mapped) return node;

  // define(node, 'mapped', true);
  // define(node, 'parent', node.parentNode || node.parent);
  // define(node, 'rawAttrs', node.rawAttrs);
  // define(node, 'parentNode', node.parentNode);
  // define(node, 'children', node.children);
  // define(node, 'tagName', node.tagName);
  // define(node, 'next', node.next);
  // define(node, 'prev', node.prev);
  // define(node, 'root', node.root);

  // if (node.childNodes) {
  //   node.nodes = node.childNodes;
  // }
  // if (node.children) {
  //   node.nodes = node.children;
  // }

  // if (node.nodes) {
  //   for (let i = 0; i < node.nodes.length; i++) {
  //     node.nodes[i] = exports.mapKeys(node.nodes[i]);
  //   }
  // }

  // if (node.value) {
  //   node.value = Buffer.from(node.value);
  // }

  // if (node.rawAttrs) {
  //   node.attribs = node.attributes || parseAttributes(node.rawAttrs);
  // }

  // if (!node.attribs) node.attribs = {};

  // if (node.nodeType === 3 && !node.type) {
  //   node.type = 'text';
  // }

  // // if (node.type === 'text' && node.data && !node.value) {
  // //   node.value = node.data;
  // //   delete node.data;
  // // }

  // // console.log(node)
  // if (node.rawText) node.value = node.rawText;
  // if (node.tagName) node.type = node.tagName;
  // // node.find = query => node.nodes && node.nodes.find(ele => ele.name === query);

  // if (node.nodeType === 2 && !node.type) {
  //   node.type = 'comment';
  // }

  // return node;
};

export const encodeHTML = (str: string) => {
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

export const unindent = (input: string) => {
  if (!input) return '';

  const lines = input
    .split('\n')
    .filter(line => line.trim() !== '')
    .join('\n');

  const match = lines.match(RE_LEADING_WHITESPACE);
  if (!match) return input;

  const fewest = Math.min(...match.map(indent => indent.length));
  if (fewest > 0) {
    return input.replace(new RegExp(`^[ \t]{${fewest}}`, 'gm'), '');
  }
  return input;
};

export const removeEmptyEndLines = (str: string) => {
  if (!str) return '';
  const lines = str.split('\n');

  while (lines.length && typeof lines[0] === 'string' && lines[0].trim() === '') {
    lines.shift();
  }

  while (lines.length && typeof lastLine(lines) === 'string' && lastLine(lines).trim() === '') {
    lines.pop();
  }

  return lines.join('\n');
};

export const hasAttributeValue = (node: any, regex: RegExp, keep: string[] = []) => {
  const attribs = [].concat(keep);

  if (node.attribs) {
    for (const key of Object.keys(node.attribs)) {
      if (attribs.length && !attribs.some(attr => key.startsWith(attr))) {
        continue;
      }

      const value = node.attribs[key];
      if (regex.test(value)) {
        return true;
      }
    }
  }
  return false;
};

export const parseAttributeValue = (node: any, regex: RegExp) => {
  if (node.attribs) {
    for (const key of Object.keys(node.attribs)) {
      const value = node.attribs[key];
      const match = regex.exec(value);
      if (match) {
        return match;
      }
    }
  }
  return null;
};

export const getLanguage = (node: any, options: any) => {
  // const sanitize = str => str.trim().replace(/^(highlight[- ]|[\s*])+/g, '').trim();

  if (!node || !node.attribs) return '';

  if (options.normalizeLanguage === false) {
    return '';
  }

  for (const key of Object.keys(node.attribs)) {
    const value = node.attribs[key];

    if (typeof value !== 'string') {
      continue;
    }

    if (RE_LANGUAGE_DATA_KEY.test(key)) {
      return langMap(value, options);
    }

    // let val = value.split(' ').find(v => RE_LANGUAGE.test(v));

    // if (RE_LANGUAGE_DATA_KEY.test(key)) {
    //   return langMap(val, options);
    // }

    const match = RE_LANGUAGE.exec(value);
    if (match) {
      return langMap(match[1], options);
    }
  }

  return '';
};

export const trimStart = (str: string) =>
  str ? str.replace(RE_NON_NEWLINE_SPACE, '') : '';

export const unquote = (str: string) => str ? str.replace(RE_QUOTES, '') : '';
export const enquote = (str: string) => `"${unquote(str)}"`;

export const getIndentLen = (str: string) => {
  return str ? str.length - trimStart(str).length : 0;
};

export const slugify = (input: string, options: any = {}) => {
  if (!input) return '';
  if (options.slugify === false) return input;

  if (typeof options.slugify === 'function') {
    return options.slugify(input, options);
  }

  let str = input.split('_').join('-');
  str = colors.unstyle(str);
  str = str.toLowerCase();
  str = str.normalize('NFKD').replace(/[\u0300-\u036F]/g, '');

  // `.split()` is often (but not always) faster than `.replace()`
  str = str.split(/ /).join('-');
  str = str.split(/\t/).join('--');
  str = str.split(/[|$&`~=\\/@+*!?({[\]})<>=.,;:'"^]/).join('');
  str = str
    .split(/[。？！，、；：“”【】（）〔〕［］﹃﹄“ ”‘’﹁﹂—…－～《》〈〉「」]/)
    .join('');

  str = replaceDiacritics(str);

  if (options.num) {
    return `${str}-${options.num}`;
  }
  return str;
};

/**
 * Type Utils
 */

export const isObject = (val: any) => {
  return val !== null && typeof val === 'object' && !Array.isArray(val);
};

export const visit = (node: any, fn: Function, shouldMapKeys: boolean = true) => {
  if (!node) return node;
  const visited = new WeakSet();

  const visitNode = (n: any) => {
    if (visited.has(n)) return n;
    visited.add(n);

    if (shouldMapKeys !== false) mapKeys(n);
    const value = fn(n);
    if (value === false) return n;

    if (n.nodes || n.childNodes) {
      return mapVisit(n, fn, shouldMapKeys);
    }
    return n;
  };

  return visitNode(node);
};

export const mapVisit = (node: any, fn: Function, shouldMapKeys: boolean = true) => {
  if (!node) return node;
  if (shouldMapKeys !== false) mapKeys(node);

  const visited = new WeakSet();

  for (const child of node.nodes || node.childNodes || []) {
    if (visited.has(child)) continue;
    visited.add(child);

    if (!child.parent) {
      define(child, 'parent', node);
    }

    const value = visit(child, fn, shouldMapKeys);
    if (value === false) {
      break;
    }
  }

  return node;
};

export const find = (nodes: any[], type: string) => nodes ? nodes.find(n => n.type === type) : undefined;
export const filter = (nodes: any[], type: string) => nodes ? nodes.filter(n => n.type === type) : [];
export const isInside = (node: any, type: string | string[]) => {
  const types = [].concat(type || []);
  let parent = node?.parent;
  while (parent && parent.type !== 'root') {
    if (types.includes(parent.type)) {
      return true;
    }
    parent = parent.parent;
  }
  return false;
};

// eslint-disable-next-line complexity
export const stringify = (node: any, options: any = {}) => {
  if (!node) return '';
  const { attribs = false, omit = ['code'] } = options;
  const output: string[] = node.value ? [node.value] : [];
  let prefix = '';
  let attr = '';

  if (node.type === 'pre') {
    return node.html || node.innerHtml || node.value;
  }

  if (omit.includes(node.type)) {
    if (node.nodes) {
      return node.nodes.map((n: any) => stringify(n, options)).join('');
    }
    return '';
  }

  if (node.attribs && attribs) {
    attr = attributes(node.attribs, attribs).trim();
  }

  const open = attr ? node.type + ' ' + attr : node.type;
  if (node.type === '!doctype') {
    let key = Object.keys(node.attribs)[0] || '';
    if (key) key = ' ' + key;
    prefix = `<!DOCTYPE${key}>`;
  }

  if (node.selfClosing === true) {
    if (options.type === 'html') {
      output.push(`<${open}>`);
    } else {
      output.push(['br', 'hr'].includes(node.type) ? `<${open}>` : '');
    }
  } else if (node.open === true && node.nodes) {
    const inner = node.nodes.map((n: any) => stringify(n, options)).join('');
    if (inner.trim()) {
      if (!prefix && options.wrap !== false) {
        output.push(`<${open}>${inner}</${node.type}>`);
      } else {
        output.push(inner);
      }
    }
  }

  return prefix + output.join(' ');
};
