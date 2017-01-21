---
title: API
geopattern: o
---

## Under the hood

Get to know the code in breakdance.

### Moving parts

- `Breakdance` constructor
- compiler
- parser

### Core concepts

- AST
- nodes
- visitors (compilers)

## AST

TODO


## Node

TODO


## Compilers (visitors)

Breakdance "compilers" are visitor functions that are called on specific AST nodes at render time. For example, the `text` compiler is called on nodes with the `text` type.

Override built-in compilers.

- **bos**:
- **html tags**:
  * tag name:
  * `.open`:
  * `.close`:
- **eos**:

### .set

Override an existing compiler, or register a new one.

```js
breakdance.set('html-tag-name', function(node, nodes, i) {

});
```

**Example**

```js
breakdance.set('pre', function(node, nodes, i) {

});
breakdance.set('pre.open', function(node, nodes, i) {

});
breakdance.set('pre.close', function(node, nodes, i) {

});
```

### Plugins

```js
breakdance.use(function() {

});
```

## API

### .isInside

