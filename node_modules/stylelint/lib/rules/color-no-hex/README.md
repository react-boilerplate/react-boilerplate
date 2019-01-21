# color-no-hex

Disallow hex colors.

```css
a { color: #333 }
/**        ↑
 * These hex colors */
```

## Options

### `true`

The following patterns are considered violations:

```css
a { color: #000; }
```

```css
a { color: #fff1aa; }
```

```css
a { color: #123456aa; }
```

Hex values that are not valid also cause violations:

```css
a { color: #foobar; }
```

```css
a { color: #0000000000000000; }
```

The following patterns are *not* considered violations:

```css
a { color: black; }
```

```css
a { color: rgb(0, 0, 0); }
```

```css
a { color: rgba(0, 0, 0, 1); }
```
