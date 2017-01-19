---
title: TOC
layout: main
---

# TOC

Table of contents.

**Rules**

- if `lvl` > `last.lvl`
  * create a new `ul`
  * add the `li` to the `ul`
- if `lvl` < `last.lvl`
  * pop off last `ul`
  * close off `ul`
  * (re-)get `last` node
  * add the `li` to `last.nodes`


## Foo

foo section.

### Nested

foo nested.

#### Nested nested

foo nested nested.
