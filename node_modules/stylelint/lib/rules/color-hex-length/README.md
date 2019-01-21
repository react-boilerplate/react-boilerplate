# color-hex-length

Specify short or long notation for hex colors.

```css
a { color: #fff }
/**        ↑
 * These hex colors */
```

The `--fix` option on the [command line](../../../docs/user-guide/cli.md#autofixing-errors) can automatically fix all of the problems reported by this rule.

## Options

`string`: `"short"|"long"`

### `"short"`

The following patterns are considered violations:

```css
a { color: #ffffff; }
```

```css
a { color: #ffffffaa; }
```

The following patterns are *not* considered violations:

```css
a { color: #fff; }
```

```css
a { color: #fffa; }
```

```css
a { color: #a4a4a4; }
```

### `"long"`

The following patterns are considered violations:

```css
a { color: #fff; }
```

```css
a { color: #fffa; }
```

The following patterns are *not* considered violations:

```css
a { color: #ffffff; }
```

```css
a { color: #ffffffaa; }
```
