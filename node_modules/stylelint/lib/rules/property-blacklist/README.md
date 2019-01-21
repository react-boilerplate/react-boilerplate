# property-blacklist

Specify a blacklist of disallowed properties.

```css
a { text-rendering: optimizeLegibility; }
/** ↑
 * These properties */
```

## Options

`array|string`: `["array", "of", "unprefixed", "properties" or "regex"]|"property"|"/regex/"`

If a string is surrounded with `"/"` (e.g. `"/^background/"`), it is interpreted as a regular expression. This allows, for example, easy targeting of shorthands: `/^background/` will match `background`, `background-size`, `background-color`, etc.

Given:

```js
[ "text-rendering", "animation", "/^background/" ]
```

The following patterns are considered violations:

```css
a { text-rendering: optimizeLegibility; }
```

```css
a {
  animation: my-animation 2s;
  color: pink;
}
```

```css
a { -webkit-animation: my-animation 2s; }
```

```css
a { background: pink; }
```

```css
a { background-size: cover; }
```

The following patterns are *not* considered violations:

```css
a { color: pink; }
```

```css
a { no-background: sure; }
```
