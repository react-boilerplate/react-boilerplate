# at-rule-name-newline-after

Require a newline after at-rule names.

```css
    @media
   /*↑*/  (max-width: 600px) {}
/**  ↑
 * The newline after this at-rule name */
```

This rule ignores `@import` in Less.

## Options

`string`: `"always"|"always-multi-line"`

### `"always"`

There *must always* be a newline after at-rule names.

The following patterns are considered violations:

```css
@charset "UTF-8";
```

```css
@media (min-width: 700px) and
  (orientation: landscape) {}
```

The following patterns are *not* considered violations:

```css
@charset
  "UTF-8";
```

```css
@import
  "x.css" screen and
 (orientation:landscape);
```

```css
@media
  (min-width: 700px) and (orientation: landscape) {}
```

```css
@media
  (min-width: 700px) and
  (orientation: landscape) {}
```

### `"always-multi-line"`

There *must always* be a newline after at-rule names in at-rules with multi-line parameters.

The following patterns are considered violations:

```css
@import "x.css" screen and
 (orientation:landscape);
```

```css
@media (min-width: 700px) and
 (orientation: landscape) {}
```

The following patterns are *not* considered violations:

```css
@charset "UTF-8";
```

```css
@charset
  "UTF-8";
```

```css
@import "x.css" screen and (orientation:landscape);
```

```css
@media (min-width: 700px) and (orientation: landscape) {}
```

```css
@media
  (min-width: 700px) and
  (orientation: landscape) {}
```
