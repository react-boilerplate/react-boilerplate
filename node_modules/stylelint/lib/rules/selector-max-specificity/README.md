# selector-max-specificity

Limit the specificity of selectors.

```css
    .foo, #bar.baz span, #hoo { color: pink; }
/** ↑     ↑              ↑
 * Each of these selectors */
```

Visit the [Specificity Calculator](https://specificity.keegan.st) for visual representation of selector specificity.

This rule ignores selectors with variable interpolation (`#{$var}`, `@{var}`, `$(var)`).

This rule resolves nested selectors before calculating the specificity of a selector.

## Options

`string`: Maximum specificity allowed.

Format is `"id,class,type"`, as laid out in the [W3C selector spec](https://drafts.csswg.org/selectors/#specificity-rules).

For example, with `"0,2,0"`:

The following patterns are considered violations:

```css
#foo {}
```

```css
.foo .baz .bar {}
```

```css
.foo .baz {
  & .bar {}
}
```

```css
.foo {
  color: red;
  @nest .baz .bar & {
    color: blue;
  }
}
```

The following patterns are *not* considered violations:

```css
div {}
```

```css
.foo div {}
```

```css
.foo div {
  & div a {}
}
```

```css
.foo {
  & .baz {}
}
```

```css
.foo {
  color: red;
  @nest .baz & {
    color: blue;
  }
}
```

## Optional secondary options

### `ignoreSelectors: ["/regex/", "string"]`

Given:

```js
["0,2,0", {
  ignoreSelectors: [":global", ":local", "/my-/"]
}];
```

The following patterns are *not* considered violations:

```css
:global(.foo) .bar {}
```

```css
:local(.foo.bar)
```

```css
:local(.foo, :global(.bar).baz)
```

The following patterns are considered violations:

```css
:global(.foo) .bar.baz {}
```

```css
:local(.foo.bar.baz)
```

```css
:local(.foo, :global(.bar), .foo.bar.baz)
```
