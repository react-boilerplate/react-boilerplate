# comment-whitespace-inside

Require or disallow whitespace on the inside of comment markers.

```css
    /* comment */
/**  ↑         ↑
 * The space inside these two markers */
```

Any number of asterisks are allowed at the beginning or end of the comment. So `/** comment **/` is treated the same way as `/* comment */`.

**Caveat:** Comments within *selector and value lists* are currently ignored.

## Options

`string`: `"always"|"never"`

### `"always"`

There *must always* be whitespace inside the markers.

The following patterns are considered violations:

```css
/*comment*/
```

```css
/*comment */
```

```css
/** comment**/
```

The following patterns are *not* considered violations:

```css
/* comment */
```

```css
/** comment **/
```

```css
/**
 * comment
 */
```

```css
/*     comment
*/
```

### `"never"`

There *must never* be whitespace on the inside the markers.

The following patterns are considered violations:

```css
/* comment */
```

```css
/*comment */
```

```css
/** comment**/
```

The following patterns are *not* considered violations:

```css
/*comment*/
```

```css
/****comment****/
```
