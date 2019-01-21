# declaration-bang-space-before

Require a single space or disallow whitespace before the bang of declarations.

```css
a { color: pink !important; }
/**             ↑
 * The space before this exclamation mark */
```

## Options

`string`: `"always"|"never"`

### `"always"`

There *must always* be a single space before the bang.

The following patterns are considered violations:

```css
a { color: pink!important; }
```

```css
a { color: pink  ! important; }
```

The following patterns are *not* considered violations:

```css
a { color: pink !important; }
```

```css
a { color:pink ! important; }
```

### `"never"`

There *must never* be whitespace before the bang.

The following patterns are considered violations:

```css
a { color : pink !important; }
```

The following patterns are *not* considered violations:

```css
a { color: pink!important; }
```

```css
a { color: pink! important; }
```
