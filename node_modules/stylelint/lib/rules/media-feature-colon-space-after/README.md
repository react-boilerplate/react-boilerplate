# media-feature-colon-space-after

Require a single space or disallow whitespace after the colon in media features.

```css
@media (max-width: 600px) {}
/**              ↑
 * The space after this colon */
```

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
