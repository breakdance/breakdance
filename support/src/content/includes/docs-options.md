---
title: Options
geopattern: s
---

**Setting options**

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

## Breakdance options

### options.snapdragon

Type: `object`

Default: `undefined`

Pass your own instance of [snapdragon][]. We're using [snapdragon-cheerio][] to modify the [cheerio][] AST to be compatible with Snapdragon, which consumes the AST and renders to markdown.



## Compiler options

The following options effect the compiler only.

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


### options.slugify

Type: `function`

Default: `undefined`

Pass a custom function for slugifying the url in anchors. By default, anchor urls are formatted to be consistent with how GitHub slugifies anchors.

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

Normalize whitespace, courtesy of the [breakdance-whitespace][] plugin. If you don't like the default normalization, you can disable or override this via options, or write a [custom plugin](plugins.html).

**Disable whitespace handling**

```js
breakdance('<title>Foo</title>', {whitespace: false});
```

### options.override

Type: `object`

Default: `undefined`

Pass a function with the name of the node type to `options.override`, to override the built-in handler for any `node.type`.

**Example**

Customize whitespace handling by overriding the built-in `text` handler:

```js
breakdance('<title>Foo</title>', {
  override: {
    text: function(node) {
      // do stuff to text node
    }
  }
});
```

Note that you could also [write a plugin](plugins.html#example-normalizing-whitespace) for this.


### options.after

TODO

```js
var md = breakdance(html, {
  after: {
    eos: function(node) {
      // do stuff after end-of-string
    }
  }
});
```

### options.before

TODO

```js
var md = breakdance(html, {
  before: {
    div: function(node) {
      if (node.isGrid) {
        this.emit(node.html, node);
        node.nodes = [];
      }
    }
  }
});
```

### options.preprocess

TODO

```js
var md = breakdance(html, {
  preprocess: function($, node) {
  }
});
```


### options.postprocess

TODO



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
