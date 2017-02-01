---
# please add two newlines before each consecutive heading
---

### snapdragon

Type: `object`

Default: `undefined`

Pass your own instance of [snapdragon][]. We're using [snapdragon-cheerio][] to modify the [cheerio][] AST to be compatible with Snapdragon, which consumes the AST and renders to markdown.


### condense

Type: `boolean`

Default: `true`

Collapse more than two newlines to only two newlines. Enabled by default.


### domain

Type: `string`

Default: `undefined`

Specify the root domain name to prefix onto `href` or `src` paths that do not start with `#` or contain `://`.


### knownOnly

Type: `boolean`

Default: `undefined`

When `true`, breakdance will throw an error if any non-standard/custom HTML tags are encountered. If you find a tag that breakdance doesn't cover, but you think it should, please [create an issue]({{@site.href}}/issues/new) to let us know about it.

See the [breakdance recipes](recipes.html) for an example of how to add support for custom HTML elements.


### leadingNewline

Type: `boolean`

Default: `undefined`

Add a newline at the beggining of the generated markdown string.


### one

Type: `boolean`

Default: `undefined`

Use `1.` for all ordered list items. Most markdown renderers automatically renumber lists. Using `1.` for all items is an easy way of not having to renumber list items when one is added or removed.

**Examples**

Given the following HTML ordered list:

```html
<ol>
  <li>Foo</li>
  <li>Bar</li>
  <li>Baz</li>
</ol>
```

```js
console.log(breakdance(list));
```

Renders to:

```
1. Foo
2. Bar
3. Baz
```

And if `options.one` is true:

```js
console.log(breakdance(list));
```

The result is:

```
1. Foo
1. Bar
1. Baz
```


### slugify

Type: `function`

Default: `undefined`

Pass a custom function for slugifying the url in anchors. By default, anchor urls are formatted to be consistent with how GitHub slugifies anchors.


### title

Type: `boolean`

Default: `undefined`

Output the text in the `<title>` tag as an `h1` at the start of the generated markdown document.

**Example**

```js
console.log(breakdance('<title>Foo</title>', {title: true}));
//=> '# Foo\n'
```


### trailingNewline

Type: `boolean`

Default: `true`

Add a newline at the end of the generated markdown string.


### url

Type: `function`

Default: `undefined`


### whitespace

Type: `boolean`

Default: `true`

Normalize whitespace, courtesy of the [breakdance-whitespace][] plugin. If you don't like the default normalization, you can disable or override this via options, or write a [custom plugin](plugins.html).

**Disable whitespace handling**

```js
breakdance('<title>Foo</title>', {whitespace: false});
```


### handlers

Type: `object`

Default: `undefined`

Pass a function with the name of the node type to `options.handlers`, to override the built-in handler for any `node.type`.

**Examples**

Customize whitespace handling by overriding the built-in `text` handler:

```js
breakdance('<title>Foo</title>', {
  handlers: {
    text: function(node) {
      // do stuff to text node
    }
  }
});
```

Customize output of the `<strong>` handler:

```js
breakdance('Foo <strong>Bar</strong>', {
  handlers: {
    strong: function(node) {
      this.emit(node.val.toUpperCase());
    }
  }
});

//=> 'FOO **BAR**'
```

Disable the `strong` handler (note that breakdance would throw an error if you encounter a `<strong>` tag and no handlers are registered for it):

```js
breakdance('Foo <strong>Bar</strong>', {handlers: {strong: false}});
//=> 'Foo '
```

If you need to do something more advanced, or you want breakdance to always use your customizations, you can also [write a plugin](plugins.html#example-normalizing-whitespace) for this.


### after

TODO

```js
var md = breakdance(html, {
  after: {
    eos: function(node) {
      // do stuff after end-of-string
    }
  }
});
```


### before

TODO

```js
var md = breakdance(html, {
  before: {
    div: function(node) {
      if (node.isGrid) {
        this.emit(node.html, node);
        node.nodes = [];
      }
    }
  }
});
```


### preprocess

TODO

```js
var md = breakdance(html, {
  preprocess: function($, node) {
  }
});
```


### postprocess

TODO

