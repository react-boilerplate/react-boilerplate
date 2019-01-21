# Translate AST to string

<!-- MarkdownTOC -->

- [translate\(ast\)](#translateast)
- [translateWithSourceMap\(ast\)](#translatewithsourcemapast)

<!-- /MarkdownTOC -->

## translate(ast)

Converts AST to string.

```js
var ast = csstree.parse('.test { color: red }');
console.log(csstree.translate(ast));
// > .test{color:red}
```

## translateWithSourceMap(ast)

The same as `translate()` but also generates source map (nodes should contain positions in `loc` property).

```js
var ast = csstree.parse('.test { color: red }', {
    filename: 'my.css',
    positions: true
});
console.log(csstree.translateWithSourceMap(ast));
// { css: '.test{color:red}', map: SourceMapGenerator {} }
```
