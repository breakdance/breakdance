---
title: Plugins
---

**TODO**

- [ ] finding
- [ ] authoring
- [ ] publishing


## Finding plugins

You can find [community plugins](https://www.npmjs.com/browse/keyword/breakdance) on npm (`https://www.npmjs.com/browse/keyword/breakdance`).

If you author a breakdance plugin, be sure to add the keyword `breakdance` to your project's package.json.

## Authoring plugins

**Why create a plugin for breakdance?**

Plugins are easy to write, and can be used to:

- override existing functionality or options
- extend the functionality of breakdance
- bundle together some common defaults or preferences you'd like to use every time you run breakdance

**Learn the basics**

Before moving on to authoring plugins, it might help to understand how the parser/compiler works. Visit the [snapddragon documentation](https://github.com/jonschlinkert/snapdragon) to learn more.


### Writing your first plugin





## The code

A breakdance plugin is a function that takes an instance of breakdance.

**Example**

```js
function yourPlugin(breakdance) {
  // do stuff with breakdance API
}
```

As a general rule, it's best to wrap the function with another function to allow users to pass options.

**Example**

```js
module.exports = function(options) {
  return function(breakdance) {
    // define your plugin here
  };
};
```

_Even if your plugin doesn't take options, following this convention will provide users with a consistent experience across all plugins._

**Usage example**

Users can now require in and use your plugin, like this:

```js
var foo = require('breakdance-foo');
var options = {};

breakdance.use(foo(options));
```

## Publishing your plugin

Once you're ready to publish your plugin to [npm](https://www.npmjs.com/), you can do that now with the following command from the root of the project:

_(Are you ready?!)_

```sh
$ npm publish
```

## Next steps

Now that you've published your breakdance plugin project, let's tell the world about the great work you've done!

* To make your project as discoverable as possible, please add the keywords `breakdance` and `breakdanceplugin` to package.json.
* Tweet about it, and be sure to mention `@breakdancejs` or use the `#breakdancejs` hashtag (don't forget the `js` part on twitter, so the world knows you mean code, not dancing)
* Show your love by starring [breakdance](https://github.com/breakdance/breakdance)
* Get implementation help on [StackOverflow](http://stackoverflow.com/questions/tagged/breakdance) (as with twitter, please use the `breakdancejs` tag in questions)
* **Gitter** Discuss breakdance with us on [Gitter](https://gitter.im/breakdance/breakdance)
