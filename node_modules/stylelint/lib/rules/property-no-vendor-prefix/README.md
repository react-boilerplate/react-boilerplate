# property-no-vendor-prefix

Disallow vendor prefixes for properties.

```css
a { -webkit-transform: scale(1); }
/**  ↑
 * These prefixes */
```

This rule does not blanketly condemn vendor prefixes. Instead, it uses [Autoprefixer's](https://github.com/postcss/autoprefixer) up-to-date data (from [caniuse.com](http://caniuse.com/)) to know whether a vendor prefix should cause a violation or not. *If you've included a vendor prefixed property that has a standard alternative, one that Autoprefixer could take care of for you, this rule will complain about it*. If, however, you use a non-standard vendor-prefixed property, one that Autoprefixer would ignore and could not provide (such as `-webkit-touch-callout`), this rule will ignore it.

## Options

### `true`

The following patterns are considered violations:

```css
a { -webkit-transform: scale(1); }
```

```css
a { -moz-columns: 2; }
```

The following patterns are *not* considered violations:

```css
a { transform: scale(1); }
```

```css
a {
columns: 2; }
```

```css
a { -webkit-touch-callout: none; }
```

## Optional secondary options

### `ignoreProperties: ["/regex/", "string"]`

Given:

```js
["transform", "columns"]
```

The following patterns are *not* considered violations:

```css
a { -webkit-transform: scale(1); }
```

```css
a { -moz-columns: 2; }
```
