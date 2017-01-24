---
title: Getting started
slug: index
id: breakdance
geopattern: s
---

## What is breakdance?

Breakdance is a node.js library for converting HTML to markdown.

**What's different about breakdance?**

Breakdance uses [cheerio][] to parse HTML, and [snapdragon][] for rendering, which provides granular control over the entire conversion process in a way that is easy to understand, reason about, and [customize](customize.html).

**Why would I use breakdance?**

- Migrate HTML blog posts to markdown
- Convert wiki pages to markdown
- Convert HTML documentation to markdown
- Convert HTML presentations or slide decks to markdown

## Getting started

**1. Install**

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save breakdance
```

Or install with [yarn][]:

```sh
$ yarn add breakdance
```

**2. Convert some HTML!**

Add the following code to `example.js` then run `$ node example`:

```js
var breakdance = require('breakdance');
console.log(breakdance('<strong>The freaks come out at night!</strong>'));
//=> '**The freaks come out at night!**'
```

## Next steps

- Learn how to [customize breakdance](api.html)
- Visit the breakdance [unit tests]({{@site.href}}/test), this is a great way to see comprehensive and detailed usage examples.
- There are a number of [HTML-to-markdown examples](examples.html) in the documentation as well
