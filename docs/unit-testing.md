# Unit testing

Unit testing is the practice of testing the smallest possible *units* of our code, functions. We run our tests and automatically verify that our functions do the thing we expect them to do. We assert that, given a set of inputs, our functions return the proper values and handle problems.

This boilerplate uses the [Mocha](https://github.com/mochajs/mocha) test framework to run the tests and [expect](http://github.com/mjackson/expect) for assertions. These libraries make writing tests as easy as speaking - you `describe` a unit of your code and `expect` `it` to do the correct thing.

## General

We use this glob pattern to find unit tests `app/**/*.test.js` - this tells mocha to run all files that end with `.test.js` anywhere within the `app` folder. Use this to your advantage, and put unit tests next to the files you want to test so relevant files stay together!

Imagine a navigation bar, this is what its folder might look like:

```
NavBar                   # Wrapping folder
├── NavBar.css           # Styles
├── NavBar.react.js      # Actual component
├── NavBar.actions.js    # Actions
├── NavBar.constants.js  # Constants
├── NavBar.reducer.js    # Reducer
└── test                        # Folder of tests
│   ├── NavBar.actions.test.js  # Actions tests
│   └── NavBar.reducer.test.js  # Reducer tests
```

For the sake of this guide, lets pretend we're testing this function. It is situated in the `add.js` file:

```JS
// add.js

export function add(x, y) {
  return x + y;
}
```

> Note: The `export` here is ES6 syntax, and you will need an ES6 transpiler (e.g. babel.js) to run this JavaScript.

> The `export` exports our function as a module, which we can `import` and use in other files. Continue below to see what that looks like:

## Mocha

Mocha is our unit testing framework. Its API, which we write tests with, is very speech like.

We're going to add a second file called `add.test.js` with our unit tests inside. Running said unit tests requires us to enter `mocha add.test.js` into the command line.

First, we `import` the function in our `add.test.js` file:

```JS
// add.test.js

import { add } from './add.js';
```

Second, we `describe` our function:

```JS
describe('add()', () => {

});
```

> Note: `(arg1, arg2) => { }` is ES6 notation for anonymous (without a name) functions, i.e. is the same thing as `function(arg1, arg2) { }`

Third, we tell Mocha what `it` (our function) should do:

```JS
describe('add()', () => {
  it('adds two numbers', () => {

  });

  it('doesnt add the third number', () => {

  });
});
```

That's the entire Mocha part! Onwards to the actual tests.

## expect

Using expect, we `expect` our little function to return the same thing every time given the same input.

First, we have to import `expect` at the top of our file, before the tests:

```JS
import expect from 'expect';

describe('add()', () => {
  // [...]
});
```

We're going to test that our little function correctly adds two numbers first. We are going to take some chosen inputs, and `expect` the result `toEqual` the corresponding output:

```JS
// [...]
it('adds two numbers', () => {
  expect(add(2, 3)).toEqual(5);
});
// [...]
```

Lets add the second test, which determines that our function doesn't add the third number if one is present:

```JS
// [...]
it('doesnt add the third number', () => {
 expect(add(2, 3, 5)).toEqual(add(2, 3));
});
// [...]
```

> Note: Notice that we call `add` in `toEqual`. I won't tell you why, think about what would happen if we would rewrite the expect as `expect(add(2, 3, 5)).toEqual(5)` and somebody changed the add function.

Should our function work, Mocha will show this output when running the tests:

```
add()
  ✓ adds two numbers
  ✓ doesnt add the third number
```

Lets say an unnamed colleague of ours breaks our function:

```JS
// add.js

export function add(x, y) {
  return x * y;
}
```

Oh no, now our function doesn't add the numbers anymore, it multiplies them! Imagine the consequences to our code that uses the function!

Thankfully, we have unit tests in place. Because we run the unit tests before we deploy our application, we see this output:

```
add()
  1) adds two numbers
  ✓ doesnt add the third number

  1) add adds two numbers:
    Error: Expected 6 to equal 5
```

This immediately tells us that something is broken in the add function before any users get the code.
