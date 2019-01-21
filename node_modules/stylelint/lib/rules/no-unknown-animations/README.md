# no-unknown-animations

Disallow unknown animations.

```css
a { animation-name: fancy-slide; }
/**                    ↑
 *   This animation name */

a { animation: fancy-slide 2s linear; }
/**                    ↑
 *           And this one */
```

This rule considers the identifiers of `@keyframes` rules defined within the same source to be known.

## Options

### `true`

The following patterns are considered violations:

```css
a { animation-name: fancy-slide; }
```

```css
a { animation: fancy-slide 2s linear; }
```

```css
a { animation-name: fancccy-slide; }
@keyframes fancy-slide {}
```

```css
a { animation: linear 100ms fancccy-slide; }
@keyframes fancy-slide {}
```

```css
a { animation-name: jump; }
@keyframes fancy-slide {}
```

The following patterns are *not* considered violations:

```css
a { animation-name: fancy-slide; }
@keyframes fancy-slide {}
```

```css
@keyframes fancy-slide {}
a { animation-name: fancy-slide; }
```

```css
@keyframes fancy-slide {}
a { animation: fancy-slide 2s linear; }
```

```css
a { animation: 100ms steps(12, end) fancy-slide; }
@keyframes fancy-slide {}
```
