# selector-combinator-space-after

Require a single space or disallow whitespace after the combinators of selectors.

```css
  a > b + c ~ d e >>> f { color: pink; }
/** ↑   ↑   ↑  ↑  ↑
 * These are combinators */
```

Combinators are used to combine several different selectors into new and more specific ones. There are several types of combinators, including: child (`>`), adjacent sibling (`+`), general sibling (`~`), and descendant (which is represented by a blank space between two selectors).

The descendant combinator is *not* checked by this rule.

Also, `+` and `-` signs within `:nth-*()` arguments are not checked (e.g. `a:nth-child(2n+1)`).

## Options

`string`: `"always"|"never"`

### `"always"`

There *must always* be a single space after the combinators.

The following patterns are considered violations:

```css
a +b { color: pink; }
```

```css
a>b { color: pink; }
```

The following patterns are *not* considered violations:

```css
a + b { color: pink; }
```

```css
a> b { color: pink; }
```

### `"never"`

There *must never* be whitespace after the combinators.

The following patterns are considered violations:

```css
a + b { color: pink; }
```

```css
a> b { color: pink; }
```

The following patterns are *not* considered violations:

```css
a +b { color: pink; }
```

```css
a>b { color: pink; }
```
