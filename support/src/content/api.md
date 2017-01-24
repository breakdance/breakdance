---
title: API
geopattern: o
---

## Under the hood

This document will help familiarize you with the breakdance API, as well as how the code works, to equip you with the information you need to customize the generated output or [author plugins](plugins.html).

Please [let us know]({{@site.bugs.url}}) if you have any suggestions for improving the docs.

## API

Before diving into methods, it's important to understand how the code is structured in breakdance.

### Core concepts

The breakdance API is organized around a few high-level concepts:

1. Breakdance
1. Parsing
1. Compiling


### [Breakdance]({{@site.href}}/index.js#L26)

The main export of breakdance is a constructor function that will return a string of markdown if passed a string of HTML, or you can use `new` to create instance of `Breakdance` with an optional `options` object.

**Examples**

Do this if you just need to convert a string of HTML to markdown:

```js
var breakdance = require('breakdance');
console.log(breakdance('<strong>The Freaks Come Out at Night!</strong>'));
//=> 'The Freaks Come Out at Night!'
```

Or do this if you need to [register plugins](plugins.html) or customize the instance before parsing and/or compiling:

```js
var Breakdance = require('breakdance');
var bd = new Breakdance(/* options */);
var ast = bd.parse('<strong>The Freaks Come Out at Night!</strong>');
var str = bd.compile(ast);
console.log(str);
//=> 'The Freaks Come Out at Night!'
```

### [.define]({{@site.href}}/index.js#L61)

Register a plugin that will be called with an instance of the compiler
when `.compile` or `.render` are run.

**Params**

* `fn` **{Function}**: Plugin function
* `returns` **{Object}**: Returns the instance for chaining.

### [.use]({{@site.href}}/index.js#L75)

Register a plugin that will be called with an instance of the compiler
when `.compile` or `.render` are run.

**Params**

* `fn` **{Function}**: Plugin function
* `returns` **{Object}**: Returns the instance for chaining.

### [.visit]({{@site.href}}/index.js#L89)

Override a built-in node type `type`, or register a new type.

**Params**

* `type` **{String}**: The `node.type` to override or register.
* `fn` **{Function}**: Visitor function
* `returns` **{Object}**: Returns the instance for chaining.

### [.preprocess]({{@site.href}}/index.js#L109)

Register a plugin that will be called with an instance of the compiler
when `.compile` or `.render` are run.

**Params**

* `fn` **{Function}**: Plugin function
* `returns` **{Object}**: Returns the instance for chaining.

### [.before]({{@site.href}}/index.js#L122)

Register a plugin to use before calling one of the other methods.

**Params**

* `fn` **{Function}**: Plugin function
* `returns` **{Object}**: Returns the instance for chaining.

### [.after]({{@site.href}}/index.js#L141)

Register a plugin to use before calling one of the other methods.

**Params**

* `fn` **{Function}**: Plugin function
* `returns` **{Object}**: Returns the instance for chaining.

### [.parse]({{@site.href}}/index.js#L161)

Parses a string of `html` and returns an AST.

**Params**

* `html` **{String}**
* `options` **{Object}**
* `returns` **{Object}**: Abstract syntax tree

### [.compile]({{@site.href}}/index.js#L204)

Convert the a breakdance AST from [.parse](#parse) to markdown
with the specified `options`

**Params**

* `ast` **{String}**
* `options` **{Object}**
* `returns` **{Object}**: Returns the AST and compiled markdown string on the `.output` property, in case you need the object for post-processing.

### [.render]({{@site.href}}/index.js#L184)

Wraps the [.parse](#parse) and [.compile](#compile) methods to enable converting HTML to markdown in a single function call.

**Params**

* `html` **{String}**
* `options` **{Object}**
* `returns` **{String}**: Returns a markdown string.

### .isInside

TODO

## Compiler

### Visitors

The breakdance compiler calls a specific visitor function on each AST node. For example, the `text` visitor is called on nodes with the `text` node `type`, and the `h1` visitor is called on nodes with the `h1` node `type`.

Override built-in compilers.

- **bos**:
- **html tags**:
  * tag name:
  * `.open`:
  * `.close`:
- **eos**:



### .visit

Override an existing compiler, or register a new one.

```js
breakdance.visit('html-tag-name', function(node, nodes, i) {

});
```

**Example**

```js
breakdance.visit('pre', function(node, nodes, i) {

});
breakdance.visit('pre.open', function(node, nodes, i) {

});
breakdance.visit('pre.close', function(node, nodes, i) {

});
```

