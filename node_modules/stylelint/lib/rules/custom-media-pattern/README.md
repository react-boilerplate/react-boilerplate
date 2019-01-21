# custom-media-pattern

Specify a pattern for custom media query names.

```css
@custom-media --foo (max-width: 30em);
/**             ↑
 * The pattern of this */
```

## Options

`regex|string`

A string will be translated into a RegExp like so `new RegExp(yourString)` — so be sure to escape properly.

Given the string:

```js
"foo-.+"
```

The following patterns are considered violations:

```css
@custom-media --bar (min-width: 30em);
```

The following patterns are *not* considered violations:

```css
@custom-media --foo-bar (min-width: 30em);
```
