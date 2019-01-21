# declaration-block-no-shorthand-property-overrides

Disallow shorthand properties that override related longhand properties.

```css
a { background-repeat: repeat; background: green; }
/**                            ↑
 * This overrides the longhand property before it */
```

In almost every case, this is just an authorial oversight. For more about this behavior, see [MDN's documentation of shorthand properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties).

## Options

### `true`

The following patterns are considered violations:

```css
a {
  padding-left: 10px;
  padding: 20px;
}
```

```css
a {
  transition-property: opacity;
  transition: opacity 1s linear;
}
```

```css
a {
  -webkit-transition-property: opacity;
  -webkit-transition: opacity 1s linear;
}
```

```css
a {
  border-top-width: 1px;
  top: 0;
  bottom: 3px;
  border: 2px solid blue;
}
```

The following patterns are *not* considered violations:

```css
a { padding: 10px; padding-left: 20px; }
```

```css
a { transition-property: opacity; } a { transition: opacity 1s linear; }
```

```css
a { transition-property: opacity; -webkit-transition: opacity 1s linear; }
```
