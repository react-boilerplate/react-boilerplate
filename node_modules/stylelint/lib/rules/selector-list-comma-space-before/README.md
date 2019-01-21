# selector-list-comma-space-before

Require a single space or disallow whitespace before the commas of selector lists.

```css
   a ,b { color: pink; }
/**  ↑
 * The space before this comma */
```

## Options

`string`: `"always"|"never"|"always-single-line"|"never-single-line"`

### `"always"`

There *must always* be a single space before the commas.

The following patterns are considered violations:

```css
a,b { color: pink; }
```

```css
a, b { color: pink; }
```

The following patterns are *not* considered violations:

```css
a ,b { color: pink; }
```

```css
a , b { color: pink; }
```

### `"never"`

There *must never* be whitespace before the commas.

The following patterns are considered violations:

```css
a ,b { color: pink; }
```

```css
a , b { color: pink; }
```

The following patterns are *not* considered violations:

```css
a,b { color: pink; }
```

```css
a, b { color: pink; }
```

### `"always-single-line"`

There *must always* be a single space before the commas in single-line selector lists.

The following patterns are considered violations:

```css
a,b { color: pink; }
```

The following patterns are *not* considered violations:

```css
a,
b { color: pink; }
```

### `"never-single-line"`

There *must never* be a single space before the commas in single-line selector lists.

The following patterns are considered violations:

```css
a ,b { color: pink; }
```

The following patterns are *not* considered violations:

```css
a ,
b { color: pink; }
```
