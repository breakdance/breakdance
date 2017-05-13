# breakdance [![NPM version](https://img.shields.io/npm/v/breakdance.svg?style=flat)](https://www.npmjs.com/package/breakdance) [![NPM monthly downloads](https://img.shields.io/npm/dm/breakdance.svg?style=flat)](https://npmjs.org/package/breakdance)  [![NPM total downloads](https://img.shields.io/npm/dt/breakdance.svg?style=flat)](https://npmjs.org/package/breakdance) [![Build Status](https://img.shields.io/travis/breakdance/breakdance.svg?style=flat)](https://travis-ci.org/breakdance/breakdance)

> Breakdance is a node.js library for converting HTML to markdown. Highly pluggable, flexible and easy to use. It's time for your markup to get down.

Breakdance is a node.js library for converting HTML to markdown. You can use breakdance to:

* Migrate HTML blog posts to markdown
* Convert wiki pages to markdown
* Convert HTML documentation to markdown
* Convert HTML presentations or slide decks to markdown
* Convert busy web pages into readable markdown documents.

Visit [breakdance.io](http://breakdance.io) for detailed documentation, [examples](http://breakdance.io/examples), [recipes](http://breakdance.io/recipes), and advice on [authoring and finding plugins](http://breakdance.io/plugins.html).

## Why should I use breakdance?

Breakdance uses [cheerio](https://github.com/cheeriojs/cheerio) to parse HTML, and [snapdragon](https://github.com/jonschlinkert/snapdragon) for rendering, which provides granular control over the entire conversion process in a way that is easy to understand, reason about, and [customize](http://breakdance.io/plugins.html). If you see something you don't like, it's easy to change!

**Generates well-formatted markdown**

* Comprehensive [HTML tag coverage](lib/compiler.js).
* Granular control over every HTML element and attributes
* Even **converts HTML tables** to markdown!

**Extremely pluggable**

Every part of the conversion is customizable:

* [options](http://breakdance.io/plugins.html) are available for customizing output of any HTML tag if you don't like the defaults
* [plugins](http://breakdance.io/plugins.html) are easy to write if you'd like to share your customizations with the world

## HTML-to-markdown example

**Tables**

The following HTML table from [bootstrap's docs](https://github.com/twbs/bootstrap):

```html
<h2 id=tables-hover-rows>Hover rows</h2>
<p>Add <code>.table-hover</code> to enable a hover state on table rows within a <code>&lt;tbody&gt;</code>.</p>
<div class=bs-example data-example-id=hoverable-table>
  <table class="table table-hover">
    <thead>
      <tr>
        <th>#</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Username</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope=row>1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <th scope=row>2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <th scope=row>3</th>
        <td>Larry</td>
        <td>the Bird</td>
        <td>@twitter</td>
      </tr>
    </tbody>
  </table>
</div>
```

Would render to the following markdown:

```
## Hover rows

Add `.table-hover` to enable a hover state on table rows within a `<tbody>`.

| # | First Name | Last Name | Username |
| --- | --- | --- | --- |
| 1 | Mark | Otto | @mdo |
| 2 | Jacob | Thornton | @fat |
| 3 | Larry | the Bird | @twitter |
```

See [the documentation](http://breakdance.io/examples.html) for more examples.

## About

### Community

Get updates on Breakdance's development and chat with the project maintainers and community members.

* Follow [@breakdancejs on Twitter](https://twitter.com/breakdancejs).
* Join the [conversation on Gitter](https://gitter.im/breakdance/breakdance?utm_source=share-link&utm_medium=link&utm_campaign=share-link)
* Implementation help may be found on Stack Overflow (please use the tag [breakdance](https://stackoverflow.com/questions/tagged/breakdance)`breakdance`).
* For maximum discoverability, plugin developers should use the keyword `breakdance` on packages which modify or add to the functionality of Breakdance when distributing through [npm](https://www.npmjs.com/browse/keyword/breakdance) or similar delivery mechanisms.

### Related projects

* [breakdance-checklist](https://www.npmjs.com/package/breakdance-checklist): Plugin that adds checklist rendering support to breakdance, similar to task lists in github-flavored-markdown. | [homepage](https://github.com/breakdance/breakdance-checklist "Plugin that adds checklist rendering support to breakdance, similar to task lists in github-flavored-markdown.")
* [breakdance-reflinks](https://www.npmjs.com/package/breakdance-reflinks): Breakdance plugin that aggregates the urls from hrefs and src attributes at the bottom of… [more](https://github.com/breakdance/breakdance-reflinks) | [homepage](https://github.com/breakdance/breakdance-reflinks "Breakdance plugin that aggregates the urls from hrefs and src attributes at the bottom of the file as reference links.")
* [breakdance-util](https://www.npmjs.com/package/breakdance-util): Utility functions for breakdance plugins. | [homepage](https://github.com/breakdance/breakdance-util "Utility functions for breakdance plugins.")

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

Please read the [contributing guide](.github/contributing.md) for advice on opening issues, pull requests, and coding standards.

### Contributors

| **Commits** | **Contributor** | 
| --- | --- |
| 118 | [jonschlinkert](https://github.com/jonschlinkert) |
| 3 | [doowb](https://github.com/doowb) |
| 1 | [davidbgk](https://github.com/davidbgk) |

### Release history

Changelog entries are classified using the following labels from [keep-a-changelog](https://github.com/olivierlacan/keep-a-changelog):

* `added`: for new features
* `changed`: for changes in existing functionality
* `deprecated`: for once-stable features removed in upcoming releases
* `removed`: for deprecated features removed in this release
* `fixed`: for any bug fixes

Custom labels used in this changelog:

* `dependencies`: bumps dependencies
* `housekeeping`: code re-organization, minor edits, or other changes that don't fit in one of the other categories.

##### [3.0.0](https://github.com/breakdance/breakdance/compare/2.0.0...3.0.0) - 2017-05-12

**Removed**

* CLI was externalized to [breakdance-cli][]

##### [2.0.0](https://github.com/breakdance/breakdance/compare/1.1.0...2.0.0) - 2017-04-25

**Changed**

* `<b>`: now renders as `**bold**`, same as `<strong>` tags
* `<i>`: now renders as `_italics_`, same as `<em>` tags

##### [1.1.0](https://github.com/breakdance/breakdance/compare/1.0.0...1.1.0) - 2017-04-21

**Fixed**

* `<code>`: improvements to whitespace handling
* `<code>`: no longer renders empty tags
* `<p>`: normalize Unicode `U+00A0` non-breaking spaces to "normal" Unicode `U+0020` spaces. Non-breaking spaces are useful in HTML, but cause flow problems in markdown.

**Added**

* documentation for `options.comments`, `options.unsmarty`, `options.trailingWhitespace`, all previously undocumented options. See [breakdance.io/options](http://breakdance.io/docs.html#options)

##### [1.0.0](https://github.com/breakdance/breakdance/compare/0.1.5...1.0.0) - 2017-03-12

**Added**

* Adds support for `<base>`, closes [issue #3](https://github.com/breakdance/breakdance/issues/3)

**Changed**

* Changed the CLI command from `tomd` to either `br`. As a fallback, you can also use `breakdance` if there is a conflict. The CLI has not yet been documented, so hopefully this doesn't cause any issues for anyone.

##### [0.1.5](https://github.com/breakdance/breakdance/compare/0.1.4...0.1.5)

**Fixed**

* An extra trailing newline was being added on `<code>` tags

**Added**

* Adds `keepEmpty` option, to selective keep empty tags that are omitted by built-in `omitEmpty` tags
* Adds documentation for `omit`, `pick` and `omitEmpty` and `keepEmpty` options

**Changed**

* Externalized `utils.js` to [breakdance-util](https://github.com/breakdance/breakdance-util), to allow plugin authors to use the same utilities as breakdance, for consistency.

##### [0.1.4](https://github.com/breakdance/breakdance/compare/0.1.0...0.1.4)

**Fixed**

* Better whitespace handling in `table`, `a` and `dl` tags

**Added**

* Adds documentation for `url` option

##### [0.1.0]

First release.

_(Changelog generated by [helper-changelog](https://github.com/helpers/helper-changelog))_

### Running tests

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](https://twitter.com/jonschlinkert)

### License

Copyright © 2017, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.5.0, on May 12, 2017._