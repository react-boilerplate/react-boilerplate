# declaration-no-important

Disallow `!important` within declarations.

```css
a { color: pink !important; }
/**             ↑
 * This !important */
```

If you always want `!important` in your declarations, e.g. if you're writing [user styles](https://userstyles.org/), you can *safely* add them using [`postcss-safe-important`](https://github.com/crimx/postcss-safe-important).

## Options

### `true`

The following patterns are considered violations:

```css
a { color: pink !important; }
```

```css
a { color: pink ! important; }
```

```css
a { color: pink!important; }
```

The following patterns are *not* considered violations:

```css
a { color: pink; }
```
