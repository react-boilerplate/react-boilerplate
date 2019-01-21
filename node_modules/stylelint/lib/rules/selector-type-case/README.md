# selector-type-case

Specify lowercase or uppercase for type selectors.

```css
    a {}
/** ↑
 * This is type selector */
```

The `--fix` option on the [command line](../../../docs/user-guide/cli.md#autofixing-errors) can automatically fix all of the problems reported by this rule.

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
