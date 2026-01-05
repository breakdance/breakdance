import url from 'url';
import path from 'path';
import entities from 'entities';
// import replace from '~/helpers/replacers';
import * as reflinks from '~/helpers/reflinks';
import * as tags from '~/tags';
import * as utils from '~/utils';
import { BULLETS, RE_ALL_WHITESPACE, RE_CODE_TAG } from '~/constants';

const decrypt = node => {
  try {
    let s, i, j, r, c;
    const a = node.attribs['data-cfemail'];
    if (a) {
      s = '';
      r = parseInt(a.substr(0, 2), 16);
      for (j = 2; a.length - j; j += 2) {
        c = parseInt(a.substr(j, 2), 16) ^ r;
        s += String.fromCharCode(c);
      }
      return s;
    }
  } catch (e) {}
};

const isSelfClosing = node => {
  return tags.voidElements.includes(node.type);
};

const isInlineTag = node => {
  return Boolean(node) && tags.inline.includes(node.type);
};

const isBetweenInlineTags = node => {
  return node.type === 'text' && isInlineTag(node.prev) && isInlineTag(node.next);
};

const createTable = () => {
  const table = { align: [], rows: [] };

  const align = {
    default: '---',
    center: ':---:',
    right: '---:',
    left: ':---'
  };

  table.alignments = align;
  table.alignment = type => align[type] || align.default;
  return table;
};

const escapeTableCell = str => {
  return str.replace(/\|/g, '\\|');
};

