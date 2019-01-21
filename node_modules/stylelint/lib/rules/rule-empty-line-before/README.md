# rule-empty-line-before

Require or disallow an empty line before rules.

```css
a {}
      /* ← */
b {}  /* ↑ */
/**      ↑
 * This line */
```

This rule ignores rules that are the very first node in a source.

The `--fix` option on the [command line](../../../docs/user-guide/cli.md#autofixing-errors) can automatically fix all of the problems reported by this rule. We recommend to enable [`indentation`](../indentation/README.md) rule for better autofixing results with this rule.

## Options

`string`: `"always"|"never"|"always-multi-line"|"never-multi-line"`

### `"always"`

There *must always* be an empty line before rules.

The following patterns are considered violations:

```css
a {} b {}
```

```css
a {}
b {}
```

The following patterns are *not* considered violations:

```css
a {}

b {}
```

### `"never"`

There *must never* be an empty line before rules.

The following patterns are considered violations:

```css
a {}

b {}
```

The following patterns are *not* considered violations:

```css
a {} b {}
```

```css
a {}
b {}
```

### `"always-multi-line"`

There *must always* be an empty line before multi-line rules.

The following patterns are considered violations:

```css
a {
  color: red;
}
b {
  color: blue;
}
```

The following patterns are *not* considered violations:

```css
a {
  color: red;
}

b {
  color: blue;
}
```

### `"never-multi-line"`

There *must never* be an empty line before multi-line rules.

The following patterns are considered violations:

```css
a {
  color: red;
}

b {
  color: blue;
}
```

The following patterns are *not* considered violations:

```css
a {
  color: red;
}
b {
  color: blue;
}
```

## Optional secondary options

### `except: ["after-rule", "after-single-line-comment", "inside-block-and-after-rule", "inside-block", "first-nested"]`

#### `"after-rule"`

Reverse the primary option if the rule comes after another rule.

For example, with `"always"`:

The following patterns are considered violations:

```css
a {}

b {}
```

The following patterns are *not* considered violations:

```css
a {}
b {}
```

#### `"after-single-line-comment"`

Reverse the primary option if the rule comes after a single-line comment.

For example, with `"always"`:

The following patterns are considered violations:

```css
/* comment */

a {}
```

The following patterns are *not* considered violations:

```css
/* comment */
a {}
```

#### `"inside-block-and-after-rule"`

Reverse the primary option if the rule is inside a block and comes after another rule.

For example, with `"always"`:

The following patterns are considered violations:

```css
@media {

  a {}

  b {}
}
```

The following patterns are *not* considered violations:

```css
@media {
  a {}
  b {}
}
```

#### `"inside-block"`

Reverse the primary option if the rule is inside a block.

For example, with `"always"`:

The following patterns are considered violations:

```scss
a {
  color: red;

  b {
    color: blue;
  }
}

```

The following patterns are *not* considered violations:

```scss
a {
  color: red;
  b {
    color: blue;
  }
}
```

#### `"first-nested"`

Reverse the primary option if the rule is the first in a block.

For example, with `"always"`:

The following patterns are considered violations:

```css
@media {

  a {}

  b {}
}
```

The following patterns are *not* considered violations:

```css
@media {
  a {}

  b {}
}
```

### `ignore: ["after-comment", "first-nested", "inside-block"]`

#### `"after-comment"`

Ignore rules that come after a comment.

For example, with `"always"`:

The following patterns are *not* considered violations:

```css
/* comment */
a {}
```

#### `"first-nested"`

Ignore rules that are nested and the first child of their parent node.

For example, with `"always"`:

The following patterns are *not* considered violations:

```css
@media {
  a {}

  b {}
}
```

#### `"inside-block"`

Ignore rules that are inside a block.

For example, with `"always"`:

The following patterns are *not* considered violations:

```css
@media {
  a {}
}
```

```css
@media {
  a {}
  b {}
}
```
