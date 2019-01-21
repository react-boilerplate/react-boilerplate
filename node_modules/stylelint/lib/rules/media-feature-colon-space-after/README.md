# media-feature-colon-space-after

Require a single space or disallow whitespace after the colon in media features.

```css
@media (max-width: 600px) {}
/**              ↑
 * The space after this colon */
```

The `--fix` option on the [command line](../../../docs/user-guide/cli.md#autofixing-errors) can automatically fix all of the problems reported by this rule.

## Options

`string`: `"always"|"never"`

### `"always"`

There *must always* be a single space after the colon.

The following patterns are considered violations:

```css
@media (max-width:600px) {}
```

```css
@media (max-width :600px) {}
```

The following patterns are *not* considered violations:

```css
@media (max-width: 600px) {}
```

```css
@media (max-width : 600px) {}
```

### `"never"`

There *must never* be whitespace after the colon.

The following patterns are considered violations:

```css
@media (max-width: 600px) {}
```

```css
@media (max-width : 600px) {}
```

The following patterns are *not* considered violations:

```css
@media (max-width:600px) {}
```

```css
@media (max-width :600px) {}
```
