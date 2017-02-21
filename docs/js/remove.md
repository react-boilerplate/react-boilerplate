## Removing `redux-observable`

**We don't recommend removing `redux-observable`**, as we strongly feel that it's the
way to go for most redux based applications.

If you really want to get rid of it, you will have to delete its traces from several places.

**app/store.js**

1. Remove statement `import createEpicMiddleware from 'redux-epic'`.
2. Remove statement `const epicMiddleware = createEpicMiddleware()`.
3. Remove `epicMiddleware` from `middlewares` array.
4. Remove statement `store.runEpic = epicMiddleware.run`

**app/utils/asyncInjectors.js**

1. Remove `runEpic: isFunction` from `shape`.
2. Remove function `injectAsyncEpics`.
3. Do not export `injectEpics: injectAsyncEpics(store, true)`.

**app/routes.js**

1. Do not pull out `injectEpics` from `getAsyncInjectors()`.
2. Remove `epics` from `importModules.then()`.
3. Remove `injectEpics(epics.default)` from every route that uses Epic.

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
