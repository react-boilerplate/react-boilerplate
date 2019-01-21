# block-no-empty

Disallow empty blocks.

```css
 a { }
/** ↑
 * Blocks like this */
```

## Options

### `true`

The following patterns are considered violations:

```css
a {}
```

```css
a { }
```

```css
@media print { a {} }
```

The following patterns are *not* considered violations:

```css
a { color: pink; }
```

```css
@media print { a { color: pink; } }
```
