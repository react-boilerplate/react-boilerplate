# selector-pseudo-element-colon-notation

Specify single or double colon notation for applicable pseudo-elements.

```css
   a::before { color:pink; }
/** ↑
 * This notation */
```

The `::` notation was chosen for *pseudo-elements* to establish a discrimination between *pseudo-classes* (which subclass existing elements) and *pseudo-elements* (which are elements not represented in the document tree).

However, for compatibility with existing style sheets, user agents also accept the previous one-colon notation for *pseudo-elements* introduced in CSS levels 1 and 2 (namely, `:first-line`, `:first-letter`, `:before` and `:after`).

The `--fix` option on the [command line](../../../docs/user-guide/cli.md#autofixing-errors) can automatically fix all of the problems reported by this rule.

## Options

`string`: `"single"|"double"`

### `"single"`

Applicable pseudo-elements *must always* use the single colon notation.

The following patterns are considered violations:

```css
a::before { color: pink; }
```

```css
a::after { color: pink; }
```

```css
a::first-letter { color: pink; }
```

```css
a::first-line { color: pink; }
```

The following patterns are *not* considered violations:

```css
a:before { color: pink; }
```

```css
a:after { color: pink; }
```

```css
a:first-letter { color: pink; }
```

```css
a:first-line { color: pink; }
```

```css
input::placeholder { color: pink; }
```

```css
li::marker { font-variant-numeric: tabular-nums; }
```

### `"double"`

Applicable pseudo-elements *must always* use the double colon notation.

The following patterns are considered violations:

```css
a:before { color: pink; }
```

```css
a:after { color: pink; }
```

```css
a:first-letter { color: pink; }
```

```css
a:first-line { color: pink; }
```

The following patterns are *not* considered violations:

```css
a::before { color: pink; }
```

```css
a::after { color: pink; }
```

```css
a::first-letter { color: pink; }
```

```css
a::first-line { color: pink; }
```

```css
input::placeholder { color: pink; }
```

```css
li::marker { font-variant-numeric: tabular-nums; }
```
