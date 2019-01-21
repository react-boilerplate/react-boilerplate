# no-extra-semicolons

Disallow extra semicolons.

```css
a { color: pink;; }
/**             ↑
 *  This semicolons */
```

This rule ignores semicolons after Less mixins.

## Options

### `true`

The following patterns are considered violations:

```css
@import "x.css";;
```

```css
@import "x.css";
;
```

```css
a {
  color: pink;;
}
```

```css
a {
  ;color: pink;
}
```

```css
a {
  color: pink;
  ;
}
```

```css
a {
  color: red;
}
;
b {
  color: white;
}
```

The following patterns are *not* considered violations:

```css
@import "x.css";
```

```css
a {
  color: pink;
}
```
