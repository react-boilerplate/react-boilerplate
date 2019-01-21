# declaration-property-value-whitelist

Specify a whitelist of allowed property and value pairs within declarations.

```css
a { text-transform: uppercase; }
/** ↑               ↑
 * These properties and these values */
```

## Options

`object`: `{
  "unprefixed-property-name": ["array", "of", "values"],
  "unprefixed-property-name": ["/regex/", "non-regex"]
}`

If a property name is found in the object, only its whitelisted property values are allowed. This rule complains about all non-matching values. (If the property name is not included in the object, anything goes.)

If a property name is surrounded with `"/"` (e.g. `"/^animation/"`), it is interpreted as a regular expression. This allows, for example, easy targeting of shorthands: `/^animation/` will match `animation`, `animation-duration`, `animation-timing-function`, etc.

The same goes for values. Keep in mind that a regular expression value is matched against the entire value of the declaration, not specific parts of it. For example, a value like `"10px solid rgba( 255 , 0 , 0 , 0.5 )"` will *not* match `"/^solid/"` (notice beginning of the line boundary) but *will* match `"/\\s+solid\\s+/"` or `"/\\bsolid\\b/"`.

Be careful with regex matching not to accidentally consider quoted string values and `url()` arguments. For example, `"/red/"` will match value such as `"1px dotted red"` as well as `"\"foo\""` and `"white url(/mysite.com/red.png)"`.

Given:

```js
{
  "transform": ["/scale/"],
  "whitespace": ["nowrap"],
  "/color/": ["/^green/"]
}
```

The following patterns are considered violations:

```css
a { whitespace: pre; }
```

```css
a { transform: translate(1, 1); }
```

```css
a { -webkit-transform: translate(1, 1); }
```

```css
a { color: pink; }
```

```css
a { background-color: pink; }
```

The following patterns are *not* considered violations:

```css
a { color: pink; }
```

```css
a { whitespace: nowrap; }
```

```css
a { transform: scale(1, 1); }
```

```css
a { -webkit-transform: scale(1, 1); }
```

```css
a { color: green; }
```

```css
a { background-color: green; }
```

```css
a { background: pink; }
```
