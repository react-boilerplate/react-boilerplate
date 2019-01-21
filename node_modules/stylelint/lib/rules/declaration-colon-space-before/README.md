# declaration-colon-space-before

Require a single space or disallow whitespace before the colon of declarations.

```css
a { color :pink }
/**       ↑
 * The space before this colon */
```

The `--fix` option on the [command line](../../../docs/user-guide/cli.md#autofixing-errors) can automatically fix all of the problems reported by this rule.

## Options

`string`: `"always"|"never"`

### `"always"`

There *must always* be a single space before the colon.

The following patterns are considered violations:

```css
a { color: pink }
```

```css
a { color:pink }
```

The following patterns are *not* considered violations:

```css
a { color : pink }
```

```css
a { color :pink }
```

### `"never"`

There *must never* be whitespace before the colon.

The following patterns are considered violations:

```css
a { color : pink }
```

```css
a { color :pink }
```

The following patterns are *not* considered violations:

```css
a { color: pink }
```

```css
a { color:pink }
```
