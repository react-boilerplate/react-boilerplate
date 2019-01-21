# declaration-block-single-line-max-declarations

Limit the number of declaration within a single line declaration block.

```css
a { color: pink; top: 0; }
/** ↑            ↑
 * The number of these declarations */
```

## Options

`int`: Maximum number of declarations allowed.

For example, with `1`:

The following patterns are considered violations:

```css
a { color: pink; top: 3px; }
```

```css
a,
b { color: pink; top: 3px; }
```

The following patterns are *not* considered violations:

```css
a { color: pink; }
```

```css
a,
b { color: pink; }
```

```css
a {
  color: pink;
  top: 3px;
}
```
