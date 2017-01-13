---
title: Breakdance
slug: index
id: breakdance
pattern: breakdance
---

[View on GitHub](https://github.com/{{@site.repository}})

## What is {{@site.name}}?

{{titleize @site.name}} converts HTML to markdown.

**Why should I use {{@site.name}}?**

{{titleize @site.name}} uses [cheerio][] to parse HTML, then uses [snapdragon-cheerio][] to convert the AST to be compatible with [snapdragon][], which makes rendering exceptionally easy to [control and customize](customize.html).


## Get started

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save {{@site.name}}
```


## Node.js usage

```js
var {{@site.name}} = require('{{@site.name}}');
```


## Next steps

- [HTML-to-markdown examples](./examples.html)
- Visit the {{@site.name}} [unit tests](https://github.com/{{@site.repository}}/tests) for more comprehensive and detailed usage examples.
