---
title: Edge Cases
---


A number of edge cases are supported. In most cases these should be pretty easy to override with options, and if not options, you can register custom renderers to completely change the output to be whatever you want.

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

Some HTML tags are retained. In particular when there is no equivalent in markdown and it seems reasonable that you might want to retain the HTML. For example, `<button>` tags are not output since they're not usable in markdown, but `<address>` tags are retained since their contents would still render.

When HTML tags are retained, most of the attributes are removed, with the acception of attributes on `img` and `a` tags.

Please feel free to [open an issue]({{@site.bugs.url}}) and let us know if you find any bugs or you think we should change the defaults.
