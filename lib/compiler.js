'use strict';

const Events = require('events');
const condense = require('condense-newlines');
const entities = require('entities');
const constants = require('./constants');
const handlers = require('./handlers');
const replace = require('./helpers/replacers');
const parser = require('./parser');
const utils = require('./utils');
const tags = require('./tags');
const { NEGATIVE_SCORE_HINTS, IGNORED_RE, RE_ATTRIBUTE, RE_RST_PARAGRAPH } = constants;
const INVISIBLE_REGEX = /(?:(?:^|-)(?:nav|hidden|banner)(?:-|$)|navbar)/;

class Compiler extends Events {
  constructor(options) {
    super();
    this.options = { ...options };
    this.handlers = new Map();
    this.seenTypes = new Set();
    this.seen = new Set();
    this.started = this.options.start ? false : true;

    let omit = [].concat(this.options.omit || ['button', 'alert', 'nav', 'navbar', 'navbar-nav', 'navbar-item', 'navbar-brand']);
    this.omit = omit.map(name => name.replace(/^[#.]/, ''));
    this.rename = this.options.rename || {};
    if (typeof this.options.rename === 'string') {
      let segs = this.options.rename.split(',');
      this.rename = {};
      for (let seg of segs) {
        let [key, value] = seg.split(':');
        this.rename[key] = value;
      }
    }

    this.data = { meta: {} };
    this.stash = [''];
    this.stack = [];
    this.count = 0;
    this.state = {
      indent: 0,
      literal: 0,
      tags: { dl: 0, dd: 0 },
      ol: [],
      ul: [],
      dl: [],
      dd: [],
      table: -1,
      tables: [],
      types: [],
      links: [],
      reflinks: {},
      output: ''
    };

    handlers(this);
    addHandlers(this);
  }

  preprocess(node) {
    if (typeof this.options.preprocess === 'function') {
      node = this.options.preprocess.call(this, node);
    }
    return node;
  }

  postprocess(value, node) {
    if (typeof this.options.postprocess === 'function') {
      value = this.options.postprocess.call(this, value, node);
    }
    return value;
  }

  append(value = '', node) {
    this.emit('append', value, node);
    this.state.output += value;
    this.state.last = value;
    this.stash.push(value);
  }

  increment(node) {
    this.state.tags[node.type] = this.state.tags[node.type] || 0;
    this.state.tags[node.type]++;
    this.stack.push(node.type);
  }

  decrement(node) {
    let { tags } = this.state;
    tags[node.type] = tags[node.type] || 0;
    tags[node.type] = Math.max(tags[node.type] - 1, 0);
    this.stack.pop();
  }

  isOmitted(node, names = []) {
    if (Array.isArray(names) && names.length) {
      if (names.some(name => INVISIBLE_REGEX.test(name))) {
        return true;
      }
      return this.omit.some(name => names.includes(name));
    }
    return this.omit.some(name => node.type === name);
  }

  handler(name, fn) {
    this.handlers.set(name, fn);
    return this;
  }

  isStartingNode(node) {
    if (this.options.start === void 0) {
      return true;
    }
    return node.type === this.options.start;
  }

  isStoppingNode(node) {
    if (!this.options.stop) return false;
    return utils.pick(node, { pick: this.options.stop });
  }

  renameNode(node) {
    if (this.rename.hasOwnProperty(node.type)) {
      node.type = this.rename[node.type];
    }
  }

  handle(node, filter) {
    if (node.seen) return;
    this.seenTypes.add(node.type);
    node.seen = true;

    this.renameNode(node);

    if (this.isStartingNode(node)) {
      this.started = true;
    }

    if (this.stopped || this.isStoppingNode(node)) {
      this.stopped = true;
      return '';
    }

    if (typeof filter === 'function' && filter(node) === false) {
      return '';
    }

    let ele = this.preprocess(node);
    let fn = this.handlers.get(ele.type);

    if (typeof fn !== 'function') {
      if (ele.selfClosing === true || !this.known.has(ele.type)) return '';
      throw new Error(`No handlers are registered for "${ele.type}"`);
    }

    this.increment(ele);
    let output = this.postprocess(fn.call(this, ele), ele);

    if (!this.started) {
      output = '';
    }

    this.append(output, ele);
    this.decrement(ele);
    return output;
  }

  mapVisit(node, filter) {
    if (!node.nodes) {
      return this.handle(node);
    }

    this.increment(node);
    this.emit('open', node);
    this.output = '';

    for (let child of node.nodes) {
      this.output += (this.handle(child, filter) || '');
    }

    this.emit('close', node);
    this.decrement(node);
    return this.output;
  }

  compile(ast) {
    return this.mapVisit(utils.mapKeys(ast));
  }

  render(ast, options = {}) {
    let opts = { ...this.options, ...options };
    addHandlers(this, opts);

    let output = this.compile(ast);

    output = utils.removeEmptyEndLines(output);
    output = output.replace(/^\s+(?=(\[.*?\]|\*{2}[^*]|_{2}[^_]))/gm, '');

    if (!output.includes('`')) {
      output = entities.decodeHTML(output);
    }

    if (options.condenseNewlines !== false) {
      output = condense(output, opts);
    }

    if (options.trailingNewline !== false && output.slice(-1) !== '\n') {
      output += '\n';
    }

    for (let key of Object.keys(this.state.reflinks)) {
      output += '\n\n';

      let reflinks = this.state.reflinks[key];
      if (Array.isArray(reflinks) && reflinks.length) {
        for (let ele of reflinks) {
          if (output.includes(`[${ele.ref}]`)) {
            output += `\n${ele.reflink}`;
          }
        }
      }
    }

    return output;
  }

  get known() {
    if (!this._known) this._known = new Set(knownTags());
    return this._known;
  }

  static get render() {
    return (ast, options) => {
      let compiler = new this(options);
      return compiler.render(ast);
    };
  }
}

function addHandlers(compiler, options) {
  let opts = options || compiler.options;
  if (opts.handlers) {
    for (let type of Object.keys(opts.handlers)) {
      let value = opts.handlers[type];
      if (value === false) {
        compiler.handler(type, () => '');
      } else {
        compiler.handler(type, value);
      }
    }
  }
}

function knownTags() {
  let known = [];
  for (let key of Object.keys(tags)) {
    for (let ele of Object.keys(tags[key])) {
      if (!known.includes(ele)) {
        known.push(ele);
      }
    }
  }
  return known.sort();
}

module.exports = Compiler;
