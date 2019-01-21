# media-feature-name-case

Specify lowercase or uppercase for media feature names.

```css
@media (min-width: 700px) {}
/**     ↑
 * These media feature names */
```

This rule ignores media feature names within a range context.

The `--fix` option on the [command line](../../../docs/user-guide/cli.md#autofixing-errors) can automatically fix all of the problems reported by this rule.

## Options

`string`: `"lower"|"upper"`

### `"lower"`

The following patterns are considered violations:

```css
@media (MIN-WIDTH: 700px) {}
```

```css
@media not all and (MONOCHROME) {}
```

```css
@media (min-width: 700px) and (ORIENTATION: landscape) {}
```

The following patterns are *not* considered violations:

```css
@media (min-width: 700px) {}
```

```css
@media not all and (monochrome) {}
```

```css
@media (min-width: 700px) and (orientation: landscape) {}
```

### `"upper"`

The following patterns are considered violations:

```css
@media (min-width: 700px) {}
```

```css
@media not all and (monochrome) {}
```

```css
@media (MIN-WIDTH: 700px) and (orientation: landscape) {}
```

The following patterns are *not* considered violations:

```css
@media (MIN-WIDTH: 700px) {}
```

```css
@media not all and (MONOCHROME) {}
```

```css
@media (MIN-WIDTH: 700px) and (ORIENTATION: landscape) {}
```
