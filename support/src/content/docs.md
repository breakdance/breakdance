---
title: Docs
geopattern: j
---

**TODO**:

- [x] getting started (link to getting-started.html)
- [ ] usage
- [x] options
- [x] conversion examples
- [ ] next steps

## Getting started

**Welcome to the breakdance docs!**

- [ ] download / install
- [ ] next steps

## Options
{{md "src/content/includes/docs-options.md"}}

## Examples

HTML-to-markdown examples.

{{md "src/content/includes/docs-examples.md"}}

## Customizing breakdance

As you've already seen, Breakdance ships with a [number of options](options.html) for customizing how markdown is converted to HTML. But if you need more than the provided options, breakdance is also pretty hackable.

**Hacking on breakdance**

It's easy to override any defaults, or add support for custom elements, attributes or options.

For example, you can control how _any HTML element_ is converted to markdown, or even how a certain element _with specific attributes_ is converted. You can override built-in renderers, create custom renderers _for custom HTML tags_, or create plugins that "bundle" together your commonly used customizations or preferences.


**Next steps**

Depending on the type of customization you want to do

- [API documentation](#api)
- [Finding Plugins](plugins.html#finding-plugins)
- [Authoring Plugins](plugins.html#authoring-plugins)

## API

This section describes the API methods exposed by breakdance. For you to get the most of out the documentation in this section, it might help to take a moment to learn about the [core concepts](contributing.html#core-concepts) around which these API methods are designed.


{{md "src/content/includes/apidocs.md"}}


## Related

- **checklists**: Get GitHub-style task list support with [breakdance-checklist][].
-  **reflinks**: Use [breakdance-reflinks][] if you want to aggregate the urls from hrefs and src attributes at the bottom of the file as reference links


## Next steps

- [ ] customization?
- [ ] find or author plugins?
- [ ] issue?
- [ ] request?
- [ ] contribute?
