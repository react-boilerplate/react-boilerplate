# media-feature-name-no-unknown

Disallow unknown media feature names.

```css
@media (min-width: 700px) {}
/**     ↑
 * These media feature names */
```

This rule considers media feature names defined in the CSS Specifications, up to and including Editor's Drafts, to be known.

This rule ignores:

-   media feature names within a range context
-   vendor-prefixed media feature names

## Options

### `true`

The following patterns are considered violations:

```css
@media screen and (unknown) {}
```

```css
@media screen and (unknown: 10px) {}
```

The following patterns are *not* considered violations:

```css
@media all and (monochrome) {}
```

```css
@media (min-width: 700px) {}
```

```css
@media (MIN-WIDTH: 700px) {}
```

```css
@media (min-width: 700px) and (orientation: landscape) {}
```

```css
@media (-webkit-min-device-pixel-ratio: 2) {}
```

## Optional secondary options

### `ignoreMediaFeatureNames: ["/regex/", "string"]`

Given:

```js
["/^my-/", "custom"]
```

The following patterns are *not* considered violations:

```css
@media screen and (my-media-feature-name) {}
```

```css
@media screen and (custom: 10px) {}
```

```css
@media (min-width: 700px) and (custom: 10px) {}
```
