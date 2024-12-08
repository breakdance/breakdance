export class Node {
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
    if (!this.siblings) return;
    const index = this.index;
    if (index > -1) {
      this.siblings.splice(index, 1);
    }
  }

  replace(node) {
    if (!this.siblings) return;
    const index = this.index;
    if (index > -1) {
      this.siblings.splice(index, 1, node);
    }
  }

  attr(type) {
    return this.attribs[type];
  }

  get siblings() {
    return this.parent ? this.parent.nodes || [] : [];
  }

  get index() {
    const siblings = this.siblings;
    return siblings ? siblings.indexOf(this) : -1;
  }
}
