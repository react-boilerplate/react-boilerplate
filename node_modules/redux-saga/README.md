<img src='https://redux-saga.js.org/logo/0800/Redux-Saga-Logo-Landscape.png' alt='Redux Logo Landscape' width='800px'>

# redux-saga

[![npm version](https://img.shields.io/npm/v/redux-saga.svg)](https://www.npmjs.com/package/redux-saga)
[![CDNJS](https://img.shields.io/cdnjs/v/redux-saga.svg)](https://cdnjs.com/libraries/redux-saga)
[![npm](https://img.shields.io/npm/dm/redux-saga.svg)](https://www.npmjs.com/package/redux-saga)
[![Build Status](https://travis-ci.org/redux-saga/redux-saga.svg?branch=master)](https://travis-ci.org/redux-saga/redux-saga)
[![Join the chat at https://gitter.im/yelouafi/redux-saga](https://badges.gitter.im/yelouafi/redux-saga.svg)](https://gitter.im/yelouafi/redux-saga?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![OpenCollective](https://opencollective.com/redux-saga/backers/badge.svg)](#backers)
[![OpenCollective](https://opencollective.com/redux-saga/sponsors/badge.svg)](#sponsors)

`redux-saga` is a library that aims to make application side effects (i.e. asynchronous things like data fetching and impure things like accessing the browser cache) easier to manage, more efficient to execute, simple to test, and better at handling failures.

The mental model is that a saga is like a separate thread in your application that's solely responsible for side effects. `redux-saga` is a redux middleware, which means this thread can be started, paused and cancelled from the main application with normal redux actions, it has access to the full redux application state and it can dispatch redux actions as well.

It uses an ES6 feature called Generators to make those asynchronous flows easy to read, write and test. *(if you're not familiar with them [here are some introductory links](https://redux-saga.js.org/docs/ExternalResources.html))* By doing so, these asynchronous flows look like your standard synchronous JavaScript code. (kind of like `async`/`await`, but generators have a few more awesome features we need)

You might've used `redux-thunk` before to handle your data fetching. Contrary to redux thunk, you don't end up in callback hell, you can test your asynchronous flows easily and your actions stay pure.

# Getting started

## Install

```sh
$ npm install --save redux-saga
```
or

```sh
$ yarn add redux-saga
```

Alternatively, you may use the provided UMD builds directly in the `<script>` tag of an HTML page. See [this section](#using-umd-build-in-the-browser).

## Usage Example

Suppose we have a UI to fetch some user data from a remote server when a button is clicked. (For brevity, we'll just show the action triggering code.)

```javascript
class UserComponent extends React.Component {
  ...
  onSomeButtonClicked() {
    const { userId, dispatch } = this.props
    dispatch({type: 'USER_FETCH_REQUESTED', payload: {userId}})
  }
  ...
}
```

The Component dispatches a plain Object action to the Store. We'll create a Saga that watches for all `USER_FETCH_REQUESTED` actions and triggers an API call to fetch the user data.

#### `sagas.js`

```javascript
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Api from '...'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
   try {
      const user = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* mySaga() {
  yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
}

export default mySaga;
```

To run our Saga, we'll have to connect it to the Redux Store using the `redux-saga` middleware.

#### `main.js`

```javascript
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers'
import mySaga from './sagas'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)

// then run the saga
sagaMiddleware.run(mySaga)

// render the application
```

# Documentation

- [Introduction](https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html)
- [Basic Concepts](https://redux-saga.js.org/docs/basics/index.html)
- [Advanced Concepts](https://redux-saga.js.org/docs/advanced/index.html)
- [Recipes](https://redux-saga.js.org/docs/recipes/index.html)
- [External Resources](https://redux-saga.js.org/docs/ExternalResources.html)
- [Troubleshooting](https://redux-saga.js.org/docs/Troubleshooting.html)
- [Glossary](https://redux-saga.js.org/docs/Glossary.html)
- [API Reference](https://redux-saga.js.org/docs/api/index.html)

# Translation

- [Chinese](https://github.com/superRaytin/redux-saga-in-chinese)
- [Traditional Chinese](https://github.com/neighborhood999/redux-saga)
- [Japanese](https://github.com/redux-saga/redux-saga/blob/master/README_ja.md)
- [Korean](https://github.com/mskims/redux-saga-in-korean)
- [Portuguese](https://github.com/joelbarbosa/redux-saga-pt_BR)
- [Russian](https://github.com/redux-saga/redux-saga/blob/master/README_ru.md)

# Using umd build in the browser

There is also a **umd** build of `redux-saga` available in the `dist/` folder. When using the umd build `redux-saga` is available as `ReduxSaga` in the window object. This enables you to create Saga middleware without using ES6 `import` syntax like this:

```javascript
var sagaMiddleware = ReduxSaga.default()
```

The umd version is useful if you don't use Webpack or Browserify. You can access it directly from [unpkg](https://unpkg.com/).

The following builds are available:

- [https://unpkg.com/redux-saga/dist/redux-saga.js](https://unpkg.com/redux-saga/dist/redux-saga.js)
- [https://unpkg.com/redux-saga/dist/redux-saga.min.js](https://unpkg.com/redux-saga/dist/redux-saga.min.js)

**Important!** If the browser you are targeting doesn't support *ES2015 generators*, you must transpile them (i.e. with [babel plugin](https://github.com/facebook/regenerator/tree/master/packages/regenerator-transform)) and provide a valid runtime, such as [the one here](https://unpkg.com/regenerator-runtime/runtime.js). The runtime must be imported before **redux-saga**:

```javascript
import 'regenerator-runtime/runtime'
// then
import sagaMiddleware from 'redux-saga'
```

# Building examples from sources

```sh
$ git clone https://github.com/redux-saga/redux-saga.git
$ cd redux-saga
$ npm install
$ npm test
```

Below are the examples ported (so far) from the Redux repos.

### Counter examples

There are three counter examples.

#### counter-vanilla

Demo using vanilla JavaScript and UMD builds. All source is inlined in `index.html`.

To launch the example, just open `index.html` in your browser.

> Important: your browser must support Generators. Latest versions of Chrome/Firefox/Edge are suitable.

#### counter

Demo using `webpack` and high-level API `takeEvery`.

```sh
$ npm run counter

# test sample for the generator
$ npm run test-counter
```

#### cancellable-counter

Demo using low-level API to demonstrate task cancellation.

```sh
$ npm run cancellable-counter
```

### Shopping Cart example

```sh
$ npm run shop

# test sample for the generator
$ npm run test-shop
```

### async example

```sh
$ npm run async

# test sample for the generators
$ npm run test-async
```

### real-world example (with webpack hot reloading)

```sh
$ npm run real-world

# sorry, no tests yet
```

### TypeScript

Redux-Saga with TypeScript requires `DOM.Iterable` or `ES2015.Iterable`. If your `target` is `ES6`, you are likely already set, however, for `ES5`, you will need to add it yourself.
Check your `tsconfig.json` file, and the official <a href="https://www.typescriptlang.org/docs/handbook/compiler-options.html">compiler options</a> documentation.

### Logo

You can find the official Redux-Saga logo with different flavors in the [logo directory](logo).


### Backers
Support us with a monthly donation and help us continue our activities. \[[Become a backer](https://opencollective.com/redux-saga#backer)\]

<a href="https://opencollective.com/redux-saga/backer/0/website" target="_blank"><img src="https://opencollective.com/redux-saga/backer/0/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/backer/1/website" target="_blank"><img src="https://opencollective.com/redux-saga/backer/1/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/backer/2/website" target="_blank"><img src="https://opencollective.com/redux-saga/backer/2/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/backer/3/website" target="_blank"><img src="https://opencollective.com/redux-saga/backer/3/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/backer/4/website" target="_blank"><img src="https://opencollective.com/redux-saga/backer/4/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/backer/5/website" target="_blank"><img src="https://opencollective.com/redux-saga/backer/5/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/backer/6/website" target="_blank"><img src="https://opencollective.com/redux-saga/backer/6/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/backer/7/website" target="_blank"><img src="https://opencollective.com/redux-saga/backer/7/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/backer/8/website" target="_blank"><img src="https://opencollective.com/redux-saga/backer/8/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/backer/9/website" target="_blank"><img src="https://opencollective.com/redux-saga/backer/9/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/backer/10/website" target="_blank"><img src="https://opencollective.com/redux-saga/backer/10/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/backer/11/website" target="_blank"><img src="https://opencollective.com/redux-saga/backer/11/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/backer/12/website" target="_blank"><img src="https://opencollective.com/redux-saga/backer/12/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/backer/13/website" target="_blank"><img src="https://opencollective.com/redux-saga/backer/13/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/backer/14/website" target="_blank"><img src="https://opencollective.com/redux-saga/backer/14/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/backer/15/website" target="_blank"><img src="https://opencollective.com/redux-saga/backer/15/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/backer/16/website" target="_blank"><img src="https://opencollective.com/redux-saga/backer/16/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/backer/17/website" target="_blank"><img src="https://opencollective.com/redux-saga/backer/17/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/backer/18/website" target="_blank"><img src="https://opencollective.com/redux-saga/backer/18/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/backer/19/website" target="_blank"><img src="https://opencollective.com/redux-saga/backer/19/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/backer/20/website" target="_blank"><img src="https://opencollective.com/redux-saga/backer/20/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/backer/21/website" target="_blank"><img src="https://opencollective.com/redux-saga/backer/21/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/backer/22/website" target="_blank"><img src="https://opencollective.com/redux-saga/backer/22/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/backer/23/website" target="_blank"><img src="https://opencollective.com/redux-saga/backer/23/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/backer/24/website" target="_blank"><img src="https://opencollective.com/redux-saga/backer/24/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/backer/25/website" target="_blank"><img src="https://opencollective.com/redux-saga/backer/25/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/backer/26/website" target="_blank"><img src="https://opencollective.com/redux-saga/backer/26/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/backer/27/website" target="_blank"><img src="https://opencollective.com/redux-saga/backer/27/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/backer/28/website" target="_blank"><img src="https://opencollective.com/redux-saga/backer/28/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/backer/29/website" target="_blank"><img src="https://opencollective.com/redux-saga/backer/29/avatar.svg"></a>


### Sponsors
Become a sponsor and get your logo on our README on Github with a link to your site. \[[Become a sponsor](https://opencollective.com/redux-saga#sponsor)\]

<a href="https://opencollective.com/redux-saga/sponsor/0/website" target="_blank"><img src="https://opencollective.com/redux-saga/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/sponsor/1/website" target="_blank"><img src="https://opencollective.com/redux-saga/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/sponsor/2/website" target="_blank"><img src="https://opencollective.com/redux-saga/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/sponsor/3/website" target="_blank"><img src="https://opencollective.com/redux-saga/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/sponsor/4/website" target="_blank"><img src="https://opencollective.com/redux-saga/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/sponsor/5/website" target="_blank"><img src="https://opencollective.com/redux-saga/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/sponsor/6/website" target="_blank"><img src="https://opencollective.com/redux-saga/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/sponsor/7/website" target="_blank"><img src="https://opencollective.com/redux-saga/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/sponsor/8/website" target="_blank"><img src="https://opencollective.com/redux-saga/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/sponsor/9/website" target="_blank"><img src="https://opencollective.com/redux-saga/sponsor/9/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/sponsor/10/website" target="_blank"><img src="https://opencollective.com/redux-saga/sponsor/10/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/sponsor/11/website" target="_blank"><img src="https://opencollective.com/redux-saga/sponsor/11/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/sponsor/12/website" target="_blank"><img src="https://opencollective.com/redux-saga/sponsor/12/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/sponsor/13/website" target="_blank"><img src="https://opencollective.com/redux-saga/sponsor/13/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/sponsor/14/website" target="_blank"><img src="https://opencollective.com/redux-saga/sponsor/14/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/sponsor/15/website" target="_blank"><img src="https://opencollective.com/redux-saga/sponsor/15/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/sponsor/16/website" target="_blank"><img src="https://opencollective.com/redux-saga/sponsor/16/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/sponsor/17/website" target="_blank"><img src="https://opencollective.com/redux-saga/sponsor/17/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/sponsor/18/website" target="_blank"><img src="https://opencollective.com/redux-saga/sponsor/18/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/sponsor/19/website" target="_blank"><img src="https://opencollective.com/redux-saga/sponsor/19/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/sponsor/20/website" target="_blank"><img src="https://opencollective.com/redux-saga/sponsor/20/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/sponsor/21/website" target="_blank"><img src="https://opencollective.com/redux-saga/sponsor/21/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/sponsor/22/website" target="_blank"><img src="https://opencollective.com/redux-saga/sponsor/22/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/sponsor/23/website" target="_blank"><img src="https://opencollective.com/redux-saga/sponsor/23/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/sponsor/24/website" target="_blank"><img src="https://opencollective.com/redux-saga/sponsor/24/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/sponsor/25/website" target="_blank"><img src="https://opencollective.com/redux-saga/sponsor/25/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/sponsor/26/website" target="_blank"><img src="https://opencollective.com/redux-saga/sponsor/26/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/sponsor/27/website" target="_blank"><img src="https://opencollective.com/redux-saga/sponsor/27/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/sponsor/28/website" target="_blank"><img src="https://opencollective.com/redux-saga/sponsor/28/avatar.svg"></a>
<a href="https://opencollective.com/redux-saga/sponsor/29/website" target="_blank"><img src="https://opencollective.com/redux-saga/sponsor/29/avatar.svg"></a>
