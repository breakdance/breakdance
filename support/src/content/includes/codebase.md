## Under the hood

This document will help familiarize you with the breakdance API, as well as how the code works, to equip you with the information you need to customize the generated output or [author plugins](plugins.html).

Please [let us know]({{@site.bugs.url}}) if you have any suggestions for improving the docs.

### Core concepts

Before diving into methods, it's important to understand how the code is structured in breakdance.
The breakdance API is organized around three classes, and the responsibilities of each:

```
Breakdance
├── Parser
└── Compiler
```

- [Parser](#parser): responsible for creating an <abbr title="Abstract Syntax Tree">[AST](#ast)</abbr> from a string of HTML.
- [Compiler](#compiler): responsible for iterating over the AST, and generating a new string by
- [Breakdance](#breakdance): wraps the [Parser](#parser) and [Compiler](#compiler) classes, to control how and when they are instantiated, how options are passed, and to manage plugin loading from a single interface.


* Plugins
* Parsing
  - AST
  - Node
* Compiling
  - Handlers



* Breakdance
  - instance plugins
  - parser plugins
  - compiler plugins
* Parsing
  - parsers
  - Node
  - AST
* Compiling
  - handlers

## Parser

The parser is responsible for creating an <abbr title="Abstract Syntax Tree">AST</abbr>. Before we dive into the parser API, it might help to have a basic understanding of how an AST works. If you're already familiary with ASTs, feel free to skip this part.

### AST

**In a nutshell**

- An AST is just an object with properties
- Each property on an AST is referred to as a `node`
- Every node has a `type` property, which semantically describes the purpose of the node. For example, if you were parsing a string, and you captured a `*`, you might create a node with the type `star`
- A node can have "child" nodes, stored on the `node.nodes` array
- A node can have a string



The AST itself is considered a "root" level node. Nodes themselves can be infinitely nested, and each node bears a resem


An AST consists of [Nodes](#Node)

### Node

A node may have either child nodes, stored as an array on `node.nodes`, or a string value, stored on `node.val`, but never both.

A node represents a significant
 each node in the AST

**Example AST node***

## Compiler
TODO

## Plugins
TODO

## Compiler
TODO

### Handlers

Handlers are visitor functions called by the compiler when a registered handler’s name matches a node type.

When `.compile` is called, the breakdance compiler iterates over each node on the AST
The breakdance compiler calls a specific handler function on each AST node.

