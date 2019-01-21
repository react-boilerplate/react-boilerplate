# selector-attribute-operator-blacklist

Specify a blacklist of disallowed attribute operators.

```css
[target="_blank"] {}
/**    ↑
 * These operators */
```

## Options

`array|string`: `["array", "of", "operators"]|"operator"`

Given:

```js
[ "*=" ]
```

The following patterns are considered violations:

```css
[class*="test"] {}
```

The following patterns are *not* considered violations:

```css
[target] {}
```

```css
[target="_blank"] {}
```

```css
[class|="top"] {}
```
