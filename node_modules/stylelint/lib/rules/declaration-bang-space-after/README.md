# declaration-bang-space-after

Require a single space or disallow whitespace after the bang of declarations.

```css
a { color: pink !important; }
/**             ↑
 * The space after this exclamation mark */
```

The `--fix` option on the [command line](../../../docs/user-guide/cli.md#autofixing-errors) can automatically fix all of the problems reported by this rule.

## Options

`string`: `"always"|"never"`

### `"always"`

There *must always* be a single space after the bang.

The following patterns are considered violations:

```css
a { color: pink !important; }
```

```css
a { color: pink      !important; }
```

The following patterns are *not* considered violations:

```css
a { color: pink ! important; }
```

```css
a { color: pink! important; }
```

### `"never"`

There *must never* be whitespace after the bang.

The following patterns are considered violations:

```css
a { color: pink ! important; }
```

```css
a { color: pink! important; }
```

The following patterns are *not* considered violations:

```css
a { color: pink !important; }
```

```css
a { color:pink!important; }
```
