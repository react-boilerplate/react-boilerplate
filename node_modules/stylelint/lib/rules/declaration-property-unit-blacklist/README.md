# declaration-property-unit-blacklist

Specify a blacklist of disallowed property and unit pairs within declarations.

```css
a { width: 100px; }
/** ↑         ↑
 * These properties and these units */
```

## Options

`object`: `{
  "unprefixed-property-name": ["array", "of", "units"]
}`

If a property name is surrounded with `"/"` (e.g. `"/^animation/"`), it is interpreted as a regular expression. This allows, for example, easy targeting of shorthands: `/^animation/` will match `animation`, `animation-duration`, `animation-timing-function`, etc.

Given:

```js
{
  "font-size": ["em", "px"],
  "/^animation/": ["s"]
}
```

The following patterns are considered violations:

```css
a { font-size: 1em; }
```

```css
a { animation: animation-name 5s ease; }
```

```css
a { -webkit-animation: animation-name 5s ease; }
```

```css
a { animation-duration: 5s; }
```

The following patterns are *not* considered violations:

```css
a { font-size: 1.2rem; }
```

```css
a { height: 100px; }
```

```css
a { animation: animation-name 500ms ease; }
```

```css
a { -webkit-animation: animation-name 500ms ease; }
```

```css
a { animation-duration: 500ms; }
```
