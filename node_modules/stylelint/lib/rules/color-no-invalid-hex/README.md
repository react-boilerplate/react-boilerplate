# color-no-invalid-hex

Disallow invalid hex colors.

```css
a { color: #y3 }
/**        ↑
 * These hex colors */
```

Longhand hex colors can be either 6 or 8 (with alpha channel) hexadecimal characters. And their shorthand variants are 3 and 4 characters respectively.

## Options

### `true`

The following patterns are considered violations:

```css
a { color: #00; }
```

```css
a { color: #fff1az; }
```

```css
a { color: #12345aa; }
```

The following patterns are *not* considered violations:

```css
a { color: #000; }
```

```css
a { color: #000f; }
```

```css
a { color: #fff1a0; }
```

```css
a { color: #123450aa; }
```
