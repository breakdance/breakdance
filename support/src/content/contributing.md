---
title: Contributing
geopattern: t
---

**TODO**

- [ ] How to contribute
- [ ] How Breakdance works
  * Core concepts
  * Codebase and code organization
  * Design principles

This page is a continuation of the [breakdance contributing guide]({{@site.href}}/blob/master/.github/contributing.md). If you'd like to contribute to breakdance, please be sure to read that document before continuing.

## Getting started

If you're contributing code or documentation to breakdance, you will first need to clone the git repostory. You can do so with the following command:

```sh
$ git clone {{@site.href}}.git
```


## Contributing docs

Please read this section if you're contributing to breakdance and would like to add documentation.

**breakdance.io**

If you're contributing docs to breakdance.io, you will want to modify or add a file to the [support/src/content]({{@site.href}}/blob/master/support/src/content) directory in [breakdance's GitHub repository]({{@site.href}}).

Building the actual site isn't necessary for our purposes, but you are welcome to do so if you'd like to see how your documentation renders before doing your pull request.

breakdance.io is a static site that is generated using [assemble][]. Assuming you've already [cloned breakdance](#getting-started), <kbd>cd</kbd> into the `support` directory of the breakdance project, then run the following command to install dependencies and build the site:

```sh
$ npm install -g assemble && npm install
```

**README.md docs**

Breakdance uses [verb][] to generate the project's README.md as well as the API documentation, which is generated from code comments.

If you are adding docs to the readme, you don't need to use verb if you aren't using it already. We'd like to make this as easy as possible for you, please feel free to do any of the following (just let us know which):

- add the docs to a comment on the [breakdance issues]({{@site.bugs.url}})
- add the docs to the readme.md (and we will move them to the `.verb.md` template before the next release, that's not a problem)
- add the docs to `.verb.md` and run `verb`

Whichever is easiest for you. If you choose the latter, please run the following command to install [verb](https://github.com/verbose/verb) and the [readme generator](https://github.com/verbose/verb-generate-readme) (if you haven't already) and run verb:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```


## Next steps

- Learn about finding, using, authoring and publishing [plugins](plugins.html)
- See the [available options](options.html) in breakdance.

