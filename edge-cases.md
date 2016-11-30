# Edge cases

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

