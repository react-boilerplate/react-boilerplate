# selector-pseudo-element-no-unknown

Disallow unknown pseudo-element selectors.

```css
    a::before {}
/**    ↑
 * This pseudo-element selector */
```

This rule considers pseudo-element selectors defined in the CSS Specifications, up to and including Editor's Drafts, to be known.

This rule ignores vendor-prefixed pseudo-element selectors.

## Options

### `true`

The following patterns are considered violations:

```css
a::pseudo {}
```

```css
a::PSEUDO {}
```

```css
a::element {}
```

The following patterns are *not* considered violations:

```css
a:before {}
```

```css
a::before {}
```

```css
::selection {}
```

```css
input::-moz-placeholder {}
```

## Optional secondary options

### `ignorePseudoElements: ["/regex/", "string"]`

Given:

```js
["/^my-/", "pseudo-element"]
```

The following patterns are *not* considered violations:

```css
a::pseudo-element {}
```

```css
a::my-pseudo {}
```

```css
a::my-other-pseudo {}
```
