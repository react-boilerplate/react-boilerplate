## Removing `redux-saga`

**We don't recommend removing `redux-saga`**, as we strongly feel that it's the
way to go for most redux based applications.

If you really want to get rid of it, you will have to remove its presence from several places.

**app/configureStore.js**

1.  Remove statement `import createSagaMiddleware from 'redux-saga'`.
2.  Remove statement `const sagaMiddleware = createSagaMiddleware()`.
3.  Remove `sagaMiddleware` from `middlewares` array.
4.  Remove statement `const { run: runSaga } = sagaMiddleware;`
5.  Remove `runSaga` from `createInjectorsEnhancer` params

**app/containers/\*/index.js**

Clean up containers that inject a dynamic saga

1.  Remove saga injections like: `useInjectSaga({ key: 'home', saga });`.

**Finally, remove it from the `package.json`. Then you should be good to go with whatever
side-effect management library you want to use!**

1.  Remove `redux-saga` from `dependencies`
2.  Remove `eslint-plugin-redux-saga` from `devDependencies`
3.  Remove `eslintConfig > plugins > redux-saga`
4.  Remove `eslintConfig > rules > redux-saga/*`

## Removing `reselect`

To remove `reselect`, remove it from your dependencies in `package.json` and then write
your `useSelector` functions [the simple (but less performant) way](https://react-redux.js.org/api/hooks#useselector-examples)!
