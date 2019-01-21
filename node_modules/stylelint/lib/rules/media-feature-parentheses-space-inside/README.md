# media-feature-parentheses-space-inside

Require a single space or disallow whitespace on the inside of the parentheses within media features.

```css
@media ( max-width: 300px ) {}
/**    ↑                  ↑
 * The space inside these two parentheses */
```

## Options

`string`: `"always"|"never"`

### `"always"`

There *must always* be a single space inside the parentheses.

The following patterns are considered violations:

```css
@media (max-width: 300px) {}
```

```css
@media (max-width: 300px ) {}
```

The following patterns are *not* considered violations:

```css
@media ( max-width: 300px ) {}
```

### `"never"`

There *must never* be whitespace on the inside the parentheses.

The following patterns are considered violations:

```css
@media ( max-width: 300px ) {}
```

```css
@media ( max-width: 300px) {}
```

The following patterns are *not* considered violations:

```css
@media (max-width: 300px) {}
```
