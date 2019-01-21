# media-feature-range-operator-space-after

Require a single space or disallow whitespace after the range operator in media features.

```css
@media (width >= 600px) {}
/**           ↑
 * The space after this */
```

## Options

`string`: `"always"|"never"`

### `"always"`

There *must always* be a single space after the range operator.

The following patterns are considered violations:

```css
@media (width>=600px) {}
```

```css
@media (width >=600px) {}
```

The following patterns are *not* considered violations:

```css
@media (width>= 600px) {}
```

```css
@media (width >= 600px) {}
```

### `"never"`

There *must never* be whitespace after the range operator.

The following patterns are considered violations:

```css
@media (width>= 600px) {}
```

```css
@media (width >= 600px) {}
```

The following patterns are *not* considered violations:

```css
@media (width>=600px) {}
```

```css
@media (width >=600px) {}
```
