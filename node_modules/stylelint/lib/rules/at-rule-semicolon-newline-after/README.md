# at-rule-semicolon-newline-after

Require a newline after the semicolon of at-rules.

```css
@import url("x.css");
@import url("y.css");
/**                 ↑
 * The newline after these semicolons */
```

This rule ignores `@import` in Less.

This rule allows an end-of-line comment followed by a newline. For example:

```css
@import url("x.css"); /* end-of-line comment */

a {}
```

The `--fix` option on the [command line](../../../docs/user-guide/cli.md#autofixing-errors) can automatically fix all of the problems reported by this rule.

## Options

`string`: `"always"`

### `"always"`

There *must always* be a newline after the semicolon.

The following patterns are considered violations:

```css
@import url("x.css"); @import url("y.css");
```

```css
@import url("x.css"); a {}
```

The following patterns are *not* considered violations:

```css
@import url("x.css");
@import url("y.css");
```

```css
@import url("x.css"); /* end-of-line comment */
a {}
```

```css
@import url("x.css");

a {}
```
