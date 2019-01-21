# at-rule-no-unknown

Disallow unknown at-rules.

```css
    @unknown (max-width: 960px) {}
/** ↑
 * At-rules like this */
```

This rule considers at-rules defined in the CSS Specifications, up to and including Editor's Drafts, to be known.

## Options

### `true`

The following patterns are considered violations:

```css
@unknown {}
```

The following patterns are *not* considered violations:

```css
@charset "UTF-8";
```

```css
@CHARSET "UTF-8";
```

```css
@media (max-width: 960px) {}
```

```css
@font-feature-values Font One {
  @styleset {}
}
```

## Optional secondary options

### `ignoreAtRules: ["/regex/", "string"]`

Given:

```js
["/^my-/", "custom"]
```

The following patterns are *not* considered violations:

```css
@my-at-rule "x.css";
```

```css
@my-other-at-rule {}
```

```css
@custom {}
```
