---
title: Customize
---

## Customizing {{@site.name}}

**{{@site.name}}** is pretty hackable. You can override built-in renderers, create custom renderers for custom HTML tags, or create plugins that "bundle" together your commonly used customizations.

## Compilers

Override built-in compilers.

- **bos**:
- **html tags**:
  * tag name:
  * `.open`:
  * `.close`:
- **eos**:

### Custom compilers

**Signature**

```js
compiler.set('html-tag-name', function(node, nodes, i) {

});
```

**Example**

```js
compiler.set('pre', function(node, nodes, i) {

});
compiler.set('pre.open', function(node, nodes, i) {

});
compiler.set('pre.close', function(node, nodes, i) {

});
```

### Compiler plugins

```js
compiler.use(function() {

});
```
