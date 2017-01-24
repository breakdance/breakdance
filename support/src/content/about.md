---
title: About
---

## How was this site created?

This site was created using [assemble][], along with a couple of custom plugins and helpers. All or most of these will likely be externalized to libraries.

**Custom plugins**

Custom assemble plugins were created for:

- generating the table of contents on each page (side navigation, on wide screens)
- converting markdown to html
- unescaping template characters that were escaped during markdown rendering

**Custom helpers**

Custom helpers were created for:

- sorting links to pages in the main navigation
- debugging (`log` helper)

## Who created breakdance?

Breakdance was created by [{{@site.author.name}}]({{@site.author.url}}).

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
