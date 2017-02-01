# Contributing to breakdance

First and foremost, thank you! We appreciate that you want to contribute to breakdance, your time is valuable, and your contributions mean a lot to us.

**What does "contributing" mean?**

Creating an issue is the simplest form of contributing to a project. But there are many ways to contribute, including the following:

- [Updating or correcting documentation](#documentation)
- [Feature requests](#issues)
- [Bug reports](#issues)

If you'd like to learn more about contributing in general, the [Guide to Idiomatic Contributing](https://github.com/jonschlinkert/idiomatic-contributing) has a lot of useful information.

**Showing support for breakdance**

Please keep in mind that open source software is built by people like you, who spend their free time creating things the rest the community can use.

Don't have time to contribute? No worries, here are some other ways to show your support for breakdance:

- star the [project](https://github.com/breakdance/breakdance)
- tweet your support for breakdance

## Issues

### Before creating an issue

Please try to determine if the issue is caused by an underlying library, and if so, create the issue there. Sometimes this is difficult to know. We only ask that you attempt to give a reasonable attempt to find out. Oftentimes the readme will have advice about where to go to create issues.

Try to follow these guidelines

- **Investigate the issue**:
- **Check the readme** - oftentimes you will find notes about creating issues, and where to go depending on the type of issue.
- Create the issue in the appropriate repository.
- Don't create issues for help with implementation. It's much better for discoverability, SEO, and semantics (to keep the issue tracker focused on bugs and feature requests) to ask implementation-related questions on [stackoverflow.com][so]

### Creating an issue

Please be as descriptive as possible when creating an issue. Give us the information we need to successfully answer your question or address your issue by answering the following in your issue:

- **version**: please note the version of breakdance are you using
- **extensions, plugins, helpers, etc** (if applicable): please list any extensions you're using
- **error messages**: please paste any error messages into the issue, or a [gist](https://gist.github.com/)

## Contributing documentation

Please read this section if you're contributing to breakdance and would like to add documentation. More information about how the site was created can be found on the [about](about.html#how-was-this-site-created) page.

**breakdance.io documentation**

If you're contributing docs to breakdance.io, you will want to modify or add a file to the [support/src/content](https://github.com/breakdance/breakdance/blob/master/support/src/content) directory in [breakdance's GitHub repository](https://github.com/breakdance/breakdance).

Building the actual site isn't necessary for our purposes, but you are welcome to do so if you'd like to see how your documentation renders before doing your pull request.

breakdance.io is a static site that is generated using [assemble][]. Assuming you've already [cloned breakdance](http://breakdance.io#getting-started), <kbd>cd</kbd> into the `support` directory of the breakdance project, then run the following command to install dependencies and build the site:

```sh
$ npm install -g assemble && npm install
```

**readme documentation**

Breakdance uses [verb](https://github.com/verbose/verb) to generate the project's README.md as well as the API documentation, which is generated from code comments.

If you are adding docs to the readme, you don't need to use verb if you aren't using it already. We'd like to make this as easy as possible for you, please feel free to do any of the following (just let us know which):

- add the docs to a comment on the [breakdance issues](https://github.com/breakdance/breakdance/issues)
- add the docs to the readme.md (and we will move them to the `.verb.md` template before the next release, that's not a problem)
- add the docs to `.verb.md` and run `verb`

Whichever is easiest for you. If you choose the latter, please run the following command to install [verb](https://github.com/verbose/verb) and the [readme generator](https://github.com/verbose/verb-generate-readme) (if you haven't already) and run verb:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

## Above and beyond

Here are some tips for creating idiomatic issues. Taking just a little bit extra time will make your issue easier to read, easier to resolve, more likely to be found by others who have the same or similar issue in the future.

- read the [Guide to Idiomatic Contributing](https://github.com/jonschlinkert/idiomatic-contributing)
- take some time to learn basic markdown. This [markdown cheatsheet](https://gist.github.com/jonschlinkert/5854601) is super helpful, as is the GitHub guide to [basic markdown](https://help.github.com/articles/markdown-basics/).
- Learn about [GitHub Flavored Markdown](https://help.github.com/articles/github-flavored-markdown/). And if you want to really go above and beyond, read [mastering markdown](https://guides.github.com/features/mastering-markdown/).
- use backticks to wrap code. This ensures that code will retain its format, making it much more readable to others
- use syntax highlighting by adding the correct language name after the first "code fence"

[so]: http://stackoverflow.com/questions/tagged/breakdance
