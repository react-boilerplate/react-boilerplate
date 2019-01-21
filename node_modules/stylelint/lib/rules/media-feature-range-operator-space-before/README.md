# media-feature-range-operator-space-before

Require a single space or disallow whitespace before the range operator in media features.

```css
@media (width >= 600px) {}
/**           ↑
 * The space before this */
```

## Options

`string`: `"always"|"never"`

### `"always"`

There *must always* be a single space before the range operator.

The following patterns are considered violations:

```css
@media (width>=600px) {}
```

```css
@media (width>= 600px) {}
```

The following patterns are *not* considered violations:

```css
@media (width >=600px) {}
```

```css
@media (width >= 600px) {}
```

### `"never"`

There *must never* be whitespace before the range operator.

The following patterns are considered violations:

```css
@media (width >=600px) {}
```

```css
@media (width >= 600px) {}
```

The following patterns are *not* considered violations:

```css
@media (width>=600px) {}
```

```css
@media (width>= 600px) {}
```
