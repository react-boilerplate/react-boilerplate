# max-nesting-depth

Limit the allowed nesting depth.

```css
a { & > b { top: 0; } }
/** ↑
 * This nesting */
```

This rule works by checking rules' and at-rules' actual "nesting depth" against your specified max. Here's how nesting depths works:

```css
a {
  & b { /* nesting depth 1 */
    & .foo { /* nesting depth 2 */
      @media print { /* nesting depth 3 */
        & .baz { /* nesting depth 4 */
          color: pink;
        }
      }
    }
  }
}
```

Note that **root-level at-rules will *not* be included in the nesting depth calculation**, because most users would take for granted that root-level at-rules are "free" (because necessary). So both of the following `.foo` rules have a nesting depth of 2, and will therefore pass if your `max` is less than or equal to 2:

```css
a {
  b { /* 1 */
    .foo {} /* 2 */
  }
}

@media print { /* ignored */
  a {
    b { /* 1 */
      .foo {} /* 2 */
    }
  }
}
```

This rule integrates into stylelint's core the functionality of the (now deprecated) plugin [`stylelint-statement-max-nesting-depth`](https://github.com/davidtheclark/stylelint-statement-max-nesting-depth).

## Options

`int`: Maximum nesting depth allowed.

For example, with `2`:

The following patterns are considered violations:

```css
a {
  & .foo { /* 1 */
    &__foo { /* 2 */
      & > .bar {} /* 3 */
    }
  }
}
```

```css
a {
  @media print { /* 1 */
    & .foo { /* 2 */
      & .bar {} /* 3 */
    }
  }
}
```

The following patterns are *not* considered violations:

```css
a {
  & .foo { /* 1 */
    &__foo {} /* 2 */
  }
}

a .foo__foo .bar .baz {}
```

```css
@media print {
  a {
    & .foo { /* 1 */
      &__foo {} /* 2 */
    }
  }
}
```

## Optional secondary options

### `ignore: ["blockless-at-rules"]`

Ignore at-rules that only wrap other rules, and do not themselves have declaration blocks.

For example, with `1`:

The following patterns are considered violations:

As the at-rules have a declarations blocks.

```css
a {
  &:hover { /* 1 */
    @media (min-width: 500px) { color: pink; } /* 2 */
  }
}
```

```css
a {
  @nest > b { /* 1 */
    .foo { color: pink; } /* 2 */
  }
}
```

The following patterns are *not* considered violations:

As all of the following `.foo` rules would have a nesting depth of just 1.

```css
a {
  .foo { color: pink; } /* 1 */
}
```

```css
@media print { /* ignored regardless of options */
  a {
    .foo { color: pink; } /* 1 */
  }
}
```

```css
a {
  @media print { /* ignored because it's an at-rule without a declaration block of its own */
    .foo { color: pink; } /* 1 */
  }
}
```

### `ignoreAtRules: ["/regex/", "string"]`

Ignore the specified at-rules.

For example, with `1` and given:

```js
["/^my-/", "media"]
```

The following patterns are *not* considered violations:

```css
a {
  @media print {      /* 1 */
    b {               /* 2 */
      c { top: 0; }   /* 3 */
    }
  }
}
```

```css
a {
  b {                 /* 1 */
    @media print {    /* 2 */
      c { top: 0; }   /* 3 */
    }
  }
}
```

```css
a {
  @my-at-rule print {  /* 1 */
    b {                /* 2 */
      c { top: 0; }    /* 3 */
    }
  }
}
```

```css
a {
  @my-other-at-rule print {  /* 1 */
    b {                      /* 2 */
      c { top: 0; }          /* 3 */
    }
  }
}
```

The following patterns are considered violations:

```css
a {
  @import print {       /* 1 */
    b { top: 0; }       /* 2 */
  }
}
```

```css
a {
  @not-my-at-rule print {   /* 1 */
    b { top: 0; }       /* 2 */
  }
}
```
