# declaration-block-trailing-semicolon

Require or disallow a trailing semicolon within declaration blocks.

```css
a { background: orange; color: pink; }
/**                                ↑
 *                    This semicolon */
```

The trailing semicolon is the *last* semicolon in a declaration block and it is optional.

This rule ignores:

-   Less mixins
-   trailing `//` comments
-   declaration blocks containing nested (at-)rules

The `--fix` option on the [command line](../../../docs/user-guide/cli.md#autofixing-errors) can automatically fix all of the problems reported by this rule.

## Options

`string`: `"always"|"never"`

### `"always"`

There *must always* be a trailing semicolon.

The following patterns are considered violations:

```css
a { color: pink }
```

```css
a { background: orange; color: pink }
```

```css
a { @include foo }
```

The following patterns are *not* considered violations:

```css
a { color: pink; }
```

```css
a { background: orange; color: pink; }
```

```css
a { @include foo; }
```

### `"never"`

There *must never* be a trailing semicolon.

The following patterns are considered violations:

```css
a { color: pink; }
```

```css
a { background: orange; color: pink; }
```

The following patterns are *not* considered violations:

```css
a { color: pink }
```

```css
a { background: orange; color: pink }
```
