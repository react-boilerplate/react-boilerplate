# selector-max-id

Limit the number of ID selectors in a selector.

```css
    #foo {}
/** ↑
 * This type of selector */
```

This rule resolves nested selectors before counting the number of ID selectors. Each selector in a [selector list](https://www.w3.org/TR/selectors4/#selector-list) is evaluated separately.

The `:not()` pseudo-class is also evaluated separately. The rule processes the argument as if it were an independent selector, and the result does not count toward the total for the entire selector.

## Options

`int`: Maximum universal selectors allowed.

For example, with `2`:

The following patterns are considered violations:

```css
#foo #bar #baz {}
```

```css
#foo #bar {
  & #baz {}
}
```

```css
#foo #bar {
  & > #bar {}
}
```

The following patterns are *not* considered violations:

```css
#foo {}
```

```css
#foo #bar {}
```

```css
.foo #foo {}
```

```css
#foo.foo #bar {}
```

```css
/* each selector in a selector list is evaluated separately */
#foo,
#baz #quux {}
```

```css
/* `#bar` is inside `:not()`, so it is evaluated separately */
#foo #bar:not(#baz) {}
```
