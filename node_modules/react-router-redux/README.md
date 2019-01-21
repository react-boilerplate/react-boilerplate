# react-router-redux

[![npm version](https://img.shields.io/npm/v/react-router-redux.svg?style=flat-square)](https://www.npmjs.com/package/react-router-redux) [![npm downloads](https://img.shields.io/npm/dm/react-router-redux.svg?style=flat-square)](https://www.npmjs.com/package/react-router-redux) [![build status](https://img.shields.io/travis/reactjs/react-router-redux/master.svg?style=flat-square)](https://travis-ci.org/reactjs/react-router-redux)

> **Keep your router in sync with application state** :sparkles:

_Formerly known as redux-simple-router_

You're a smart person. You use [Redux](https://github.com/reactjs/redux) to manage your application state. You use [React Router](https://github.com/reactjs/react-router) to do routing. All is good.

But the two libraries don't coordinate. You want to do time travel with your application state, but React Router doesn't navigate between pages when you replay actions. It controls an important part of application state: the URL.

This library helps you keep that bit of state in sync with your Redux store. We keep a copy of the current location hidden in state. When you rewind your application state with a tool like [Redux DevTools](https://github.com/gaearon/redux-devtools), that state change is propagated to React Router so it can adjust the component tree accordingly. You can jump around in state, rewinding, replaying, and resetting as much as you'd like, and this library will ensure the two stay in sync at all times.

**This library is not _necessary_ for using Redux together with React Router. You can use the two together just fine without any additional libraries. It is useful if you care about recording, persisting, and replaying user actions, using time travel. If you don't care about these features, just [use Redux and React Router directly](http://stackoverflow.com/questions/36722584/how-to-sync-redux-state-and-url-hash-tag-params/36749963#36749963).**

## Installation

```
npm install --save react-router-redux
```

## How It Works

This library allows you to use React Router's APIs as they are documented. And, you can use redux like you normally would, with a single app state. The library simply enhances a history instance to allow it to synchronize any changes it receives into application state.

[history](https://github.com/reactjs/history) + `store` ([redux](https://github.com/reactjs/redux)) &rarr; [**react-router-redux**](https://github.com/reactjs/react-router-redux) &rarr; enhanced [history](https://github.com/reactjs/history) &rarr; [react-router](https://github.com/reactjs/react-router)

## Tutorial

Let's take a look at a simple example.

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import reducers from '<project-path>/reducers'

// Add the reducer to your store on the `routing` key
const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  })
)

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="foo" component={Foo}/>
        <Route path="bar" component={Bar}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('mount')
)
```

Now any time you navigate, which can come from pressing browser buttons or navigating in your application code, the enhanced history will first pass the new location through the Redux store and then on to React Router to update the component tree. If you time travel, it will also pass the new state to React Router to update the component tree again.

#### How do I watch for navigation events, such as for analytics?

Simply listen to the enhanced history via `history.listen`. This takes in a function that will receive a `location` any time the store updates. This includes any time travel activity performed on the store.

```js
const history = syncHistoryWithStore(browserHistory, store)

history.listen(location => analyticsService.track(location.pathname))
```

For other kinds of events in your system, you can use middleware on your Redux store like normal to watch any action that is dispatched to the store.

#### What if I use Immutable.js or another state wrapper with my Redux store?

When using a wrapper for your store's state, such as Immutable.js, you will need to change two things from the standard setup:

1. By default, the library expects to find the history state at `state.routing`. If your wrapper prevents accessing properties directly, or you want to put the routing state elsewhere, pass a selector function to access the historystate via the `selectLocationState` option on `syncHistoryWithStore`.
2. Provide your own reducer function that will receive actions of type `LOCATION_CHANGE` and return the payload merged into the `locationBeforeTransitions` property of the routing state. For example, `state.set("routing", {locationBeforeTransitions: action.payload})`.

These two hooks will allow you to store the state that this library uses in whatever format or wrapper you would like.

#### How do I access router state in a container component?

React Router [provides route information via a route component's props](https://github.com/reactjs/react-router/blob/latest/docs/Introduction.md#getting-url-parameters). This makes it easy to access them from a container component. When using [react-redux](https://github.com/reactjs/react-redux) to `connect()` your components to state, you can access the router's props from the [2nd argument of `mapStateToProps`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options):

```js
function mapStateToProps(state, ownProps) {
  return {
    id: ownProps.params.id,
    filter: ownProps.location.query.filter
  };
}
```

You should not read the location state directly from the Redux store. This is because React Router operates asynchronously (to handle things such as dynamically-loaded components) and your component tree may not yet be updated in sync with your Redux state. You should rely on the props passed by React Router, as they are only updated after it has processed all asynchronous code.

#### What if I want to issue navigation events via Redux actions?

React Router provides singleton versions of history (`browserHistory` and `hashHistory`) that you can import and use from anywhere in your application. However, if you prefer Redux style actions, the library also provides a set of action creators and a middleware to capture them and redirect them to your history instance.

```js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerMiddleware, push } from 'react-router-redux'

