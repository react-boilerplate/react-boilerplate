# block-opening-brace-space-before

Require a single space or disallow whitespace before the opening brace of blocks.

```css
  a { color: pink; }
/** ↑
 * The space before this brace */
```

The `--fix` option on the [command line](../../../docs/user-guide/cli.md#autofixing-errors) can automatically fix all of the problems reported by this rule.

## Options

`string`: `"always"|"never"|"always-single-line"|"never-single-line"|"always-multi-line"|"never-multi-line"`

### `"always"`

There *must always* be a single space before the opening brace.

The following patterns are considered violations:

```css
a{ color: pink; }
```

```css
a
{ color: pink; }
```

The following patterns are *not* considered violations:

```css
a { color: pink; }
```

```css
a {
color: pink; }
```

### `"never"`

There *must never* be whitespace before the opening brace.

The following patterns are considered violations:

```css
a { color: pink; }
```

```css
a
{ color: pink; }
```

The following patterns are *not* considered violations:

```css
a{ color: pink; }
```

```css
a{
color: pink; }
```

### `"always-single-line"`

There *must always* be a single space before the opening brace in single-line blocks.

The following patterns are considered violations:

```css
a{ color: pink; }
```

The following patterns are *not* considered violations:

```css
a { color: pink; }
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

There *must always* be a single space before the opening brace in multi-line blocks.

The following patterns are considered violations:

```css
a{
color: pink; }
```

The following patterns are *not* considered violations:

```css
a{ color: pink; }
```

```css
a {
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

## Optional secondary options

### `ignoreAtRules: ["/regex/", "non-regex"]`

Given:

```js
["/fo/"]
```

The following patterns are *not* considered violations:

```css
@for ...
{}
```

```css
@for ...{}
```
