# selector-nested-pattern

Specify a pattern for the selectors of rules nested within rules.

```css
    a {
      color: orange;
      &:hover { color: pink; }
    } ↑
/**   ↑
 * These nested selectors */
```

Non-standard selectors (e.g. selectors with Sass or Less interpolation) and selectors of rules nested within at-rules are ignored.

## Options

`regex|string`

A string will be translated into a RegExp — `new RegExp(yourString)` — so *be sure to escape properly*.

The selector value will be checked in its entirety. If you'd like to allow for combinators and commas, you must incorporate them into your pattern.

Given the string:

```js
"^&:(?:hover|focus)$"
```

The following patterns are considered violations:

```css
a {
  .bar {}
}
```

```css
a {
  .bar:hover {}
}
```

```css
a {
  &:hover,
  &:focus {}
}
```

The following patterns are *not* considered violations:

```css
a {
  &:hover {}
}
```

```css
a {
  &:focus {}
}
```

```css
a {
  &:hover {}
  &:focus {}
}
```
