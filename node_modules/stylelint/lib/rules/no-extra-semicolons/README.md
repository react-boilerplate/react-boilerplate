# no-extra-semicolons

Disallow extra semicolons.

```css
a { color: pink;; }
/**             ↑
 *  This semicolons */
```

This rule ignores semicolons after Less mixins.

The `--fix` option on the [command line](../../../docs/user-guide/cli.md#autofixing-errors) can automatically fix all of the problems reported by this rule.

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
