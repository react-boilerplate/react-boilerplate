# comment-empty-line-before

Require or disallow an empty line before comments.

```css
a {}
              /* ← */
/* comment */ /* ↑ */
/**              ↑
*        This line */
```

This rule ignores:

-   comments that are the very first node in the source
-   shared-line comments
-   single-line comments with `//` (when you're using a custom syntax that supports them)
-   comments within selector and value lists

The `--fix` option on the [command line](../../../docs/user-guide/cli.md#autofixing-errors) can automatically fix all of the problems reported by this rule. We recommend to enable [`indentation`](../indentation/README.md) rule for better autofixing results with this rule.

## Options

`string`: `"always"|"never"`

### `"always"`

There *must always* be an empty line before comments.

The following patterns are considered violations:

```css
a {}
/* comment */
```

The following patterns are *not* considered violations:

```css
a {}

/* comment */
```

```css
a {} /* comment */
```

### `"never"`

There *must never* be an empty line before comments.

The following patterns are considered violations:

```css
a {}

/* comment */
```

The following patterns are *not* considered violations:

```css
a {}
/* comment */
```

```css
a {} /* comment */
```

## Optional secondary options

### `except: ["first-nested"]`

Reverse the primary option for comments that are nested and the first child of their parent node.

For example, with `"always"`:

The following patterns are considered violations:

```css
a {

  /* comment */
  color: pink;
}
```

The following patterns are *not* considered violations:

```css
a {
  /* comment */
  color: pink;
}
```

### `ignore: ["after-comment", "stylelint-commands"]`

#### `"after-comment"`

Don't require an empty line after a comment.

For example, with `"always"`:

The following patterns are *not* considered violations:

```css
a {
  background: pink;

  /* comment */
  /* comment */
  color: #eee;
}
```

```css
a {
  background: pink;

  /* comment */

  /* comment */
  color: #eee;
}
```

#### `"stylelint-commands"`

Ignore comments that deliver commands to stylelint, e.g. `/* stylelint-disable color-no-hex */`.

For example, with `"always"`:

The following patterns are considered violations:

```css
a {
  background: pink;
  /* not a stylelint command */
  color: #eee;
}
```

The following patterns are *not* considered violations:

```css
a {
  background: pink;
  /* stylelint-disable color-no-hex */
  color: pink;
}
```
