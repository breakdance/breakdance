---
title: Docs
slug: docs
geopattern: e
---

[View on GitHub](https://github.com/{{@site.repository}})

## What is breakdance?

Breakdance is an API and CLI for converting HTML to markdown.

<br>

## Why would I use breakdance?

- Migrate HTML blog posts to markdown
- Convert wiki pages to markdown
- Convert HTML documentation to markdown
- Convert HTML presentations or slide decks to markdown

<br>

## What's different about breakdance?

Breakdance uses [cheerio][] to parse HTML, and [snapdragon][] for rendering, which provides granular control over the entire conversion process in a way that is easy to understand, reason about, and [customize](customize.html).

<br>

## Getting started

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save breakdance
```

Install with [yarn][]:

```sh
$ yarn add breakdance
```

**Convert some HTML!**

Add the following code to `foo.js`:

```js
var breakdance = require('breakdance');
console.log(breakdance('<strong>The freaks come out at night!</strong>'));
//=> '**The freaks come out at night!**'
```

<br>


Don't like the defaults used in breakdance? Need to convert custom HTML elements?

With breakdance you can control how any HTML element is converted to markdown, or even how a specific element with certain attributes is converted. It's easy to override any defaults, or add support for custom elements, attributes or options.


## Customizing breakdance

**breakdance** is pretty hackable if you need more than the [provided options](options.html). You can override built-in renderers, create custom renderers for custom HTML tags, or create plugins that "bundle" together your commonly used customizations.

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


## Next steps

- Learn how to [customize breakdance](customize.html)
- Visit the breakdance [unit tests]({{@site.href}}/test) for more comprehensive and detailed usage examples.
- [HTML-to-markdown examples](examples.html)
