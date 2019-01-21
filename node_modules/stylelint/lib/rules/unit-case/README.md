# unit-case

Specify lowercase or uppercase for units.

```css
    a { width: 10px; }
/**              ↑
 *     These units */
```

## Options

`string`: `"lower"|"upper"`

### `"lower"`

The following patterns are considered violations:

```css
a {
  width: 10PX;
}
```

```css
a {
  width: 10Px;
}
```

```css
a {
  width: 10pX;
}
```

```css
a {
  width: 10PIXEL;
}
```

```css
a {
  width: calc(10PX * 2);
}
```

The following patterns are *not* considered violations:

```css
a {
  width: 10px;
}
```

```css
a {
  width: calc(10px * 2);
}
```

### `"upper"`

The following patterns are considered violations:

```css
a {
  width: 10px;
}
```

```css
a {
  width: 10Px;
}
```

```css
a {
  width: 10pX;
}
```

```css
a {
  width: 10pixel;
}
```

```css
a {
  width: calc(10px * 2);
}
```

The following patterns are *not* considered violations:

```css
a {
  width: 10PX;
}
```

```css
a {
  width: calc(10PX * 2);
}
```
