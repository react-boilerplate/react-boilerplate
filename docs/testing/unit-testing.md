# Unit testing

Unit testing is the practice of testing the smallest possible *units* of our
code, functions. We run our tests and automatically verify that our functions
do the thing we expect them to do. We assert that, given a set of inputs, our
functions return the proper values and handle problems.

This boilerplate uses the [Jest](https://github.com/facebook/jest) test
framework to run tests and make assertions. This library makes writing tests as easy as speaking - you
`describe` a unit of your code and `expect` `it` to do the correct thing.

<!-- TOC depthFrom:2 depthTo:4 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Basics](#basics)
	- [Jest](#jest)
- [Testing Redux Applications](#testing-redux-applications)
	- [Reducers](#reducers)
		- [snapshots](#snapshots)
	- [Actions](#actions)

<!-- /TOC -->

We use this glob pattern to find unit tests `app/**/*.test.js` - this tells
Jest to run all files that end with `.test.js` anywhere within the `app`
folder. Use this to your advantage, and put unit tests next to the files you
want to test so relevant files stay together!

## Basics

For the sake of this guide, lets pretend we're testing this function. It's
situated in the `add.js` file:

```javascript
// add.js

export function add(x, y) {
  return x + y;
}
```

> Note: The `export` here is ES6 syntax, and you would need an ES6 transpiler
  (e.g. babel.js) to run this JavaScript.

> The `export` makes our function available as a module, which we can `import` and use
  in other files. Continue below to see what that looks like.

### Jest

Jest is our unit testing framework. Its API, which we write tests with, is
speech like and easy to use.

> Note: The official documentation for Jest can be found [here](https://facebook.github.io/jest/).

We're going to add a second file called `add.test.js` with our unit tests
inside.

First, we `import` the function in our `add.test.js` file:

```javascript
// add.test.js

import { add } from './add.js';
```

Second, we `describe` our function:

```javascript
describe('add()', () => {

});
```

> Note: `(arg1, arg2) => { }` is ES6 notation for anonymous functions, i.e. is
the same thing as `function(arg1, arg2) { }`

Third, we tell Jest what `it` (our function) should do:

```javascript
describe('add()', () => {
  it('adds two numbers', () => {

  });

  it("doesn't add the third number", () => {

  });
});
```

Now, We're going to test that our little function correctly adds two numbers.
We are going to take some chosen inputs, and `expect` the result `toEqual` the
corresponding output:

```javascript
// [...]
it('adds two numbers', () => {
  expect(add(2, 3)).toEqual(5);
});
// [...]
```

Lets add the second test, which determines that our function doesn't add the
third number if one is present:

```javascript
// [...]
it("doesn't add the third number", () => {
 expect(add(2, 3, 5)).toEqual(add(2, 3));
});
// [...]
```

> Note: Notice that we call `add` in `toEqual`. I won't tell you why, but just
  think about what would happen if we rewrote the expect as `expect(add(2, 3, 5)).toEqual(5)`
  and somebody broke something in the add function. What would this test
  actually... test?

Should our function work, Jest will show this output when running the tests:

```
add()
  ✓ adds two numbers
  ✓ doesn't add the third number
```

Lets say an unnamed colleague of ours breaks our function:

```javascript
// add.js

export function add(x, y) {
  return x * y;
}
```

Oh no, now our function doesn't add the numbers anymore, it multiplies them!
Imagine the consequences to our code that uses the function!

Thankfully, we have unit tests in place. Because we run the unit tests before we
deploy our application, we see this output:

```
● add() › adds two numbers

  expect(received).toEqual(expected)

  Expected value to equal:
    5
  Received:
    6

add()
  ✕ adds two numbers
  ✓ doesn't add the third number
```

This tells us that something is broken in the add function before any users get
the code! Congratulations, you just saved time and money!

## Testing Redux Applications

Imagine a navigation bar, this is what its folder might look like:

```
NavBar          # Wrapping folder
├── index.js      # Actual component
├── actions.js    # Actions
├── constants.js  # Constants
├── reducer.js    # Reducer
└── test               # Folder of tests
    ├── actions.test.js  # Actions tests
    └── reducer.test.js  # Reducer tests
```


This boilerplate uses Redux, partially because it turns our data flow into
testable (pure) functions. Using the `NavBar` component above,
let's see what testing the actions and the reducer would look like.

This is what our `NavBar` actions look like:

```javascript
// actions.js

import { TOGGLE_NAV } from './constants';

export function toggleNav() {
  return { type: TOGGLE_NAV };
}
```

with this reducer:

```javascript
// reducer.js

import { TOGGLE_NAV } from './constants';

const initialState = {
  open: false,
};

function NavBarReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_NAV:
      return Object.assign({}, state, {
        open: !state.open,
      });
    default:
      return state;
  }
}

export default NavBarReducer;
```

Lets test the reducer first!

### Reducers

First, we have to import the reducer and the action.

```javascript
// reducer.test.js

import NavBarReducer from '../reducer';
import { toggleNav } from '../actions';
```

Then we `describe` the reducer, and add two tests: we check that it returns the
initial state and that it handles the `toggleNav` action.

```javascript
describe('NavBarReducer', () => {
  it('returns the initial state', () => {

  });

  it('handles the toggleNav action', () => {

  });
});
```

Lets write the tests themselves! Since the reducer is just a function, we can
call it like any other function and `expect` the output to equal something.

To test that it returns the initial state, we call it with a state of `undefined`
(the first argument), and an empty action (second argument). The reducer should
return the initial state of the `NavBar`, which is

```javascript
{
  open: false,
}
```

Lets put that into practice:

```javascript
describe('NavBarReducer', () => {
  it('returns the initial state', () => {
    expect(NavBarReducer(undefined, {})).toEqual({
      open: false,
    });
  });

  it('handles the toggleNav action', () => {

  });
});
```

This works, but we have one problem: We also have to explicitly write the initial state itself. When
somebody changes the initial state, they will also have to manually update this code to directly reflect it.

Instead, we can leverage Jest's new snapshots feature.

#### Snapshots

Jest has the ability to store serialized snapshots of most basic types of information (objects, arrays, etc). It then compares the stored version when later tests are run, to find any unexpected mismatches.

We can write the test like

```javascript
describe('NavBarReducer', () => {
  it('returns the initial state', () => {
    expect(NavBarReducer(undefined, {})).toMatchSnapshot();
  });

  it('handles the toggleNav action', () => {

  });
});
```

Jest is now the one responsible for tracking the definition of the initial state. When somebody changes it in the future, Jest will warn that the snapshot doesn't match and then allow them to update the snapshot with a single command. No more manual updates!

For more details on Jest snapshots, please view [Kent Dodd's feature video](https://egghead.io/lessons/javascript-use-jest-s-snapshot-testing-feature).

This is how our finished reducer test might look like:

```javascript
// NavBar.reducer.test.js

import NavBarReducer from '../NavBar.reducer';
import { toggleNav } from '../NavBar.actions';

describe('NavBarReducer', () => {
  it('returns the initial state', () => {
    expect(NavBarReducer(undefined, {})).toMatchSnapshot();
  });

  it('handles the toggleNav action', () => {
    expect(NavBarReducer({}, toggleNav())).toMatchSnapshot();
  });
});
```

Lets see how we can test actions next.

### Actions

We have one action `toggleNav` that changes the `NavBar` open state.

A Redux action is a pure function, so testing it isn't more difficult than
testing our `add` function from the first part of this guide!

The first step is to import the action to be tested, the constant it should
return and `expect`:

```javascript
// actions.test.js

import { toggleNav } from '../actions';
import { TOGGLE_NAV } from '../constants';

```

Then we `describe` the actions:

```javascript
describe('NavBar actions', () => {
  describe('toggleNav', () => {
    it('should return the correct constant', () => {

    });
  });
});
```

> Note: `describe`s can be nested, which gives us nice output, as we'll see later.

And the last step is to add the assertion:

```javascript
it('should return the correct constant', () => {
  expect(toggleNav()).toEqual({
    type: TOGGLE_NAV
  });
});
```

If our `toggleNav` action works correctly, this is the output Jest will show us:

```
NavBar actions
  toggleNav
    ✓ should return the correct constant
```

And that's it, we now know when somebody breaks the `toggleNav` action!

*Continue to learn how to test your application with [Component Testing](component-testing.md)!*
