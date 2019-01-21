# value-list-max-empty-lines

Limit the number of adjacent empty lines within value lists.

```css
a {
  box-shadow:
    inset 0 2px 0 #dcffa6,
                    /* ← */
    0 2px 5px #000; /* ↑ */
}                   /* ↑ */
/**                    ↑
 *       This empty line */
```

## Options

`int`: Maximum number of empty lines.

For example, with `0`:

The following patterns are considered violations:

```css
a {
  padding: 10px

    10px
    10px
    10px
}
```

```css
a {
  padding: 
    10px
    10px
    10px

    10px
}
```

```css
a {
  box-shadow: inset 0 2px 0 #dcffa6,

    0 2px 5px #000;
}
```

```css
a {
  box-shadow:
    inset 0 2px 0 #dcffa6,

    0 2px 5px #000;
}
```

The following patterns are *not* considered violations:

```css
a {
  padding: 10px 10px 10px 10px
}
```

```css
a {
  padding: 10px
    10px
    10px
    10px
}
```

```css
a {
  padding:
    10px
    10px
    10px
    10px
}
```

```css
a {
  box-shadow: inset 0 2px 0 #dcffa6, 0 2px 5px #000;
}
```

```css
a {
  box-shadow: inset 0 2px 0 #dcffa6,
    0 2px 5px #000;
}
```

```css
a {
  box-shadow:
    inset 0 2px 0 #dcffa6,
    0 2px 5px #000;
}
```
