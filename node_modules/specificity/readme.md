# Specificity Calculator

A JavaScript module for calculating and comparing the [specificity of CSS selectors](http://www.w3.org/TR/css3-selectors/#specificity). The module is used on the [Specificity Calculator](http://specificity.keegan.st/) website.

Specificity Calculator is built for CSS Selectors Level 3. Specificity Calculator isn’t a CSS validator. If you enter invalid selectors it will return incorrect results. For example, the [negation pseudo-class](http://www.w3.org/TR/css3-selectors/#negation) may only take a simple selector as an argument. Using a psuedo-element or combinator as an argument for `:not()` is invalid CSS3 so Specificity Calculator will return incorrect results.


## Front-end usage

```js
SPECIFICITY.calculate('ul#nav li.active a');   // [{ specificity: '0,1,1,3' }]
```

## Node.js usage

```js
var specificity = require('specificity');
specificity.calculate('ul#nav li.active a');   // [{ specificity: '0,1,1,3' }]
```

## Passing in multiple selectors

You can use comma separation to pass in multiple selectors:

```js
SPECIFICITY.calculate('ul#nav li.active a, body.ie7 .col_3 h2 ~ h2');   // [{ specificity: '0,1,1,3' }, { specificity: '0,0,2,3' }]
```

## Return values

The `specificity.calculate` function returns an array containing a result object for each selector input. Each result object has the following properties:

  * `selector`: the input
  * `specificity`: the result as a string e.g. `0,1,0,0`
  * `specificityArray`: the result as an array of numbers e.g. `[0, 1, 0, 0]`
  * `parts`: array with details about each part of the selector that counts towards the specificity

## Example

```js
var specificity = require('../'),
    result = specificity.calculate('ul#nav li.active a');

console.log(result);

/* result =
[ {
    selector: 'ul#nav li.active a',
    specificity: '0,1,1,3',
    specificityArray: [0, 1, 1, 3],
    parts: [
      { selector: 'ul', type: 'c', index: 0, length: 2 },
      { selector: '#nav', type: 'a', index: 2, length: 4 },
      { selector: 'li', type: 'c', index: 5, length: 2 },
      { selector: '.active', type: 'b', index: 8, length: 7 },
      { selector: 'a', type: 'c', index: 13, length: 1 }
    ]
} ]
*/
```

## Comparing two selectors

Specificity Calculator also exposes a `compare` function. This function accepts two CSS selectors or specificity arrays, `a` and `b`.

  * It returns `-1` if `a` has a lower specificity than `b`
  * It returns `1` if `a` has a higher specificity than `b`
  * It returns `0` if `a` has the same specificity than `b`

```js
SPECIFICITY.compare('div', '.active');         // -1
SPECIFICITY.compare('#main', 'div');           // 1
SPECIFICITY.compare('span', 'div');            // 0
SPECIFICITY.compare('span', [0,0,0,1]);        // 0
SPECIFICITY.compare('#main > div', [0,1,0,1]); // 0
```

## Ordering an array of selectors by specificity

You can pass the `SPECIFICITY.compare` function to `Array.prototype.sort` to sort an array of CSS selectors by specificity.

```js
['#main', 'p', '.active'].sort(SPECIFICITY.compare);   // ['p', '.active', '#main']
```

## Command-line usage

Run `npm install specificity` to install the module locally, or `npm install -g specificity` for global installation. You may need to elevate permissions by `sudo` for the latter. Run `specificity` without arguments to learn about its usage:

```bash
$ specificity
Usage: specificity <selector>
Computes specificity of a CSS selector.
```

Pass a selector as the first argument to get its specificity computed:

```bash
$ specificity "ul#nav li.active a"
0,1,1,3
```

## Testing

To install dependencies, run: `npm install`

Then to test, run: `npm test`
