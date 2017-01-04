# Edge cases

A number of edge cases are supported. In most cases these should be pretty easy to override with options or custom parsers/compilers. Please feel free to create an issue if you have questions or need guidance on customizations.

## Tables

### 1. Multiple rows in `thead`

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

### 2. Nested tables

When a table has nested tables within it, the table will be rendered as HTML.

## Headings

### 1. List items containing `<h1-6>` tags

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

### 2. Table cells containing `<h1-6>` tags

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

## Definition Lists

Definition lists are not converted to markdown.

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
