# selector-type-no-unknown

Disallow unknown type selectors.

```css
    unknown {}
/** ↑
 * This type selector */
```

This rule considers tags defined in the HTML, SVG, and MathML specifications to be known.

## Options

### `true`

The following patterns are considered violations:

```css
unknown {}
```

```css
tag {}
```

The following patterns are *not* considered violations:

```css
input {}
```

```css
ul li {}
```

```css
li > a {}
```

## Optional secondary options

### `ignore: ["custom-elements", "default-namespace"]`

#### `"custom-elements"`

Allow custom elements.

The following patterns are considered violations:

```css
unknown {}
```

```css
x-Foo {}
```

The following patterns are *not* considered violations:

```css
x-foo {}
```

#### `"default-namespace"`

Allow unknown type selectors if they belong to the default namespace.

The following patterns are considered violations:

```css
namespace|unknown {}
```

The following patterns are *not* considered violations:

```css
unknown {}
```

### `ignoreNamespaces: ["/regex/", "string"]`

Given:

```js
["/^my-/", "custom-namespace"]
```

The following patterns are *not* considered violations:

```css
custom-namespace|unknown {}
```

```css
my-namespace|unknown {}
```

```css
my-other-namespace|unknown {}
```

### `ignoreTypes: ["/regex/", "string"]`

Given:

```js
["/^my-/", "custom-type"]
```

The following patterns are *not* considered violations:

```css
custom-type {}
```

```css
my-type {}
```

```css
my-other-type {}
```
