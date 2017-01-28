### [Breakdance](https://github.com/breakdance/breakdance/blob/master/index.js#L25)

Create an instance of `Breakdance` with the given `options`.

**Params**

* `options` **{Object}**

**Example**

```js
var Breakdance = require('breakdance');
var breakdance = new Breakdance();
```

### [.use](https://github.com/breakdance/breakdance/blob/master/index.js#L70)

Register a compiler plugin `fn`. Plugin functions should take an options object, and return a function that takes an instance of breakdance.

**Params**

* `fn` **{Function}**: plugin function
* `returns` **{Object}**: Returns the breakdance instance for chaining.

**Example**

```js
// plugin example
function yourPlugin(options) {
  return function(breakdance) {
    // do stuff
  };
}
// usage
breakdance.use(yourPlugin());
```

### [.preprocess](https://github.com/breakdance/breakdance/blob/master/index.js#L92)

Register a plugin to be called when `.parse` is run, after the AST is created by [cheerio][], but before the AST is converted to a breakdance AST. `preprocess` functions are passed an instance of breakdance and the cheerio instance that was created to parse the HTML.

**Params**

* `fn` **{Function}**: Plugin function
* `returns` **{Object}**: Returns the instance for chaining.

**Example**

```js
var md = breakdance(html, {
  preprocess: function($, node) {
  }
});
```

### [.define](https://github.com/breakdance/breakdance/blob/master/index.js#L124)

Set a non-enumerable property or method on the breakdance instance. Useful in plugins for defining methods or properties for to be used inside compiler visitor functions.

**Params**

* `name` **{String}**: Name of the property or method being defined
* `val` **{any}**: Property value
* `returns` **{Object}**: Returns the instance for chaining.

**Example**

```js
// plugin example
breakdance.use(function() {
  this.define('appendFoo', function(node) {
    node.val += 'Foo';
  });
});

// then, in a compiler "visitor" function
breakdance.set('text', function(node) {
  if (node.something === true) {
    this.appendFoo(node);
  }
  this.emit(node.val);
});
```

### [.set](https://github.com/breakdance/breakdance/blob/master/index.js#L144)

Register a visitor function to be called on a node of the given `type`. Override a built-in visitor `type`, or register a new type.

**Params**

* `type` **{String}**: The `node.type` to call the visitor on. You can override built-in visitors by registering a visitor of the same name, or register a visitor for rendering a new type.
* `fn` **{Function}**: The visitor function
* `returns` **{Object}**: Returns the instance for chaining.

**Example**

```js
breakdance.set('div', function(node) {
  // do stuff to node
});
```

### [.before](https://github.com/breakdance/breakdance/blob/master/index.js#L185)

Register a handler that will be called by the compiler on every node of the given `type`, _before other handlers are called_ on that node.

**Params**

* `type` **{String|Object|Array}**: Handler name(s), or an object of handlers
* `fn` **{Function}**: Handler function, if `type` is a string or array. Otherwise this argument is ignored.
* `returns` **{Object}**: Returns the instance for chaining.

**Example**

```js
breakdance.before('div', function(node) {
  // do stuff to node
});

// or
breakdance.before(['div', 'span'], function(node) {
  // do stuff to node
});

// or
breakdance.before({
  div: function(node) {
    // do stuff to node
  },
  span: function(node) {
    // do stuff to node
  }
});
```

### [.after](https://github.com/breakdance/breakdance/blob/master/index.js#L232)

Register a handler that will be called by the compiler on every node of the given `type`, _after other handlers are called_ on that node.

**Params**

* `type` **{String|Object|Array}**: Handler name(s), or an object of handlers
* `fn` **{Function}**: Handler function, if `type` is a string or array. Otherwise this argument is ignored.
* `returns` **{Object}**: Returns the instance for chaining.

**Example**

```js
breakdance.after('div', function(node) {
  // do stuff to node
});

// or
breakdance.after(['div', 'span'], function(node) {
  // do stuff to node
});

// or
breakdance.after({
  div: function(node) {
    // do stuff to node
  },
  span: function(node) {
    // do stuff to node
  }
});
```

### [.parse](https://github.com/breakdance/breakdance/blob/master/index.js#L289)

Parses a string of `html` and returns an AST.

**Params**

* `html` **{String}**
* `options` **{Object}**
* `returns` **{Object}**: Abstract syntax tree

**Example**

```js
var breakdance = new Breakdance();
var ast = breakdance.parse('<strong>The Freaks Come Out at Night!</strong>');
```

### [.compile](https://github.com/breakdance/breakdance/blob/master/index.js#L318)

Convert the a breakdance AST from [.parse](#parse) to markdown with the specified `options`

**Params**

* `ast` **{String}**
* `options` **{Object}**
* `returns` **{Object}**: Returns the AST and compiled markdown string on the `.output` property, in case you need the object for post-processing.

**Example**

```js
var breakdance = new Breakdance();
var ast = breakdance.parse('<strong>The Freaks Come Out at Night!</strong>');
var str = breakdance.compile(ast);
console.log(str);
//=> 'The Freaks Come Out at Night!'
```

### [.render](https://github.com/breakdance/breakdance/blob/master/index.js#L373)

Converts a string of HTML to markdown with the specified `options`. Wraps the [parse](#parse) and [compile](#compile).

**Params**

* `html` **{String}**
* `options` **{Object}**
* `returns` **{String}**: Returns a markdown string.

**Example**

```js
var breakdance = new Breakdance();
var str = breakdance.render('<strong>The Freaks Come Out at Night!</strong>');
console.log(str);
//=> 'The Freaks Come Out at Night!'
```