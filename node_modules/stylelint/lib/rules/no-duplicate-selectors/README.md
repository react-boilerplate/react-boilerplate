# no-duplicate-selectors

Disallow duplicate selectors within a stylesheet.

```css
    .foo {} .bar {} .foo {}
/** ↑              ↑
 * These duplicates */
```

This rule checks for two types of duplication:

-   Duplication of a single selector with a rule's selector list, e.g. `a, b, a {}`.
-   Duplication of a selector list within a stylesheet, e.g. `a, b {} a, b {}`. Duplicates are found even if the selectors come in different orders or have different spacing, e.g. `a d, b > c {} b>c, a   d {}`.

The same selector *is* allowed to repeat in the following circumstances:

-   It is used in different selector lists, e.g. `a {} a, b {}`.
-   The duplicates are determined to originate in different stylesheets, e.g. you have concatenated or compiled files in a way that produces sourcemaps for PostCSS to read, e.g. postcss-import).
-   The duplicates are in rules with different parent nodes, e.g. inside and outside of a media query.

This rule resolves nested selectors. So `a b {} a { & b {} }` counts as a violation, because the resolved selectors end up with a duplicate.

## Options

### `true`

The following patterns are considered violations:

```css
.foo,
.bar,
.foo {}
```

```css
.foo {}
.bar {}
.foo {}
```

```css
.foo .bar {}
.bar {}
.foo .bar {}
```

```css
@media (min-width: 10px) {
  .foo {}
  .foo {}
}
```

```css
.foo, .bar {}
.bar, .foo {}
```

```css
a .foo, b + .bar {}
b+.bar,
a
  .foo {}
```

```css
a b {}
a {
  & b {}
}
```

The following patterns are *not* considered violations:

```css
.foo {}
@media (min-width: 10px) {
  .foo {}
}
```

```css
.foo {
  .foo {}
}
```

```css
.foo {}
.bar {}
.foo .bar {}
.bar .foo {}
```

```css
a b {}
a {
  & b,
  & c {}
}
```
