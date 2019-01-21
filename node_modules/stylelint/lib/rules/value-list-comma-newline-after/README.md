# value-list-comma-newline-after

Require a newline or disallow whitespace after the commas of value lists.

```css
a { background-size: 0,
      0; }            ↑
/**                   ↑
 * The newline after these commas */
```

The `--fix` option on the [command line](../../../docs/user-guide/cli.md#autofixing-errors) can automatically fix most of the problems reported by this rule.

## Options

`string`: `"always"|"always-multi-line"|"never-multi-line"`

### `"always"`

There *must always* be a newline after the commas.

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
a { background-size: 0,
      0; }
```

### `"always-multi-line"`

There *must always* be a newline after the commas in multi-line value lists.

The following patterns are considered violations:

```css
a { background-size: 0
    , 0; }
```

The following patterns are *not* considered violations:

```css
a { background-size: 0, 0; }
```

```css
a { background-size: 0,0; }
```

```css
a { background-size: 0,
      0; }
```

### `"never-multi-line"`

There *must never* be whitespace after the commas in multi-line value lists.

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
a { background-size: 0
      ,0; }
```
