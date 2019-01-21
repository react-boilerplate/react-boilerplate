# property-whitelist

Specify a whitelist of allowed properties.

```css
a { display: block; }
/** ↑
 * These properties */
```

This rule ignores variables (`$sass`, `@less`, `--custom-property`).

## Options

`array|string`: `["array", "of", "unprefixed", "properties" or "regex"]|"property"|"/regex/"`

If a string is surrounded with `"/"` (e.g. `"/^background/"`), it is interpreted as a regular expression. This allows, for example, easy targeting of shorthands: `/^background/` will match `background`, `background-size`, `background-color`, etc.

Given:

```js
["display", "animation", "/^background/"]
```

The following patterns are considered violations:

```css
a { color: pink; }
```

```css
a {
  animation: my-animation 2s;
  color: pink;
}
```

```css
a { borkgrund: orange; }
```

The following patterns are *not* considered violations:

```css
a { display: block; }
```

```css
a { -webkit-animation: my-animation 2s; }
```

```css
a {
  animation: my-animation 2s;
  -webkit-animation: my-animation 2s;
  display: block;
}
```

```css
a { background: pink; }
```

```css
a { background-color: pink; }
```
