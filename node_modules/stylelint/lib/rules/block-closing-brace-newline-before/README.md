# block-closing-brace-newline-before

Require a newline or disallow whitespace before the closing brace of blocks.

```css
    a { color: pink;
    }
/** ↑
 * The newline before this brace */
```

## Options

`string`: `"always"|"always-multi-line"|"never-multi-line"`

### `"always"`

There *must always* be a newline before the closing brace.

The following patterns are considered violations:

```css
a { color: pink;}
```

The following patterns are *not* considered violations:

```css
a { color: pink;
}
```

```css
a {
color: pink;
}
```

### `"always-multi-line"`

There *must always* be a newline before the closing brace in multi-line blocks.

The following patterns are considered violations:

```css
a {
color: pink;}
```

The following patterns are *not* considered violations:

```css
a { color: pink; }
```

```css
a { color: pink;
}
```

### `"never-multi-line"`

There *must never* be whitespace before the closing brace in multi-line blocks.

The following patterns are considered violations:

```css
a {
color: pink; }
```

The following patterns are *not* considered violations:

```css
a { color: pink; }
```

```css
a {
color: pink;}
```
