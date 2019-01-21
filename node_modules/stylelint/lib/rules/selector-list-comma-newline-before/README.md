# selector-list-comma-newline-before

Require a newline or disallow whitespace before the commas of selector lists.

```css
    a
    , b { color: pink; }
/** ↑
 * The newline before this comma */
```

The `--fix` option on the [command line](../../../docs/user-guide/cli.md#autofixing-errors) can automatically fix all of the problems reported by this rule.

## Options

`string`: `"always"|"always-multi-line"|"never-multi-line"`

### `"always"`

There *must always* be a newline before the commas.

The following patterns are considered violations:

```css
a, b { color: pink; }
```

```css
a,
b { color: pink; }
```

The following patterns are *not* considered violations:

```css
a
, b { color: pink; }
```

```css
a
,b { color: pink; }
```

### `"always-multi-line"`

There *must always* be a newline before the commas in multi-line selector lists.

The following patterns are considered violations:

```css
a,
b { color: pink; }
```

The following patterns are *not* considered violations:

```css
a, b { color: pink; }
```

```css
a
,b { color: pink; }
```

```css
a
,
b { color: pink; }
```

### `"never-multi-line"`

There *must never* be whitespace before the commas in multi-line selector lists.

The following patterns are considered violations:

```css
a
, b { color: pink; }
```

```css
a
,
b { color: pink; }
```

The following patterns are *not* considered violations:

```css
a,b { color: pink; }
```

```css
a,
b { color: pink; }
```
