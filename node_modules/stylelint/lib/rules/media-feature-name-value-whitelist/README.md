# media-feature-name-value-whitelist

Specify a whitelist of allowed media feature name and value pairs.

```css
@media screen and (min-width: 768px) {}
/**                ↑          ↑
 *    These features and values */
```

This rule ignores media features within range and boolean context.

## Options

```json
{
  "unprefixed-media-feature-name": ["array", "of", "values"],
  "/unprefixed-media-feature-name/": ["/regex/", "non-regex"]
}
```

If a media feature name is found in the object, only its whitelisted values are
allowed. If the media feature name is not included in the object, anything goes.

If a name or value is surrounded with `/` (e.g. `"/width$/"`), it is interpreted
as a regular expression. For example, `/width$/` will match `max-width` and
`min-width`.

Given:

```json
{
  "min-width": ["768px", "1024px"],
  "/resolution/": ["/dpcm$/"]
}
```

The following pattern are considered violations:

```css
@media screen and (min-width: 1000px) {}
```

```css
@media screen and (min-resolution: 2dpi) {}
```

The following patterns are *not* considered violations:

```css
@media screen and (min-width: 768px) {}
```

```css
@media screen and (min-width: 1024px) {}
```

```css
@media screen and (orientation: portrait) {}
```

```css
@media screen and (min-resolution: 2dpcm) {}
```

```css
@media screen and (resolution: 10dpcm) {}
```
