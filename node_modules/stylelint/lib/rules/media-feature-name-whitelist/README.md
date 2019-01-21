# media-feature-name-whitelist

Specify a whitelist of allowed media feature names.

```css
@media (min-width: 700px) {}
/**     ↑
 * These media feature names */
```

This rule ignores media feature names within a range context.

## Options

`array|string|regex`: `["array", "of", "unprefixed", "media-features" or "regex"]|"media-feature"|/regex/`

Given:

```js
["max-width", "/^my-/"]
```

The following patterns are considered violations:

```css
@media (min-width: 50em) {}
```

```css
@media print and (min-resolution: 300dpi) {}
```

The following patterns are *not* considered violations:

```css
@media (max-width: 50em) {}
```

```css
@media (my-width: 50em) {}
```