// Apply the middleware to the store
const middleware = routerMiddleware(browserHistory)
const store = createStore(
  reducers,
  applyMiddleware(middleware)
)

// Dispatch from anywhere like normal.
store.dispatch(push('/foo'))
```

## Examples

- [examples/basic](/examples/basic) - basic reference implementation

Examples from the community:

* [shakacode/react-webpack-rails-tutorial](https://github.com/shakacode/react-webpack-rails-tutorial) - react-router-redux including **Server Rendering** using [React on Rails](https://github.com/shakacode/react_on_rails/), live at [www.reactrails.com](http://www.reactrails.com/).
* [davezuko/react-redux-starter-kit](https://github.com/davezuko/react-redux-starter-kit) - popular redux starter kit
  * **tip**: migrating from react-router-redux `^3.0.0`? use [this commit](https://github.com/davezuko/react-redux-starter-kit/commit/0df26907) as a reference
* [svrcekmichal/universal-react](https://github.com/svrcekmichal/universal-react) - Universal react app with async actions provided by [svrcekmichal/reasync](https://github.com/svrcekmichal/reasync) package
* [steveniseki/react-router-redux-example](https://github.com/StevenIseki/react-router-redux-example) - minimal react-router-redux example includes css modules and universal rendering
* [choonkending/react-webpack-node](https://github.com/choonkending/react-webpack-node) - Full-stack universal Redux App
* [kuy/treemap-with-router](https://github.com/kuy/treemap-with-router) - An example for react-router-redux with d3's treemap.

&rarr; _Have an example to add? Send us a PR!_ &larr;

## API

#### `routerReducer()`

**You must add this reducer to your store for syncing to work.**

A reducer function that stores location updates from `history`. If you use `combineReducers`, it should be nested under the `routing` key.

#### `history = syncHistoryWithStore(history, store, [options])`

Creates an enhanced history from the provided history. This history changes `history.listen` to pass all location updates through the provided store first. This ensures if the store is updated either from a navigation event or from a time travel action, such as a replay, the listeners of the enhanced history will stay in sync.

**You must provide the enhanced history to your `<Router>` component.** This ensures your routes stay in sync with your location and your store at the same time.

The `options` object takes in the following optional keys:

- `selectLocationState` - (default `state => state.routing`) A selector function to obtain the history state from your store. Useful when not using the provided `routerReducer` to store history state. Allows you to use wrappers, such as Immutable.js.
- `adjustUrlOnReplay` - (default `true`) When `false`, the URL will not be kept in sync during time travel. This is useful when using `persistState` from Redux DevTools and not wanting to maintain the URL state when restoring state.

#### `push(location)`, `replace(location)`, `go(number)`, `goBack()`, `goForward()`

**You must install `routerMiddleware` for these action creators to work.**

Action creators that correspond with the [history methods of the same name]
(https://github.com/mjackson/history/blob/master/README.md#navigation). For reference they are defined as follows:

- `push` - Pushes a new location to history, becoming the current location.
- `replace` - Replaces the current location in history.
- `go` - Moves backwards or forwards a relative number of locations in history.
- `goForward` - Moves forward one location. Equivalent to `go(1)`
- `goBack` - Moves backwards one location. Equivalent to `go(-1)`

Both `push` and `replace` take in a [location descriptor](https://github.com/mjackson/history/blob/v2.x/docs/Glossary.md#locationdescriptor), which can be an object describing the URL or a plain string URL.

These action creators are also available in one single object as `routerActions`, which can be used as a convenience when using Redux's `bindActionCreators()`.

#### `routerMiddleware(history)`

A middleware you can apply to your Redux `store` to capture dispatched actions created by the action creators. It will redirect those actions to the provided `history` instance.

#### `LOCATION_CHANGE`

An action type that you can listen for in your reducers to be notified of route updates. Fires *after* any changes to history.
