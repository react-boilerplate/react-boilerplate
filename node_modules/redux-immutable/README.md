# `redux-immutable`

[![Travis build status](http://img.shields.io/travis/gajus/redux-immutable/master.svg?style=flat-square)](https://travis-ci.org/gajus/redux-immutable)
[![NPM version](http://img.shields.io/npm/v/redux-immutable.svg?style=flat-square)](https://www.npmjs.org/package/redux-immutable)
[![Canonical Code Style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)

`redux-immutable` is used to create an equivalent function of Redux [`combineReducers`](http://redux.js.org/docs/api/combineReducers.html) that works with [Immutable.js](https://facebook.github.io/immutable-js/) state.

When Redux [`createStore`](https://github.com/reactjs/redux/blob/master/docs/api/createStore.md) `reducer` is created using `redux-immutable` then `initialState` must be an instance of [`Immutable.Collection`](https://facebook.github.io/immutable-js/docs/#/Collection).

## Problem

When [`createStore`](https://github.com/reactjs/redux/blob/v3.0.6/docs/api/createStore.md) is invoked with `initialState` that is an instance of `Immutable.Collection` further invocation of reducer will [produce an error](https://github.com/reactjs/redux/blob/v3.0.6/src/combineReducers.js#L31-L38):

> The initialState argument passed to createStore has unexpected type of "Object".
> Expected argument to be an object with the following keys: "data"

This is because Redux `combineReducers` [treats `state` object as a plain JavaScript object](https://github.com/reactjs/redux/blob/v3.0.6/src/combineReducers.js#L120-L129).

`combineReducers` created using `redux-immutable` uses Immutable.js API to iterate the state.

## Usage

Create a store with `initialState` set to an instance of [`Immutable.Collection`](https://facebook.github.io/immutable-js/docs/#/Collection):

```js
import {
  combineReducers
} from 'redux-immutable';

import {
  createStore
} from 'redux';

const initialState = Immutable.Map();
const rootReducer = combineReducers({});
const store = createStore(rootReducer, initialState);
```

By default, if `state` is `undefined`, `rootReducer(state, action)` is called with `state = Immutable.Map()`. A different default function can be provided as the second parameter to `combineReducers(reducers, getDefaultState)`, for example:

```js
const StateRecord = Immutable.Record({
	foo: 'bar'
});
const rootReducer = combineReducers({foo: fooReducer}, StateRecord);
// rootReducer now has signature of rootReducer(state = StateRecord(), action)
// state now must always have 'foo' property with 'bar' as its default value
```

When using `Immutable.Record` it is possible to delegate default values to child reducers:

```js
const StateRecord = Immutable.Record({
	foo: undefined
});
const rootReducer = combineReducers({foo: fooReducer}, StateRecord);
// state now must always have 'foo' property with its default value returned from fooReducer(undefined, action)
```

In general, `getDefaultState` function must return an instance of `Immutable.Record` or `Immutable.Collection` that implements `get`, `set` and `withMutations` methods. Such collections are `List`, `Map` and `OrderedMap`.

### Using with `react-router-redux`

`react-router-redux` [`routeReducer`](https://github.com/reactjs/react-router-redux/tree/v4.0.2#routerreducer) does not work with Immutable.js. You need to use a custom reducer:

```js
import Immutable from 'immutable';
import {
  LOCATION_CHANGE
} from 'react-router-redux';

const initialState = Immutable.fromJS({
  locationBeforeTransitions: null
});

export default (state = initialState, action) => {
  if (action.type === LOCATION_CHANGE) {
    return state.set('locationBeforeTransitions', action.payload);
  }

  return state;
};
```

Pass a selector to access the payload state and convert it to a JavaScript object via the [`selectLocationState` option on `syncHistoryWithStore`](https://github.com/reactjs/react-router-redux/tree/v4.0.2#history--synchistorywithstorehistory-store-options):

```js
import {
  browserHistory
} from 'react-router';
import {
  syncHistoryWithStore
} from 'react-router-redux';

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState (state) {
      return state.get('routing').toJS();
  }
});
```

The `'routing'` path depends on the `rootReducer` definition. This example assumes that `routeReducer` is made available under `routing` property of the `rootReducer`.
