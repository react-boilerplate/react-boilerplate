# value-list-comma-space-before

Require a single space or disallow whitespace before the commas of value lists.

```css
a { background-size: 0 ,0; }
/**                    ↑
 * The space before these commas */
```

The `--fix` option on the [command line](../../../docs/user-guide/cli.md#autofixing-errors) can automatically fix most of the problems reported by this rule.

## Options

`string`: `"always"|"never"|"always-single-line"|"never-single-line"`

### `"always"`

There *must always* be a single space before the commas.

The following patterns are considered violations:

```css
a { background-size: 0,0; }
```

```css
a { background-size: 0
      , 0; }
```

The following patterns are *not* considered violations:

```css
a { background-size: 0 ,0; }
```

```css
a { background-size: 0 ,
      0; }
```

### `"never"`

There *must never* be whitespace before the commas.

The following patterns are considered violations:

```css
a { background-size: 0 ,0; }
```

```css
a { background-size: 0 ,
      0; }
```

The following patterns are *not* considered violations:

```css
a { background-size: 0,0; }
```

```css
a { background-size: 0,
      0; }
```

### `"always-single-line"`

There *must always* be a single space before the commas in single-line value lists.

The following patterns are considered violations:

```css
a { background-size: 0,0; }
```

The following patterns are *not* considered violations:

```css
a { background-size: 0 ,0; }
```

```css
a { background-size: 0 ,
      0; }
```

```css
a { background-size: 0
      , 0; }
```

### `"never-single-line"`

There *must never* be whitespace before the commas in single-line value lists.

The following patterns are considered violations:

```css
a { background-size: 0 ,0; }
```

The following patterns are *not* considered violations:

```css
a { background-size: 0,0; }
```

```css
a { background-size: 0,
      0; }
```

```css
a { background-size: 0 ,
      0; }
```
