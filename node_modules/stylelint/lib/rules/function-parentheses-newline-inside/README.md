# function-parentheses-newline-inside

Require a newline or disallow whitespace on the inside of the parentheses of functions.

```css
  a {
    transform: translate(
      1,             /* ↑ */
      1              /* ↑ */
    );               /* ↑ */
  }                  /* ↑ */
/** ↑                   ↑
 * The newline inside these two parentheses */
```

## Options

`string`: `"always"|"always-multi-line"|"never-multi-line"`

### `"always"`

There *must always* be a newline inside the parentheses.

The following patterns are considered violations:

```css
a { transform: translate(1, 1); }
```

```css
a { transform: translate(1,
  1
  ); }
```

The following patterns are *not* considered violations:

```css
a {
  transform: translate(
    1, 1
  );
}
```

```css
a {
  transform: translate(
    1,
    1
  );
}
```

### `"always-multi-line"`

There *must always* be a newline inside the parentheses of multi-line functions.

The following patterns are considered violations:

```css
a { transform: translate(1,
  1) }
```

The following patterns are *not* considered violations:

```css
a { transform: translate(1, 1) }
```

```css
a { transform: translate( 1, 1 ) }
```

```css
a {
  transform: translate(
    1, 1
  );
}
```

```css
a {
  transform: translate(
    1,
    1
  );
}
```

### `"never-multi-line"`

The following patterns are considered violations:

```css
a {
  transform: translate(
    1, 1
  );
}
```

```css
a {
  transform: translate(
    1,
    1
  );
}
```

The following patterns are *not* considered violations:

```css
a { transform: translate(1, 1) }
```

```css
a { transform: translate( 1, 1 ) }
```

```css
a { transform: translate(1,
  1) }
```
