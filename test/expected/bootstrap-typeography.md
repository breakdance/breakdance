# Typography

Bootstrap includes simple and easily customized typography for headings, body text, lists, and more. For even more control, check out the [textual utility classes](/utilities/).

## Contents

- [Contents](#contents)
- [Global settings](#global-settings)
- [Headings](#headings)
  * [Customizing headings](#customizing-headings)
- [Display headings](#display-headings)
- [Lead](#lead)
- [Inline text elements](#inline-text-elements)
- [Text utilities](#text-utilities)
- [Abbreviations](#abbreviations)
- [Blockquotes](#blockquotes)
  * [Naming a source](#naming-a-source)
  * [Reverse layout](#reverse-layout)
- [Lists](#lists)
  * [Unstyled](#unstyled)
  * [Inline](#inline)
  * [Description list alignment](#description-list-alignment)
- [Responsive typography](#responsive-typography)

## Global settings

Bootstrap sets basic global display, typography, and link styles. Specifically, we:

- Use a [native font stack](/content/reboot/#native-font-stack) that selects the best `font-family` for each OS and device.
- Use the `$font-family-base`, `$font-size-base`, and `$line-height-base` attributes as our typographic base applied to the `<body>`.
- Set the global link color via `$link-color` and apply link underlines only on `:hover`.
- Use `$body-bg` to set a `background-color` on the `<body>` (`#fff` by default).

These styles can be found within `_reboot.scss`, and the global variables are defined in `_variables.scss`.

## Headings

All HTML headings, `<h1>` through `<h6>`, are available.

<table>
  <tbody>
    <tr>
      <td><h1>h1. Bootstrap heading</h1></td>
      <td>Semibold 2.5rem (40px)</td>
    </tr>
    <tr>
      <td><h2>h2. Bootstrap heading</h2></td>
      <td>Semibold 2rem (32px)</td>
    </tr>
    <tr>
      <td><h3>h3. Bootstrap heading</h3></td>
      <td>Semibold 1.75rem (28px)</td>
    </tr>
    <tr>
      <td><h4>h4. Bootstrap heading</h4></td>
      <td>Semibold 1.5rem (24px)</td>
    </tr>
    <tr>
      <td><h5>h5. Bootstrap heading</h5></td>
      <td>Semibold 1.25rem (20px)</td>
    </tr>
    <tr>
      <td><h6>h6. Bootstrap heading</h6></td>
      <td>Semibold 1rem (16px)</td>
    </tr>
  </tbody>
</table>

```html
<h1>h1. Bootstrap heading</h1>
<h2>h2. Bootstrap heading</h2>
<h3>h3. Bootstrap heading</h3>
<h4>h4. Bootstrap heading</h4>
<h5>h5. Bootstrap heading</h5>
<h6>h6. Bootstrap heading</h6>
```

`.h1` through `.h6` classes are also available, for when you want to match the font styling of a heading but cannot use the associated HTML element.

h1. Bootstrap heading

h2. Bootstrap heading

h3. Bootstrap heading

h4. Bootstrap heading

h5. Bootstrap heading

h6. Bootstrap heading

```html
<p class="h1">h1. Bootstrap heading</p>
<p class="h2">h2. Bootstrap heading</p>
<p class="h3">h3. Bootstrap heading</p>
<p class="h4">h4. Bootstrap heading</p>
<p class="h5">h5. Bootstrap heading</p>
<p class="h6">h6. Bootstrap heading</p>
```

### Customizing headings

Use the included utility classes to recreate the small secondary heading text from Bootstrap 3.

### Fancy display heading <small>With faded secondary text</small>

```html
<h3>
  Fancy display heading
  <small class="text-muted">With faded secondary text</small>
</h3>
```

## Display headings

Traditional heading elements are designed to work best in the meat of your page content. When you need a heading to stand out, consider using a **display heading**—a larger, slightly more opinionated heading style.

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

```html
<h1 class="display-1">Display 1</h1>
<h1 class="display-2">Display 2</h1>
<h1 class="display-3">Display 3</h1>
<h1 class="display-4">Display 4</h1>
```

## Lead

Make a paragraph stand out by adding `.lead`.

Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.

```html
<p class="lead">
  Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.
</p>
```

## Inline text elements

Styling for common inline HTML5 elements.

You can use the mark tag to <mark>highlight</mark> text.

~~This line of text is meant to be treated as deleted text.~~

~~This line of text is meant to be treated as no longer accurate.~~

++This line of text is meant to be treated as an addition to the document.++

<u>This line of text will render as underlined</u>

<small>This line of text is meant to be treated as fine print.</small>

**This line rendered as bold text.**

_This line rendered as italicized text._

```html
<p>You can use the mark tag to <mark>highlight</mark> text.</p>
<p><del>This line of text is meant to be treated as deleted text.</del></p>
<p><s>This line of text is meant to be treated as no longer accurate.</s></p>
<p><ins>This line of text is meant to be treated as an addition to the document.</ins></p>
<p><u>This line of text will render as underlined</u></p>
<p><small>This line of text is meant to be treated as fine print.</small></p>
<p><strong>This line rendered as bold text.</strong></p>
<p><em>This line rendered as italicized text.</em></p>
```

`.mark` and `.small` classes are also available to apply the same styles as `<mark>` and `<small>` while avoiding any unwanted semantic implications that the tags would bring.

While not shown above, feel free to use `<b>` and `<i>` in HTML5. `<b>` is meant to highlight words or phrases without conveying additional importance while `<i>` is mostly for voice, technical terms, etc.

## Text utilities

Change text alignment, transform, style, weight, and color with our [text utilities](/utilities/typography/#text-alignment).

## Abbreviations

Stylized implementation of HTML's `<abbr>` element for abbreviations and acronyms to show the expanded version on hover. Abbreviations with a `title` attribute have a light dotted bottom border and a help cursor on hover, providing additional context on hover and to users of assistive technologies.

Add `.initialism` to an abbreviation for a slightly smaller font-size.

<abbr title="attribute">attr</abbr>

<abbr title="HyperText Markup Language">HTML</abbr>

```html
<p><abbr title="attribute">attr</abbr></p>
<p><abbr title="HyperText Markup Language" class="initialism">HTML</abbr></p>
```

## Blockquotes

For quoting blocks of content from another source within your document. Wrap `<blockquote class="blockquote">` around any <abbr title="HyperText Markup Language">HTML</abbr> as the quote.

> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.

```html
<blockquote class="blockquote">
  <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
</blockquote>
```

### Naming a source

Add a `<footer class="blockquote-footer">` for identifying the source. Wrap the name of the source work in `<cite>`.

> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
Someone famous in <cite>Source Title</cite>

```html
<blockquote class="blockquote">
  <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
  <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
</blockquote>
```

### Reverse layout

Add `.blockquote-reverse` for a blockquote with right-aligned content.

> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
Someone famous in <cite>Source Title</cite>

```html
<blockquote class="blockquote blockquote-reverse">
  <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
  <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
</blockquote>
```

## Lists

### Unstyled

Remove the default `list-style` and left margin on list items (immediate children only). **This only applies to immediate children list items**, meaning you will need to add the class for any nested lists as well.

- Lorem ipsum dolor sit amet
- Consectetur adipiscing elit
- Integer molestie lorem at massa
- Facilisis in pretium nisl aliquet
- Nulla volutpat aliquam velit
  * Phasellus iaculis neque
  * Purus sodales ultricies
  * Vestibulum laoreet porttitor sem
  * Ac tristique libero volutpat at
- Faucibus porta lacus fringilla vel
- Aenean sit amet erat nunc
- Eget porttitor lorem

```html
<ul class="list-unstyled">
  <li>Lorem ipsum dolor sit amet</li>
  <li>Consectetur adipiscing elit</li>
  <li>Integer molestie lorem at massa</li>
  <li>Facilisis in pretium nisl aliquet</li>
  <li>Nulla volutpat aliquam velit
    <ul>
      <li>Phasellus iaculis neque</li>
      <li>Purus sodales ultricies</li>
      <li>Vestibulum laoreet porttitor sem</li>
      <li>Ac tristique libero volutpat at</li>
    </ul>
  </li>
  <li>Faucibus porta lacus fringilla vel</li>
  <li>Aenean sit amet erat nunc</li>
  <li>Eget porttitor lorem</li>
</ul>
```

### Inline

Remove a list's bullets and apply some light `margin` with a combination of two classes, `.list-inline` and `.list-inline-item`.

- Lorem ipsum
- Phasellus iaculis
- Nulla volutpat

```html
<ul class="list-inline">
  <li class="list-inline-item">Lorem ipsum</li>
  <li class="list-inline-item">Phasellus iaculis</li>
  <li class="list-inline-item">Nulla volutpat</li>
</ul>
```

### Description list alignment

Align terms and descriptions horizontally by using our grid system's predefined classes (or semantic mixins). For longer terms, you can optionally add a `.text-truncate` class to truncate the text with an ellipsis.

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

## Responsive typography

_Responsive typography_ refers to scaling text and components by simply adjusting the root element's `font-size` within a series of media queries. Bootstrap doesn't do this for you, but it's fairly easy to add if you need it.

Here's an example of it in practice. Choose whatever `font-size`s and media queries you wish.

```scss
html {
  font-size: 14px;
}

@include media-breakpoint-up(sm) {
  html {
    font-size: 16px;
  }
}

@include media-breakpoint-up(md) {
  html {
    font-size: 20px;
  }
}

@include media-breakpoint-up(lg) {
  html {
    font-size: 28px;
  }
}
```
