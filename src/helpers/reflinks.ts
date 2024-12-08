import url from 'url';
import path from 'path';
import { enquote, slugify, unquote } from '../utils';

export const rename = (ctx: any = {}, state: any = {}, options: any = {}) => {
  let { type = 'href', title = '', href = '' } = ctx;
  const maxLen = options.reflinkMaxLen || 15;
  const links = state.reflinks[type] || (state.reflinks[type] = []);
  const result: any = { ref: '', title, href, reflink: '' };
  const stem = path.basename(href, path.extname(href));
  const segs = stem.split(/[- _]/);

  while (segs.length > 1 && segs.join('').length > maxLen) {
    segs.shift();
  }

  const name = slugify(segs.join(''), options);
  let i = 1;

  if (title) {
    result.title = unquote(title);
    title = enquote(result.title);
  }

  const key = `${href} ${title}`.trim();
  const link = links.find((l: any) => l.key === key);
  if (link) {
    return link;
  }

  const n = (i: number | string = '') => i ? '-' + i : '';
  const p = (i: number | string = '') => (result.ref = name + n(i));
  const l = (i: number | string = '') => `[${p(i)}]: ${key}`.trim();

  result.reflink = l();
  result.key = key;

  while (links.some((ele: any) => ele.ref === result.ref)) {
    result.reflink = l(++i);
  }

  if (result.ref) {
    links.push(result);
  }

  return result;
};

export const number = (ctx: any = {}, state: any = {}, options: any = {}) => {
  let { type = 'href', title = '', href = '' } = ctx;
  const prefix = options.reflinkPrefix || type;
  const links = state.reflinks[type] || (state.reflinks[type] = []);
  const result: any = { ref: '', title, href, reflink: '' };
  let i = links.length + 1;

  if (title) {
    result.title = unquote(title);
    title = enquote(result.title);
  }

  const key = `${href} ${title}`.trim();

  const p = () => (result.ref = `${prefix}-${i}`);
  const l = () => `[${p(i)}]: ${key}`.trim();

  result.reflink = l(i);

  while (links.some((ele: any) => ele.ref === result.ref)) {
    result.reflink = l(++i);
  }

  links.push(result);
  return result;
};

export const format = (type: string, href: any, title: string, compiler: any) => {
  if (typeof href !== 'string') {
    throw new TypeError('expected href to be a string');
  }

  const { options, state } = compiler;
  state.reflinks[type] = state.reflinks[type] || [];

  if (typeof options.url === 'function') {
    href = options.url(href, state);
  } else if (href && options.domain && !/(?:^#|(:?\/\/))/.test(href)) {
    href = url.resolve(options.domain, href);
  } else if (href === '#' && state.title) {
    // href to jump to the very first H1 in the document. If
    // the H1 doesn't exist, breakdance will attempt to create
    // the first H1 from the `<title>` tag, if one exists.
    href = `#${slugify(state.title, options)}`;
  } else if (href[0] === '#') {
    href = `#${slugify(href.slice(1), options)}`;
  }

  if (href && options.reflinks && !/(^#|mailto:)/.test(href)) {
    if (options.reflinks === 'numbered') {
      href = number({ type, title, href }, state, options);
    } else {
      href = rename({ type, title, href }, state, options);
    }
  } else {
    href = { ref: (href.trim() + ' ' + title).trim() };
  }

  return href;
};
