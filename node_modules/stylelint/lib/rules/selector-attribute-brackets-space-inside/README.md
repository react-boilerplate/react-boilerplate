# selector-attribute-brackets-space-inside

Require a single space or disallow whitespace on the inside of the brackets within attribute selectors.

```css
    [ target=_blank ]
/** ↑               ↑
 * The space inside these two brackets */
```

## Options

`string`: `"always"|"never"`

### `"always"`

There *must always* be a single space inside the brackets.

The following patterns are considered violations:

```css
[target] {}
```

```css
[ target] {}
```

```css
[target ] {}
```

```css
[target=_blank] {}
```

```css
[ target=_blank] {}
```

```css
[target=_blank ] {}
```

The following patterns are *not* considered violations:

```css
[ target ] {}
```

```css
[ target=_blank ] {}
```

### `"never"`

There *must never* be whitespace on the inside the brackets.

The following patterns are considered violations:

```css
[ target] {}
```

```css
[target ] {}
```

```css
[ target ] {}
```

```css
[ target=_blank] {}
```

```css
[target=_blank ] {}
```

```css
[ target=_blank ] {}
```

The following patterns are *not* considered violations:

```css
[target] {}
```

```css
[target=_blank] {}
```
