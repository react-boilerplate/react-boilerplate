# mathml-tag-names [![Build Status][build-badge]][build-page]

List of known MathML tag-names.  Includes the elements from
[MathML 1][mathml1], [MathML 2][mathml2], and
[MathML 3][mathml3].

The repo contains a script to crawl specs to include newly introduced
tag-names.

## Installation

[npm][]:

```bash
npm install mathml-tag-names
```

## Usage

```javascript
var mathMLTagNames = require('mathml-tag-names')

console.log(mathMLTagNames.length) // => 202

console.log(mathMLTagNames.slice(0, 20))
```

Yields:

```js
[ 'abs',
  'and',
  'annotation',
  'annotation-xml',
  'apply',
  'approx',
  'arccos',
  'arccosh',
  'arccot',
  'arccoth',
  'arccsc',
  'arccsch',
  'arcsec',
  'arcsech',
  'arcsin',
  'arcsinh',
  'arctan',
  'arctanh',
  'arg',
  'bind' ]
```

## API

### `mathMLTagNames`

`Array.<string>` — List of lower-case tag-names.

## Related

*   [`html-tag-names`](https://github.com/wooorm/html-tag-names)
    — List of HTML tags
*   [`svg-tag-names`](https://github.com/wooorm/svg-tag-names)
    — List of SVG tags
*   [`svg-element-attributes`](https://github.com/wooorm/svg-element-attributes)
    — Map of SVG elements to allowed attributes
*   [`html-element-attributes`](https://github.com/wooorm/html-element-attributes)
    — Map of HTML elements to allowed attributes
*   [`aria-attributes`](https://github.com/wooorm/aria-attributes)
    — List of ARIA attributes

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definition -->

[build-badge]: https://img.shields.io/travis/wooorm/mathml-tag-names.svg

[build-page]: https://travis-ci.org/wooorm/mathml-tag-names

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[mathml1]: https://www.w3.org/TR/1998/REC-MathML-19980407/appendixF.html

[mathml2]: https://www.w3.org/TR/MathML2/appendixl.html

[mathml3]: https://www.w3.org/TR/MathML3/appendixi.html
