# font-family-no-missing-generic-family-keyword

Disallow missing generic families in lists of font family names.

```css
a { font-family: Arial, sans-serif; }
/**                     ↑
 * An example of generic family name */
```

This rule checks the `font` and `font-family` properties.

## Options

### `true`

The following patterns are considered violations:

```css
a { font-family: Helvetica, Arial, Verdana, Tahoma; }
```

```css
a { font: 1em/1.3 Times; }
```

The following patterns are *not* considered violations:

```css
a { font-family: Helvetica, Arial, Verdana, Tahoma, sans-serif; }
```

```css
a { font: 1em/1.3 Times, serif; }
```

It's also *not* a violation to use a keyword related to property inheritance.

```css
a { font: inherit; }
b { font: initial; }
i { font: unset; }
```

It's also *not* a violation to use a generic font family anywhere in the list. In other words, the generic font name doesn't need to be the last.

```css
a { font-family: Helvetica Neue, sans-serif, Apple Color Emoji; }
```
