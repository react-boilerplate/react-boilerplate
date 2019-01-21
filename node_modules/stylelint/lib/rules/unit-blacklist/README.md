# unit-blacklist

Specify a blacklist of disallowed units.

```css
a { width: 100px; }
/**           ↑
 *  These units */
```

## Options

`array|string`: `["array", "of", "units"]|"unit"`

Given:

```js
["px", "em", "deg"]
```

The following patterns are considered violations:

```css
a { width: 100px; }
```

```css
a { font-size: 10em; }
```

```css
a { transform: rotate(30deg); }
```

The following patterns are *not* considered violations:

```css
a { font-size: 1.2rem; }
```

```css
a { line-height: 1.2; }
```

```css
a { height: 100vmin; }
```

```css
a { animation: animation-name 5s ease; }
```

## Optional secondary options

### `ignoreProperties: { unit: ["property", "/regex/"] }`

Ignore units in the values of declarations with the specified properties.

For example, with `["px", "vmin"]`.

Given:

```js
{
  "px": [ "font-size", "/^border/" ],
  "vmin": [ "width" ]  
}
```

The following patterns are *not* considered violations:

```css
a { font-size: 13px; }
```

```css
a { border-bottom-width: 6px; }
```

```css
a { width: 100vmin; }
```

The following patterns are considered violations:

```css
a { line-height: 12px; }
```

```css
a { -moz-border-radius-topright: 40px; }
```

```css
a { height: 100vmin; }
```

### `ignoreMediaFeatureNames: { unit: ["property", "/regex/"] }`

Ignore units for specific feature names.

For example, with `["px", "dpi"]`.

Given:

```js
{
  "px": [ "min-width", "/height$/" ],
  "dpi": [ "resolution" ]  
}
```

The following patterns are *not* considered violations:

```css
@media (min-width: 960px) {}
```

```css
@media (max-height: 280px) {}
```

```css
@media not (resolution: 300dpi) {}
```

The following patterns are considered violations:

```css
@media screen and (max-device-width: 500px) {}
```

```css
@media all and (min-width: 500px) and (max-width: 200px) {}
```

```css
@media print and (max-resolution: 100dpi) {}
```
