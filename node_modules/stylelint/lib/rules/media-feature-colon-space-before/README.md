# media-feature-colon-space-before

Require a single space or disallow whitespace before the colon in media features.

```css
@media (max-width :600px) {}
/**               ↑
 * The space before this colon */
```

## Options

`string`: `"always"|"never"`

### `"always"`

There *must always* be a single space before the colon.

The following patterns are considered violations:

```css
@media (max-width:600px) {}
```

```css
@media (max-width: 600px) {}
```

The following patterns are *not* considered violations:

```css
@media (max-width :600px) {}
```

```css
@media (max-width : 600px) {}
```

### `"never"`

There *must never* be whitespace before the colon.

The following patterns are considered violations:

```css
@media (max-width :600px) {}
```

```css
@media (max-width : 600px) {}
```

The following patterns are *not* considered violations:

```css
@media (max-width:600px) {}
```

```css
@media (max-width: 600px) {}
```
