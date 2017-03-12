## Release history

Changelog entries are classified using the following labels from [keep-a-changelog][]:

* `added`: for new features
* `changed`: for changes in existing functionality
* `deprecated`: for once-stable features removed in upcoming releases
* `removed`: for deprecated features removed in this release
* `fixed`: for any bug fixes

Custom labels used in this changelog:

* `dependencies`: bumps dependencies
* `housekeeping`: code re-organization, minor edits, or other changes that don't fit in one of the other categories.

### [1.0.0]

**Added**

- Adds support for `<base>`, closes [issue #3](https://github.com/breakdance/breakdance/issues/3)

**Changed**

- Changed the CLI command from `tomd` to either `br`. As a fallback, you can also use `breakdance` if there is a conflict. The CLI has not yet been documented, so hopefully this doesn't cause any issues for anyone. 

### [0.1.5]

**Fixed**

- An extra trailing newline was being added on `<code>` tags

**Added**

- Adds `keepEmpty` option, to selective keep empty tags that are omitted by built-in `omitEmpty` tags
- Adds documentation for `omit`, `pick` and `omitEmpty` and `keepEmpty` options

**Changed**

- Externalized `utils.js` to [breakdance-util][], to allow plugin authors to use the same utilities as breakdance, for consistency.

### [0.1.4]

**Fixed**

- Better whitespace handling in `table`, `a` and `dl` tags

**Added**

- Adds documentation for `url` option

### [0.1.0]

First release.

[keep-a-changelog]: https://github.com/olivierlacan/keep-a-changelog