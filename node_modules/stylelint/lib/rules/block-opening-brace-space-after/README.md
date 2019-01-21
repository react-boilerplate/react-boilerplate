# block-opening-brace-space-after

Require a single space or disallow whitespace after the opening brace of blocks.

```css
  a { color: pink; }
/** ↑
 * The space after this brace */
```

## Options

`string`: `"always"|"never"|"always-single-line"|"never-single-line"|"always-multi-line"|"never-multi-line"`

### `"always"`

There *must always* be a single space after the opening brace.

The following patterns are considered violations:

```css
a {color: pink; }
```

```css
a {
color: pink; }
```

The following patterns are *not* considered violations:

```css
a { color: pink; }
```

```css
a { color: pink;
}
```

### `"never"`

There *must never* be whitespace after the opening brace.

The following patterns are considered violations:

```css
a { color: pink; }
```

```css
a {
color: pink; }
```

The following patterns are *not* considered violations:

```css
a {color: pink; }
```

```css
a
{color: pink; }
```

### `"always-single-line"`

There *must always* be a single space after the opening brace in single-line blocks.

The following patterns are considered violations:

```css
a {color: pink; }
```

The following patterns are *not* considered violations:

```css
a { color: pink; }
```

```css
a {color: pink;
}
```

### `"never-single-line"`

There *must never* be whitespace after the opening brace in single-line blocks.

The following patterns are considered violations:

```css
a { color: pink; }
```

The following patterns are *not* considered violations:

```css
a {color: pink; }
```

```css
a { color: pink;
}
```

### `"always-multi-line"`

There *must always* be a single space after the opening brace in multi-line blocks.

The following patterns are considered violations:

```css
a {color: pink;
}
```

The following patterns are *not* considered violations:

```css
a {color: pink; }
```

```css
a { color: pink;
}
```

### `"never-multi-line"`

There *must never* be whitespace after the opening brace in multi-line blocks.

The following patterns are considered violations:

```css
a { color: pink;
}
```

The following patterns are *not* considered violations:

```css
a { color: pink; }
```

```css
a {color: pink;
}
```
