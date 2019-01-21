# function-calc-no-unspaced-operator

Disallow an unspaced operator within `calc` functions.

```css
a { top: calc(1px + 2px); }
/**               ↑
 * The space around this operator */
```

Before the operator, there must be a single whitespace or a newline plus indentation. After the operator, there must be a single whitespace or a newline.

## Options

### `true`

The following patterns are considered violations:

```css
a { top: calc(1px+2px); }
```

```css
a { top: calc(1px+ 2px); }
```

The following patterns are *not* considered violations:

```css
a { top: calc(1px + 2px); }
```

```css
a { top: calc(calc(1em * 2) / 3); }
```

```css
a {
  top: calc(var(--foo) +
    var(--bar));
}
```

```css
a {
  top: calc(var(--foo)
    + var(--bar));
}
```
