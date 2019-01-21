# value-list-comma-newline-before

Require a newline or disallow whitespace before the commas of value lists.

```css
  a { background-size: 0
    , 0; }
/** ↑
 * The newline before these commas */
```

## Options

`string`: `"always"|"always-multi-line"|"never-multi-line"`

### `"always"`

There *must always* be a newline before the commas.

The following patterns are considered violations:

```css
a { background-size: 0,0; }
```

```css
a { background-size: 0,
      0; }
```

The following patterns are *not* considered violations:

```css
a { background-size: 0
      , 0; }
```

### `"always-multi-line"`

There *must always* be a newline before the commas in multi-line value lists.

The following patterns are considered violations:

```css
a { background-size: 0,
      0; }
```

The following patterns are *not* considered violations:

```css
a { background-size: 0, 0; }
```

```css
a { background-size: 0,0; }
```

```css
a { background-size: 0
      , 0; }
```

### `"never-multi-line"`

There *must never* be whitespace before the commas in multi-line value lists.

The following patterns are considered violations:

```css
a { background-size: 0
      , 0; }
```

The following patterns are *not* considered violations:

```css
a { background-size: 0,0; }
```

```css
a { background-size: 0, 0; }
```

```css
a { background-size: 0,
      0; }
```
