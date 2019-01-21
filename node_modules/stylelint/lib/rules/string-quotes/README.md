# string-quotes

Specify single or double quotes around strings.

```css
a[id="foo"] { content: "x"; }
/**  ↑   ↑             ↑ ↑
 * These quotes and these quotes */
```

Quotes within comments are ignored.


```css
/* "This is fine" */
/* 'And this is also fine' */
```

Single quotes in a charset @-rule are ignored as using single quotes in this context is incorrect according the [CSS specification](https://www.w3.org/TR/CSS2/syndata.html#x57).

```css
@charset "utf-8"
/* fine regardless of configuration */
```

The `--fix` option on the [command line](../../../docs/user-guide/cli.md#autofixing-errors) can automatically fix most of the problems reported by this rule.

## Options

`string`: `"single"|"double"`

### `"single"`

Strings *must always* be wrapped with single quotes.

The following patterns are considered violations:

```css
a { content: "x"; }
```

```css
a[id="foo"] {}
```

The following patterns are *not* considered violations:

```css
a { content: 'x'; }
```

```css
a[id='foo'] {}
```

```css
a { content: "x'y'z"; }
```

### `"double"`

Strings *must always* be wrapped with double quotes.

The following patterns are considered violations:

```css
a { content: 'x'; }
```

```css
a[id='foo'] {}
```

The following patterns are *not* considered violations:

```css
a { content: "x"; }
```

```css
a[id="foo"] {}
```

```css
a { content: 'x"y"z'; }
```

## Optional secondary options

### `avoidEscape`: `true|false`, defaults to `true`

Allows strings to use single-quotes or double-quotes so long as the string contains a quote that would have to be escaped otherwise.

For example, with `"single", { "avoidEscape" : false }`.

The following patterns are considered violations:

```css
a { content: "x'y'z"; }
```

```css
a[id="foo'bar'baz"] {}
```

The following patterns are *not* considered violations:

```css
a { content: 'x'; }
```

```css
a[id='foo'] {}
```
