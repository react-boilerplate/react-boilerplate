# selector-no-vendor-prefix

Disallow vendor prefixes for selectors.

```css
input::-moz-placeholder {}
/**     ↑
 * These prefixes */
```

This rule does not blanketly condemn vendor prefixes. Instead, it uses [Autoprefixer's](https://github.com/postcss/autoprefixer) up-to-date data (from [caniuse.com](http://caniuse.com/)) to know whether a vendor prefix should cause a violation or not. *If you've included a vendor prefixed selector that has a standard alternative, one that Autoprefixer could take care of for you, this rule will complain about it*. If, however, you use a non-standard vendor-prefixed selector, one that Autoprefixer would ignore and could not provide, this rule will ignore it.

## Options

### `true`

The following patterns are considered violations:

```css
input::-moz-placeholder {}
```

```css
:-webkit-full-screen a {}
```

The following patterns are *not* considered violations:

```css
input::placeholder {}
```

```css
:full-screen a {}
```
