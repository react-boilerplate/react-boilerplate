# block-closing-brace-empty-line-before

Require or disallow an empty line before the closing brace of blocks.

```css
a {
  color: pink;
  /* ← */
} /* ↑ */
/**  ↑
 * This line */
```

## Options

`string`: `"always-multi-line"|"never"`

### `always-multi-line`

The following patterns are considered violations:

```css
a {
  color: pink;
}
```

The following patterns are *not* considered violations:

```css
a {
  color: pink;

}
```

```css
a { color: pink; }
```

### `never`

The following patterns are considered violations:

```css
a {
  color: pink;

}
```

The following patterns are *not* considered violations:

```css
a {
  color: pink;
}
```

```css
a { color: pink; }
```

## Optional secondary options

### `except: ["after-closing-brace"]`

When a rule is nested, `after-closing-brace` brace will reverse the primary option.

For example, with `"never"` and `except: ["after-closing-brace"]`:

The following patterns are considered violations:

```css
@media print {

  a {
    color: aquamarine;
  }
}
```

```css
@supports (animation-name: test) {

  a {
    color: aquamarine;
  }
}
```

```css
@keyframes test {

  100% {
    color: aquamarine;
  }
}
```

The following patterns are *not* considered violations:

```css
@media print {

  a {
    color: aquamarine;
  }

}
```

```css
@font-face {
  font-family: "MyFont";
  src: url("myfont.woff2") format("woff2");
}
```

```css
@supports (animation-name: test) {

  a {
    color: aquamarine;
  }

}
```

```css
@keyframes test {

  100% {
    color: aquamarine;
  }

}
```

For example, with `"always-multi-line"` and `except: ["after-closing-brace"]`:

The following patterns are considered violations:

```css
@media print {

  a {
    color: aquamarine;

  }

}
```

```css
@supports (animation-name: test) {

  a {
    color: aquamarine;

  }

}
```

```css
@keyframes test {

  100% {
    color: aquamarine;

  }

}
```

The following patterns are *not* considered violations:

```css
@media print {

  a {
    color: aquamarine;

  }
}
```

```css
@font-face {
  font-family: "MyFont";
  src: url("myfont.woff2") format("woff2");

}
```

```css
@supports (animation-name: test) {

  a {
    color: aquamarine;

  }
}
```

```css
@keyframes test {

  100% {
    color: aquamarine;

  }
}
```
