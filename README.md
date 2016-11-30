## Usage

```js
var sledgehammer = require('sledgehammer');
```

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

