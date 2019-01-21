# no-missing-end-of-source-newline

Disallow missing end-of-source newlines.

```css
    a { color: pink; }
    \n
/** ↑
 * This newline */
```

Completely empty files are not considered violations.

The `--fix` option on the command line can automatically fix all of the problems reported by this rule.

## Options

### `true`

The following patterns are considered violations:

```css
a { color: pink; }
```

The following patterns are *not* considered violations:

```css
a { color: pink; }
\n
```
