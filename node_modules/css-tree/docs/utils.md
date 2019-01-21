# Utils to work with AST

<!-- MarkdownTOC -->

- [property\(name\)](#propertyname)
- [keyword\(name\)](#keywordname)
- [clone\(ast\)](#cloneast)
- [fromPlainObject\(object\)](#fromplainobjectobject)
- [toPlainObject\(ast\)](#toplainobjectast)

<!-- /MarkdownTOC -->

## property(name)

Returns a details about property name, i.e. vendor prefix, used hack etc. Can be used for safe test of declaration property name.

```js
var csstree = require('css-tree');

csstree.property('*-vendor-property');
// {
//     name: 'property',
//     variable: false,
//     prefix: '*-vendor-',
//     vendor: '-vendor-',
//     hack: '*'
// };
csstree.property('--test-var');
// {
//     name: '--test-var',
//     variable: true,
//     prefix: '',
//     vendor: '',
//     hack: ''
// };
```

`property()` function normalize name to lower case, but not custom property names (since custom property names are case sensitive). It returns the same immutable (freezed) object for the same input name when normalized.

```js
csstree.property('name') === csstree.property('NAME')         // true
csstree.property('NAME').name === 'name'                      // true
csstree.property('--custom') === csstree.property('--Custom') // false

var info = csstree.property('NAME');
info.name === 'name'; // 
info.name = 'foo';    // have no effect
info.name === 'name'; // true
```

Supported hacks:

- `_` in the beginning
- `*` in the beginning
- `$` in the beginning
- `//` in the beginning

## keyword(name)

The same as `property()` function, but without hack and custom property name detection.

```js
var csstree = require('css-tree');

csstree.keyword('-vendor-keyword');
// {
//     name: 'keyword',
//     prefix: '-vendor-',
//     vendor: '-vendor-'
// };
```

## clone(ast)

Make an AST node deep copy.

```js
var orig = csstree.parse('.test { color: red }');
var copy = csstree.clone(orig);

csstree.walk(copy, function(node) {
    if (node.type === 'Class') {
        node.name = 'replaced';
    }
});

console.log(csstree.translate(orig));
// .test{color:red}
console.log(csstree.translate(copy));
// .replaced{color:red}
```

## fromPlainObject(object)

`fromPlainObject()` recursively walks through tree and coverts each `children` value into a List instance if value is an array.

```js
var csstree = require('css-tree');
var ast = {
    "type": "SelectorList",
    "children": []
};

console.log(Array.isArray(ast.children));          // true
console.log(ast.children instanceof csstree.List); // false

ast = csstree.fromPlainObject(ast);

console.log(Array.isArray(ast.children));          // false
console.log(ast.children instanceof csstree.List); // true
```

It recursively walk through tree and converts `children` value to List instance if it's an array. Implementation have no protection from cycles in tree, therefore object tree should be acyclic.

Function mutates the passed object tree. If you want to avoid it use `clone()` function before passing object to `fromPlainObject()`.

```js
ast = csstree.fromPlainObject(csstree.clone(ast));
```

## toPlainObject(ast)

`fromPlainObject()` recursively walks through tree and coverts each `children` value to regular array if value is a List instance.

```js
var csstree = require('css-tree');
var ast = {
    "type": "SelectorList",
    "children": new List()
};

console.log(Array.isArray(ast.children));          // false
console.log(ast.children instanceof csstree.List); // true

ast = csstree.toPlainObject(ast);

console.log(Array.isArray(ast.children));          // true
console.log(ast.children instanceof csstree.List); // false
```

Implementation have no protection from cycles in tree, therefore object tree should be acyclic.

Function mutates the passed object tree. If you want to avoid it use `clone()` function before passing object to `toPlainObject()`.

```js
ast = csstree.toPlainObject(csstree.clone(ast));
```
