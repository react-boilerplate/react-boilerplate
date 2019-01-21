# declaration-block-no-duplicate-properties

Disallow duplicate properties within declaration blocks.

```css
a { color: pink; color: orange; }
/** ↑            ↑
 * These duplicated properties */
```

This rule ignores variables (`$sass`, `@less`, `--custom-property`).

## Options

### `true`

The following patterns are considered violations:

```css
a { color: pink; color: orange; }
```

```css
a { color: pink; background: orange; color: orange }
```

The following patterns are *not* considered violations:

```css
a { color: pink; }
```

```css
a { color: pink; background: orange; }
```

## Optional secondary options

### `ignore: ["consecutive-duplicates"]`

Ignore consecutive duplicated properties.

They can prove to be useful fallbacks for older browsers.

The following patterns are considered violations:

```css
p {
  font-size: 16px;
  font-weight: 400;
  font-size: 1rem;
}
```

The following patterns are *not* considered violations:

```css
p {
  font-size: 16px;
  font-size: 1rem;
  font-weight: 400;
}
```

### `ignore: ["consecutive-duplicates-with-different-values"]`

Ignore consecutive duplicated properties with different values.

Including duplicate properties (fallbacks) is useful to deal with older browsers support for CSS properties. E.g. using 'px' units when 'rem' isn't available.

The following patterns are considered violations:

```css
/* properties with the same value */
p {
  font-size: 16px;  
  font-size: 16px;
  font-weight: 400;
}
```

```css
/* nonconsecutive duplicates */
p {
  font-size: 16px;
  font-weight: 400;
  font-size: 1rem;
}
```

The following patterns are *not* considered violations:

```css
p {
  font-size: 16px;
  font-size: 1rem;
  font-weight: 400;
}
```

### `ignoreProperties: ["/regex/", "non-regex"]`

Ignore duplicates of specific properties.

Given:

```js
["color", "/background\-/"]
```

The following patterns are considered violations:

```css
a { color: pink; background: orange; background: white; }
```

```css
a { background: orange; color: pink; background: white; }
```

The following patterns are *not* considered violations:

```css
a { color: pink; color: orange; background-color: orange; background-color: white; }
```

```css
a { color: pink; background-color: orange; color: orange; background-color: white; }
```
