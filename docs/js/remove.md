## Removing `redux-saga`

**We don't recommend removing `redux-saga`**, as we strongly feel that it's the
way to go for most redux based applications.

If you really want to get rid of it, you will have to delete its traces from several places.

**app/configureStore.js**

1. Remove statement `import createSagaMiddleware from 'redux-saga'`.
2. Remove statement `const sagaMiddleware = createSagaMiddleware()`.
3. Remove `sagaMiddleware` from `middlewares` array.
4. Remove statement `store.runSaga = sagaMiddleware.run`
5. Remove `store.injectedSagas = {}; // Saga registry`

**app/utils**

1. Remove two files: `injectSaga.js` and `sagaInjectors.js`.

**app/containers/\*/index.js**

Clean up containers that inject a dynamic saga

1. Remove saga injections like: `const withSaga = injectSaga({ key: 'home', saga });`.

**Finally, remove it from the `package.json`. Then you should be good to go with whatever
side-effect management library you want to use!**

## Removing `reselect`

To remove `reselect`, remove it from your dependencies in `package.json` and then write
your `mapStateToProps` functions like you normally would!

You'll also need to hook up the history directly to the store. Make changes to `app/app.js`.

1. Remove statement `import { makeSelectLocationState } from 'containers/App/selectors'`
2. Make necessary changes to `history` as follows:

```js

const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: makeSelectLocationState(),
});
```
