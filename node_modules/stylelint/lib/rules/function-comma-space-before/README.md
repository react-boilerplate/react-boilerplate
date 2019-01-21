# function-comma-space-before

Require a single space or disallow whitespace before the commas of functions.

```css
a { transform: translate(1 ,1) }
/**                        ↑
 * The space before these commas */
```

## Options

`string`: `"always"|"never"|"always-single-line"|"never-single-line"`

### `"always"`

There *must always* be a single space before the commas.

The following patterns are considered violations:

```css
a { transform: translate(1,1) }
```

```css
a { transform: translate(1, 1) }
```

The following patterns are *not* considered violations:

```css
a { transform: translate(1 ,1) }
```

```css
a { transform: translate(1 , 1) }
```

### `"never"`

There *must never* be whitespace before the commas.

The following patterns are considered violations:

```css
a { transform: translate(1 ,1) }
```

```css
a { transform: translate(1 , 1) }
```

The following patterns are *not* considered violations:

```css
a { transform: translate(1,1) }
```

```css
a { transform: translate(1, 1) }
```

### `"always-single-line"`

There *must always* be a single space before the commas in single-line functions.

The following patterns are considered violations:

```css
a { transform: translate(1,1) }
```

```css
a { transform: translate(1, 1) }
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

### `"never-single-line"`

There *must never* be whitepace before the commas in single-line functions.

The following patterns are considered violations:

```css
a { transform: translate(1 ,1) }
```

```css
a { transform: translate(1 , 1) }
```

The following patterns are *not* considered violations:

```css
a { transform: translate(1,1) }
```

```css
a { transform: translate(1, 1) }
```

```css
a {
  transform: translate(1 ,
    1)
}
```
