# unit-whitelist

Specify a whitelist of allowed units.

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
a { width: 100%; }
```

```css
a { font-size: 10rem; }
```

```css
a { animation: animation-name 5s ease; }
```

The following patterns are *not* considered violations:

```css
a { font-size: 1.2em; }
```

```css
a { line-height: 1.2; }
```

```css
a { height: 100px; }
```

```css
a { height: 100PX; }
```

```css
a { transform: rotate(30deg); }
```

## Optional secondary options

### `ignoreProperties: { unit: ["property", "/regex/"] }`

Ignore units in the values of declarations with the specified properties.

For example, with `["px", "em"]`.

Given:

```js
{
  "rem": [ "line-height", "/^border/" ],
  "%": [ "width" ]  
}
```

The following patterns are *not* considered violations:

```css
a { line-height: 0.1rem; }
```

```css
a { border-bottom-width: 6rem; }
```

```css
a { width: 100%; }
```

The following patterns are considered violations:

```css
a { margin: 0 20rem; }
```

```css
a { -moz-border-radius-topright: 20rem; }
```

```css
a { height: 100%; }
```
