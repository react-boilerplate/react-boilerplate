# block-opening-brace-newline-before

Require a newline or disallow whitespace before the opening brace of blocks.

```css
  a
    { color: pink; }
/** ↑
 * The newline before this brace */
```

Refer to [the FAQ](../../../docs/user-guide/faq.md#how-do-i-disallow-single-line-blocks) for more information on using this rule with [`block-opening-brace-newline-after`](../block-opening-brace-newline-after/README.md) to disallow single-line rules.

The `--fix` option on the [command line](../../../docs/user-guide/cli.md#autofixing-errors) can automatically fix all of the problems reported by this rule.

## Options

`string`: `"always"|"always-single-line"|"never-single-line"|"always-multi-line"|"never-multi-line"`

### `"always"`

There *must always* be a newline before the opening brace.

The following patterns are considered violations:

```css
a{ color: pink; }
```

```css
a{ color: pink;
}
```

The following patterns are *not* considered violations:

```css
a
{ color: pink; }
```

```css
a
{
color: pink; }
```

```css
a /* foo */
  {
    color: pink;
  }
```

### `"always-single-line"`

There *must always* be a newline before the opening brace in single-line blocks.

The following patterns are considered violations:

```css
a{ color: pink; }
```

The following patterns are *not* considered violations:

```css
a
{ color: pink; }
```

```css
a{
color: pink; }
```

### `"never-single-line"`

There *must never* be whitespace before the opening brace in single-line blocks.

The following patterns are considered violations:

```css
a { color: pink; }
```

The following patterns are *not* considered violations:

```css
a{ color: pink; }
```

```css
a {
color: pink; }
```

### `"always-multi-line"`

There *must always* be a newline before the opening brace in multi-line blocks.

The following patterns are considered violations:

```css
a{
color: pink; }
```

```css
a {
color: pink; }
```

The following patterns are *not* considered violations:

```css
a{ color: pink; }
```

```css
a { color: pink; }
```

```css
a
{ color: pink; }
```

```css
a
{
color: pink; }
```

### `"never-multi-line"`

There *must never* be whitespace before the opening brace in multi-line blocks.

The following patterns are considered violations:

```css
a {
color: pink; }
```

The following patterns are *not* considered violations:

```css
a { color: pink; }
```

```css
a{
color: pink;}
```
