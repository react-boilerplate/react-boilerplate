# at-rule-name-space-after

Require a single space after at-rule names.

```css
@media (max-width: 600px) {}
/**   ↑
 * The space after at-rule names */
```

This rule ignores `@import` in Less.

The `--fix` option on the [command line](../../../docs/user-guide/cli.md#autofixing-errors) can automatically fix all of the problems reported by this rule.

## Options

`string`: `"always"|"always-single-line"`

### `"always"`

There *must always* be a single space after at-rule names.

The following patterns are considered violations:

```css
@charset"UTF-8";
```

```css
@media(min-width: 700px) {}
```

```css
@media  (min-width: 700px) {}
```

```css
@media
(min-width: 700px) {}
```

The following patterns are *not* considered violations:

```css
@charset "UTF-8";
```

```css
@import url("x.css");
```

```css
@media (min-width: 700px) {}
```

### `"always-single-line"`

There *must always* be a single space after at-rule names in single-line declaration blocks.

The following patterns are considered violations:

```css
@charset"UTF-8";
```

```css
@media(min-width: 700px) {}
```

```css
@media  (min-width: 700px) {}
```

The following patterns are *not* considered violations:

```css
@charset "UTF-8";
```

```css
@import url("x.css");
```

```css
@media (min-width: 700px) {}
```

```css
@media
(min-width: 700px) {}
```

```css
@media(min-width: 700px) and
  (orientation: portrait) {}
```

```css
@media
  (min-width: 700px) and
  (orientation: portrait) {}
```
