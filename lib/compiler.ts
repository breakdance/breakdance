const Events = require('events');
const condense = require('condense-newlines');
const entities = require('entities');
// const constants = require('./constants');
const handlers = require('./handlers');
// const replace = require('./helpers/replacers');
// const parser = require('./parser');
const plugins = require('./plugins');
const utils = require('./utils');
const tags = require('./tags');
// const { NEGATIVE_SCORE_HINTS, IGNORED_RE, RE_ATTRIBUTE, RE_RST_PARAGRAPH } = constants;
const INVISIBLE_REGEX = /(?:(?:^|-)(?:nav|hidden|banner)(?:-|$)|navbar)/;

class Plugin {
  constructor(handlers) {
    this.handlers = new Map();

    if (handlers) {
      for (const [type, handler] of Object.entries(handlers)) {
        this.add(type, handler);
      }
    }
  }

  add(type, handler) {
    this.handlers.set(type, handler);
    return this;
  }

  get(type) {
    return this.handlers.get(type);
  }

  handle(name, node, compiler) {
    const handler = this.get(node.type);

    if (typeof handler === 'function') {
      handler(name, node, compiler);
    }
  }
}

class Plugins {
  constructor(plugins, options) {
    this.options = { ...options };
    this.registry = new Map();

    if (plugins) {
      for (const [key, plugin] of Object.entries(plugins)) {
        this.add(key, new Plugin(plugin));
      }
    }
  }

  add(name, plugin) {
    if (this.options.plugins?.includes(name)) {
      this.registry.set(name, plugin);
    }
  }

  get(name) {
    return this.registry.get(name);
  }

  handle(name, node, compiler) {
    for (const plugin of this.registry.values()) {
      plugin.handle(name, node, compiler);
    }
  }
}

const initState = () => ({
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
});

class Compiler extends Events {
  constructor(options) {
    super();
    this.options = { ...options };
    this.handlers = new Map();
    this.seenTypes = new Set();
    this.seen = new Set();
    this.started = !this.options.start;

    const omit = [].concat(this.options.omit || ['button', 'alert', 'nav', 'navbar', 'navbar-nav', 'navbar-item', 'navbar-brand']);
    this.omit = omit.map(name => name.replace(/^[#.]/, ''));
    this.rename = this.options.rename || {};

    if (typeof this.options.rename === 'string') {
      const segs = this.options.rename.split(',');
      this.rename = {};

      for (const seg of segs) {
        const [key, value] = seg.split(':');
        this.rename[key] = value;
      }
    }

    this.data = { meta: {} };
    this.stash = [''];
    this.stack = [];
    this.count = 0;
    this.state = initState();
    this.plugins = new Plugins(plugins, this.options);

    handlers.init(this);
    this.addHandlers(this);
  }

  addHandlers(compiler, options) {
    const opts = options || this.options;
    if (opts.handlers) {
      for (const type of Object.keys(opts.handlers)) {
        const value = opts.handlers[type];
        if (value === false) {
          this.handler(type, () => '');
        } else {
          this.handler(type, value);
        }
      }
    }
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
    const { tags } = this.state;
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
    if (this.options.start === undefined) {
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

    node.output = '';
    this.plugins.handle('render:before', node, this);

    if (this.isStartingNode(node)) {
      this.started = true;
    }

    if (this.stopped || this.isStoppingNode(node)) {
      this.stopped = true;
      this.plugins.handle('render:after', node, this);
      return node.output;
    }

    if (typeof filter === 'function' && filter(node) === false) {
      this.plugins.handle('render:after', node, this);
      return node.output;
    }

    const ele = this.preprocess(node);
    const fn = this.handlers.get(ele.type);

    if (typeof fn !== 'function') {
      if (ele.selfClosing === true || !this.known.has(ele.type)) return '';
      throw new Error(`No handlers are registered for "${ele.type}"`);
    }

    this.increment(ele);
    node.output = this.postprocess(fn.call(this, ele), ele);

    if (!this.started) {
      node.output = '';
    }

    this.append(node.output, ele);
    this.decrement(ele);
    this.plugins.handle('render:after', node, this);
    return node.output;
  }

  mapVisit(node, filter) {
    if (!node.nodes) {
      return this.handle(node);
    }

    this.plugins.handle('render:before', node, this);
    this.increment(node);
    this.emit('open', node);
    this.output = '';

    for (const child of node.nodes) {
      this.output += this.handle(child, filter) || '';
    }

    this.emit('close', node);
    this.decrement(node);
    this.plugins.handle('render:after', node, this);
    return this.output;
  }

  compile(tree) {
    return this.mapVisit(utils.mapKeys(tree));
  }

  render(node, options = {}) {
    const opts = { ...this.options, ...options };

    this.addHandlers(this, opts);
    this.plugins.handle('render:before', node, this);

    node.output = this.compile(node);
    node.output = utils.removeEmptyEndLines(node.output);
    node.output = node.output.replace(/^\s+(?=(\[.*?\]|\*{2}[^*]|_{2}[^_]))/gm, '');

    if (!node.output.includes('`')) {
      node.output = entities.decodeHTML(node.output);
    }

    if (options.condenseNewlines !== false) {
      node.output = condense(node.output, opts);
    }

    if (options.trailingNewline !== false && node.output.slice(-1) !== '\n') {
      node.output += '\n';
    }

    for (const key of Object.keys(this.state.reflinks)) {
      node.output += '\n\n';

      const reflinks = this.state.reflinks[key];
      if (Array.isArray(reflinks) && reflinks.length) {
        for (const ele of reflinks) {
          if (node.output.includes(`[${ele.ref}]`)) {
            node.output += `\n${ele.reflink}`;
          }
        }
      }
    }

    this.plugins.handle('render:after', node, this);
    return node.output;
  }

  get known() {
    if (!this._known) this._known = new Set(knownTags());
    return this._known;
  }

  // Using a getter to ensure that the `this` context is correct
  static get render() {
    return (tree, options) => new this(options).render(tree);
  }
}

function knownTags() {
  const known = [];
  for (const key of Object.keys(tags)) {
    for (const ele of Object.keys(tags[key])) {
      if (!known.includes(ele)) {
        known.push(ele);
      }
    }
  }
  return known.sort();
}

module.exports = Compiler;
