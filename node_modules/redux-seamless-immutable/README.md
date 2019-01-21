# redux-seamless-immutable

Helpers for using [`seamless-immutable`](https://github.com/rtfeldman/seamless-immutable) in [Redux](http://redux.js.org). Provides a compatible `combineReducers` and `routerReducer` (for use with `react-router-redux`).

## Installation

	$ npm install redux-seamless-immutable

## Usage

```javascript
import { combineReducers, routerReducer, stateTransformer } from 'redux-seamless-immutable'
import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'

import reducer from './reducers'

const rootReducer = combineReducers({
  reducer,
  routing: routerReducer
})

const loggerMiddleware = createLogger({
  stateTransformer: stateTransformer
})

const store = createStore(
  rootReducer,
  applyMiddleware(
    loggerMiddleware
  )
)
```

## API

#### `combineReducers(reducers)`

A `seamless-immutable` compatible [`combineReducers`](http://redux.js.org/docs/api/combineReducers.html).

#### `routerReducer(state, action)`

A `seamless-immutable` compatible replacement for the [`routerReducer`](https://github.com/reactjs/react-router-redux#routerreducer) from [react-router-redux](https://github.com/reactjs/react-router-redux).

#### `stateTransformer(state)`

A [`stateTransformer`](https://github.com/fcomb/redux-logger#statetransformer--state-object--state) for the [`redux-logger`](https://github.com/fcomb/redux-logger) middleware to convert an `Immutable` store to a plain JS object.