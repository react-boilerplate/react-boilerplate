# media-query-list-comma-space-before

Require a single space or disallow whitespace before the commas of media query lists.

```css
@media screen and (color) ,projection and (color) {}
/**                       ↑
 *             These commas */
```

The `--fix` option on the [command line](../../../docs/user-guide/cli.md#autofixing-errors) can automatically fix all of the problems reported by this rule.

## Options

`string`: `"always"|"never"|"always-single-line"|"never-single-line"`

### `"always"`

There *must always* be a single space before the commas.

The following patterns are considered violations:

```css
@media screen and (color),projection and (color) {}
```

```css
@media screen and (color)
,projection and (color) {}
```

The following patterns are *not* considered violations:

```css
@media screen and (color) ,projection and (color) {}
```

```css
@media screen and (color) ,
projection and (color) {}
```

### `"never"`

There *must never* be whitepace before the commas.

The following patterns are considered violations:

```css
@media screen and (color) ,projection and (color) {}
```

```css
@media screen and (color)
, projection and (color) {}
```

The following patterns are *not* considered violations:

```css
@media screen and (color),projection and (color) {}
```

```css
@media screen and (color),
projection and (color) {}
```

### `"always-single-line"`

There *must always* be a single space before the commas in single-line media query lists.

The following patterns are considered violations:

```css
@media screen and (color),projection and (color) {}
```

The following patterns are *not* considered violations:

```css
@media screen and (color) ,projection and (color) {}
```

```css
@media screen and (color)
, projection and (color) {}
```

```css
@media screen and (color)
,projection and (color) {}
```

### `"never-single-line"`

There *must never* be whitepace before the commas in single-line media query lists.

The following patterns are considered violations:

```css
@media screen and (color) , projection and (color) {}
```

The following patterns are *not* considered violations:

```css
@media screen and (color),projection and (color) {}
```

```css
@media screen and (color)
,projection and (color) {}
```

```css
@media screen and (color)
, projection and (color) {}
```
