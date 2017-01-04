# sledgehammer [![NPM version](https://img.shields.io/npm/v/sledgehammer.svg?style=flat)](https://www.npmjs.com/package/sledgehammer) [![NPM monthly downloads](https://img.shields.io/npm/dm/sledgehammer.svg?style=flat)](https://npmjs.org/package/sledgehammer)  [![NPM total downloads](https://img.shields.io/npm/dt/sledgehammer.svg?style=flat)](https://npmjs.org/package/sledgehammer) [![Linux Build Status](https://img.shields.io/travis/jonschlinkert/sledgehammer.svg?style=flat&label=Travis)](https://travis-ci.org/jonschlinkert/sledgehammer)

> Convert HTML to markdown. Gently.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save sledgehammer
```

## Highlights

* Generates well-formatted markdown
* Easy to customize: uses [cheerio](https://github.com/cheeriojs/cheerio) for parsing HTML, and [snapdragon](https://github.com/jonschlinkert/snapdragon) for rendering markdown, which makes sledgehammer easy to customize and extend
* Converts HTML tables to markdown! (nested tables are still output as HTML, since markdown doesn't support nested tables)
* Comprehensive HTML tag coverage. [Renderers](lib/renderers.js) are easy to understand, implement and customize.

Please create [an issue](../../issues/new) if you have a request, find a bug or have suggestions! thanks!

**Edge cases**

There will definitely be edge cases, the good news is that sledgehammer makes it really easy to implement options or change how any tag is rendered. Please create [an issue](../../issues/new) to let us know if you find something that doesn't seem right.

See [docs/edge-cases.md](docs/edge-cases.md) for more documentation about edge cases.

**Note**

* Some HTML tags are retained. In particular when there is no equivalent in markdown and it makes sense to keep the HTML. For example, `<button>` tags are not output since they wouldn't render in markdown.
* When HTML tags are retained, most of the attributes are removed, with the acception of attributes on `img` and `a` tags (please open an issue to suggest others, thanks!)

## Usage

```js
var sledgehammer = require('sledgehammer');
sledgehammer(htmlString[, options]);
```

## Options

TODO

## Examples

### ul

The following HTML list:

```html
<ul>
  <li>Foo</li>
  <li>Bar</li>
  <li>Baz</li>
</ul>
```

Would convert to the following markdown:

```
* Foo
* Bar
* Baz
```

### ol

The following HTML ordered list:

```html
<ol>
  <li>Foo</li>
  <li>Bar</li>
  <li>Baz</li>
</ol>
```

Would convert to the following markdown (in markdown, numbers are automatically incremented by the renderer when `1.` is used):

```
1. Foo
1. Bar
1. Baz
```

### checkboxes

An HTML `input` that has the `type="checkbox"` attribute:

```html
<input type="checkbox" />Lorem ipsum dolor sit amet
```

Converts to the following markdown:

```
[ ] Lorem ipsum dolor sit amet
```

**Checked**

The following:

```html
<input type="checkbox checked" />Lorem ipsum dolor sit amet
```

Converts to:

```
[x] Lorem ipsum dolor sit amet
```

### a

The following HTML anchor:

```html
<a href="/some-link">Foo</a>
```

Would convert to the following markdown:

```
[Foo](/some-link)
```

### blockquote

The following HTML blockquote:

```html
<blockquote> Lorem ipsum. </blockquote>
```

Would convert to the following markdown:

```
> Lorem ipsum.
```

**Nested blockquotes**

The following nested HTML blockquotes:

```html
<blockquote class="blockquote">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
  <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
  
  <blockquote class="blockquote">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
    <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
  </blockquote>
</blockquote>
```

Would convert to the following markdown:

```
> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
Someone famous in <cite>Source Title</cite>
>> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
Someone famous in <cite>Source Title</cite>
```

## br

Breaks are retained. Thus, the following HTML `br` tag:

```html
<br>
```

Is output in markdown as is:

```
<br>
```

### code

The following HTML code tag:

```html
<code>1em 40px</code>
```

Would convert to the following markdown:

```
`1em 40px`
```

**Nested backticks**

When a `code` tag contains backticks, it will be wrapped with double backticks. The following:

```html
<code>foo`a`b`bar</code>
```

Would convert to:

```
``foo`a`b`bar``
```

### img

The following HTML image tag:

```html
<img src="hammer.gif"/>
```

Would convert to the following markdown:

```
![](hammer.gif)
```

**alt**

```html
<img src="hammer.gif" alt="Can\'t touch this">
```

Would convert to the following markdown:

```
![Can\'t touch this](hammer.gif)
```

**Title**

```html
<img src="hammer.gif" title="Foo bar" alt="Can\'t touch this">
```

Would convert to the following markdown:

```
![Can\'t touch this](hammer.gif "Foo bar")
```

**No src**

When the `<img>` tag has no `src` attribute (e.g. `<img alt="foo"/>`), it will not be rendered.

### code

Anchors inside `<code>` tags are not converted. The following HTML:

```html
<code><a href="/some-link">Foo</a></code>
```

Would convert to the following markdown:

```
`<a href="/some-link">Foo</a></code>`
```

## About

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

Please read the [contributing guide](.github/contributing.md) for avice on opening issues, pull requests, and coding standards.

### Building docs

_(This document was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme) (a [verb](https://github.com/verbose/verb) generator), please don't edit the readme directly. Any changes to the readme must be made in [.verb.md](.verb.md).)_

To generate the readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install -g verb verb-generate-readme && verb
```

### Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

### License

Copyright © 2017, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.2.3, on January 04, 2017._