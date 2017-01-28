---
title: Recipes
---

Examples and code snippets to help you get up and running with breakdance as quickly as possible. [pull requests](contributing.html) to add more recipes are very welcome!



## Retain HTML in bootstrap's examples

This recipe demonstrates how to customize output in breakdance.

In [bootstrap's documentation](https://github.com/twbs/bootstrap), most `code` blocks are preceded by an example of some kind. By default, breakdance doesn't retain `div`s or other HTML that doesn't convert to a markdown equivalent (like `button` etc), so we would effectively lose these examples when converting to markdown.

However, if we wanted to retain the examples for some reason, we can easily modify breakdance's behavior with only a few lines of code.

More specifically, we're going to pass the following options to breakdance:

- `preprocess`: The proprocess option gives us access to the [cheerio][] AST before passing it to breakdance for compiling. We'll use this to 1) check for bootstrap's examples, 2) when found, use cheerio's API to get the outer HTML for the example, and 3)  set the HTML string on the node, so we can grab it later on when we're compiling.
- `before.div`: this registers a handler that will be called by the compiler on every `div` node, _before other handlers are called_ on that node. This allows us to check the node to see if it's one of our "example" nodes, and if so we want to add the `node.html` string to the `compiler.output` string by calling `.emit()`, instead of recursing down into the child nodes of the `div`. Since we've already rendered the contents of the `div` as literal HTML, we've done all we can do with this node, and we need to prevent any other handlers that might be called on the node from recursing over child nodes on the `div` and emittering their contents. We can do this by simply setting `node.nodes` to an empty array.

```js
var md = breakdance(html, {
  preprocess: function($, node) {
    var attr = node.attribs || {};
    if (/bd-example/.test(attr.class)) {
      node.html = $.html(node);
      node.isBootstrapExample = true;
    }
  },
  before: {
    div: function(node) {
      if (node.isBootstrapExample) {
        this.emit(node.html);
        node.nodes = [];
      }
    }
  }
});
```


### Normalize whitespace

This plugin would overwrite the built-in `text` handler and normalize all consecutive whitepaces in a string to a single whitespace (including newlines):

```js
module.exports = function() {
  return function(breakdance) {
    breakdance.set('text', function(node) {
      this.emit(node.val.replace(/\s+/g, ' '));
    });
  };
};
```

And we're done! Really, that's all you need to do to create a basic whitespace normalization plugin.


### Override an existing handler

TODO

**Example**

```js
breakdance
  .set('pre', function(node) {

  })
  .set('pre.open', function(node) {

  })
  .set('pre.close', function(node) {

  });
```

**Self-closing example**

```js
breakdance.set('img', function(node) {

});
```


### Register a new handler

TODO

Override an existing handler:

**Example**

```js
breakdance.set('foo', function(node) {

});
```
