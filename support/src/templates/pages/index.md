---
title: Breakdance
slug: index
geopattern: s
---

## What is breakdance?

Breakdance is a node.js library for converting HTML to markdown.

**What's different about breakdance?**

Breakdance uses [cheerio][] to parse HTML, and [snapdragon][] for rendering, which provides comprehensive coverage of HTML 4 and 5 elements, and granular control over the entire conversion process in a way that is easy to understand, reason about, and [customize](plugins.html).

**Why use breakdance?**

- Migrate HTML blog posts to markdown
- Convert wiki pages to markdown
- Convert HTML documentation to markdown
- Convert HTML presentations or slide decks to markdown

## Quickstart

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

- Learn more about [using breakdance](docs.html)
- See [HTML-to-markdown examples](docs.html#examples)
- Visit the breakdance [unit tests]({{@site.href}}/test), this is a great way to see comprehensive and detailed usage examples.
