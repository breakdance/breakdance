'use strict';

const url = require('url');
const path = require('path');
const { enquote, slugify, unquote } = require('../utils');

exports.rename = (ctx = {}, state = {}, options = {}) => {
  let { type = 'href', title = '', href = '' } = ctx;
  let maxLen = options.reflinkMaxLen || 15;
  let links = state.reflinks[type] || (state.reflinks[type] = []);
  let result = { ref: '', title, href, reflink: '' };
  let stem = path.basename(href, path.extname(href));
  let segs = stem.split(/[- _]/);

  while (segs.length > 1 && segs.join('').length > maxLen) {
    segs.shift();
  }

  let name = slugify(segs.join(''), options);
  let i = 1;

  if (title) {
    result.title = unquote(title);
    title = enquote(result.title);
  }

  let key = `${href} ${title}`.trim();
  let link = links.find(l => l.key === key);
  if (link) {
    return link;
  }

  let n = (i = '') => i ? '-' + i : '';
  let p = (i = '') => (result.ref = name + n(i));
  let l = (i = '') => `[${p(i)}]: ${key}`.trim();

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
  let prefix = options.reflinkPrefix || type;
  let links = state.reflinks[type] || (state.reflinks[type] = []);
  let result = { ref: '', title, href, reflink: '' };
  let i = links.length + 1;

  if (title) {
    result.title = unquote(title);
    title = enquote(result.title);
  }

  let key = `${href} ${title}`.trim();

  let p = () => (result.ref = `${prefix}-${i}`);
  let l = () => `[${p(i)}]: ${key}`.trim();

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

  let { options, state } = compiler;
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
