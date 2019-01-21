# custom-property-pattern

Specify a pattern for custom properties.

```css
a { --foo-: 1px; }
/**   ↑
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
:root { --boo-bar: 0; }
```

The following patterns are *not* considered violations:

```css
:root { --foo-bar: 0; }
```
