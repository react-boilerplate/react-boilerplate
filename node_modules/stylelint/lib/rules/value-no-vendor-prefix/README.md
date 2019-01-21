# value-no-vendor-prefix

Disallow vendor prefixes for values.

```css
a { display: -webkit-flex; }
/**          ↑
 *  These prefixes */
```

This rule will only complain for prefixed *standard* values, and not for prefixed *proprietary* or *unknown* ones.

## Options

### `true`

The following patterns are considered violations:

```css
a { display: -webkit-flex; }
```

```css
a { max-width: -moz-max-content; }
```

```css
a { background: -webkit-linear-gradient(bottom, #000, #fff); }
```

The following patterns are *not* considered violations:

```css
a { display: flex; }
```

```css
a { max-width: max-content; }
```

```css
a { background: linear-gradient(bottom, #000, #fff); }
```

## Optional secondary options

### `ignoreValues: ["string"]`

Given:

```js
["grab", "max-content"]
```

The following patterns are *not* considered violations:

```css
cursor: -webkit-grab;
```

```css
.foo { max-width: -moz-max-content; }
```
