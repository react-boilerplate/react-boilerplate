# media-query-list-comma-newline-before

Require a newline or disallow whitespace before the commas of media query lists.

```css
    @media screen and (color)
    , projection and (color) {}
/** ↑
 * These commas */
```

## Options

`string`: `"always"|"always-multi-line"|"never-multi-line"`

### `"always"`

There *must always* be a newline before the commas.

The following patterns are considered violations:

```css
@media screen and (color), projection and (color) {}
```

```css
@media screen and (color),
projection and (color) {}
```

The following patterns are *not* considered violations:

```css
@media screen and (color)
,projection and (color) {}
```

```css
@media screen and (color)
,
projection and (color) {}
```

### `"always-multi-line"`

There *must always* be a newline before the commas in multi-line media query lists.

The following patterns are considered violations:

```css
@media screen and (color),
projection and (color) {}
```

The following patterns are *not* considered violations:

```css
@media screen and (color), projection and (color) {}
```

```css
@media screen and (color)
,projection and (color) {}
```

```css
@media screen and (color)
,
projection and (color) {}
```

### `"never-multi-line"`

There *must never* be whitespace before the commas in multi-line media query lists.

The following patterns are considered violations:

```css
@media screen and (color)
,projection and (color) {}
```

```css
@media screen and (color)
,
projection and (color) {}
```

The following patterns are *not* considered violations:

```css
@media screen and (color), projection and (color) {}
```

```css
@media screen and (color),
projection and (color) {}
```
