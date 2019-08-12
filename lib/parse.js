'use strict';

const { RE_ATTRIBUTE } = require('./constants');
const { tags } = require('./tags');
const utils = require('./utils');
const Node = require('./node');
const handlers = {};

const define = (node, key, value) => {
  Reflect.defineProperty(node, key, { value, enumerable: false });
  return node;
};

const parseAttributes = (input = '') => {
  let attribs = {};
  let match;
  while ((match = RE_ATTRIBUTE.exec(input))) {
    if (match) {
      attribs[match[1].toLowerCase()] = match[2];
      input = input.slice(match[0].length);
    }
  }
  return attribs;
};

const assignAttribs = (attribs, stash, value) => {
  let key = stash.shift();
  if (!key) return;
  if (key.slice(-1) === '=') {
    key = key.slice(0, -1);
  } else {
    let segs = key.split('=');
    if (segs.length > 1) {
      attribs[segs[0].toLowerCase()] = segs[1];
      return;
    }
  }
  attribs[key.toLowerCase()] = value ? value.slice(1, -1) : true;
};

const parseAttribs = (input, options = {}) => {
  let tokens = [];
  let match = [];
  let inner = '';
  let attribs = {};
  let stash = [];
  let index = -1;
  let rest = '';
  let val;

  let peek = () => input[index + 1];
  let next = () => input[++index];
  let append = value => (inner += value);

  while (index < input.length) {
    let value = next();
    let finished = false;

    switch (value) {
      case '\\':
        append(value + (next() || ''));
        break;
      case '>':
        finished = true;
        match = [inner + value, inner];
        while (stash.length) {
          assignAttribs(attribs, stash);
        }
        index++;
        break;
      case '"':
      case '\'':
        let end = value;

        while ((val = peek()) !== end && val) {
          val = next();
          if (val === '\\') val += (next() || '');
          value += val;
        }

        value += next();

        // if (!stash.length) {
        //   console.log('  VAL:', [val]);
        //   console.log('VALUE:', [value]);
        //   console.log(' FILE:', [options.file]);
        //   throw new Error('Invalid input: ' + input.slice(0, index + 10));
        // }

        append(value);
        assignAttribs(attribs, stash, value);
        break;
      case '=':
        if (stash.length) stash[stash.length - 1] += value;
        append(value);
        break;
      case ' ':
      case '\n':
        while (stash.length) {
          assignAttribs(attribs, stash);
        }
        stash.push('');
        append(value);
        break;
      default: {
        stash[stash.length - 1] += value;
        append(value);
        break;
      }
    }

    if (finished) {
      break;
    }
  }

  rest = input.slice(index);
  return { inner, match, index, rest, attribs };
};

handlers.text = input => {
  let match = /^([^<]|< [^<]+)+/.exec(input);
  if (match) {
    return define(new Node('text', match[0]), 'match', match);
  }
};

handlers.comment = input => {
  let match = /^<!(--?|—)([\s\S]*?)-->/.exec(input);
  if (match) {
    return define(new Node('comment', match[1]), 'match', match);
  }
};

handlers.tag = (input, state, options = {}) => {
  let match = /^<(\/?)([<!]?[\w/]+(?!\.))(?:(?= )|(>?))/.exec(input);
  if (match) {
    let [all, slash, name, angle] = match;
    let rest = input.slice(match[0].length);

    let node = new Node(name);
    define(node, 'match', match);

    if (node.type === 'script' || node.type === 'style') {
      let endTag = `</${name}>`;
      let html = input.slice(0, input.indexOf(endTag) + endTag.length);
      node.value = html;
      node.match[0] = html;
      node.selfClosing = true;
      delete node.nodes;
      return node;
    }

    if (node.type === 'pre' || node.type === 'code') {
      let endTag = `</${node.type}>`;
      let inner = input.slice(0, input.indexOf(endTag));
      node.html = inner + endTag;
      node.innerHtml = inner.replace(new RegExp(`^<${node.type}(?:\\>|[^>])*?>`, 'i'), '');
    }

    if (angle !== '>') {
      let parsed = parseAttribs(rest, options);
      if (parsed.attribs) {
        node.attribs = parsed.attribs;
      }
      match[0] = '<' + slash + name + parsed.match[0];
      match[1] = slash + name + parsed.match[1];
    }

    if (node.type.slice(-1) === '/') {
      node.selfClosing = true;
      node.type = node.type.slice(0, -1).toLowerCase();
    } else {
      node.selfClosing = tags.selfClosing.includes(node.type);
      node.close = !node.selfClosing && slash === '/';
    }

    if (node.close === false) {
      node.open = true;
      delete node.close;
    }

    return node;
  }
};

const parse = (input = '', options = {}) => {
  let ast = new Node('root');
  let stack = [ast];
  let state = { ast, stack, index: 0 };
  let tokens = [];
  let picked = null;
  let prev = null;

  let pick = node => {
    if (node.attribs && typeof options.pick === 'string') {
      let str = options.pick || '';
      let name = str.slice(1);
      let ch = str[0];
      let type = { '.': 'class', '#': 'id' };
      let ele = node.attribs[type[ch]];
      if (ch && name && type[ch] && ele) {
        let items = ele.split(' ');
        return items.includes(name);
      }

      if (node.type === str) {
        throw new Error('Tag names not implemented yet.');
      }
    }
  };

  while (state.index < input.length) {
    let parent = stack[stack.length - 1];
    let last = parent.nodes[parent.nodes.length - 1];
    let matches = false;

    for (let type of Object.keys(handlers)) {
      let fn = handlers[type];
      let start = state.index;
      let node = fn(input.slice(state.index), state, options);

      if (node) {
        matches = true;
        let len = node.match[0].length;
        let end = start + len;
        state.index += len;

        node.loc = { start, end };

        define(node, 'parent', parent);
        if (prev) define(node, 'prev', prev);
        if (prev) define(prev, 'next', node);

        if (typeof options.onNode === 'function') {
          options.onNode(node);
        }

        prev = node;

        try {
          if (pick(node)) {
            picked = node;
            break;
          }
        } catch (err) {
          console.log('ERROR:', err.message);
          console.log('MATCH:', node.match && node.match.slice(1));
          console.log('INPUT:', node.match && node.match.input.slice(0, 10));
          console.log(err);
        }

        if (node.close !== true) {
          parent.nodes.push(node);
          tokens.push(node);
        }

        if (node.selfClosing === true) {
          continue;
        }

        if (node.close === true) {
          if (parent.wrapNodes) {
            let wrapNodes = new Node(parent.wrapNodes);
            wrapNodes.nodes = parent.nodes;
            wrapNodes.loc = parent.loc;
            parent.nodes = [wrapNodes];
            delete parent.wrapNodes;
          }

          if (parent.type !== 'root') state.stack.pop();
          continue;
        }

        if (node.nodes && node.open === true) {
          state.stack.push(node);
        }
      }
    }

    if (matches === false) {
      throw new Error(`Cannot parse: "${input.slice(state.index, state.index + 20)}"`);
    }
  }

  ast.tokens = tokens;
  ast.picked = picked;
  return ast;
};

module.exports = parse;
