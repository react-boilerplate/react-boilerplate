# media-feature-name-blacklist

Specify a blacklist of disallowed media feature names.

```css
@media (min-width: 700px) {}
/**     ↑
 * These media feature names */
```

**Caveat:** Media feature names within a range context are currently ignored.

## Options

`array|string|regex`: `["array", "of", "unprefixed", "media-features" or "regex"]|"media-feature"|/regex/`

Given:

```js
["max-width", "/^my-/"]
```

The following patterns are considered violations:

```css
@media (max-width: 50em) {}
```

```css
@media (my-width: 50em) {}
```

The following patterns are *not* considered violations:

```css
@media (min-width: 50em) {}
```

```css
@media print and (min-resolution: 300dpi) {}
```
