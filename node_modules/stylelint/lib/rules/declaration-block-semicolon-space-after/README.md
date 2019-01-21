# declaration-block-semicolon-space-after

Require a single space or disallow whitespace after the semicolons of declaration blocks.

```css
a { color: pink; top: 0; }
/**            ↑
 * The space after this semicolon */
```

This rule ignores:

-   semicolons that are preceded by Less mixins
-   the last semicolon of declaration blocks

Use the `block-closing-brace-*-before` rules to control the whitespace between the last semicolon and the closing brace instead.

## Options

`string`: `"always"|"never"|"always-single-line"|"never-single-line"`

### `"always"`

There *must always* be a single space after the semicolon.

The following patterns are considered violations:

```css
a { color: pink;top: 0; }
```

```css
a {
  color: pink;
  top: 0;
}
```

The following patterns are *not* considered violations:

```css
a { color: pink;}
```

```css
a { color: pink; }
```

```css
a { color: pink; top: 0; }
```

### `"never"`

There *must never* be whitespace after the semicolon.

The following patterns are considered violations:

```css
a { color: pink; top: 0; }
```

```css
a {
  color: pink;
  top: 0;
}
```

The following patterns are *not* considered violations:

```css
a { color: pink;}
```

```css
a { color: pink; }
```

```css
a { color: pink;top: 0; }
```

### `"always-single-line"`

There *must always* be a single space after the semicolon in single-line declaration blocks.

The following patterns are considered violations:

```css
a { color: pink;top: 0; }
```

The following patterns are *not* considered violations:

```css
a { color: pink; top: 0; }
```

```css
a {
  color: pink;
  top: 0;
}
```

### `"never-single-line"`

There *must never* be whitespace after the semicolon in single-line declaration blocks.

The following patterns are considered violations:

```css
a { color: pink; top: 0; }
```

The following patterns are *not* considered violations:

```css
a { color: pink;top: 0; }
```

```css
a {
  color: pink;
  top: 0;
}
```
