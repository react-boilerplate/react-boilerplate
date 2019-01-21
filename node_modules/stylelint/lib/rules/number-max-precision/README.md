# number-max-precision

Limit the number of decimal places allowed in numbers.

```css
a { top: 3.245634px; }
/**           ↑
 * These decimal places */
```

## Options

`int`: Maximum number of decimal places allowed.

For example, with `2`:

The following patterns are considered violations:

```css
a { top: 3.245px; }
```

```css
a { top: 3.245634px; }
```

```css
@media (min-width: 3.234em) {}
```

The following patterns are *not* considered violations:

```css
a { top: 3.24px; }
```

```css
@media (min-width: 3.23em) {}
```

## Optional secondary options

### `ignoreUnits: ["/regex/", "string"]`

Ignore the precision of numbers for values with the specified units.

For example, with `2`.

Given:

```js
["/^my-/", "%"]
```

The following patterns are considered violations:

```css
a { top: 3.245px; }
```

```css
a { top: 3.245634px; }
```

```css
@media (min-width: 3.234em) {}
```

The following patterns are *not* considered violations:

```css
a { top: 3.245%; }
```

```css
@media (min-width: 3.23em) {}
```

```css
a {
  width: 10.5432%;
}
```

```css
a { top: 3.245my-unit; }
```

```css
a {
  width: 10.989my-other-unit;
}
```
