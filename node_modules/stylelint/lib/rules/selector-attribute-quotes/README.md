# selector-attribute-quotes

Require or disallow quotes for attribute values.

```css
[target="_blank"] {}
/**     ↑      ↑
 * These quotes */
```

## Options

`string`: `"always"|"never"`

### `"always"`

Attribute values *must always* be quoted.

The following patterns are considered violations:

```css
[title=flower] {}
```

```css
[class^=top] {}
```

The following patterns are *not* considered violations:

```css
[title] {}
```

```css
[target="_blank"] {}
```

```css
[class|="top"] {}
```

```css
[title~='text'] {}
```

```css
[data-attribute='component'] {}
```

### `"never"`

Attribute values *must never* be quoted.

The following patterns are considered violations:

```css
[target="_blank"] {}
```

```css
[class|="top"] {}
```

```css
[title~='text'] {}
```

```css
[data-attribute='component'] {}
```

The following patterns are *not* considered violations:

```css
[title] {}
```

```css
[title=flower] {}
```

```css
[class^=top] {}
```
