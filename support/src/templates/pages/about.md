---
title: About
---

## Who created breakdance?

Breakdance was created by [{{@site.author.name}}]({{@site.author.url}}).


## Why the name "breakdance?"

As they say, all the good names were taken. Besides, I tend to always use literal, concrete words to describe projects, sometimes it's fun to change it up. This name makes me smile.


## How was this site created?

This site was created using [assemble][], along with some plugins and helpers. 

**Plugins**

The following plugins were used:

- generating the table of contents on each page (side navigation, on wide screens)
- converting markdown to html
- unescaping template characters that were escaped during markdown rendering

**Helpers**

The following helpers were used:

- [helper-geopattern][] was used to create the geometrical patterns in the header (`.masthead`) of each page. A string is passed to the helper to determine the pattern. On some pages the `title` is used, on others a `geopattern` property in the front-matter determines the pattern.
- `sort` - a custom helper is used for sorting and filtering the links in the main navigation


## Reporting issues

Please report documentation or usage issues to the {{@site.name}} [issues tracker]({{@site.bugs.url}}) on GitHub.

## Contributing to breakdance

All contributions are welcome. Please review the project's [contributing guide]({{@site.href}}/.github/contributing.md) to learn everything you need to know about contributing.

## Building the documentation

The {{@site.name}} documentation site is hosted on gh-pages and is built with Assemble. Follow these steps to build the documentation:

1. clone the project
1. install the necessary dependencies
1. build the docs

**1. Clone the project**

From an empty directory, run the following command:

```sh
$ git clone {{!@site.href}}.git
```

**2. install the necessary dependencies**

```sh
$ npm install --global assemble && npm install
```

**3. build the docs**

Run [assemble][] to generate the docs:

```sh
$ assemble
```
