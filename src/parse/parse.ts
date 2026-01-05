import { tags } from '~/tags';
import { Node } from '~/node';
import { parseAttributes } from '~/parse-attributes';

const handlers = {};

const define = (node, key, value) => {
  Reflect.defineProperty(node, key, { value, enumerable: false });
  return node;
};

handlers.text = input => {
  const match = /^([^<]|<(?![a-zA-Z\/!]))/.exec(input);
  if (match) {
    return define(new Node('text', match[0]), 'match', match);
  }
};

handlers.comment = input => {
  const match = /^<!(--?|—)([\s\S]*?)(?:-->|$)/.exec(input);
  if (match) {
    return define(new Node('comment', match[2]), 'match', match);
  }
};

handlers.tag = (input, state, options = {}) => {
  const match = /^<(\/?)([<!]?[\w/]+(?!\.))(?:(?= )|(>?))/.exec(input);
  if (match) {
    const [, slash, name, angle] = match;
    const rest = input.slice(match[0].length);

    const node = new Node(name);
    define(node, 'match', match);

    if (node.type === 'script' || node.type === 'style') {
      const endTag = `</${name}>`;
      const endIndex = input.indexOf(endTag);
      if (endIndex === -1) {
        node.value = input;
        node.match[0] = input;
      } else {
        const html = input.slice(0, endIndex + endTag.length);
        node.value = html;
        node.match[0] = html;
      }
      node.selfClosing = true;
      delete node.nodes;
      return node;
    }

    if (node.type === 'pre' || node.type === 'code') {
      const endTag = `</${node.type}>`;
      const inner = input.slice(0, input.indexOf(endTag));
      node.html = inner + endTag;
      node.innerHtml = inner.replace(new RegExp(`^<${node.type}(?:\\>|[^>])*?>`, 'i'), '');
    }

    if (angle !== '>') {
      const parsed = parseAttributes(rest, options);
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

export const parse = (input = '', options = {}) => {
  const ast = new Node('root');
  const stack = [ast];
  const state = { ast, stack, index: 0 };
  const tokens = new WeakSet();
  let picked = null;
  let prev = null;

  const pick = node => {
    if (node.attribs && typeof options.pick === 'string') {
      const str = options.pick || '';
      const name = str.slice(1);
      const ch = str[0];
      const type = { '.': 'class', '#': 'id' };
      const ele = node.attribs[type[ch]];
      if (ch && name && type[ch] && ele) {
        const items = ele.split(' ');
        return items.includes(name);
      }

      if (node.type === str) {
        throw new Error('Tag names not implemented yet.');
      }
    }
  };

  while (state.index < input.length) {
    const parent = stack[stack.length - 1];
    // const last = parent.nodes[parent.nodes.length - 1];
    let matches = false;

    for (const type of Object.keys(handlers)) {
      const fn = handlers[type];
      const start = state.index;
      const node = fn(input.slice(state.index), state, options);

      if (node) {
        matches = true;
        const len = node.match[0].length;
        const end = start + len;
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
          tokens.add(node);
        }

        if (node.selfClosing === true) {
          continue;
        }

        if (node.close === true) {
          if (parent.wrapNodes) {
            const wrapNodes = new Node(parent.wrapNodes);
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

export default parse;
