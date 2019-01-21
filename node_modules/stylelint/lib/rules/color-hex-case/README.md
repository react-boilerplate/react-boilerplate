# color-hex-case

Specify lowercase or uppercase for hex colors.

```css
a { color: #fff }
/**        ↑
 * These hex colors */
```

The `--fix` option on the [command line](../../../docs/user-guide/cli.md#autofixing-errors) can automatically fix all of the problems reported by this rule.

## Options

`string`: `"lower"|"upper"`

### `"lower"`

The following patterns are considered violations:

```css
a { color: #FFF; }
```

The following patterns are *not* considered violations:

```css
a { color: #000; }
```

```css
a { color: #fff; }
```

### `"upper"`

The following patterns are considered violations:

```css
a { color: #fff; }
```

The following patterns are *not* considered violations:

```css
a { color: #000; }
```

```css
a { color: #FFF; }
```
