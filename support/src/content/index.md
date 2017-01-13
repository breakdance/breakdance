---
title: Breakdance
slug: index
id: breakdance
pattern: breakdance
---

[View on GitHub](https://github.com/{{@site.repository}})

## What is breakdance?

Breakdance is an API and CLI for converting HTML to markdown. Breakdance runs on node.js, and can be installed using [npm](https://www.npmjs.com/) or [yarn][].

## What's different about breakdance?

Breakdance uses [cheerio][] to parse HTML, then uses [snapdragon-cheerio][] to convert the AST to be compatible with [snapdragon][], which makes rendering exceptionally easy to [control and customize](customize.html).

## How can I get started?

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save breakdance
```

Install with [yarn][]:

```sh
$ yarn add breakdance
```


## Next steps

- Visit [breakdance.io](https://breakdance.io) for documentation
- Visit the breakdance [unit tests]({{@site.href}}/test) for more comprehensive and detailed usage examples.
- [HTML-to-markdown examples](examples.html)
