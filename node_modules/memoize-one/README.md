# memoize-one

A memoization library that only caches the result of the most recent arguments.

[![Build Status](https://travis-ci.org/alexreardon/memoize-one.svg?branch=master)](https://travis-ci.org/alexreardon/memoize-one)
[![npm](https://img.shields.io/npm/v/memoize-one.svg)](https://www.npmjs.com/package/memoize-one)
[![dependencies](https://david-dm.org/alexreardon/memoize-one.svg)](https://david-dm.org/alexreardon/memoize-one)
[![Downloads per month](https://img.shields.io/npm/dm/memoize-one.svg)](https://www.npmjs.com/package/memoize-one)
[![min](https://img.shields.io/bundlephobia/min/memoize-one.svg)](https://www.npmjs.com/package/memoize-one)
[![minzip](https://img.shields.io/bundlephobia/minzip/memoize-one.svg)](https://www.npmjs.com/package/memoize-one)

## Rationale

Cache invalidation is hard:

> There are only two hard things in Computer Science: cache invalidation and naming things.
>
> *Phil Karlton*

So keep things simple and just use a cache size of one!

Unlike other memoization libraries, `memoize-one` only remembers the latest arguments and result. No need to worry about cache busting mechanisms such as `maxAge`, `maxSize`, `exclusions` and so on which can be prone to memory leaks. `memoize-one` simply remembers the last arguments, and if the function is next called with the same arguments then it returns the previous result.

## Usage

### Standard usage

```js
import memoizeOne from 'memoize-one';

const add = (a, b) => a + b;
const memoizedAdd = memoizeOne(add);

memoizedAdd(1, 2); // 3

memoizedAdd(1, 2); // 3
// Add function is not executed: previous result is returned

memoizedAdd(2, 3); // 5
// Add function is called to get new value

memoizedAdd(2, 3); // 5
// Add function is not executed: previous result is returned

memoizedAdd(1, 2); // 3
// Add function is called to get new value.
// While this was previously cached,
// it is not the latest so the cached result is lost
```

### Custom equality function

You can also pass in a custom function for checking the equality of two items. The equality function will is used to compare the value of every individual argument.

```js
import memoizeOne from 'memoize-one';
import deepEqual from 'lodash.isEqual';

const identity = x => x;

const defaultMemoization = memoizeOne(identity);
const customMemoization = memoizeOne(identity, deepEqual);

const result1 = defaultMemoization({foo: 'bar'});
const result2 = defaultMemoization({foo: 'bar'});

result1 === result2 // false - difference reference

const result3 = customMemoization({foo: 'bar'});
const result4 = customMemoization({foo: 'bar'});

result3 === result4 // true - arguments are deep equal
```

#### Equality function type signature

Here is the expected [flow](http://flowtype.org) type signature for a custom equality function:

```js
type EqualityFn = (newValue: mixed, oldValue: mixed, index: number) => boolean;
```

The default equality function is a simple shallow equal check

```js
const simpleIsEqual: EqualityFn = (a: mixed, b: mixed): boolean => a === b;
```

#### Equality function with multiple arguments

If the function you want to memoize takes multiple arguments, your custom equality function will be called once for each argument and will be passed each argument's new value and last value.

```js
import memoizeOne from 'memoize-one';

const makeCountObj = (first, second, third) => ({
  first: first.count,
  second: second.count,
  third: third.count,
});

const areCountPropertiesEqual = (newArg, lastArg) => newArg.count === lastArg.count;
// runs once for first's new and last values, once for second's, etc.

const memoizedMakeCountObj = memoizeOne(makeCountObj, areCountPropertiesEqual);

const result1 = memoizedMakeCountObj(
  {a: '?', count: 1},
  {a: '$', count: 2},
  {a: '#', count: 3}
);
const result2 = memoizedMakeCountObj(
  {b: null, count: 1},
  {b: null, count: 2},
  {b: null, count: 3}
);

result1 === result2; // true - same reference
```

#### Equality function index

For each call of the equality function you are provided with the index of the argument.

```js
import memoizeOne from 'memoize-one';
import deepEqual from 'lodash.isEqual';

const myEqualFn = (newArg, lastArg, index) => {
  // use deep equal for first arg
  if(index === 0) {
    return deepEqual(newArg, lastArg);
  }
  // use shallow equal for all other arguments
  return newArg === lastArg;
}

const fn = (...args) => {
  console.log('called with', ...args);
};
const memoized = memoizeOne(fn, myEqualFn);

memoized({hello: 'world'}, 5);
// console.log('called with', {hello: 'world'}, 5);

memoized({hello: 'world'}, 5);
// no call to console.log
```

## Installation

```bash
# yarn
yarn add memoize-one

# npm
npm install memoize-one --save
```

## Module usage

### ES6 module

```js
import memoizeOne from 'memoize-one';
```

### CommonJS

If you are in a CommonJS environment (eg [Node](https://nodejs.org)), then **you will need to add `.default` to your import**:

```js
const memoizeOne = require('memoize-one').default;
```

## `this`

### `memoize-one` correctly respects `this` control

This library takes special care to maintain, and allow control over the the `this` context for **both** the original function being memoized as well as the returned memoized function. Both the original function and the memoized function's `this` context respect [all the `this` controlling techniques](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch2.md):

- new bindings (`new`)
- explicit binding (`call`, `apply`, `bind`);
- implicit binding (call site: `obj.foo()`);
- default binding (`window` or `undefined` in `strict mode`);
- fat arrow binding (binding to lexical `this`)
- ignored this (pass `null` as `this` to explicit binding)

### Changes to `this` is considered an argument change

Changes to the running context (`this`) of a function can result in the function returning a different value even though its arguments have stayed the same:

```js
function getA() {
  return this.a;
}

const temp1 = {
  a: 20,
};
const temp2 = {
  a: 30,
}

getA.call(temp1); // 20
getA.call(temp2); // 30
```

Therefore, in order to prevent against unexpected results, `memoize-one` takes into account the current execution context (`this`) of the memoized function. If `this` is different to the previous invocation then it is considered a change in argument. [further discussion](https://github.com/alexreardon/memoize-one/issues/3).

Generally this will be of no impact if you are not explicity controlling the `this` context of functions you want to memoize with [explicit binding](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch2.md#explicit-binding)  or [implicit binding](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch2.md#implicit-binding). `memoize-One` will detect when you are manipulating `this` and will then consider the `this` context as an argument. If `this` changes, it will re-execute the original function even if the arguments have not changed.

## When your result function `throw`s

> There is no caching when your result function throws

If your result function `throw`s then the memoized function will also throw. The throw will not break the memoized functions existing argument cache. It means the memoized function will pretend like it was never called with arguments that made it `throw`.

```js
const canThrow = (name: string) => {
  console.log('called');
  if(name === 'throw') {
    throw new Error(name);
  }
  return { name };
}

const memoized = memoizeOne(canThrow);

const value1 = memoized('Alex');
// console.log => 'called'
const value2 = memoized('Alex');
// result function not called

console.log(value1 === value2);
// console.log => true

try {
  memoized('throw');
  // console.log => 'called'
} catch(e) {
  firstError = e;
}

try {
  memoized('throw');
  // console.log => 'called'
  // the result function was called again even though it was called twice
  // with the 'throw' string
} catch(e) {
  secondError = e;
}

console.log(firstError !== secondError);


const value3 = memoized('Alex');
// result function not called as the original memoization cache has not been busted
console.log(value1 === value3);
// console.log => true
```

## Performance :rocket:

### Tiny

`memoize-one` is super lightweight at [![min](https://img.shields.io/bundlephobia/min/memoize-one.svg?label=)](https://www.npmjs.com/package/memoize-one) minified and [![minzip](https://img.shields.io/bundlephobia/minzip/memoize-one.svg?label=)](https://www.npmjs.com/package/memoize-one) gzipped. (`1KB` = `1,024 Bytes`)

### Extremely fast

`memoize-one` performs better or on par with than other popular memoization libraries for the purpose of remembering the latest invocation.

**Results**

- [simple arguments](https://www.measurethat.net/Benchmarks/ShowResult/4452)
- [complex arguments](https://www.measurethat.net/Benchmarks/ShowResult/4488)

The comparisions are not exhaustive and are primiarly to show that `memoize-one` accomplishes remembering the latest invocation really fast. The benchmarks do not take into account the differences in feature sets, library sizes, parse time, and so on.

## Code health :thumbsup:

- Tested with all built in [JavaScript types](https://github.com/getify/You-Dont-Know-JS/blob/master/types%20%26%20grammar/ch1.md).
- 100% code coverage
- [Continuous integration](https://travis-ci.org/alexreardon/memoize-one) to run tests and type checks.
- [`Flow` types](http://flowtype.org) for safer internal execution and external consumption. Also allows for editor autocompletion.
- Follows [Semantic versioning (2.0)](http://semver.org/) for safer consumption.
- No dependencies
