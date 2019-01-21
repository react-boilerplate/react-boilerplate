# keyframe-declaration-no-important

Disallow `!important` within keyframe declarations.

```css
@keyframes important2 {
  from { margin: 10px }
  to { margin: 20px !important }
}                /* ↑ */
/**                 ↑
*     This !important */
```

Using `!important` within keyframes declarations is completely ignored in some browsers:  
[MDN - !important in a keyframe](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes#!important_in_a_keyframe)

## Options

### `true`

The following patterns are considered violations:

```css
@keyframes important1 {
  from {
    margin-top: 50px;
  }
  to {
    margin-top: 100px !important;
  }
}
```

```css
@keyframes important1 {
  from {
    margin-top: 50px;
  }
  to {
    margin-top: 100px!important;
  }
}
```

```css
@keyframes important1 {
  from {
    margin-top: 50px;
  }
  to {
    margin-top: 100px ! important;
  }
}
```

The following patterns are *not* considered violations:

```css
a { color: pink !important; }
```

```css
@keyframes important1 {
  from {
    margin-top: 50px;
  }
  to {
    margin-top: 100px;
  }
}
```
