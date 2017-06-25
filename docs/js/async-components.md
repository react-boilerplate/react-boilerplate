# Loading components with react-loadable

[`react-loadable`](https://github.com/thejameskyle/react-loadable) is integrated into 
`react-boilerplate` because of its rich functionality and good design (it does not 
conflate routes with asynchronous components).
 
To load component asynchronously, create a `Loadable` file by hand or via component/container generators with
'Do you want an async loader?' option activated. This is how it can look like:

```JS
import Loadable from 'routing/Loadable';

export default Loadable({
  loader: ({ injectReducer, injectSagas }) =>
    Promise.all([
      import('./reducer'),
      import('./sagas'),
      import('./index'),
    ])
    .then(([reducer, sagas, component]) => {
      injectReducer('home', reducer.default);
      injectSagas(sagas.default);
      return component;
    }),
  loading: () => (<div>Loading...</div>)
});
```

`routing/Loadable` accepts the same arguments as `react-loadable`. In addition it passes
async injectors to the `loader`: `loader: ({ injectReducer, injectSagas })` that you can 
use to inject reducers and sagas. It also allows to configure default `loading` component.

## Set default `loading` component
You can use `routing/DefaultLoadingComponentProvider` to set a component that will be used 
as a loading component if `loading` option is missing. For an example 
take a look at `app.js` in the demo app:

```JS
<DefaultLoadingComponentProvider component={LoadingIndicator}>

```

## Loading resources synchronously

If you don't want to create a separate chuck for some of your resources (reducers/sagas/components),
that can be achieved with [webpack's eager mode](https://webpack.js.org/guides/code-splitting-async/#import-mode).
In the following example the reducer will be loaded synchronously and the chunk will not 
be generated:

```JS
import Loadable from 'routing/Loadable';

export default Loadable({
  loader: ({ injectReducer, injectSagas }) =>
    Promise.all([
      import(/* webpackMode: "eager" */ './reducer'),
      import('./sagas'),
      import('./index'),
    ])
    .then(([reducer, sagas, component]) => {
      injectReducer('home', reducer.default);
      injectSagas(sagas.default);
      return component;
    }),
});
```
