# declaration-colon-newline-after

Require a newline or disallow whitespace after the colon of declarations.

```css
a {
  box-shadow:
    0 0 0 1px #5b9dd9,
    0 0 2px 1px rgba(30, 140, 190, 0.8);
}        /* ↑ */
/**         ↑
 * The newline after this colon */
```

The `--fix` option on the [command line](../../../docs/user-guide/cli.md#autofixing-errors) can automatically fix all of the problems reported by this rule.

## Options

`string`: `"always"|"always-multi-line"`

### `"always"`

There *must always* be a newline after the colon.

The following patterns are considered violations:

```css
a { color:pink; }
```

```css
a { color: pink; }
```

The following patterns are *not* considered violations:

```css
a {
  color:
    pink;
}
```

### `"always-multi-line"`

There *must always* be a newline after the colon *if the declaration's value is multi-line*.

The following patterns are considered violations:

```css
a {
  box-shadow: 0 0 0 1px #5b9dd9,
    0 0 2px 1px rgba(30, 140, 190, 0.8);
}
```

The following patterns are *not* considered violations:

```css
a {
  box-shadow:
    0 0 0 1px #5b9dd9,
    0 0 2px 1px rgba(30, 140, 190, 0.8);
}
```

```css
a {
  color: pink;
}
```
