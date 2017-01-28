
### [Breakdance]({{@site.href}}/blob/master/index.js#L26)

The main export of breakdance is a constructor function that will return a string of markdown if passed a string of HTML, or you can use `new` to create instance of `Breakdance` with an optional `options` object.

**Examples**

Do this if you just need to convert a string of HTML to markdown:

```js
var breakdance = require('breakdance');
console.log(breakdance('<strong>The Freaks Come Out at Night!</strong>'));
//=> 'The Freaks Come Out at Night!'
```

Or do this if you need to [register plugins](plugins.html) or customize the instance before parsing and/or compiling:

```js
var Breakdance = require('breakdance');
var bd = new Breakdance(/* options */);
var ast = bd.parse('<strong>The Freaks Come Out at Night!</strong>');
var str = bd.compile(ast);
console.log(str);
//=> 'The Freaks Come Out at Night!'
```
