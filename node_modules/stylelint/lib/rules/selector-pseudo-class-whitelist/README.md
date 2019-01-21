# selector-pseudo-class-whitelist

Specify a whitelist of allowed pseudo-class selectors.

```css
  a:hover {}
/** ↑
 * These pseudo-class selectors */
```

This rule ignores selectors that use variable interpolation e.g. `:#{$variable} {}`.

## Options

`array|string|regex`: `["array", "of", "unprefixed", "pseudo-classes" or "regex"]|"pseudo-class"|/regex/`

If a string is surrounded with `"/"` (e.g. `"/^nth-/"`), it is interpreted as a regular expression. This allows, for example, easy targeting of shorthands: `/^nth-/` will match `nth-child`, `nth-last-child`, `nth-of-type`, etc.

Given:

```js
["hover", "/^nth-/"]
```

The following patterns are considered violations:

```css
a:focus {}
```

```css
a:first-of-type {}
```

The following patterns are *not* considered violations:

```css
a:hover {}
```

```css
a:nth-of-type(5) {}
```

```css
a:nth-child(2) {}
```
