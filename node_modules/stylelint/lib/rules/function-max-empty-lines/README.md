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

The `--fix` option on the [command line](../../../docs/user-guide/cli.md#autofixing-errors) can automatically fix all of the problems reported by this rule.

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
