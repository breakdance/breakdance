---
title: Examples
geopattern: j
---

This page has only a few examples of how breakdance converts HTML to markdown. Requests (or pull requests) [are welcome]({{@site.bugs.url}}/new) to add other examples.

## HTML Elements

### ul

The following unordered list:

```html
<ul>
  <li>Foo</li>
  <li>Bar</li>
  <li>Baz</li>
</ul>
```

Converts to:

```
* Foo
* Bar
* Baz
```

### ol

When [options.one](options.html#optionsone) is true, all items in ordered lists are numbered `1.` when converted to markdown (most markdown renderers will automatically re-number ordered lists, so using `1.` for every item is a nice way of making lists easier to maintain).

The following ordered list:

```html
<ol>
  <li>Foo</li>
  <li>Bar</li>
  <li>Baz</li>
</ol>
```

Is rendered to the following when [options.one](options.html#optionsone) is enabled:

```
1. Foo
1. Bar
1. Baz
```

Otherwise:

```
1. Foo
2. Bar
3. Baz
```

### checkboxes

An HTML `input` with the `type="checkbox"` attribute:

```html
<input type="checkbox" />Lorem ipsum dolor sit amet
```

Converts to:

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

Converts to:

```
[Foo](/some-link)
```

### blockquote

The following HTML blockquote:

```html
<blockquote> Lorem ipsum. </blockquote>
```

Converts to:

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

Converts to:

```
> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
Someone famous in <cite>Source Title</cite>
>> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
Someone famous in <cite>Source Title</cite>
```

### br

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

Converts to:

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

### dl

Definition lists are not converted to markdown. HTML is rendered, but attributes are stripped.

**Example**

The following `<dl>` (from Bootstrap's docs):

```html
<dl class="row">
  <dt class="col-sm-3">Description lists</dt>
  <dd class="col-sm-9">A description list is perfect for defining terms.</dd>

  <dt class="col-sm-3">Euismod</dt>
  <dd class="col-sm-9">Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</dd>
  <dd class="col-sm-9 offset-sm-3">Donec id elit non mi porta gravida at eget metus.</dd>

  <dt class="col-sm-3">Malesuada porta</dt>
  <dd class="col-sm-9">Etiam porta sem malesuada magna mollis euismod.</dd>

  <dt class="col-sm-3 text-truncate">Truncated term is truncated</dt>
  <dd class="col-sm-9">Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</dd>

  <dt class="col-sm-3">Nesting</dt>
  <dd class="col-sm-9">
    <dl class="row">
      <dt class="col-sm-4">Nested definition list</dt>
      <dd class="col-sm-8">Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc.</dd>
    </dl>
  </dd>
</dl>
```

Renders to:

```html
<dl>
  <dt>Description lists</dt>
  <dd>A description list is perfect for defining terms.</dd>

  <dt>Euismod</dt>
  <dd>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</dd>
  <dd>Donec id elit non mi porta gravida at eget metus.</dd>

  <dt>Malesuada porta</dt>
  <dd>Etiam porta sem malesuada magna mollis euismod.</dd>

  <dt>Truncated term is truncated</dt>
  <dd>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</dd>

  <dt>Nesting</dt>
  <dd>
    <dl>
      <dt>Nested definition list</dt>
      <dd>Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc.</dd>
    </dl>
  </dd>
</dl>
```

### img

The following HTML image tag:

```html
<img src="hammer.gif"/>
```

Converts to:

```
![](hammer.gif)
```

**alt**

```html
<img src="hammer.gif" alt="Can't touch this">
```

Converts to:

```
![Can't touch this](hammer.gif)
```

**Title**

```html
<img src="hammer.gif" title="Foo bar" alt="Can't touch this">
```

Converts to:

```
![Can't touch this](hammer.gif "Foo bar")
```

**No src**

When the `<img>` tag has no `src` attribute (e.g. `<img alt="foo"/>`), it will not be rendered.

### code

Everything inside `<code>` tags is left as-is. The following HTML:

```html
<code><a href="/some-link">Foo</a></code>
```

Results in:

```
`<a href="/some-link">Foo</a></code>`
```


## Edge cases

There will always be edge cases. I attempted to implement reasonable solutions to a few [edge-cases]({{@site.homepage}}/edge-cases.html) described in the docs. If you disagree with how they're being handled, or you'd like to suggest other edge cases to be handled, please create [an issue]({{@site.bugs.url}}/new) to discuss.
