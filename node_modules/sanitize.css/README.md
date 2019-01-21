# sanitize.css

<a href="https://github.com/jonathantneal/sanitize.css"><img src="https://jonathantneal.github.io/sanitize.css/logo.svg" alt="sanitize.css logo" width="80" height="80" align="right"></a>

> The best-practices CSS foundation.

[![npm][npm-image]][npm-url] [![bower][bower-image]][bower-url]
[![ci][ci-image]][ci-url] [![gitter][gitter-image]][gitter-url]

[sanitize.css] is a CSS library that corrects broken and missing styles in all
browsers, preserving useful defaults rather than unstyling everything. It’s
developed alongside [normalize.css], so every normalization includes the
browsers or browser versions being targeted, and every opinionated change is
marked and documented.

##### NPM

```sh
npm install --save sanitize.css
```

##### Bower

```sh
bower install --save sanitize-css
```

##### CDN

[cdnjs](https://cdnjs.com/libraries/10up-sanitize.css)

## Features

##### Backgrounds should not repeat by default

```css
* {
	background-repeat: no-repeat;
}
```

##### Box sizing should be inherited and default to border-box

```css
* {
	box-sizing: inherit;
}

html {
	box-sizing: border-box;
}
```

##### Cursor should only change to hint non-obvious interfaces

```css
html {
	cursor: default;
}
```

##### Regular text should be sans serif with a comfortable line height

```css
html {
	font-family: sans-serif
	line-height: 1.5;
}
```

##### Documents should not use a margin for outer padding

```css
body {
	margin: 0;
}
```

##### Navigation lists should not include a marker style

```css
nav ol, nav ul {
	list-style: none;
}
```

##### Text selections should not include text shadows

```css
::selection {
	text-shadow: none;
}
```

##### Media elements should align to the text center of other content

```css
audio, canvas, iframe, img, svg, video {
	vertical-align: middle;
}
```

##### SVGs should fallback to their surrounding text color

```css
svg {
	fill: currentColor;
}
```

##### Outlines are redundant on hovered links

```css
:hover {
	outline-width: 0;
}
```

##### Tables should not include additional border spacing

```css
table {
	border-collapse: collapse;
	border-spacing: 0;
}
```

##### Form controls should be fully style-able

```css
button, input, select, textarea {
	background-color: transparent;
	border-style: none;
	color: inherit;
	font-size: 1em;
}
```

##### Textarea should only resize vertically by default

```css
textarea {
	resize: vertical;
}
```

##### ARIA roles should include visual cursor hints

```css
[aria-busy="true"] {
	cursor: progress;
}

[aria-controls] {
	cursor: pointer;
}

[aria-disabled] {
	cursor: default;
}
```

##### Single taps should be dispatched immediately on clickable elements

```css
a, area, button, input, label, select, textarea, [tabindex] {
	-ms-touch-action: manipulation; /* 1 */
	touch-action: manipulation;
}
```

##### Visually hidden content should remain accessible

```css
[hidden][aria-hidden="false"] {
	clip: rect(0, 0, 0, 0);
	display: inherit;
	position: absolute;
}

[hidden][aria-hidden="false"]:focus {
	clip: auto;
}
```

## Differences

[sanitize.css] styles elements more consistently with developers’ expectations
and preferences. [normalize.css] styles elements more consistently between
browsers. [reset.css] unstyles every element. Both sanitize.css and
normalize.css are maintained in sync, and both projects correct browser bugs
while carefully testing and documenting every change.

## Support

At present, sanitize.css supports the current and previous major releases of
popular web browsers. When a new version is released, we begin supporting that
newer version and stop supporting the third version back. Additionally, many
older browsers remain supported without supplementary CSS.

Currently tested and supported browsers in the latest release include
**Android 4.3-4.4+**, **Chrome 50-51+**, **Edge 12-13+**, **Firefox 46-47+**,
**Internet Explorer 10-11**, **iOS 7-8+**, **Opera 37-38+**, **Safari 8-9+**,
and **Windows Phone 8.1+**.

Additionally tested and supported browsers (requiring little supplementary CSS)
include **Internet Explorer 9** and **Safari 7**.

## License

**sanitize.css** is dedicated to the [public domain](LICENSE.md).

[bower-image]:  https://img.shields.io/bower/v/sanitize-css.svg?style=flat-square
[bower-url]:    https://libraries.io/bower/sanitize-css
[ci-image]:     https://img.shields.io/travis/jonathantneal/sanitize.css.svg?style=flat-square
[ci-url]:       https://travis-ci.org/jonathantneal/sanitize.css
[gitter-image]: https://img.shields.io/gitter/room/jonathantneal/sanitize.css.svg?style=flat-square
[gitter-url]:   https://gitter.im/jonathantneal/sanitize.css
[npm-image]:    https://img.shields.io/npm/v/sanitize.css.svg?style=flat-square
[npm-url]:      https://www.npmjs.com/package/sanitize.css

[normalize.css]: https://github.com/necolas/normalize.css
[reset.css]:     http://meyerweb.com/eric/tools/css/reset/
[sanitize.css]:  https://github.com/jonathantneal/sanitize.css
