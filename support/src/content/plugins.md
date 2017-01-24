---
title: Plugins
---

## Customizing {{@site.name}}

Breakdance ships with a [number of options](options.html) for customizing how markdown is converted to HTML. But if you need more than the provided options, {{@site.name}} is also pretty hackable.

**Hacking on {{@site.name}}**

It's easy to override any defaults, or add support for custom elements, attributes or options.

For example, you can control how _any HTML element_ is converted to markdown, or even how a certain element _with specific attributes_ is converted. You can override built-in renderers, create custom renderers _for custom HTML tags_, or create plugins that "bundle" together your commonly used customizations or preferences.

## Finding plugins

You can find [community plugins](https://www.npmjs.com/browse/keyword/{{@site.name}}) on npm (`https://www.npmjs.com/browse/keyword/{{@site.name}}`).

If you author a {{@site.name}} plugin, be sure to add the keyword `{{@site.name}}` to your project's package.json.

## Authoring plugins

Plugins are easy to write, and can be used to:

- override existing functionality or options
- extend the functionality of {{@site.name}}
- bundle together some common defaults or preferences you'd like to use every time you run {{@site.name}}

**Learn the basics**

Before moving on to authoring plugins, it might help to understand how the parser/compiler works. Visit the [snapddragon documentation](https://github.com/jonschlinkert/snapdragon) to learn more.


### Writing your first plugin

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

_Even if your plugin doesn't take options, following this convention will prevent users from losing their minds when your plugin doesn't follow the same format as other plugins._

**Usage example**

Users can now require in and use your plugin, like this:

```js
var foo = require('breakdance-foo');
var options = {};

breakdance.use(foo(options));
```


### Example: Normalizing whitespace

This plugin would normalize all consecutive whitepaces in a string to a single whitespace (including newlines):

```js
module.exports = function() {
  return function(breakdance) {
    breakdance.set('text', function(node) {
      this.emit(node.val.replace(/\s+/g, ' '));
    });
  };
};
```

And we're done! Really, that's all you need to do to create a basic whitespace normalization plugin.

## Publishing your plugin

Once you're ready to publish your plugin to [npm](https://www.npmjs.com/), you can do that now with the following command from the root of the project:

_(Are you ready?!)_

```sh
$ npm publish
```

## Next steps

Now that you've published your {{@site.name}} plugin project, let's tell the world about the great work you've done!

* To make your project as discoverable as possible, please add the keywords `{{@site.name}}` and `{{@site.name}}plugin` to package.json.
* Tweet about it, and be sure to mention `@{{@site.name}}js` or use the `#{{@site.name}}js` hashtag (don't forget the `js` part on twitter, so the world knows you mean code, not dancing)
* Show your love by starring [{{@site.name}}](https://github.com/{{@site.name}}/{{@site.name}})
* Get implementation help on [StackOverflow](http://stackoverflow.com/questions/tagged/{{@site.name}}) (as with twitter, please use the `{{@site.name}}js` tag in questions)
* **Gitter** Discuss {{@site.name}} with us on [Gitter](https://gitter.im/{{@site.name}}/{{@site.name}})
