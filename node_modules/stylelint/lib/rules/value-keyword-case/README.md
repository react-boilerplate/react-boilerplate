# value-keyword-case

Specify lowercase or uppercase for keywords values.

```css
    a { display: block; }
/**              ↑
 *    These values */
```

This rule ignores [`<custom-idents>`](https://developer.mozilla.org/en/docs/Web/CSS/custom-ident) of known properties. Values which are paired with non-properties (e.g. `$vars` and custom properties), and do not conform to the primary option, can be ignored using the `ignoreValues: []` secondary option.

## Options

`string`: `"lower"|"upper"`

### `"lower"`

The following patterns are considered violations:

```css
a {
  display: Block;
}
```

```css
a {
  display: bLoCk;
}
```

```css
a {
  display: BLOCK;
}
```

```css
a {
  transition: -WEBKIT-TRANSFORM 2s;
}
```

The following patterns are *not* considered violations:

```css
a {
  display: block;
}
```

```css
a {
  transition: -webkit-transform 2s;
}
```

### `"upper"`

The following patterns are considered violations:

```css
a {
  display: Block;
}
```

```css
a {
  display: bLoCk;
}
```

```css
a {
  display: block;
}
```

```css
a {
  transition: -webkit-transform 2s;
}
```

The following patterns are *not* considered violations:

```css
a {
  display: BLOCK;
}
```

```css
a {
  transition: -WEBKIT-TRANSFORM 2s;
}
```

## Optional secondary options

### `ignoreKeywords: ["/regex/", "non-regex"]`

Ignore case of keywords values.

For example, with `"lower"`.

Given:

```js
["Block", "/^(f|F)lex$/"]
```

The following patterns are considered violations:

```css
a {
  display: bLoCk;
}
```

```css
a {
  display: BLOCK;
}
```

```css
a {
  display: fLeX;
}
```

```css
a {
  display: FLEX;
}
```

The following patterns are *not* considered violations:

```css
a {
  display: block;
}
```

```css
a {
  display: Block;
}
```

```css
a {
  display: flex;
}
```

```css
a {
  display: Flex;
}
```

### `ignoreProperties: ["/regex/", "non-regex"]`

Ignore case of the values of the listed properties.

For example, with `"lower"`.

```js
["/^(b|B)ackground$/", "display"]
```

The following patterns are considered violations:

```css
a {
  text-align: LEFT;
}
```

```css
a {
  text-align: Left;
}
```

The following patterns are *not* considered violations:

```css
a {
  display: bloCk;
}
```

```css
a {
  display: BloCk;
}
```

```css
a {
  display: BLOCK;
}
```

```css
a {
  display: block;
}
```

```css
a {
  background: Red;
}
```

```css
a {
  Background: deepPink;
}
```
