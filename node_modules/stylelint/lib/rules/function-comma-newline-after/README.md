# function-comma-newline-after

Require a newline or disallow whitespace after the commas of functions.

```css
a { transform: translate(1,
  1) }                 /* ↑ */
/**                       ↑
 *             These commas */
```

## Options

`string`: `"always"|"always-multi-line"|"never-multi-line"`

### `"always"`

There *must always* be a newline after the commas.

The following patterns are considered violations:

```css
a { transform: translate(1,1) }
```

```css
a { transform: translate(1 ,1) }
```

```css
a { transform: translate(1
  ,1) }
```

The following patterns are *not* considered violations:

```css
a {
  transform: translate(1,
    1)
}
```

### `"always-multi-line"`

There *must always* be a newline after the commas in multi-line functions.

The following patterns are considered violations:

```css
a { transform: translate(1
  ,1) }
```

The following patterns are *not* considered violations:

```css
a { transform: translate(1,1) }
```

```css
a { transform: translate(1 ,1) }
```

```css
a {
  transform: translate(1,
    1)
}
```

### `"never-multi-line"`

There *must never* be a whitespace after the commas in multi-line functions.

The following patterns are considered violations:

```css
a { transform: translate(1
  , 1) }
```

The following patterns are *not* considered violations:

```css
a { transform: translate(1, 1) }
```

```css
a { transform: translate(1 , 1) }
```

```css
a {
  transform: translate(1
    ,1)
}
```
