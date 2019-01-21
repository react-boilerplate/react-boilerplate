# block-closing-brace-newline-after

Require a newline or disallow whitespace after the closing brace of blocks.

```css
a { color: pink; }
a { color: red; }↑
/**              ↑
 * The newline after this brace */
```

This rule allows an end-of-line comment separated from the closing brace by spaces, as long as the comment contains no newlines. For example,

```css
a {
  color: pink;
} /* end-of-line comment */
```

This rule allows a trailing semicolon after the closing brace of a block. For example,

```css
:root {
  --toolbar-theme: {
    background-color: hsl(120, 70%, 95%);
  };
/* ↑
 * This semicolon */  
}
```

## Options

`string`: `"always"|"always-single-line"|"never-single-line"|"always-multi-line"|"never-multi-line"`

### `"always"`

There *must always* be a newline after the closing brace.

The following patterns are considered violations:

```css
a { color: pink; }b { color: red; }
```

```css
a { color: pink;
} b { color: red; }
```

The following patterns are *not* considered violations:

```css
a { color: pink; }
b { color: red; }
```

### `"always-single-line"`

There *must always* be a newline after the closing brace in single-line blocks.

The following patterns are considered violations:

```css
a { color: pink; } b { color: red; }
```

The following patterns are *not* considered violations:

```css
a { color: pink;
} b { color: red; }
```

```css
a { color: pink; }
b { color: red; }
```

### `"never-single-line"`

There *must never* be whitespace after the closing brace in single-line blocks.

The following patterns are considered violations:

```css
a { color: pink; } b { color: red; }
```

The following patterns are *not* considered violations:

```css
a { color: pink; }b { color: red; }
```

```css
a { color: pink;
} b { color: red; }
```

### `"always-multi-line"`

There *must always* be a newline after the closing brace in multi-line blocks.

The following patterns are considered violations:

```css
a { color: pink;
}b { color: red; }
```

The following patterns are *not* considered violations:

```css
a { color: pink; }b { color: red; }
```

```css
a { color: pink;
}
b { color: red; }
```

### `"never-multi-line"`

There *must never* be whitespace after the closing brace in multi-line blocks.

The following patterns are considered violations:

```css
a { color: pink;
} b { color: red; }
```

The following patterns are *not* considered violations:

```css
a { color: pink; } b { color: red; }
```

```css
a { color: pink;
}b { color: red; }
```

## Optional secondary options

### `ignoreAtRules: ["/regex/", "non-regex"]`

Ignore specified at-rules.

For example, with `"always"` or `"always-multi-line"`.

Given:

```js
["if", "else"]
```

The following patterns are *not* considered violations:

```css
@if ($var) {
  color: pink;
} @else if ($var2) {
  color: red;
} @else {
  color: blue;
}
```

```css
@if ($var) { color: pink; } @else { color: blue; }
```
