# no-descending-specificity

Disallow selectors of lower specificity from coming after overriding selectors of higher specificity.

```css
    #container a { top: 10px; } a { top: 0; }
/** ↑                           ↑
 * The order of these selectors represents descending specificity */
```

Source order is important in CSS, and when two selectors have the *same* specificity, the one that occurs *last* will take priority. However, the situation is different when one of the selectors has a *higher* specificity. In that case, source order does *not* matter: the selector with higher specificity will win out even if it comes first.

The clashes of these two mechanisms for prioritization, source order and specificity, can cause some confusion when reading stylesheets. If a selector with higher specificity comes *before* the selector it overrides, we have to think harder to understand it, because it violates the source order expectation. **Stylesheets are most legible when overriding selectors always come *after* the selectors they override.** That way both mechanisms, source order and specificity, work together nicely.

This rule enforces that practice *as best it can*. (It cannot catch every *actual* overriding selector (because it does not know the DOM structure, for one), but it can catch certain common mistakes.)

Here's how it works: **This rule looks at the last *compound selector* in every full selector, and then compares it with other selectors in the stylesheet that end in the same way.**

So `.foo .bar` (whose last compound selector is `.bar`) will be compared to `.bar` and `#baz .bar`, but not to `#baz .foo` or `.bar .foo`.

And `a > li#wag.pit` (whose last compound selector is `li#wag.pit`) will be compared to `div li#wag.pit` and `a > b > li + li#wag.pit`, but not to `li`, or `li #wag`, etc.

There's one other important feature: Selectors targeting pseudo-elements are not considered comparable to similar selectors without the pseudo-element, because they target other elements on the rendered page. For example, `a::before {}` will not be compared to `a:hover {}`, because `a::before` targets a pseudo-element whereas `a:hover` targets the actual `<a>`.

This rule only compares rules that are within the same media context. So `a {} @media print { #baz a {} }` is fine.

This rule resolves nested selectors before calculating the specificity of the selectors.

## Options

### `true`

The following patterns are considered violations:

```css
b a {}
a {}
```

```css
a + a {}
a {}
```

```css
b > a[foo] {}
a[foo] {}
```

```css
a {
  & > b {}
}
b {}
```

```css
@media print {
  #c a {}
  a {}
}
```

The following patterns are *not* considered violations:

```css
a {}
b a {}
```

```css
a {}
a + a {}
```

```css
a[foo] {}
b > a[foo] {}
```

```css
b {}
a {
  & > b {}
}
```

```css
a::before {}
a:hover::before {}
a {}
a:hover {}
```

```css
@media print {
  a {}
  #c a {}
}
```

```css
a {}
@media print {
  #baz a {}
}
```
