---
title: Documentation
geopattern: j
---

# Welcome!

**Thank you for visiting the breakdance docs!** [Please let us know]({{@site.href}}/issues) if you find any typos, mispellings or similar grammar mistakes as you are reading.

[Pull requests](contributing.html) are also appreciated.

## Getting started

If you want to see how breakdance works, the CLI is the fastest way to get started. 

### Installing the CLI

Install the breakdance CLI with [npm](https://www.npmjs.com/):

```sh
$ npm install  --global breakdance
```

This adds the `bd` command to your system path, allowing you to run the breakdance CLI from any directory. 

```sh
$ bd
# aliased as "breakdance" in case of conflicts
$ breakdance
```

### Using the CLI

If you want to do a quick test-drive, add the following content to `foo.html`:

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

**Run breakdance**

Next, from the command line run:

```sh
$ bd foo.html
```

If everything is installed properly, you should now see a `foo.md` file in the current working directory with something like following:

```
## Hover rows

Add `.table-hover` to enable a hover state on table rows within a `<tbody>`.

| # | First Name | Last Name | Username |
| --- | --- | --- | --- |
| 1 | Mark | Otto | @mdo |
| 2 | Jacob | Thornton | @fat |
| 3 | Larry | the Bird | @twitter |
```

### CLI options

Most of the [breakdance options](http://breakdance.io/docs.html#options) can be set from the command line. Play around with the options on the following help menu to customize output. 

**Help menu**

```
Usage: $ breakdance [options] <file> <dest>

  file:  The HTML file to convert to markdown
  dest:  Name of the markdown file to create. By default
         the HTML filename is used with a .md extension

Options:

-c, --condense Collapse more than two newlines to only
               two newlines. Enabled by default
-d, --domain   Specify the root domain name to prefix onto
               "href" or "src" paths that do not star
-o, --omit     One or more tags to omit entirely from
               the HTML before converting to markdown.
-p, --pick     One or more tags to pick entirely from the
               HTML before converting to markdown.
--comments     Include HTML code comments in the generated
               markdown string. Disabled by default
```

**Example**

Tell breakdance to only render specific HTML elements by passing CSS selectors to the `--pick` flag (powered by [cheerio][]).

For example, to only generate the `<table>` from the [HTML in the previous example](#using-the-cli), you would run:

```sh
$ bd foo.html --pick table
```

Try it! It's addictive!

### API Usage

Breakdance is a JavaScript-based node.js module that, [once installed](index.html#quickstart), can be added to any `.js` file using [node's](https://nodejs.org/api/modules.html) `require()` system by adding the following line of code:

```js
var breakdance = require('breakdance');
```

That line of code exposes the "main export" of the breakdance library, which is a function that can used in one of the following ways:

1. called with a string to convert HTML to markdown directly, or
2. treated as a constructor function and instantiated if you need to register plugins first

**Example 1: Direct usage**

```js
var breakdance = require('breakdance');
console.log(breakdance('<strong>The freaks come out at night!</strong>'));
//=> '**The freaks come out at night!**'
```

**Example 2: Constructor function**

This is useful when you need to [register plugins](plugins.html) first, or you want to modify the parser or compiler before rendering.

```js
var Breakdance = require('breakdance');
var breakdance = new Breakdance()
  .use(foo())
  .use(bar())
  .use(baz());

console.log(breakdance.render('<strong>The freaks come out at night!</strong>'));
//=> '**The freaks come out at night!**'
```

**Breakdance AST**

In addition to registering plugins, when instantiating you can also directly access the breakdance parser and compiler.

_Logging out the AST is a great way to learn how breakdance works, and will be helpful in understanding how to customize behavior if you want to [write plugins](plugins.html)._

```js
var Breakdance = require('breakdance');
var breakdance = new Breakdance(/* options */);
var ast = breakdance.parse('<strong>The Freaks Come Out at Night!</strong>');
console.log(ast);

var str = breakdance.compile(ast);
console.log(str);
//=> '**The Freaks Come Out at Night!**'
```

### Setting options

A number of different options are available for configuring breakdance. If you need more than what the options provide, see the [customizing breakdance](#customizing-breakdance) section.

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


## Options
{{remarkable (include "options")}}

## Customizing

If you don't like the defaults or need more than what the options provide, that's okay, breakdance was made to be easy to customize:

- Jump to the [API section](#api) to learn how to hack on breakdance.
- visit the [plugin docs](plugins.html) to learn how to find or write plugins.


## API
{{remarkable (include "api")}}


## Core concepts
{{remarkable (decrease-headings (include "core-concepts"))}}


## Related

- **checklists**: Get GitHub-style task list support with [breakdance-checklist][].
-  **reflinks**: Use [breakdance-reflinks][] if you want to aggregate the urls from hrefs and src attributes at the bottom of the file as reference links


## Next steps

- See [HTML-to-markdown conversion examples](examples.html)
- Learn how to [find or author plugins](plugins.html)
- Visit the breakdance [issue tracker]({{@site.href}}/issues) to report bugs and documentation errors or make feature requests
- [Contribute to breakdance](contributing.html)
