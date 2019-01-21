# function-comma-newline-before

Require a newline or disallow whitespace before the commas of functions.

```css
  a { transform: translate(1
    , 1) }
/** ↑
 * These commas */
```

## Options

`string`: `"always"|"always-multi-line"|"never-multi-line"`

### `"always"`

There *must always* be a newline before the commas.

The following patterns are considered violations:

```css
a { transform: translate(1,1) }
```

```css
a { transform: translate(1 ,1) }
```

```css
a { transform: translate(1,
  1) }
```

The following patterns are *not* considered violations:

```css
a {
  transform: translate(1
    ,1)
}
```

```css
a {
  transform: translate(1
    , 1)
}
```

### `"always-multi-line"`

There *must always* be a newline before the commas in multi-line functions.

The following patterns are considered violations:

```css
a { transform: translate(1,
  1) }
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
  transform: translate(1
    ,1)
}
```

```css
a {
  transform: translate(1
    , 1)
}
```

### `"never-multi-line"`

There *must never* be a whitespace before the commas in multi-line functions.

The following patterns are considered violations:

```css
a { transform: translate(1 ,
  1) }
```

The following patterns are *not* considered violations:

```css
a { transform: translate(1 ,1) }
```

```css
a { transform: translate(1 , 1) }
```

```css
a {
  transform: translate(1,
    1)
}
```
