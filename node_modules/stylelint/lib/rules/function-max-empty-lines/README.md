# function-max-empty-lines

Limit the number of adjacent empty lines within functions.

```css
a {
  transform:
    translate(
                /* ← */
      1,        /* ↑ */ 
                /* ← */
      1         /* ↑ */
                /* ← */
    );          /* ↑ */
}               /* ↑ */
/**                ↑
 *            These lines */
```

## Options

`int`: Maximum number of characters allowed.

For example, with `0`:

The following patterns are considered violations:

```css
a {
  transform:
    translate(

      1,
      1
    );
}
```

```css
a {
  transform:
    translate(
      1,

      1
    );
}
```

```css
a {
  transform:
    translate(
      1,
      1

    );
}
```

The following patterns are *not* considered violations:

```css
a {
  transform: 
    translate(
      1, 
      1
    );
}
```
