---
title: Documentation
geopattern: j
---

# Welcome!

**Thank you for visiting the breakdance docs!** [Please let us know]({{@site.href}}/issues) if you find any typos, mispellings or similar grammar mistakes as you are reading.

[Pull requests](contributing.html) are also appreciated.

## Getting started

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
