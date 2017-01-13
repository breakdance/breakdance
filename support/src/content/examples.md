---
title: Examples
---

## ul

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

## ol

When [options.one](options.html#one) is true, all items in ordered lists are numbered `1.` when converted to markdown (most markdown renderers will automatically re-number ordered lists, so using `1.` for every item is a nice way of making lists easier to maintain).

The following ordered list:

```html
<ol>
  <li>Foo</li>
  <li>Bar</li>
  <li>Baz</li>
</ol>
```

Is rendered to the following when [options.one](options.html#one) is enabled:

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

## checkboxes

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

## a

The following HTML anchor:

```html
<a href="/some-link">Foo</a>
```

Converts to:

```
[Foo](/some-link)
```

## blockquote

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

## br

Breaks are retained. Thus, the following HTML `br` tag:

```html
<br>
```

Is output in markdown as is:

```
<br>
```

## code

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


## img

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
<img src="hammer.gif" alt="Can\'t touch this">
```

Converts to:

```
![Can\'t touch this](hammer.gif)
```

**Title**

```html
<img src="hammer.gif" title="Foo bar" alt="Can\'t touch this">
```

Converts to:

```
![Can\'t touch this](hammer.gif "Foo bar")
```

**No src**

When the `<img>` tag has no `src` attribute (e.g. `<img alt="foo"/>`), it will not be rendered.

## code

Anchors inside `<code>` tags are not converted. The following HTML:

```html
<code><a href="/some-link">Foo</a></code>
```

Converts to:

```
`<a href="/some-link">Foo</a></code>`
```
