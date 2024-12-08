import Events from 'events';
import condense from 'condense-newlines';
import entities from 'entities';
// import constants from '~/constants';
// import replace from '~/helpers/replacers';
// import parser from '~/parser';
import { Plugins } from '~/plugins/Plugins';
import * as plugins from '~/plugins';
import * as tags from '~/tags';
import * as utils from '~/utils';
import * as visitors from '~/visitors';
import { RE_INVISIBLE } from '~/constants';
// const { NEGATIVE_SCORE_HINTS, IGNORED_RE, RE_ATTRIBUTE, RE_RST_PARAGRAPH } = constants;

interface CompilerOptions {
  omit?: string[];
  rename?: string | Record<string, string>;
  start?: string;
  stop?: string;
  preprocess?: (node: Node) => Node;
  postprocess?: (value: string, node: Node) => string;
  visitors?: Record<string, ((node: Node) => string) | false>;
  [key: string]: any;
}

interface CompilerState {
  indent: number;
  literal: number;
  tags: Record<string, number>;
  ol: Array<{ items: string[] }>;
  ul: Array<{ items: string[] }>;
  dl: Array<{ items: string[] }>;
  dd: Array<any>;
  table: number;
  tables: Array<any>;
  types: string[];
  links: string[];
  reflinks: Record<string, any>;
  output: string;
  last?: string;
}

interface Node {
  type: string;
  value?: string;
  nodes?: Node[];
  attribs?: Record<string, string>;
  selfClosing?: boolean;
  seen?: boolean;
  output?: string;
  parent?: Node;
  [key: string]: any;
}

export const initState = (): CompilerState => ({
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

export class Compiler extends Events {
  private options: CompilerOptions;
  private visitors: Map<string, (node: Node) => string>;
  private seenTypes: Set<string>;
  private seen: Set<unknown>;
  private started: boolean;
  private omit: string[];
  private rename: Record<string, string>;
  private data: { meta: Record<string, any> };
  private stash: string[];
  private stack: string[];
  private count: number;
  private state: CompilerState;
  private plugins: Plugins;
  private _known?: Set<string>;
  private stopped: boolean;

  constructor(options: CompilerOptions = {}) {
    super();
    this.options = { ...options };
    this.visitors = new Map();
    this.seenTypes = new Set();
    this.seen = new Set();
    this.started = !this.options.start;
    this.stopped = false;

    const omit = [].concat(this.options.omit || ['button', 'alert', 'nav', 'navbar', 'navbar-nav', 'navbar-item', 'navbar-brand']);
    this.omit = omit.map(name => name.replace(/^[#.]/, ''));
    this.rename = this.options.rename || {};

    if (typeof this.options.rename === 'string') {
      const segs = this.options.rename.split(',');
      this.rename = {};

      for (const seg of segs) {
        const [key, value] = seg.split(':');
        if (key && value) {
          this.rename[key] = value;
        }
      }
    }

    this.data = { meta: {} };
    this.stash = [''];
    this.stack = [];
    this.count = 0;
    this.state = initState();
    this.plugins = new Plugins(plugins, this.options);

    visitors.init(this);
    this.addHandlers(this);
  }

  private addHandlers(compiler: Compiler, options?: CompilerOptions): void {
    const opts = options || this.options;
    if (opts.visitors) {
      for (const [type, value] of Object.entries(opts.visitors)) {
        if (value === false) {
          this.handler(type, () => '');
        } else {
          this.handler(type, value);
        }
      }
    }
  }

  preprocess(node: Node): Node {
    if (typeof this.options.preprocess === 'function') {
      node = this.options.preprocess.call(this, node);
    }
    return node;
  }

  postprocess(value: string, node: Node): string {
    if (typeof this.options.postprocess === 'function') {
      value = this.options.postprocess.call(this, value, node);
    }
    return value;
  }

  append(value: string = '', node: Node): void {
    this.emit('append', value, node);
    this.state.output += value;
    this.state.last = value;
    this.stash.push(value);
  }

  increment(node: Node): void {
    this.state.tags[node.type] = this.state.tags[node.type] || 0;
    this.state.tags[node.type]++;
    this.stack.push(node.type);
  }

  decrement(node: Node): void {
    const { tags } = this.state;
    tags[node.type] = tags[node.type] || 0;
    tags[node.type] = Math.max(tags[node.type] - 1, 0);
    this.stack.pop();
  }

  isOmitted(node: Node, names: string[] = []): boolean {
    if (Array.isArray(names) && names.length) {
      if (names.some(name => RE_INVISIBLE.test(name))) {
        return true;
      }
      return this.omit.some(name => names.includes(name));
    }
    return this.omit.some(name => node.type === name);
  }

  handler(name: string, fn: (node: Node) => string): this {
    this.visitors.set(name, fn);
    return this;
  }

  isStartingNode(node: Node): boolean {
    if (this.options.start === undefined) {
      return true;
    }

    return node.type === this.options.start;
  }

  isStoppingNode(node: Node): boolean {
    if (!this.options.stop) return false;
    return utils.pick(node, { pick: this.options.stop });
  }

  renameNode(node: Node): void {
    if (hasOwnProperty.call(this.rename, node.type)) {
      node.type = this.rename[node.type];
    }
  }

  handle(node: Node, filter?: (node: Node) => boolean): string {
    if (node.seen) return '';

    if (!this.known) {
      this._known = new Set(knownTags());
    }

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
    const fn = this.visitors.get(ele.type);

    if (typeof fn !== 'function') {
      if (ele.selfClosing === true || !this.known.has(ele.type)) return '';
      throw new Error(`No visitors are registered for "${ele.type}"`);
    }

    this.increment(ele);
    node.output = this.postprocess(fn.call(this, ele), ele);

    if (!this.started) {
      node.output = '';
    }

    const sanitizedOutput = entities.encodeHTML(node.output);
    this.append(sanitizedOutput, ele);
    this.decrement(ele);
    this.plugins.handle('render:after', node, this);
    return node.output;
  }

  mapVisit(node: Node, filter?: (node: Node) => boolean): string {
    if (!node.nodes) {
      return this.handle(node);
    }

    const visited = new WeakSet();
    const visitNode = (n: Node): string => {
      if (visited.has(n)) {
        return '';
      }
      visited.add(n);
      return this.handle(n, filter) || '';
    };

    this.plugins.handle('render:before', node, this);
    this.increment(node);
    this.emit('open', node);
    this.output = '';

    for (const child of node.nodes) {
      this.output += visitNode(child);
    }

    this.emit('close', node);
    this.decrement(node);
    this.plugins.handle('render:after', node, this);
    return this.output;
  }

  compile(tree: Node): string {
    return this.mapVisit(utils.mapKeys(tree));
  }

  render(node: Node, options: CompilerOptions = {}): string {
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

  get known(): Set<string> {
    if (!this._known) {
      this._known = new Set(knownTags());
    }
    return this._known;
  }

  // Using a getter to ensure that the `this` context is correct
  // when the method is destructured
  static get render() {
    return (tree: Node, options?: CompilerOptions): string => new this(options).render(tree);
  }
}

function knownTags(): string[] {
  const known = [];
  for (const [, value] of Object.entries(tags)) {
    for (const ele of Object.keys(value)) {
      if (!known.includes(ele)) {
        known.push(ele);
      }
    }
  }
  return known.sort();
}
