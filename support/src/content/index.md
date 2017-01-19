---
title: Breakdance
slug: index
id: breakdance
pattern: breakdance
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

## Next steps

- Learn how to [customize breakdance](customize.html)
- Visit the breakdance [unit tests]({{@site.href}}/test) for more comprehensive and detailed usage examples.
- [HTML-to-markdown examples](examples.html)
