# AST traversal

<!-- MarkdownTOC -->

- [Basic example](#basic-example)
- [walk\(ast, handler\)](#walkast-handler)
- [walkUp\(ast, handler\)](#walkupast-handler)
- [walkRules\(ast, handler\)](#walkrulesast-handler)
- [walkRulesRight\(ast, handler\)](#walkrulesrightast-handler)
- [walkDeclarations\(ast, handler\)](#walkdeclarationsast-handler)

<!-- /MarkdownTOC -->

## Basic example

```js
var csstree = require('css-tree');

csstree.walk(csstree.parse('.a { color: red; }'), function(node) {
  console.log(node.type);
});
// StyleSheet
// Rule
// SelectorList
// Selector
// ClassSelector
// Block
// Declaration
// Value
// Identifier
```

## walk(ast, handler)

Visits each node of AST in natural way and calls handler for each one. `handler` receives three arguments:

- `node` – current AST node
- `item` – node wrapper when node is a list member; this wrapper contains references to `prev` and `next` nodes in list
- `list` – reference to list when node is a list member; it's useful for operations on list like `remove()` or `insert()`

Context for handler an object, that contains references to some parent nodes:

- `root` – refers to `ast` root node (actually it's a node passed to walker function)
- `stylesheet` – refers to `StyleSheet` node, usually it's a root node
- `atrulePrelude` – refers to `AtrulePrelude` node if any
- `rule` – refers to closest `Rule` node if any
- `selector` – refers to `SelectorList` node if any
- `block` - refers to closest `Block` node if any
- `declaration` – refers to `Declaration` node if any
- `function` – refers to closest `Function`, `PseudoClassSelector` or `PseudoElementSelector` node if current node inside one of them

```js
// collect all urls in declarations
var csstree = require('./lib/index.js');
var urls = [];
var ast = csstree.parse(`
  @import url(import.css);
  .foo { background: url('foo.jpg'); }
  .bar { background-image: url(bar.png); }
`);

csstree.walk(ast, function(node) {
    if (this.declaration !== null && node.type === 'Url') {
        var value = node.value;

        if (value.type === 'Raw') {
            urls.push(value.value);
        } else {
            urls.push(value.value.substr(1, value.value.length - 2));
        }
    }
});

console.log(urls);
// [ 'foo.jpg', 'bar.png' ]
```

## walkUp(ast, handler)

Same as `walk()` but visits nodes in down-to-top order. Useful to process deepest nodes and then their parents.

```js
var csstree = require('css-tree');
var ast = csstree.parse('.a { color: red; }');

csstree.walk(ast, function(node) {
  console.log(node.type);
});
// StyleSheet
// Rule
// SelectorList
// Selector
// ClassSelector
// Block
// Declaration
// Value
// Identifier

csstree.walkUp(ast, function(node) {
  console.log(node.type);
});
// ClassSelector
// Selector
// SelectorList
// Identifier
// Value
// Declaration
// Block
// Rule
// StyleSheet
```

## walkRules(ast, handler)

Same as `walk()` but visits `Rule` and `Atrule` nodes only.

## walkRulesRight(ast, handler)

Same as `walkRules()` but visits nodes in reverse order (from last to first).

## walkDeclarations(ast, handler)

Visit all declarations.
