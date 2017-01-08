---
title: Examples
---

## ul

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

## ol

The following HTML ordered list:

```html
<ol>
  <li>Foo</li>
  <li>Bar</li>
  <li>Baz</li>
</ol>
```

When [options.one](#optionsone) is true, converts to the following markdown (in markdown, numbers are automatically incremented by the renderer when `1.` is used):

```
1. Foo
1. Bar
1. Baz
```

Otherwise the following is rendered:

```
1. Foo
2. Bar
3. Baz
```

## checkboxes

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

## a

The following HTML anchor:

```html
<a href="/some-link">Foo</a>
```

Would convert to the following markdown:

```
[Foo](/some-link)
```

## blockquote

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

## code

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


## img

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

## code

Anchors inside `<code>` tags are not converted. The following HTML:

```html
<code><a href="/some-link">Foo</a></code>
```

Would convert to the following markdown:

```
`<a href="/some-link">Foo</a></code>`
```
