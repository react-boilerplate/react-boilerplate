# block-opening-brace-newline-after

Require a newline after the opening brace of blocks.

```css
  a {
    ↑ color: pink; }
/** ↑
 * The newline after this brace */
```

This rule allows an end-of-line comment followed by a newline. For example,

```css
a { /* end-of-line comment */
  color: pink;
}
```

Refer to [the FAQ](../../../docs/user-guide/faq.md#how-do-i-disallow-single-line-blocks) for more information on using this rule with [`block-opening-brace-newline-before`](../block-opening-brace-newline-before/README.md) to disallow single-line rules.

## Options

`string`: `"always"|"always-multi-line"|"never-multi-line"`

### `"always"`

There *must always* be a newline after the opening brace.

The following patterns are considered violations:

```css
a{ color: pink; }
```

```css
a{ color: pink;
}
```

```css
a{ /* end-of-line comment
  with a newline */
  color: pink;
}
```

The following patterns are *not* considered violations:

```css
a {
color: pink; }
```

```css
a
{
color: pink; }
```

```css
a { /* end-of-line comment */
  color: pink;
}
```

### `"always-multi-line"`

There *must always* be a newline after the opening brace in multi-line blocks.

The following patterns are considered violations:

```css
a{color: pink;
}
```

The following patterns are *not* considered violations:

```css
a { color: pink; }
```

```css
a {
color: pink; }
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
