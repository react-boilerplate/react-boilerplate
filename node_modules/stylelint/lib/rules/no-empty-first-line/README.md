# no-empty-first-line

Disallow empty first lines.

```css
    \n
    /** ↑
     * This newline */
    a { color: pink; }
```

This rule ignores empty sources. Use the [`no-empty-source`](../no-empty-source/README.md) rule to disallow these.

The `--fix` option on the [command line](../../../docs/user-guide/cli.md#autofixing-errors) can automatically fix all of the problems reported by this rule.

## Options

### `true`

The following patterns are considered violations:

```css
\n
a { color: pink; }
```

The following patterns are *not* considered violations:

```css
a { color: pink; }
```
