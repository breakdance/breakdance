
Use this format to convert HTML to markdown.

```js
var breakdance = require('breakdance');
var str = breakdance('<strong>Let\'s dance!');
//=> "**Let\'s dance**"
```

Or use this format if you need to use plugins

```js
var Breakdance = require('breakdance');
var breakdance = new Breakdance()
  .use(plugin1())
  .use(plugin2())
var str = breakdance.render('<strong>Let\'s dance!');
//=> "**Let\'s dance**"
```