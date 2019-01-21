# at-rule-blacklist

Specify a blacklist of disallowed at-rules.

```css
    @keyframes name {}
/** ↑
 * At-rules like this */
```

This rule ignores `@import` in Less.

## Options

`array|string`: `["array", "of", "unprefixed", "at-rules"]|"at-rule"`

Given:

```js
["extend", "keyframes"]
```

The following patterns are considered violations:

```css
a { @extend placeholder; }
```

```css
@keyframes name {
  from { top: 10px; }
  to { top: 20px; }
}
```

```css
@-moz-keyframes name {
  from { top: 10px; }
  to { top: 20px; }
}
```

The following patterns are *not* considered violations:

```css
@import "path/to/file.css";
```
