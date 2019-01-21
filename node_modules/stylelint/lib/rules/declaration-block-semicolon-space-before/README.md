# declaration-block-semicolon-space-before

Require a single space or disallow whitespace before the semicolons of declaration blocks.

```css
a { color: pink; }
/**            ↑
 * The space before this semicolon */
```

This rule ignores semicolons that are preceded by Less mixins.

## Options

`string`: `"always"|"never"|"always-single-line"|"never-single-line"`

### `"always"`

There *must always* be a single space before the semicolons.

The following patterns are considered violations:

```css
a { color: pink; }
```

```css
a { color: pink; top: 0; }
```

The following patterns are *not* considered violations:

```css
a { color: pink ; }
```

```css
a { color: pink ; top: 0 ; }
```

### `"never"`

There *must never* be whitespace before the semicolons.

The following patterns are considered violations:

```css
a { color: pink ; }
```

```css
a { color: pink ; top: 0 ; }
```

The following patterns are *not* considered violations:

```css
a { color: pink; }
```

```css
a { color: pink; top: 0; }
```

### `"always-single-line"`

There *must always* be a single space before the semicolons in single-line declaration blocks.

The following patterns are considered violations:

```css
a { color: pink; }
```

The following patterns are *not* considered violations:

```css
a { color: pink ; }
```

```css
a { color: pink; top: 0; }
```

```css
a { color: pink ; top: 0 ; }
```

### `"never-single-line"`

There *must never* be whitespace before the semicolons in single-line declaration blocks.

The following patterns are considered violations:

```css
a { color: pink ; }
```

The following patterns are *not* considered violations:

```css
a { color: pink; }
```

```css
a { color: pink; top: 0; }
```

```css
a { color: pink ; top: 0 ; }
```
