# selector-attribute-operator-space-after

Require a single space or disallow whitespace after operators within attribute selectors.

```css
[target= _blank]
/**    ↑    
 * The space after operator */
```

The `--fix` option on the [command line](../../../docs/user-guide/cli.md#autofixing-errors) can automatically fix all of the problems reported by this rule.

## Options

`string`: `"always"|"never"`

### `"always"`

There *must always* be a single space after the operator.

The following patterns are considered violations:

```css
[target=_blank] {}
```

```css
[target =_blank] {}
```

```css
[target='_blank'] {}
```

```css
[target="_blank"] {}
```

```css
[target ='_blank'] {}
```

```css
[target ="_blank"] {}
```

The following patterns are *not* considered violations:

```css
[target] {}
```

```css
[target= _blank] {}
```

```css
[target= '_blank'] {}
```

```css
[target= "_blank"] {}
```

```css
[target = _blank] {}
```

```css
[target = '_blank'] {}
```

```css
[target = "_blank"] {}
```

### `"never"`

There *must never* be a single space after the operator.

The following patterns are considered violations:

```css
[target= _blank] {}
```

```css
[target = _blank] {}
```

```css
[target= '_blank'] {}
```

```css
[target= "_blank"] {}
```

```css
[target = '_blank'] {}
```

```css
[target = "_blank"] {}
```

The following patterns are *not* considered violations:

```css
[target] {}
```

```css
[target=_blank] {}
```

```css
[target='_blank'] {}
```

```css
[target="_blank"] {}
```

```css
[target =_blank] {}
```

```css
[target ='_blank'] {}
```

```css
[target ="_blank"] {}
```
