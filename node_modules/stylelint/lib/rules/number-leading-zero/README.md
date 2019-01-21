# number-leading-zero

Require or disallow a leading zero for fractional numbers less than 1.

```css
a { line-height: 0.5; }
/**              ↑
 * This leading zero */
```

The `--fix` option on the [command line](../../../docs/user-guide/cli.md#autofixing-errors) can automatically fix all of the problems reported by this rule.

## Options

`string`: `"always"|"never"`

### `"always"`

There *must always* be a leading zero.

The following patterns are considered violations:

```css
a { line-height: .5; }
```

```css
a { transform: translate(2px, .4px); }
```

The following patterns are *not* considered violations:

```css
a { line-height: 0.5; }
```

```css
a { transform: translate(2px, 0.4px); }
```

### `"never"`

There *must never* be a leading zero.

The following patterns are considered violations:

```css
a { line-height: 0.5; }
```

```css
a { transform: translate(2px, 0.4px); }
```

The following patterns are *not* considered violations:

```css
a { line-height: .5; }
```

```css
a { transform: translate(2px, .4px); }
```
