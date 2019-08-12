'use strict';

class Node {
  constructor(type, value) {
    if (typeof type === 'string') {
      this.type = type.toLowerCase();
      this.value = value || '';
      this.attribs = {};
      this.nodes = [];
    } else {
      Object.assign(this, type);
    }

    if (!this.attribs) {
      this.attribs = {};
    }
  }

  remove() {
    this.siblings.splice(this.index, 1);
  }

  replace(node) {
    this.siblings.splice(this.index, 1, node);
  }

  attr(type) {
    return this.attribs[type];
  }

  get siblings() {
    return this.parent ? this.parent.nodes : [];
  }

  get index() {
    return this.siblings.indexOf(this);
  }
}

module.exports = Node;
