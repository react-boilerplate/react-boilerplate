# color-named

Require (where possible) or disallow named colors.

```css
a { color: black }
/**        ↑
 * These named colors */
```

## Options

`string`: `"always-where-possible"|"never"`

### `"always-where-possible"`

Colors *must always*, where possible, be named.

This will complain if a hex (3, 4, 6 and 8 digit), `rgb()`, `rgba()`, `hsl()`, `hsla()`, `hwb()` or `gray()` color can be represented as a named color.

The following patterns are considered violations:

```css
a { color: #000; }
```

```css
a { color: #f000; }
```

```css
a { color: #ff000000; }
```

```css
a { color: rgb(0, 0, 0); }
```

```css
a { color: rgb(0%, 0%, 0%); }
```

```css
a { color: rgba(0, 0, 0, 0); }
```

```css
a { color: hsl(0, 0%, 0%); }
```

```css
a { color: hwb(0, 0%, 100%); }
```

```css
a { color: gray(0); }
```

The following patterns are *not* considered violations:

```css
a { color: black; }
```

```css
a { color: rgb(10, 0, 0); }
```

```css
a { color: rgb(0, 0, 0, 0.5); }
```

### `"never"`

Colors *must never* be named.

The following patterns are considered violations:

```css
a { color: black; }
```

```css
a { color: white; }
```

The following patterns are *not* considered violations:

```css
a { color: #000; }
```

```css
a { color: rgb(0, 0, 0); }
```

```css
a { color: var(--white); }
```

```scss
a { color: $blue; }
```

```less
a { color: @blue; }
```

## Optional secondary options

### `ignore: ["inside-function"]`

Ignore colors that are inside a function.

For example, with `"never"`.

The following patterns are *not* considered violations:

```css
a {
  color: map-get($colour, blue);
}
```

```css
a {
  background-image: url(red);
}
```

### `ignoreProperties: ["/regex/", "string"]`

For example with `"never"`.

Given:

```js
["/^my-/", "composes"]
```

The following patterns are *not* considered violations:

```css
a {
  my-property: red;
}
```

```css
a {
  my-other-property: red;
}
```

```css
a {
  composes: red from './index.css';
}
```