const escapeCodeBlock = str => {
  const backtickCount = (str.match(/`+/g) || []).reduce((max, seq) => Math.max(max, seq.length), 0);
  const fence = '`'.repeat(backtickCount + 1);
  return { content: str, fence };
};

const handleNestedLists = (node, level = 0) => {
  let output = '';
  if (node.nodes) {
    for (const child of node.nodes) {
      if (child.type === 'ul' || child.type === 'ol') {
        output += '\n' + ' '.repeat(level * 2) + handleNestedLists(child, level + 1);
      } else {
        output += child.value || '';
      }
    }
  }
  return output;
};

const handleNestedBlockquotes = (node, level = 1) => {
  let output = '';
  if (node.nodes) {
    for (const child of node.nodes) {
      if (child.type === 'blockquote') {
        output += '\n' + '>'.repeat(level) + ' ' + handleNestedBlockquotes(child, level + 1);
      } else {
        output += child.value || '';
      }
    }
  }
  return output;
};

export const init = compiler => {
  const options = compiler.options;
  const bullets = options.bullets || BULLETS;
  const mapVisit = compiler.mapVisit.bind(compiler);
  const toValue = node => node.value ? String(node.value) : '';

  const keepEmpty = node => {
    const tags = [].concat(options.keepEmpty || []);
    return tags.includes(node.type);
  };

  const newlinesToSpace = (str, condense = false) => {
    if (options.whitespace === 'pre') return str;
    const output = str ? str.replace(/(?<!>)\r*\n/g, ' ') : '';
    if (condense === true) {
      return output.replace(/(?<!>)\s+/g, ' ');
    }
    return output;
  };

  const isInsideHeading = () => {
    const { h1, h2, h3, h4, h5, h6 } = compiler.state.tags;
    return Boolean(h1 || h2 || h3 || h4 || h5 || h6);
  };

  const condenseSpaces = str => {
    if (options.whitespace === 'pre') return str;
    return str ? str.replace(/[^\S\n]+/g, ' ') : '';
  };

  const trim = str => {
    if (options.whitespace === 'pre') return str;
    const { kbd, pre } = compiler.state.tags;
    if (kbd > 0 || pre > 0) return str;
    return str ? str.trim() : '';
  };

  const space = str => options.whitespace !== 'pre' && /\w/.test(str) ? ' ' : '';

  const find = (node, type) => {
    if (node.type === type) return node;
    if (node.nodes) {
      return node.nodes.find(n => find(n, type));
    }
  };

  const hasType = (node, type) => {
    if (node.type === type) return true;
    if (!node.nodes) return false;
    return node.nodes.some(n => hasType(n, type));
  };

  const hasTypes = (node, types) => types.some(type => hasType(node, type));

  const some = (node, fn) => {
    if (fn(node)) return true;
    if (!node.nodes) return false;
    return node.nodes.some(n => some(n, fn));
  };

  const isInside = (node, type) => {
    let parent = node.parent;
    const types = [].concat(type);
    while (parent && parent.type !== 'root') {
      if (types.includes(parent.type)) {
        return true;
      }
      parent = parent.parent;
    }
    return false;
  };

  const isInsideAny = (tagNames = []) => {
    const isInside = obj => {
      for (const key of Object.keys(obj)) {
        const value = obj[key];

        if (utils.isObject(value)) {
          if (isInside(value)) return true;
          continue;
        }

        if (value && tagNames.includes(key)) {
          return true;
        }
      }
      return false;
    };
    return isInside(compiler.state);
  };

  const identity = (node, nospace) => {
    const lastChar = compiler.state.output.slice(-1);
    const value = mapVisit(node);
    const inner = trim(value, node);

    if (inner !== '') {
      if (inner.includes(`${node.type}>`)) {
        return inner;
      }

      const ws = nospace ? '' : space(lastChar);
      return `${ws}<${node.type}>${inner}</${node.type}>`;
    }

    return '';
  };

  const wrapChars = (node, chars) => {
    const isInside = compiler.state[node.type] > 0;
    const lastChar = compiler.state.output.slice(-1);
    const index = node.parent.nodes.indexOf(node);
    const next = node.parent.nodes[index + 1];
    let inner = mapVisit(node);

    if (isInside) chars = '';
    if (chars && inner.startsWith(chars) && inner.endsWith(chars)) {
      chars = '';
    }

    let left = chars;
    let right = chars;
    if (compiler.state.tags.code > 1) {
      left = `<${node.type}>`;
      right = `</${node.type}>`;
    }

    if (inner.trim() !== '') {
      // if (/`/.test(inner)) {
      //   // inner = entities.encodeHTML(inner);
      //   // return `<code>${inner}</code>`;
      // }

      if (options.whitespace === true) {
        inner = inner.replace(RE_ALL_WHITESPACE, ' ');
      }

      let ws = space(lastChar);
      let after = '';

      if (next && next.type === 'text' && /^\w/.test(next.value)) {
        after = ' ';
      }

      if (!ws && left && ['*', '_', '~', '+'].includes(left[0]) && lastChar === left[0]) {
        ws = ' ';
      }

      return `${ws}${left}${trim(inner)}${right}${after}`;
    }

    return inner ? ' ' : '';
  };

  const heading = (prefix, node) => {
    const { a, blockquote, li, table } = compiler.state.tags;
    if (a || blockquote || li || table) {
      return wrapChars(node, '**');
    }

    let value = toValue(node);
    if (value && !/<[a-z]/i.test(value)) {
      return trim(`${trim(prefix)} ${trim(value)}`);
    }

    if (options.domain && /wikipedia/.test(options.domain)) {
      const visit = (node, fn) => {
        fn(node);
        if (node.nodes) {
          node.nodes.forEach(n => visit(n, fn));
        }
      };

      visit(node, child => {
        if (child.type === 'span') {
          const a = child.nodes.find(ch => ch.type === 'a');
          if (a && a.nodes.some(ch => ch.value === 'edit')) {
            child.nodes[0].nodes[0].value = '';
            child.nodes[child.nodes.length - 1].nodes[0].value = '';
            a.attribs = {};
            a.nodes = [];
          }
        }
      });
    }

    if (!value || some(node, child => child.nodeType !== 3)) {
      value = mapVisit(node);
    }

    let output = condenseSpaces(newlinesToSpace(trim(value)));
    if (options.whitespace !== 'pre') output += '\n\n';
    return `${trim(prefix)} ${output}`;
  };

  const toUrl = (str, options = {}) => {
    if (!str) return '';
    if (str === true) return;

    if (options.domain && str.startsWith('./')) {
      str = str.slice(2);
    }

    let base = options.base || options.url;
    if (base) {
      if (base.slice(-1) !== '/') {
        const basename = path.basename(base);
        const segs = str.split('/');
        if (segs[0] !== basename) {
          base += '/';
        }
      }
      return url.resolve(base, str);
    }

    const obj = url.parse(str);
    if (str[0] !== '#') {
      const opts = options.domain ? url.parse(options.domain) : {};
      for (const key of Object.keys(opts)) {
        if (!obj[key]) {
          obj[key] = opts[key];
        }
      }
    }

    if (compiler.state.base) {
      for (const key of Object.keys(obj)) {
        if (!obj[key]) obj[key] = compiler.state.base[key];
      }
    }

    if (obj.pathname === '/' && str.slice(-1) !== '/') {
      obj.pathname = '';
    }

    return url.format(obj);
  };

  /**
   * Directives and comments
   */

  compiler.handler('directive', mapVisit);
  compiler.handler('!doctype', mapVisit);
  compiler.handler('comment', node => {
    const value = toValue(node);
    if (options.comments === true && trim(value) !== '') {
      return `<!-- ${trim(value.replace(/(<!-+|-+>)/g, ''))} -->`;
    }
    return '';
  });

  /**
   * Root element <html>
   */

  compiler.handler('html', mapVisit);

  /**
   * Text nodes
   */

  compiler.handler('text', node => {
    const { blockquote, code, pre } = compiler.state.tags;
    const lastChar = compiler.state.output.slice(-1);
    let value = toValue(node);

    if (pre || code || options.whitespace === 'pre') return value;
    if (options.whitespace === true) {
      value = value.replace(RE_ALL_WHITESPACE, ' ');
    }

    if (!blockquote) {
      value = value.replace(/\n[^\S\n]+$/gm, '\n');
    }

    if (lastChar && /\s/.test(lastChar)) {
      value = value.replace(/^\s+/, '');
    }

    if (value.trim() === '') {
      if (isInsideAny(tags.flow) || !isInsideAny(compiler.known)) {
        return value.replace(/\n\n*[^\S\n]+/gm, '\n');
      }
    }

    // if (
    //   node.prev
    //   && node.prev.type !== 'text'
    //   && isInlineTag(node.prev)
    //   && !['br', 'wbr'].includes(node.prev.type)
    //   && value
    //   && !/^\s/.test(value)
    //   && /^\w/.test(value)
    //   && lastChar
    //   && !/\s/.test(lastChar)
    // ) {
    //   value = ' ' + value;
    // }

    return value;
  });

  /**
   * Document metadata
   */

  compiler
    .handler('root', mapVisit)
    .handler('head', mapVisit)
    .handler('link', () => '')
    .handler('meta', () => '')
    .handler('style', () => '')
    .handler('title', node => {
      if (!compiler.state.title) {
        const title = node.nodes ? mapVisit(node) : toValue(node);
        compiler.state.title = trim(condenseSpaces(title));

        if (options.title === true) {
          return `# ${title}`;
        }
      }
      return '';
    })
    .handler('base', node => {
      if (node.attribs && node.attribs.href && !options.domain) {
        compiler.state.base = url.parse(node.attribs.href);
      }
      return '';
    });

  /**
   * Scripting
   */

  compiler
    .handler('noscript', () => '')
    .handler('script', () => '');

  /**
   * Sections
   */

  compiler
    .handler('address', identity) // contact information
    .handler('aside', () => '') // tangential/related content
    .handler('article', mapVisit) // article
    .handler('body', mapVisit) // document body
    .handler('footer', mapVisit) // footer for a section
    .handler('main', mapVisit) // main content of the <body>
    .handler('nav', mapVisit) // group of navigational links
    .handler('section', mapVisit); // section of content

  /**
   * Headings (WC3 "section" elements)
   */

  compiler
    .handler('h1', node => {
      const h1 = heading('# ', node);
      const value = h1.slice(2);

      if (!compiler.state.title) {
        compiler.state.title = value;
      }
      if (!compiler.state.h1) {
        compiler.state.h1 = value;
      }

      return `\n\n${h1}`;
    })
    .handler('h2', node => `\n\n${heading('##', node)}`)
    .handler('h3', node => `\n\n${heading('###', node)}`)
    .handler('h4', node => `\n\n${heading('####', node)}`)
    .handler('h5', node => `\n\n${heading('#####', node)}`)
    .handler('h6', node => `\n\n${heading('######', node)}`)
    .handler('header', node => mapVisit(node) + '\n\n')
    .handler('hgroup', mapVisit);

  /**
   * Content grouping
   */

  compiler.handler('div', node => {
    let block = !node.inline;
    // const attribs = utils.attributes(node.attribs);

    // if (node.attribs.class.includes('segment-start-offset')) {
    //   return '';
    // }

    utils.visit(node, child => {
      if (child === node) return;

      if (!isInside(child, ['pre', 'code'])) {
        if (child.value && isBetweenInlineTags(child)) {
          child.value = child.value.replace(/\s+/, ' ');
        }

        if (child.inline === true) {
          block = false;
        }

        // if (child !== node && child.inline !== true && !tags.inline.includes(child.type)) {
        //   allInline = false;
        // }
      }
    });

    const output = mapVisit(node);

    if (block !== true) {
      return output;
    }

    // if (options.whitespace !== false && allInline === true) {
    //   output = newlinesToSpace(trim(output));
    // }

    return `\n${output}\n`;
  });

  compiler.handler('figure', mapVisit);
  compiler.handler('figcaption', mapVisit);

  /**
   * Paragraphs (W3C "Grouping content")
   */

  compiler.handler('p', node => {
    const value = trim(mapVisit(node));

    // TODO: make this optional
    const output = newlinesToSpace(value, true);
    return `\n\n${output}\n\n`;
  });

  /**
   * Horizontal rules ("thematic breaks")
   */

  compiler.handler('hr', node => '\n\n***\n\n');

  /**
   * Line break
   */

  compiler.handler('br', node => {
    return !isInsideHeading() ? '<br>\n' : '<br>';
  });

  /**
   * Word break
   */

  compiler.handler('wbr', () => '<wbr>');

  /**
   * Pre-formatted text
   */

  compiler.handler('pre', node => {
    const insideTable = compiler.state.tags.table > 0;
    const code = node.nodes[0].type === 'code' ? node.nodes[0] : null;
    let output = '';

    const serialize = (node, options, code = true) => {
      let output = '';

      if (node.value) {
        output += node.value;
      }

      if (node.nodes) {
        for (const child of node.nodes) {
          output += serialize(child);
        }
      }

      if (output === '>') output = '&gt;';
      if (output === '">') output = '"&gt;';
      if (output === '<') output = '&lt;';
      if (output === '</') output = '&lt;/';

      if (node.type === 'code' && code === false) {
        return output;
      }

      const attribs = utils.attributes(node.attribs);
      const attr = attribs ? ' ' + attribs : '';
      let close = isSelfClosing(node) ? '' : `</${node.type}>`;
      let open = `<${node.type}${attr}>`;

      if (node.type === '!doctype') {
        open = `<${node.value}>`;
        close = '';
        output = '';
      }

      if (node.type !== 'text' && node.type !== 'pre') {
        return `${open}${output}${close}`;
      }

      return output;
    };

    if (code) {
      if (options.literalPre === true) {
        output = serialize(code, options, false);
      } else {
        utils.visit(code, child => {
          if (child === code) return;

          const value = decrypt(child);
          if (value) {
            child.value = value;
            delete child.attribs;
            delete child.nodes;
          }
          if (child.value) {
            output += child.value;
          }
        });
      }
    } else if (options.visitPre === true) {
      output = mapVisit(node);
    } else {
      output = serialize(node, options);
    }

    const opts = { ...options, attribs: true, omit: ['code'] };
    let lang = (code && utils.getLanguage(code, opts)) || utils.getLanguage(node, opts);
    let inner = output;

    const json = (() => {
      if (lang && lang !== 'json') return;
      try {
        return JSON.parse(output);
      } catch (err) {
        /* do nothing */
      }
    })();

    if (json) {
      lang = 'json';
      inner = JSON.stringify(json, null, 2);
    }

    if (!lang && /((?<!\w)(require\(|\.then\()|var |const )/.test(inner)) {
      inner = entities.decodeHTML(inner);
      lang = 'js';
    }

    if (!lang && /^\s*curl /.test(inner)) {
      lang = 'sh';
    }

    // const { content, fence } = escapeCodeBlock(inner);
    // let res = utils.removeEmptyEndLines(content);

    const fence = /(?<!\\)```/.test(inner) ? '````' : '```';
    let res = utils.removeEmptyEndLines(inner);

    if (!json && options.unindentPre === true) {
      res = utils.unindent(res);
    }

    if (insideTable) {
      return `<pre>${res}</pre>`;
    }

    const block = [fence + lang, res, fence].join('\n');
    return `\n\n${block}\n\n`;
  });

  /**
   * Code
   */

  compiler.handler('code', node => {
    const prev = compiler.state.output;
    const inner = mapVisit(node);

    if (!inner || !inner.trim()) {
      return '';
    }

    if (compiler.state.tags.pre > 0) {
      const lang = utils.getLanguage(node);
      return `${lang}\n${entities.decodeHTML(inner)}\n`;
    }

    let open = inner.includes('`') ? '``' : '`';
    let close = inner.includes('`') ? '``' : '`';
    let output;

    if (compiler.state.tags.code > 1) {
      open = '<code>';
      close = '</code>';
    }

    if (node.nodes[0].type === 'a') {
      output = inner;
    }

    if (node.nodes.length === 1 && node.nodes[0].type === 'a') {
      output = `**${inner}**`;
    } else {
      output = entities.decodeHTML(inner);
      output = `${open}${output}${close}`;
    }

    if (prev && !/[-([<\s]/.test(prev.slice(-1))) {
      output = ' ' + output;
    }

    return output;
  });

  /**
   * Keyboard
   */

  compiler.handler('kbd', identity);

  /**
   * Computer output
   */

  compiler.handler('samp', identity);
  compiler.handler('var', identity);

  /**
   * Inline quoted text
   */

  compiler.handler('q', identity);

  /**
   * Blockquotes
   */

  compiler.handler('blockquote', node => {
    let count = 1;
    let parent = node.parent;
    while (parent && parent.type !== 'root') {
      if (parent.type === 'blockquote') count++;
      parent = parent.parent;
    }

    const angles = '>'.repeat(count) + ' ';
    const output = angles + trim(mapVisit(node));
    if (options.whitespace === 'pre') {
      return output;
    }

    const result = '\n' + output
      .replace(/[^\S\r\n]+/g, ' ')
      .replace(/\r*\n+[^\S\r\n]*/g, '\n') + '\n';

    return result;
  });

  /**
   * Cited title of a work
   */

  compiler.handler('cite', node => {
    return `<cite>${trim(mapVisit(node))}</cite>`;
  });

  /**
   * Ordered Lists
   */

  compiler.handler('ol', node => {
    compiler.state.ol.push({ items: [] });
    compiler.state.types.push(node.type);
    mapVisit(node);
    compiler.state.types.pop();

    const list = compiler.state.ol.pop();
    const indent = '  '.repeat(compiler.state.types.length);
    const items = [];

    for (let i = 0; i < list.items.length; i++) {
      const item = list.items[i];
      const n = options.keepListItemNumbers ? i + 1 : '1';
      if (item.trim() !== '') {
        items.push(`${indent}${n}. ${item.trim()}`);
      }
    }

    let output = '\n' + items.join('\n');
    if (options.whitespace !== 'pre') {
      output = output.replace(/\n[^\S\n]*\n+/gm, '\n');
    }

    let result = output + '\n';

    if (compiler.state.types.length === 0) {
      result += '\n';
    }
    return result;
  });

  /**
   * Unordered Lists
   */

  compiler.handler('ul', node => {
    compiler.state.ul.push({ items: [] });
    compiler.state.types.push(node.type);
    mapVisit(node);
    compiler.state.types.pop();

    const list = compiler.state.ul.pop();
    const bullet = bullets[compiler.state.ul.length % bullets.length] + ' ';
    const indent = '  '.repeat(compiler.state.types.length);
    const textIndent = '  '.repeat(compiler.state.types.length + 1);
    const items = [];

    for (let i = 0; i < list.items.length; i++) {
      const item = list.items[i].replace(/\n+/g, '\n');
      if (item.trim() !== '') {
        items.push(`${indent}${bullet}${item}`);
      }
    }

    let output = '\n' + items.join('\n');
    if (options.whitespace !== 'pre') {
      output = output.replace(/\n[^\S\n]*\n+/gm, '\n');
    }

    let result = output + '\n';
    if (compiler.state.types.length === 2) {
      result += '\n';
    }

    result = result.replace(/^[^\S\n]*(\w)/gm, textIndent + '$1');
    return result + '\n';
  });

  /**
   * List items
   */

  compiler.handler('li', node => {
    const type = compiler.state.types[compiler.state.types.length - 1];
    let output = mapVisit(node).replace(/^\s+/, '');

    if (!hasTypes(node, ['ul', 'ol'])) {
      output = output.replace(/\n/g, ' ').replace(/\s+/g, ' ');
    }

    if (output.trim() === '') {
      return '';
    }

    const match = RE_CODE_TAG.exec(output);
    if (match) {
      const maxLen = options.maxInlineCodeLength || 90;
      const prefix = output.slice(0, match.index).trim();
      const len = prefix.length + match[1].length;

      if (len > maxLen) {
        // align with text after "1. " or "- "
        const spaces = ' '.repeat(type === 'ol' ? 3 : 2);

        const lines = [
          prefix,
          spaces + '```',
          spaces + match[1],
          spaces + '```'
        ];

        output = lines.join('\n');
      } else {
        output = `${prefix} \`${match[1]}\``;
      }
    }

    output = output
      .split('\n')
      .map(line => line.replace(/\s+$/, ''))
      .join('\n');

    if (!type) {
      const { ol, ul } = compiler.state;
      const bullet = bullets[ul.length % 3] + ' ';
      const indent = '  '.repeat(ul.length + ol.length);
      return `${indent}${bullet}${output.trim()}`;
    }

    const lists = compiler.state[type];
    const list = lists[lists.length - 1];
    list.items.push(output.trim());
    return '';
  });

  /**
   * Definition lists
   */

  compiler.handler('dl', node => {
    compiler.state.dl.push({ items: [] });

    let { indent = '', parent } = node;

    if (parent && parent.indent && (parent.type === 'dd' || parent.type === 'dl')) {
      indent = node.indent = parent.indent + '  ';
    } else {
      let parent = node.parent;
      let depth = 1;

      while (parent && parent.type !== 'root') {
        if (['dl', 'dd'].includes(parent.type)) depth++;
        parent = parent.parent;
      }

      indent = node.indent = '  '.repeat(depth);
    }

    mapVisit(node);

    const last = compiler.state.dl.pop();
    let list = last.items.map(line => indent + line).join('\n');

    if (options.whitespace !== 'pre') {
      list = list.replace(/\n[^\S\n]*\n+(?!\s*<dt)/gm, '\n');
    }

    const lines = list.split('\n');
    const arr = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const prev = lines[i - 1];
      const next = lines[i + 1];

      if (next && line.trim() === '') {
        if ((!prev || /^\s*<d[dl]/.test(prev)) && next.trim().startsWith('<dd')) {
          continue;
        }
      }
      arr.push(line);
    }

    list = arr.join('\n');
    return `\n<dl>\n${list}\n</dl>\n`;
  });

  compiler.handler('dt', node => {
    const dl = compiler.state.dl[compiler.state.dl.length - 1];
    // add a line above subsequent <dl>s
    if (dl.items.length) {
      dl.items.push('');
    }
    dl.items.push(identity(node, true));
    return '';
  });

  compiler.handler('dd', node => {
    const { nodes, parent } = node;

    const siblings = parent.nodes;
    const rest = siblings.slice(siblings.indexOf(node) + 1);
    const dl = compiler.state.dl[compiler.state.dl.length - 1];
    let inner = trim(mapVisit(node));
    let indent = node.indent = '';

    if (parent.indent && (parent.type === 'dd' || parent.type === 'dl')) {
      indent = node.indent = parent.indent + '  ';
    }

    if (nodes.some(n => hasTypes(n, ['dl', 'dd']))) {
      const lines = inner.split('\n');
      const last = indent + lines.pop();
      inner = indent + lines.join('\n') + '\n' + last;
      inner = '\n' + inner + '\n' + indent.slice(2);
    } else {
      inner = inner.replace(RE_ALL_WHITESPACE, ' ');
    }

    dl.items.push(`<dd>${inner}</dd>`);
    if (rest.some(n => ['dd', 'dt', 'dl'].includes(n.type))) {
      dl.items.push('');
    }

    return '';
  });

  /**
   * Tables
   */

  compiler.handler('table', node => {
    const renderTable = (node, newlines = '\n\n') => {
      const table = createTable();
      const align = table.alignments;

      compiler.state.tables.push(table);
      let output = mapVisit(node);
      compiler.state.tables.pop();

      const max = table.rows.reduce((a, r) => Math.max(a, r.cols.length), 0);
      let hasHeader = table.rows.some(row => row.type === 'header');

      if (table.colgroup) {
        table.rows[0].type = 'header';
        hasHeader = true;
      }

      if (!hasHeader) {
        if (options.firstRowAsHeader) {
          table.rows[0].type = 'header';
        } else {
          table.rows.unshift({ type: 'header', cols: [] });
        }
      }

      const columns = row => {
        if (row.every(col => col.trim() === '')) return '';
        return row.length ? `| ${row.join(' | ')} |\n` : '';
      };

      const fillers = {
        align: () => align.default,
        header: i => options.tableHeader ? options.tableHeader(i) : '-',
        row: () => ''
      };

      let header = utils.filter(table.rows, 'header');
      if (header.length > 1) {
        table.align = table.align.slice(0, max);
        const thead = [];
        for (let i = 0; i < header.length; i++) {
          for (let j = 0; j < header[i].cols.length; j++) {
            const col = header[i].cols[j];
            if (thead[j] === void 0) {
              thead.push('');
            } else {
              thead[j] += '<br>';
            }
            thead[j] += col;
          }
        }

        // thead = thead.map(th => th === '' ? '<br>' : th);
        header = [{ type: 'header', cols: thead }];
      }

      if (table.rows.length > 1) {
        table.rows.splice(1, 0, { type: 'align', cols: table.align });
      }

      const rows = [
        ...header,
        utils.find(table.rows, 'align'),
        ...utils.filter(table.rows, 'row'),
        ...utils.filter(table.rows, 'footer')
      ];

      for (const row of rows.filter(Boolean)) {
        const filler = fillers[row.type] || fillers.row;
        while (row.cols.length < max) {
          row.cols.push(filler(row.cols.length));
        }
        output += columns(row.cols);
      }

      if (!/\w/.test(output)) {
        return '';
      }

      return `${newlines}${output}${newlines}`;
    };

    const getTables = (n, tables = []) => {
      if (n !== node && n.type === 'table') {
        tables.push(n);
      }
      if (n.nodes) {
        n.nodes.forEach(child => getTables(child, tables));
      }
      return tables;
    };

    if (options.unNestTables === true) {
      const tables = getTables(node);
      if (tables.length) {
        for (let i = 0; i < tables.length; i++) {
          tables[i] = renderTable(tables[i], '\n');
        }
        return tables.join('\n');
      }
    }

    return renderTable(node);
  });

  /**
   * Table head
   */

  compiler.handler('thead', mapVisit);

  /**
   * Table body
   */

  compiler.handler('tbody', mapVisit);

  /**
   * Table footer
   */

  compiler.handler('tfoot', mapVisit);

  /**
   * Table row
   */

  compiler.handler('tr', node => {
    if (!compiler.state.tables.length) {
      compiler.state.tables.push(createTable());
    }

    const table = compiler.state.tables[compiler.state.tables.length - 1];
    const row = { type: 'row', cols: [] };

    if (node.attribs.align) {
      row.align = node.attribs.align;
      if (!table.aligned) {
        table.align.push(table.alignment(row.align));
      }
    }

    if (compiler.state.tags.thead > 1) {
      row.type = 'header';
    }

    if (compiler.state.tags.tfoot > 1) {
      row.type = 'footer';
    }

    table.rows.push(row);
    mapVisit(node);
    return '';
  });

  /**
   * Table header
   */

  compiler.handler('th', node => {
    const table = compiler.state.tables[compiler.state.tables.length - 1];

    let row = table.rows[table.rows.length - 1];
    if (!row) {
      row = { type: 'row', cols: [] };
      table.rows.push(row);
    }

    if (!table.rows.some(r => r.type === 'header')) {
      row.type = 'header';
    }

    if (compiler.state.tags.thead > 0) {
      table.aligned = true;

      switch (node.attribs.align) {
        case 'center':
          table.align.push(':---:');
          break;
        case 'left':
          table.align.push(':---');
          break;
        case 'right':
          table.align.push('---:');
          break;
        default:
          table.align.push('---');
          break;
      }
    }

    let col = trim(mapVisit(node)).replace(/\s+/gm, ' ');
    if (col && node.attribs.scope === 'row') {
      col = `**${col.replace(/^[*]+|[*]+$/g, '')}**`;
    }

    row.cols.push(col);
    return '';
  });

  /**
   * Table cell
   */

  compiler.handler('td', node => {
    // const prev = compiler.state.output;
    const table = compiler.state.tables[compiler.state.tables.length - 1];
    const col = trim(mapVisit(node)).replace(/\s+/g, ' ');
    if (table && table.rows) {
      const row = table.rows[table.rows.length - 1];
      if (row && row.cols) {
        row.cols.push(col);
        return '';
      }
      return `| ${col} |`;
    }
    return `${col} | `;
  });

  /**
   * Table caption
   */

  compiler.handler('caption', node => identity(node) + '\n\n');

  /**
   * Table columns and groups
   */

  compiler.handler('colgroup', node => {
    const table = compiler.state.tables[compiler.state.tables.length - 1];
    table.colgroup = { span: Number(node.attribs.span || 0), cols: [] };
    return mapVisit(node);
  });

  compiler.handler('col', node => {
    const table = compiler.state.tables[compiler.state.tables.length - 1];
    table.colgroup.cols.push({ span: Number(node.attribs.span || 0) });
    return mapVisit(node);
  });

  /**
   * Generic span
   */

  compiler.handler('span', mapVisit);

  /**
   * Anchors / hyperlinks (text-level semantics)
   */

  // eslint-disable-next-line complexity
  compiler.handler('a', node => {
    // if (!compiler.seenTypes.has('h1')) return '';
    // console.log(node)

    const inner = node.nodes ? trim(mapVisit(node)) : trim(toValue(node));
    let text = condenseSpaces(newlinesToSpace(inner));
    const keep = [].concat(options.keepEmpty || []);
    const { href } = node.attribs;

    const classIncludes = (node, value) => {
      if (node.attribs && node.attribs.class) {
        return node.attribs.class.includes(value);
      }
      return false;
    };

    // TODO: move to formatter
    if (node.value === void 0 && node.nodes) {
      if (some(node, n => n.type === 'i' && classIncludes(node, 'icon-'))) {
        return '';
      }
    }

    // if (isInsideHeading()) {

    // }

    if (!text.trim() && (!keep.length || !keep.includes('a'))) {
      return '';
    }

    if (text) {
      text = entities.decodeHTML(text.replace(RE_ALL_WHITESPACE, ' '));
    }

    if (href && !compiler.state.links.includes(href)) {
      compiler.state.links.push(href);
    }

    let title = trim(node.attribs.title);
    if (title) {
      title = title.replace(/"/g, '&quot;');
      title = ` "${title.replace(RE_ALL_WHITESPACE, ' ')}"`;
    }

    const link = toUrl(trim(href), options);
    const slug = str => {
      if (str[0] === '#') {
        return `#${utils.slugify(str.slice(1), options)}`;
      }
      return utils.slugify(str);
    };

    if (!link) {
      if (node.attribs.name && (text || keep.includes('a'))) {
        return `<a name="${node.attribs.name}">${text}</a>`;
      }
      return '';
    }

    if (compiler.state.tags.code || compiler.state.tags.pre) {
      if (node.parent.type !== 'code' || compiler.state.tags.pre) {
        if (title) title = ` title=${title.trim()}`;
        return `<a href="${link}"${title}>${text}</a>`;
      }
    }

    let ref = trim(trim(link) + ' ' + trim(title));
    if (options.reflinks === false) {
      return `[${text}](${ref})`;
    }

    if (options.reflinks === true) {
      ({ ref } = reflinks.format('href', link, title, compiler));
    }

    if (ref[0] !== '#' && !/(^\/|:\/\/)/.test(ref)) {
      return `[${text}][${ref}] `;
    }

    if (options.reflinks === void 0 && ref[0] === '#') {
      ref = slug(ref);
    }

    return `[${text}](${ref})`;
  });

  /**
   * Emphatic stress (text-level semantics)
   */

  compiler.handler('em', node => wrapChars(node, '_'));

  /**
   * Italics (offset text conventionally styled in italic)
   */

  compiler.handler('i', node => wrapChars(node, '_'));

  /**
   * Strong importance (text-level semantics)
   */

  compiler.handler('strong', node => wrapChars(node, '**'));

  /**
   * Bold (offset text conventionally styled in bold)
   */

  compiler.handler('b', node => wrapChars(node, '**'));

  /**
   * Small print, subscript and superscript
   */

  compiler
    .handler('small', node => trim(identity(node)))
    .handler('sub', node => trim(identity(node)))
    .handler('sup', node => trim(identity(node)));

  /**
   * Underline (offset text conventionally styled with an underline)
   */

  compiler.handler('u', identity);

  /**
   * Insert and delete
   */

  compiler.handler('ins', node => wrapChars(node, '++'));
  compiler.handler('del', node => wrapChars(node, '~~'));

  /**
   * Strike (struck text)
   */

  compiler.handler('strike', node => wrapChars(node, '~~'));
  compiler.handler('s', node => wrapChars(node, '~~'));

  /**
   * Abbreviations
   */

  compiler.handler('abbr', node => {
    const title = node.attribs && node.attribs.title ? ` title="${node.attribs.title}"` : '';
    return `<abbr${title}>${trim(mapVisit(node))}</abbr>`;
  });

  /**
   * BiDi isolate and override
   */

  compiler.handler('bdi', identity);
  compiler.handler('bdo', identity);

  /**
   * Defining instance
   */

  compiler.handler('dfn', identity);

  /**
   * Highlighted text
   */

  compiler.handler('mark', node => {
    let attr = trim(utils.attributes(node.attribs, ['title']));
    if (attr) attr = ' ' + attr;
    return `<mark${attr}>${mapVisit(node)}</mark>`;
  });

  /**
   * Time
   */

  compiler.handler('time', node => identity(node));

  /**
   * Embedded content
   */

  compiler
    .handler('area', () => '') // image-map hyperlink
    .handler('audio', () => '') // audio stream
    .handler('canvas', () => '') // canvas for dynamic graphics
    .handler('embed', () => '') // integration point for plugins
    .handler('iframe', () => '') // nested browsing context (inline frame)
    .handler('map', () => '') // image-map definition
    .handler('object', () => '') // generic external content
    .handler('param', () => '') // initialization parameters for plugins
    .handler('source', () => '') // media source
    .handler('track', () => '') // supplementary media track
    .handler('video', () => ''); // video

  /**
   * Images
   */

  compiler.handler('img', node => {
    let { alt, src, title } = node.attribs;
    alt = trim(alt);
    title = trim(title) ? ' ' + utils.enquote(trim(title)) : '';
    src = toUrl(src, options);

    if (src) {
      return `![${alt}](${src}${title})`;
    }

    return '';
  });

  /**
   * Form-related elements
   */

  compiler
    .handler('button', () => '') // button
    .handler('datalist', () => '') // predefined options for other controls
    .handler('fieldset', mapVisit) // set of related form controls
    .handler('form', () => '') // user-submittable form
    .handler('input', () => '') // input control
    .handler('keygen', () => '') // key-pair generator/input control (deprecated)
    .handler('label', mapVisit) // caption for a form control
    .handler('legend', mapVisit) // title or explanatory caption
    .handler('meter', () => '') // scalar gauge
    .handler('optgroup', mapVisit) // group of options
    .handler('option', mapVisit) // option
    .handler('output', mapVisit) // result of a calculation in a form
    .handler('progress', () => '') // progress indicator
    .handler('select', mapVisit) // option-selection form control
    .handler('textarea', mapVisit); // text input area

  /**
   * SVG and related
   */

  compiler
    .handler('svg', () => '')
    .handler('circle', () => '')
    .handler('ellipse', () => '')
    .handler('line', () => '')
    .handler('path', () => '')
    .handler('polygon', () => '')
    .handler('polyline', () => '')
    .handler('rect', () => '')
    .handler('stop', () => '')
    .handler('use', () => '');

  /**
   * Interactive elements
   */

  compiler
    .handler('command', () => '') //<= WC3 deprecated in favor of <menuitem>
    .handler('details', identity)
    .handler('menu', mapVisit)
    .handler('menuitem', mapVisit);

  /**
   * Ruby annotation, parenthesis and text (not rendered)
   */

  compiler
    .handler('ruby', () => '')
    .handler('rb', () => '')
    .handler('rp', () => '')
    .handler('rt', () => '')
    .handler('rtc', () => '');

  /**
   * Obsolete, deprecated or other elements we don't want to render
   * (please create an issue to discuss if we should reconsider any
   * of these, or to let us know if we missed something)
   */

  compiler
    .handler('acronym', identity)
    .handler('applet', () => '')
    .handler('basefont', () => '')
    .handler('big', mapVisit)
    .handler('center', mapVisit)
    .handler('data', () => '')
    .handler('dialog', () => '')
    .handler('dir', () => '')
    .handler('font', node => newlinesToSpace(mapVisit(node)))
    .handler('frame', () => '')
    .handler('frameset', () => '')
    .handler('math', () => '')
    .handler('noframes', () => '')
    .handler('picture', () => '')
    .handler('summary', mapVisit)
    .handler('template', () => '')
    .handler('tt', () => '');

  compiler.handler('ytd-transcript-renderer', node => mapVisit(node));
  compiler.handler('ytd-engagement-panel-section-list-renderer', node => mapVisit(node));
  compiler.handler('ytd-engagement-panel-title-header-renderer', node => {
    return heading('', node);
  });

  compiler.handler('ytd-transcript-search-panel-renderer', node => {
    // console.log(mapVisit(node));
    // console.log(node);
    return mapVisit(node);
  });

  compiler.handler('ytd-transcript-segment-list-renderer', node => {
    // console.log(mapVisit(node));
    // console.log(node);
    return mapVisit(node);
  });

  compiler.handler('ytd-transcript-segment-renderer', node => {
    // console.log(mapVisit(node));
    // console.log(node);
    return mapVisit(node);
  });

  compiler.handler('yt-attributed-string', node => {
    // console.log(mapVisit(node));
    // console.log(node);
    return mapVisit(node);
  });

  compiler.handler('yt-formatted-string', node => {
    // console.log(node);
    // console.log(mapVisit(node));
    return mapVisit(node);
  });

  compiler.handler('ytd-transcript-renderer', node => {
    // console.log(mapVisit(node));
    return mapVisit(node);
  });

  // compiler.handler('text', node => {
  //   if (options.whitespace === false) {
  //     return node.value;
  //   }

  //   return trim(node.value);
  // });

  return compiler;
};
