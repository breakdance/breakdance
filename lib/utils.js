'use strict';

const colors = require('ansi-colors');
const diacritics = require('diacritics-map');
const constants = require('./constants');
const define = (obj, key, value = obj[key], enumerable = false) => {
  Reflect.defineProperty(obj, key, { enumerable, value });
};

const {
  RE_NEGATIVE_SCORE_ATTR,
  RE_NEGATIVE_SCORE,
  RE_LANGUAGE_DATA_KEY,
  RE_DIACRITICS,
  RE_LANGUAGE,
  RE_LEADING_WHITESPACE,
  RE_NON_NEWLINE_SPACE,
  RE_QUOTES
} = constants;

exports.pick = (node, options = {}) => {
  if (node.attribs && options.pick) {
    let query = options.pick;
    if (query === node.type) return true;

    let name = query.slice(1);
    let char = query[0];
    let type = { '.': 'class', '#': 'id' };
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

const parseAttributes = (input = '') => {
  let attribs = {};
  let match;
  while ((match = /^\s*([^=]+)="([^"]+)(?<!\\)"\s*/.exec(input))) {
    if (match) {
      attribs[match[1].toLowerCase()] = match[2];
      input = input.slice(match[0].length);
    }
  }
  return attribs;
};

const attributes = exports.attributes = (hash, keys) => {
  if (keys === true) keys = [];
  if (typeof keys === 'string') {
    keys = [keys];
  }

  if (!hash) return '';
  let attribs = [];
  Object.keys(hash).forEach(key => {
    if (keys && keys.length && !keys.includes(key)) return;
    let val = String(hash[key]).replace(RE_QUOTES, '').replace(/\s+/g, ' ');
    attribs.push(`${key}="${val}"`);
  });
  return attribs.join(' ');
};

const replaceDiacritics = str => {
  return str.replace(RE_DIACRITICS, ch => diacritics[ch] || ch);
};

const langMap = (lang, options = {}) => {
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

exports.mapCheerioKeys = node => {
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
    node.nodes = node.children.map(n => {
      n = exports.mapCheerioKeys(n);
      define(n, 'siblings', node.children);
      return n;
    });
    delete node.children;
  }

  if (node.attribs && typeof node.attribs.class === 'string') {
    node.attribs.class = node.attribs.class.split(' ');
  }

  node.stringify = () => exports.stringify(node);
  define(node, 'root');
  define(node, 'parent');
  define(node, 'prev');
  define(node, 'next');
  define(node, 'mapped', true);
  return node;
};

exports.mapKeys = (node, options = {}) => {
  return exports.mapCheerioKeys(node);
  if (node.mapped) return node;

  define(node, 'mapped', true);
  define(node, 'parent', node.parentNode || node.parent);
  define(node, 'rawAttrs', node.rawAttrs);
  define(node, 'parentNode', node.parentNode);
  define(node, 'children', node.children);
  define(node, 'tagName', node.tagName);
  define(node, 'next', node.next);
  define(node, 'prev', node.prev);
  define(node, 'root', node.root);

  if (node.childNodes) {
    node.nodes = node.childNodes;
  }
  if (node.children) {
    node.nodes = node.children;
  }

  if (node.nodes) {
    for (let i = 0; i < node.nodes.length; i++) {
      node.nodes[i] = exports.mapKeys(node.nodes[i]);
    }
  }

  if (node.value) {
    node.value = Buffer.from(node.value);
  }

  if (node.rawAttrs) {
    node.attribs = node.attributes || parseAttributes(node.rawAttrs);
  }

  if (!node.attribs) node.attribs = {};

  if (node.nodeType === 3 && !node.type) {
    node.type = 'text';
  }

  // if (node.type === 'text' && node.data && !node.value) {
  //   node.value = node.data;
  //   delete node.data;
  // }

  // console.log(node)
  if (node.rawText) node.value = node.rawText;
  if (node.tagName) node.type = node.tagName;
  // node.find = query => node.nodes && node.nodes.find(ele => ele.name === query);

  if (node.nodeType === 2 && !node.type) {
    node.type = 'comment';
  }

  return node;
};

exports.encodeHTML = str => {
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

exports.unindent = input => {
  let lines = input.split('\n').filter(line => line.trim() !== '').join('\n');
  let match = lines.match(RE_LEADING_WHITESPACE);
  if (!match) return input;
  let fewest = Math.min(...match.map(indent => indent.length));
  if (fewest > 0) {
    return input.replace(new RegExp(`^[ \\t]{${fewest}}`, 'gm'), '');
  }
  return input;
};

exports.removeEmptyEndLines = str => {
  let last = arr => arr[arr.length - 1];
  let lines = str.split('\n');

  while (typeof lines[0] === 'string' && lines[0].trim() === '') {
    lines.shift();
  }

  while (typeof last(lines) === 'string' && last(lines).trim() === '') {
    lines.pop();
  }

  return lines.join('\n');
};

exports.hasAttributeValue = (node, regex, keep = []) => {
  let attribs = [].concat(keep);

  if (node.attribs) {
    for (let key of Object.keys(node.attribs)) {
      if (attribs.length && !attribs.some(attr => key.startsWith(attr))) {
        continue;
      }

      let value = node.attribs[key];
      if (regex.test(value)) {
        return true;
      }
    }
  }
  return false;
};

exports.parseAttributeValue = (node, regex) => {
  if (node.attribs) {
    for (let key of Object.keys(node.attribs)) {
      let value = node.attribs[key];
      let match = regex.exec(value);
      if (match) {
        return match;
      }
    }
  }
  return null;
};

exports.getLanguage = (node, options) => {
  const sanitize = str => str.trim().replace(/^(highlight[- ]|[\s*])+/g, '').trim();

  if (node && node.attribs) {
    for (let key of Object.keys(node.attribs)) {
      let value = node.attribs[key];

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

      let match = RE_LANGUAGE.exec(value);
      if (match) {
        return langMap(match[1], options);
      }
    }
  }

  return '';
};

exports.trimStart = str => str ? str.replace(RE_NON_NEWLINE_SPACE, '') : '';
exports.unquote = str => str.replace(RE_QUOTES, '');
exports.enquote = str => `"${exports.unquote(str)}"`;

exports.getIndentLen = str => {
  return str ? (str.length - exports.trimStart(str).length) : 0;
};

exports.slugify = (input, options = {}) => {
  if (options.slugify === false) return input;

  if (typeof options.slugify === 'function') {
    return options.slugify(input, options);
  }

  let str = input.split('_').join('-');
  str = colors.unstyle(str);
  str = str.toLowerCase();

  // `.split()` is often (but not always) faster than `.replace()`
  str = str.split(/ /).join('-');
  str = str.split(/\t/).join('--');
  str = str.split(/[|$&`~=\\/@+*!?({[\]})<>=.,;:'"^]/).join('');
  str = str.split(/[。？！，、；：“”【】（）〔〕［］﹃﹄“ ”‘’﹁﹂—…－～《》〈〉「」]/).join('');

  str = replaceDiacritics(str);

  if (options.num) {
    return `${str}-${options.num}`;
  }
  return str;
};

/**
 * Type Utils
 */

exports.isObject = val => {
  return val !== null && typeof val === 'object' && !Array.isArray(val);
};

exports.visit = (node, fn, mapKeys = true) => {
  if (mapKeys !== false) exports.mapKeys(node);
  let value = fn(node);
  if (value === false) return node;
  if (node.nodes || node.childNodes) {
    return exports.mapVisit(node, fn, mapKeys);
  }
  return node;
};

exports.mapVisit = (node, fn, mapKeys = true) => {
  if (mapKeys !== false) exports.mapKeys(node);
  for (let n of (node.nodes || node.childNodes)) {
    if (!n.parent) n.parent = node;
    let value = exports.visit(n, fn, mapKeys);
    if (value === false) {
      break;
    }
  }
  return node;
};

exports.find = (nodes, type) => nodes.find(n => n.type === type);
exports.filter = (nodes, type) => nodes.filter(n => n.type === type);
exports.isInside = (node, type) => {
  let types = [].concat(type || []);
  let parent = node.parent;
  while (parent && parent.type !== 'root') {
    if (types.includes(parent.type)) {
      return true;
    }
    parent = parent.parent;
  }
  return false;
};

exports.stringify = (node, options = {}) => {
  let { attribs = false, omit = ['code'] } = options;
  let output = node.value ? [node.value] : [];
  let prefix = '';
  let attr = '';

  if (node.type === 'pre') {
    return node.html || node.innerHtml || node.value;
  }

  if (omit.includes(node.type)) {
    if (node.nodes) {
      return node.nodes.map(n => exports.stringify(n, options)).join('');
    }
    return '';
  }

  if (node.attribs && attribs) {
    attr = attributes(node.attribs, attribs).trim();
  }

  let open = attr ? node.type + ' ' + attr : node.type;
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
    let inner = node.nodes.map(n => exports.stringify(n, options)).join('');
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
