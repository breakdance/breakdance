---
title: Options
geopattern: s
---

## Setting options

A number of different options are available for configuring breakdance. If you need more than what the options provide, see the docs for [customizing breakdance](customize.html).

To set options, pass an object as the last argument to `breakdance`:

```js
breakdance(string[, options]);
```

**Example**

```js
var breakdance = require('breakdance');
var options = {domain: 'https://github.com'};
console.log(breakdance('<a href="/some-link"></a>', options));
//=> '[](https://github.com/some-link)\n'
```

## Available options

### options.condense

Type: `boolean`

Default: `true`

Collapse more than two newlines to only two newlines. Enabled by default.

### options.domain

Type: `string`

Default: `undefined`

Specify the root domain name to prefix onto `href` or `src` paths that do not start with `#` or contain `://`.

### options.leadingNewline

Type: `boolean`

Default: `undefined`

Add a newline at the beggining of the generated markdown string.


### options.one

Type: `boolean`

Default: `undefined`

Use `1.` for all ordered list items. Most markdown renderers automatically renumber lists. Using `1.` for all items is an easy way of not having to renumber list items when one is added or removed.

**Examples**

Given the following HTML ordered list:

```html
<ol>
  <li>Foo</li>
  <li>Bar</li>
  <li>Baz</li>
</ol>
```

```js
console.log(breakdance(list));
```

Renders to:

```
1. Foo
2. Bar
3. Baz
```

And if `options.one` is true:

```js
console.log(breakdance(list));
```

The result is:

```
1. Foo
1. Bar
1. Baz
```


### options.prettify

Type: `boolean`

Default: `undefined`

Format the generated markdown with [pretty-remarkable][] to smooth out inconsistencies and ensure even formatting throughout the document.


### options.reflinks

Type: `boolean`

Default: `undefined`

Move URLs to the bottom of the rendered markdown document, and replace them with "placeholder" references. The advantage is that this can make the markdown more readable, but the downside is that the "placeholder" URLs are numbered, so it won't be immediately clear what a URL is until you visit the actual link at the bottom of the document.


### options.snapdragon

Type: `object`

Default: `undefined`

Pass your own instance of [snapdragon][]. We're using [snapdragon-cheerio][] to modify the [cheerio][] AST to be compatible with Snapdragon, which consumes the AST and renders to markdown.


### options.slugify

Type: `function`

Default: `undefined`


### options.title

Type: `boolean`

Default: `undefined`

Output the text in the `<title>` tag as an `h1` at the start of the generated markdown document.

**Example**

```js
console.log(breakdance('<title>Foo</title>', {title: true}));
//=> '# Foo\n'
```

### options.trailingNewline

Type: `boolean`

Default: `true`

Add a newline at the end of the generated markdown string.


### options.url

Type: `function`

Default: `undefined`


### options.whitespace

Type: `boolean`

Default: `true`

Normalize whitespace. If you don't like the default normalization, you can disable or override it via options, or write a custom plugin.

**Disable whitespace handling**

```js
breakdance('<title>Foo</title>', {whitespace: false});
```

Or customize whitespace handling by passing a function on the [override](#override) options:

```js
breakdance('<title>Foo</title>', {
  override: {
    text: function(node) {
      // do stuff to text node
    }
  }
});
```

_(you can override how any node type is handled, just pass the name of the node type to override)_

**Custom plugin**

Or you can [write a plugin](plugins.html#example-normalizing-whitespace) to handle whitespace.


## Compiler options


### options.override

Type: `boolean`

Default: `undefined`

Format the generated markdown with [pretty-remarkable][] to smooth out inconsistencies and ensure even formatting throughout the document.

### options.after

TODO


### options.before

TODO



### options.preprocess

TODO



### options.postprocess

TODO


**Example: Render bootstrap's examples**


```js
preprocess: function($, node) {
  var attr = node.attribs || {};
  if (/show-grid/.test(attr.class)) {
    node.html = $.html(node);
    node.isGrid = true;
  }
},
before: {
  div: function(node) {
    if (node.isGrid) {
      this.emit(node.html, node);
      node.nodes = [];
    }
  }
}
```

### Disable compilers

Disable a compiler by setting `options[compiler_name]` to `false`.

**Examples**

Disable the `strong` compiler:

```js
var options = {compiler: {strong: false}};
breakdance('Foo <strong>Bar</strong>', options);
//=> 'Foo '
```

### Override compilers

Override the `text` compiler:

```js
var options = {compiler: {strong: false}};
breakdance('Foo <strong>Bar</strong>', {
  compiler: {
    text: function(node) {
      this.emit(node.val.toUpperCase());
    }
  }
});

//=> 'FOO **BAR**'
```

## Customizing breakdance

If you don't like the defaults used in breakdance, or you need something different or beyond what the options provide:

- visit the [API docs](api.html) to learn how to hack on breakdance,
- visit the [plugin docs](plugins.html) to learn how to find or write plugins.
