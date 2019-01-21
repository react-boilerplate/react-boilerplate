# keyframes-name-pattern

Specify a pattern for keyframe names.

```css
@keyframes slide-right {}
/**             ↑
 * The pattern of this */
```

## Options

`regex|string`

A string will be translated into a RegExp — `new RegExp(yourString)` — so *be
sure to escape properly*.

Given the string:

```js
"foo-.+"
```

The following patterns are considered violations:

```css
@keyframes foo {}
```

```css
@keyframes bar {}
```

```css
@keyframes FOO-bar {}
```

The following patterns are *not* considered violations:

```css
@keyframes foo-bar {}
```
