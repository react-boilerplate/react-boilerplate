# max-line-length

Limit the length of a line.

```css
a { color: red }
/**            ↑
 *       The end */
```

Lines that exceed the maximum length but contain no whitespace (other than at the beginning of the line) are ignored.

When evaluating the line length, the arguments of any `url(...)` functions are excluded from the calculation, because typically you have no control over the length of these arguments. This means that long `url()` functions should not contribute to violations.

## Options

`int`: Maximum number of characters allowed.

For example, with `20`:

The following patterns are considered violations:

```css
a { color: 0; top: 0; }
```

```css
a {
  background: linear-gradient(red, blue);
}
```

The following patterns are *not* considered violations:

```css
a {
  color: 0;
  top: 0;
}
```

```css
a {
  background: url(a-url-that-is-over-20-characters-long);
}
```

## Optional secondary options

### `ignore: ["non-comments"]`

Only enforce the line-length limit for lines within comments.

This does not apply to comments that are stuck in between other stuff, only to lines that begin at the beginning or in the middle of a comment.

For example, with a maximum length of `30`.

The following patterns are considered violations:

Each have only one violation.

```css
/* This line is too long for my rule */
a { color: pink; background: orange; }
a { color: pink; /* this comment is also long but not on its own line */ }
```

```css
a { color: pink; background: orange; }
/**
 * This line is short,
 * but this line is too long for my liking,
 * though this one is fine
 */
a { color: pink; /* this comment is also long but not on its own line */ }
```

### `ignore: ["comments"]`

Only enforce the line-length limit for lines that are not comments.

This also applies to comments that are between code on the same line.

For example, with a maximum length of `30`.

The following patterns are considered violations:

```css
a { color: pink; } /* comment that is too long */
```

```css
a { /* this comment is too long for the max length */ }
```

The following patterns are *not* considered violations:

```css
/* comment that is too long for my rule*/
a { color: pink; }
```

```css
/*
 * comment that is too long the max length
 * comment that is too long the max length
 *
 */
a { color: pink; }
```

### `ignorePattern: "/regex/"`

Ignore any line that matches the given regex pattern, regardless of whether it is comment or not.

Given:

```js
"/^@import\\s+/"
```

The following pattern is *not* considered a violation:

```css
@import "../../../../another/css/or/scss/file/or/something.css";
```

Given the following, with a maximum length of `20`.

```js
["/https?:\/\/[0-9,a-z]*.*/"]
```

The following pattern is *not* considered a violation:

```css
/* ignore urls https://www.example.com */
```
