# `global saga`

A global saga is an app level saga. The built-in example of sagas in this app are all contained within child containers that get put inside the `App` container. The app container by itself is pretty basic, allowing for all the action to happen within it's child containers; however, sometimes that's just not enough. Imagine the following scenario if you will.

> You have an app that upon loading needs to grab data from the server, regardless of which route the user entered. You could put a function inside the `onComponentMount` of every single container, but that's not very DRY. What you end up with is a lot of duplicate constants, actions, and reducers.
> 
> Enter the global saga. A way to load up a `sagas.js` file for the `App` container.

## Usage

We'll be doing the following:

1. Adding `sagas.js` to `app/containers/App` directory
2. importing `sagas.js` into the App container route configuration

Like other sagas, your global saga will live within a container, the `App` container. Go ahead and add a file and use the following starter code; it's the same starter code for other sagas.

######app/containers/App/sagas.js
```JS
import { take, call, put, select } from 'redux-saga/effects';

// Your sagas for this container
export default [
  sagaName,
];

// Individual exports for testing
export function* sagaName() {

}
```

Next we'll import the `sagas.js` file into our `App` route configuration by updating our `getComponent` function to asynchronosly load our files. You can just replace it with the one below.
######app/routes.js
```JS
export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  childRoutes : [
    // All your child routes are here inside this array
  ];

  return {
    getComponent(nextState, cb) {
      const importModules = Promise.all([
        import('containers/App/sagas'),
        import('containers/App'),
      ]);

      const renderRoute = loadModule(cb);

      importModules.then(([sagas, component]) => {
        injectSagas(sagas.default);
        renderRoute(component);
      });

      importModules.catch(errorLoading);
    },
    childRoutes,
  };
}
```