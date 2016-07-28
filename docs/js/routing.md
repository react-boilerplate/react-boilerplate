# Routing via `react-router` and `react-router-redux`

`react-router` is the de-facto standard routing solution for react applications.
The thing is that with redux and a single state tree, the URL is part of that
state. `react-router-redux` takes care of synchronizing the location of our
application with the application state.

(See the [`react-router-redux` documentation](https://github.com/reactjs/react-router-redux)
for more information)

## Usage

To add a new route, use the generator with `npm run generate route`.

This is what a standard (generated) route looks like for a container:

```JS
{
  path: '/',
  name: 'home',
  getComponent(nextState, cb) {
    const importModules = Promise.all([
      System.import('containers/HomePage')
    ]);

    const renderRoute = loadModule(cb);

    importModules.then(([component]) => {

      renderRoute(component);
    });

    importModules.catch(errorLoading);
  },
}
```

To go to a new page use the `push` function by `react-router-redux`:

```JS
import { push } from 'react-router-redux';

dispatch(push('/some/page'));
```

## Child Routes
`npm run generate route` does not currently support automatically generating child routes if you need them, but they can be easily created manually.

For example, if you have a route called `about` at `/about` and want to make a child route called `team` at `/about/our-team` you can just add that child page to the parent page's `childRoutes` array like so:
```
/* your app's other routes would already be in this array */
{
  path: '/about',
  name: 'about',
  getComponent(nextState, cb) {
    const importModules = Promise.all([
      System.import('containers/AboutPage'),
    ]);

    const renderRoute = loadModule(cb);

    importModules.then(([component]) => {
      renderRoute(component);
    });

    importModules.catch(errorLoading);
  },
  childRoutes: [
    {
      path: '/about/our-team',
      name: 'team',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/TeamPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
  ]
}
```

You can read more on [`react-router`'s documentation](https://github.com/reactjs/react-router/blob/master/docs/API.md#props-3).
