# no-eol-whitespace

Disallow end-of-line whitespace.

```css
a { color: pink; }···
/**               ↑
 *  This whitespace */
```

The `--fix` option on the [command line](../../../docs/user-guide/cli.md#autofixing-errors) can automatically fix most of the problems reported by this rule.

## Options

### `true`

The following patterns are considered violations:

```css
a { color: pink; }·
```

```css
a { color: pink; }····
```

Comment strings are also checked -- so the following is a violation:

```css
/* something····
 * something else */
```

The following patterns are *not* considered violations:

```css
a { color: pink; }
```

```css
/* something
 * something else */
```

## Optional secondary options

### `ignore: ["empty-lines"]`

#### `"empty-lines"`

Allow end-of-line whitespace for lines that are only whitespace, "empty" lines.

The following patterns are *not* considered violations:

```css
a {
  color: pink;
··
  background: orange;
}
```

```css
····
```

```css
a { color: pink; }
····
```
