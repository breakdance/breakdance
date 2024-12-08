export class Plugin {
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

export class Plugins {
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
