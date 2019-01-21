Connected React Router [![Build Status](https://travis-ci.org/supasate/connected-react-router.svg?branch=master)](https://travis-ci.org/supasate/connected-react-router) [![Open Source Helpers](https://www.codetriage.com/supasate/connected-react-router/badges/users.svg)](https://www.codetriage.com/supasate/connected-react-router)
======================
A Redux binding for React Router v4

Main features
-------------
:sparkles: Synchronize router state with redux store through uni-directional flow (i.e. history -> store -> router -> components).

:gift: Support [React Router v4](https://github.com/ReactTraining/react-router).

:sunny: Support functional component hot reloading while preserving state (with [react-hot-reload](https://github.com/gaearon/react-hot-loader)).

:tada: Dispatching of history methods (`push`, `replace`, `go`, `goBack`, `goForward`) works for both [redux-thunk](https://github.com/gaearon/redux-thunk) and [redux-saga](https://github.com/yelouafi/redux-saga).

:snowman: Nested children can access routing state such as the current location directly with `react-redux`'s `connect`.

:clock9: Support time traveling in Redux DevTools.

:gem: Support [Immutable.js](https://facebook.github.io/immutable-js/)

:muscle: Support TypeScript


Installation
-----------
Using [npm](https://www.npmjs.com/):

    $ npm install --save connected-react-router

Or [yarn](https://yarnpkg.com/):

    $ yarn add connected-react-router

Usage
-----
### Step 1

- Create a `history` object.
- Wrap the root reducer with `connectRouter` and supply the `history` object to get a new root reducer.
- Use `routerMiddleware(history)` if you want to dispatch history actions (e.g. to change URL with `push('/path/to/somewhere')`).


```js
...
import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
...
const history = createBrowserHistory()

const store = createStore(
  connectRouter(history)(rootReducer), // new root reducer with router state
  initialState,
  compose(
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
      // ... other middlewares ...
    ),
  ),
)
```

### Step 2


- Wrap your react-router v4 routing with `ConnectedRouter` and pass the `history` object as a prop.
- Place `ConnectedRouter` as a child of `react-redux`'s `Provider`.

```js
...
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router' // react-router v4
import { ConnectedRouter } from 'connected-react-router'
...
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}> { /* place ConnectedRouter under Provider */ }
      <div> { /* your usual react-router v4 routing */ }
        <Switch>
          <Route exact path="/" render={() => (<div>Match</div>)} />
          <Route render={() => (<div>Miss</div>)} />
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('react-root')
)
```
Now, it's ready to work!


Examples
--------
See the [examples](https://github.com/supasate/connected-react-router/tree/master/examples) folder

[FAQ](https://github.com/supasate/connected-react-router/tree/master/FAQ.md)
-----
- [How to navigate with Redux action](https://github.com/supasate/connected-react-router/tree/master/FAQ.md#how-to-navigate-with-redux-action)
- [How to get the current browser location (URL)](https://github.com/supasate/connected-react-router/tree/master/FAQ.md#how-to-get-current-browser-location-url)
- [How to set Router props e.g. basename, initialEntries, etc.](https://github.com/supasate/connected-react-router/tree/master/FAQ.md#how-to-set-router-props-eg-basename-initialentries-etc)
- [How to hot reload functional components](https://github.com/supasate/connected-react-router/tree/master/FAQ.md#how-to-hot-reload-functional-components)
- [How to hot reload reducers](https://github.com/supasate/connected-react-router/tree/master/FAQ.md#how-to-hot-reload-reducers)
- [How to support Immutable.js](https://github.com/supasate/connected-react-router/tree/master/FAQ.md#how-to-support-immutablejs)
- [How to implement server-side rendering](https://medium.com/@cereallarceny/server-side-rendering-in-create-react-app-with-all-the-goodies-without-ejecting-4c889d7db25e) ([sample codebase](https://github.com/cereallarceny/cra-ssr))

Build
-----
```bash
npm run build
```
Generated files will be in the `lib` folder.

Contributors
------------
See [Contributors](https://github.com/supasate/connected-react-router/graphs/contributors) and [Acknowledge](https://github.com/supasate/connected-react-router/blob/master/ACKNOWLEDGE.md).

License
-------
[MIT License](https://github.com/supasate/connected-react-router/blob/master/LICENSE.md)
