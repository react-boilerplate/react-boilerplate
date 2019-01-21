PostCSS Styled Syntax
====

[![NPM version](https://img.shields.io/npm/v/postcss-styled.svg?style=flat-square)](https://www.npmjs.com/package/postcss-styled)
[![Travis](https://img.shields.io/travis/gucong3000/postcss-styled.svg)](https://travis-ci.org/gucong3000/postcss-styled)
[![Travis](https://img.shields.io/travis/gucong3000/postcss-syntaxes.svg?label=integration)](https://travis-ci.org/gucong3000/postcss-syntaxes)
[![Codecov](https://img.shields.io/codecov/c/github/gucong3000/postcss-styled.svg)](https://codecov.io/gh/gucong3000/postcss-styled)
[![David](https://img.shields.io/david/dev/gucong3000/postcss-styled.svg)](https://david-dm.org/gucong3000/postcss-styled?type=dev)

<img align="right" width="95" height="95"
	title="Philosopher’s stone, logo of PostCSS"
	src="http://postcss.github.io/postcss/logo.svg">

[PostCSS](https://github.com/postcss/postcss) syntax for parsing [styled components](https://github.com/styled-components/styled-components)

## Getting Started

First thing's first, install the module:

```
npm install postcss-styled --save-dev
```

## Use Cases

```js
const postcss = require('postcss');
const stylelint = require('stylelint');
const syntax = require('postcss-styled')({
	// syntax for parse css blocks (non-required options)
	css: require('postcss-safe-parser'),
});
postcss([stylelint({ fix: true })]).process(source, { syntax: syntax }).then(function (result) {
	// An alias for the result.css property. Use it with syntaxes that generate non-CSS output.
	result.content
});
```

input:
```javascript
import styled from 'styled-components';
const Title = styled.h1`
	font-size:   1.5em;
		text-align:  center;
	color: palevioletred;
`;
```

output:
```javascript
import styled from 'styled-components';
const Title = styled.h1`
	font-size: 1.5em;
	text-align: center;
	color: palevioletred;
`;
```

## Advanced Use Cases

See: [postcss-syntax](https://github.com/gucong3000/postcss-syntax)

## Style Transformations

The main use case of this plugin is to apply PostCSS transformations to CSS code in template literals.
