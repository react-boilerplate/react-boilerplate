# time-min-milliseconds

Specify the minimum number of milliseconds for time values.

```css
a { animation: slip-n-slide 150ms linear; }
/**                         ↑
 *                  This time */
```

This rule checks positive numbers in `transition-duration`, `transition-delay`, `animation-duration`, `animation-delay`, and those times as they manifest in the `transition` and `animation` shorthands.

## Options

`int`: Minimum number of milliseconds for time values.

For example, with `100`:

The following patterns are considered violations:

```css
a { animation: 80ms; }
```

```css
a { transition-duration: 0.08s; }
```

```css
a { transition: background-color 6ms linear; }
```

```css
a { animation-delay: 0.01s; }
```

The following patterns are *not* considered violations:

```css
a { animation: 8s; }
```

```css
a { transition-duration: 0.8s; }
```

```css
a { transition: background-color 600ms linear; }
```

```css
a { animation-delay: 1s; }
```
