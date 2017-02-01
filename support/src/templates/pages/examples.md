---
title: Examples
geopattern: z # u x
---

## HTML elements

Examples of how various HTML elements render to markdown.

These examples are not comprehensive. See the [breakdance unit tests]({{@site.href}}/blob/master/test) for more examples. Requests (or pull requests) [are welcome]({{@site.bugs.url}}/new) to add other examples.

It's also very easy to change the output with [options](options.html) or [plugins](plugions.htlm), if you don't like the defaults.

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

Breaks are passed through unchanged. Thus:

```html
<br>
```

Is rendered to:

```
<br>
```


### hr

A horizontal rule:

```html
<hr>
```

Is converted to:

```
***
```

### code


Everything inside `<code>` tags is left as-is. The following HTML:

```html
<code><a href="/some-link">Foo</a></code>
```

Results in:

```
`<a href="/some-link">Foo</a></code>`
```

and:

```html
<code>1em 40px</code>
```

Results in:

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

### del

HTML deleted text:

```html
<del>This line of text is meant to be treated as deleted text.</del>
```

Renders to the following markdown:

```
~~This line of text is meant to be treated as deleted text.~~
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

### em

The following HTML `em`:

```html
<em>This is italicized!</em>
```

Is rendered to the following markdown:

```
_This is italicized!_
```

**Nested tags**

Nested `em` tags are "flattened" into a single statement:

```html
<em>This <em>is</em> worth hearing!</em>
```

Converts to the following markdown:

```
_This is worth hearing!_
```

### headings

The following HTML headings:

```html
<h1>AAA</h1>
<h2>BBB</h2>
<h3>CCC</h3>
<h4>DDD</h4>
<h5>EEE</h5>
<h6>FFF</h6>
```

Convert to the following markdown, respectively:

```
# AAA
## BBB
### CCC
#### DDD
##### EEE
###### FFF
```

### img

The following HTML `img`:

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


### q

HTML inline quotes:

```html
<div>This is an <q>inline quote</q>.</div>
```

Are passed through unchanged:

```html
This is an <q>inline quote</q>.
```

### strong

HTML `strong` tags like the following:

```html
<strong>This is loud!</strong>
```

Would convert to the following markdown:

```
**This is loud!**
```

**Nested tags**

Nested `strong` tags are "flattened" into a single statement:


```html
<strong>This <strong>is</strong> loud!</strong>
```

Converts to the following markdown:

```
**This is loud!**
```

### table

Most of the other markdown-to-HTML converters struggle with tables. Breakdance has solid support for well-formed tables, and even some sub-optimal tables.

**Examples**

The following HTML table:

```html
<table>
  <thead>
    <tr>
      <th>Heading 1</th>
      <th>Heading 2</th>
      <th>Heading 3</th>
      <th>Heading 4</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
    </tr>
    <tr>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
    </tr>
  </tbody>
</table>
```

Would render to the following markdown:

```html
| Heading 1 | Heading 2 | Heading 3 | Heading 4 |
| --- | --- | --- | --- |
| Table cell | Table cell | Table cell | Table cell |
| Table cell | Table cell | Table cell | Table cell |
```

**captions**

And an HTML table with a `<caption>` and aligned columns, like this:

```html
<table>
  <caption>
    This is an example table, and this is its caption to describe the contents.
  </caption>
  <thead>
    <tr>
      <th>Table heading</th>
      <th align="right">Table heading</th>
      <th align="center">Table heading</th>
      <th align="left">Table heading</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
    </tr>
    <tr>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
      <td>Table cell</td>
    </tr>
  </tbody>
</table>
```

Renders to the following markdown:

```html
<caption>This is an example table, and this is its caption to describe the contents.</caption>

| Table heading | Table heading | Table heading | Table heading |
| --- | ---: | :---: | :--- |
| Table cell | Table cell | Table cell | Table cell |
| Table cell | Table cell | Table cell | Table cell |
```

Note that nested tables are still output as HTML, since the [commonmark](spec.commonmark.org) specification does not support nested tables).


## Edge cases

There will always be edge cases. I attempted to implement reasonable solutions to a few [edge-cases]({{@site.homepage}}/edge-cases.html) described in the docs. If you disagree with how they're being handled, or you'd like to suggest other edge cases to be handled, please create [an issue]({{@site.bugs.url}}/new) to discuss.


A number of edge cases are supported. In most cases these should be pretty easy to override with [options](options.html), or you can completely change the output to be whatever you want using [plugins](plugins.html).

Please feel free to [create an issue]({{@site.bugs.url}}) if you have questions or need guidance on customizations.

## Tables

### Multiple rows in `thead`

When multiple rows (`<tr>`) are in `<thead>`, the rows are collapsed to a single `<tr>`, and a `<br>` is added as a text separater to retain the visual appearance of multiple lines.

**Example**

```html
<thead>
  <tr>
    <th></th>
    <th>Name</th>
    <th>Name</th>
  </tr>
  <tr>
    <th></th>
    <th>(first)</th>
    <th>(last)</th>
  </tr>
</thead>
```

Renders to:

```
| <br> | Name<br>(first) | Name<br>(last) |
```

### Nested tables

When a table has nested tables within it, the table will be rendered as HTML.

## Headings

### List items containing `<h1-6>` tags

When a list item contains a [heading element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements), the item will be output as bold (in other words, the element's meaning as a list item takes precedence over its meaning as a heading).

**Example**

```html
<ul>
  <li><h3>Item one</h3></li>
  <li><h3>Item two</h3></li>
</ul>
```

Results in

```
- **Item one**
- **Item two**
```

### Table cells containing `<h1-6>` tags

When a table cell contains a [heading element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements), the entire table will be output as HTML with attributes stripped, and not converted to markdown. This is to ensure formatting is retained, since markdown tables do not render headings.

**Example**

The following table (from Bootstrap's docs):

```html
<div class="bd-example bd-example-type">
  <table class="table">
    <tbody>
      <tr>
        <td><h1 class="display-1">Display 1</h1></td>
      </tr>
      <tr>
        <td><h1 class="display-2">Display 2</h1></td>
      </tr>
      <tr>
        <td><h1 class="display-3">Display 3</h1></td>
      </tr>
      <tr>
        <td><h1 class="display-4">Display 4</h1></td>
      </tr>
    </tbody>
  </table>
</div>
```

Renders to:

```html
<table>
  <tbody>
    <tr>
      <td><h1>Display 1</h1></td>
    </tr>
    <tr>
      <td><h1>Display 2</h1></td>
    </tr>
    <tr>
      <td><h1>Display 3</h1></td>
    </tr>
    <tr>
      <td><h1>Display 4</h1></td>
    </tr>
  </tbody>
</table>
```

## Unconverted HTML

Some HTML tags are retained as-is and are rendered as HTML when converted to markdown. In particular when there is no equivalent in markdown and it seems reasonable that you might want to retain the HTML. For example, `<button>` tags are not output since they're not usable in markdown, but `<address>` tags are retained since their contents would still render.

When HTML tags are retained, most of the attributes are removed, with the acception of attributes such as `src` and `href` on `img` and `a` tags.

Please feel free to [open an issue]({{@site.bugs.url}}) and let us know if you find any bugs or you think we should change the defaults.
