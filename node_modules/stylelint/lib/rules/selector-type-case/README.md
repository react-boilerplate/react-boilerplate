# selector-type-case

Specify lowercase or uppercase for type selectors.

```css
    a {}
/** ↑
 * This is type selector */
```

## Options

`string`: `"lower"|"upper"`

### `"lower"`

The following patterns are considered violations:

```css
A {}
```

```css
LI {}
```

The following patterns are *not* considered violations:

```css
a {}
```

```css
li {}
```

### `"upper"`

The following patterns are considered violations:

```css
a {}
```

```css
li {}
```

The following patterns are *not* considered violations:

```css
A {}
```

```css
LI {}
```
