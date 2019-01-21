# declaration-empty-line-before

Require or disallow an empty line before declarations.

```css
a {
  --foo: pink;
             /* ← */
  top: 15px; /* ↑ */
}            /* ↑ */
/**             ↑
 *      This line */
```

This rule only applies to standard property declarations. Use the [`custom-property-empty-line-before`](../custom-property-empty-line-before/README.md) rule for custom property declarations.

The `--fix` option on the [command line](../../../docs/user-guide/cli.md#autofixing-errors) can automatically fix all of the problems reported by this rule. We recommend to enable [`indentation`](../indentation/README.md) rule for better autofixing results with this rule.

## Options

`string`: `"always"|"never"`

### `"always"`

The following patterns are considered violations:

```css
a {
  --foo: pink;
  top: 5px;
}
```

```css
a {
  bottom: 15px;
  top: 5px;
}
```

The following patterns are *not* considered violations:

```css
a {
  --foo: pink;

  top: 5px;
}
```

```css
a {

  bottom: 15px;

  top: 5px;
}
```

### `"never"`

The following patterns are considered violations:

```css
a {
  --foo: pink;

  bottom: 15px;
}
```

```css
a {

  bottom: 15px;

  top: 5px;
}
```

The following patterns are *not* considered violations:

```css
a {
  --foo: pink;
  bottom: 15px;
}
```

```css
a {
  bottom: 15px;
  top: 5px;
}
```

## Optional secondary options

### `except: ["after-comment", "after-declaration", "first-nested"]`

#### `"after-comment"`

Reverse the primary option for declarations that come after a comment.

Shared-line comments do not trigger this option.

For example, with `"always"`:

The following patterns are considered violations:

```css
a {
  /* comment */

  top: 5px;
}
```

```css
a {
  bottom: 5px; /* comment */
  top: 5px;
}
```

The following patterns are *not* considered violations:

```css
a {
  /* comment */
  top: 5px;
}

```

```css
a {
  bottom: 5px; /* comment */

  top: 5px;
}

```

#### `"after-declaration"`

Reverse the primary option for declarations that come after another declaration.

Shared-line comments do not affect this option.

For example, with `"always"`:

The following patterns are considered violations:

```css
a {

  bottom: 15px;

  top: 5px;
}
```

```css
a {

  bottom: 15px; /* comment */

  top: 5px;
}
```

The following patterns are *not* considered violations:

```css
a {

  bottom: 15px;
  top: 5px;
}
```

```css
a {

  bottom: 15px; /* comment */
  top: 5px;
}
```

#### `"first-nested"`

Reverse the primary option for declarations that are nested and the first child of their parent node.

For example, with `"always"`:

The following patterns are considered violations:

```css
a {

  bottom: 15px;

  top: 5px;
}
```

The following patterns are *not* considered violations:

```css
a {
  bottom: 15px;

  top: 5px;
}
```

### `ignore: ["after-comment", "after-declaration", "first-nested", "inside-single-line-block"]`

#### `"after-comment"`

Ignore declarations that are preceded by comments.

For example, with `"always"`:

The following patterns are *not* considered violations:

```css
a {
  /* comment */
  bottom: 15px;
}
```

#### `"after-declaration"`

Ignore declarations that are preceded by declarations, to allow for multiple declaration sets in the same block.

For example, with `"always"`:

The following patterns are *not* considered violations:

```css
a {

  bottom: 15px;
  top: 15px;
}
```

```css
a {

  bottom: 15px;

  top: 15px;
}
```

```css
a {

  color: orange;
  text-decoration: none;

  bottom: 15px;
  top: 15px;
}
```

#### `"first-nested"`

Ignore declarations that are nested and the first child of their parent node.

For example, with `"always"`:

The following patterns are *not* considered violations:

```css
a {
  bottom: 15px;

  top: 5px;
}
```

#### `"inside-single-line-block"`

Ignore declarations that are inside single-line blocks.

For example, with `"always"`:

The following patterns are *not* considered violations:

```css
a { bottom: 15px; top: 5px; }
```
