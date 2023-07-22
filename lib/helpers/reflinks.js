'use strict';

const url = require('url');
const path = require('path');
const { enquote, slugify, unquote } = require('../utils');

exports.rename = (ctx = {}, state = {}, options = {}) => {
  let { type = 'href', title = '', href = '' } = ctx;
  const maxLen = options.reflinkMaxLen || 15;
  const links = state.reflinks[type] || (state.reflinks[type] = []);
  const result = { ref: '', title, href, reflink: '' };
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
  const link = links.find(l => l.key === key);
  if (link) {
    return link;
  }

  const n = (i = '') => i ? '-' + i : '';
  const p = (i = '') => (result.ref = name + n(i));
  const l = (i = '') => `[${p(i)}]: ${key}`.trim();

  result.reflink = l();
  result.key = key;

  while (links.some(ele => ele.ref === result.ref)) {
    result.reflink = l(++i);
  }

  if (result.ref) {
    links.push(result);
  }

  return result;
};

exports.number = (ctx = {}, state = {}, options = {}) => {
  let { type = 'href', title = '', href = '' } = ctx;
  const prefix = options.reflinkPrefix || type;
  const links = state.reflinks[type] || (state.reflinks[type] = []);
  const result = { ref: '', title, href, reflink: '' };
  let i = links.length + 1;

  if (title) {
    result.title = unquote(title);
    title = enquote(result.title);
  }

  const key = `${href} ${title}`.trim();

  const p = () => (result.ref = `${prefix}-${i}`);
  const l = () => `[${p(i)}]: ${key}`.trim();

  result.reflink = l(i);

  while (links.some(ele => ele.ref === result.ref)) {
    result.reflink = l(++i);
  }

  links.push(result);
  return result;
};

exports.format = (type, href, title, compiler) => {
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
      href = exports.number({ type, title, href }, state, options);
    } else {
      href = exports.rename({ type, title, href }, state, options);
    }
  } else {
    href = { ref: (href.trim() + ' ' + title).trim() };
  }

  return href;
};
