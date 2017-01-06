---
title: Options
toc: true
---

<!-- toc -->

## Setting options

An options object may be passed to `breakdance` as the second argument.

```js
var breakdance = require('breakdance');
breakdance(htmlString[, options]);
```

## condense

Type: `boolean`

Default: `true`

Collapse more than two newlines to only two newlines. Enabled by default.

## domain

Type: `string`

Default: `undefined`

Specify the root domain name to prefix onto `href` or `src` paths that do not start with `#` or contain `://`.

## leadingNewline

Type: `boolean`

Default: `undefined`

Add a newline at the beggining of the generated markdown string.


## one

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

## prettify

Type: `boolean`

Default: `undefined`

Format the generated markdown with [pretty-remarkable][] to smooth out inconsistencies and ensure even formatting throughout the document.

## reflinks

Type: `boolean`

Default: `undefined`

Move URLs to the bottom of the rendered markdown document, and replace them with "placeholder" references. The advantage is that this can make the markdown more readable, but the downside is that the "placeholder" URLs are numbered, so it won't be immediately clear what a URL is until you visit the actual link at the bottom of the document.

## snapdragon

Type: `object`

Default: `undefined`

Pass your own instance of [snapdragon][]. We're using [snapdragon-cheerio][] to modify the [cheerio][] AST to be compatible with Snapdragon, which consumes the AST and renders to markdown.

## slugify

Type: `function`

Default: `undefined`


## title

Type: `boolean`

Default: `undefined`

Output the text in the `<title>` tag as an `h1` at the start of the generated markdown document.

**Example**

```js
console.log(breakdance('<title>Foo</title>', {title: true}));
//=> '# Foo\n'
```

## trailingNewline

Type: `boolean`

Default: `true`

Add a newline at the end of the generated markdown string.


## url

Type: `function`

Default: `undefined`
