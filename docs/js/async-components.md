# Loading components with loadable-components

[`loadable-components`](https://github.com/smooth-code/loadable-components) is integrated into
`react-boilerplate` because of its rich functionality and good design (it does not
conflate routes with asynchronous components).

To load a component asynchronously, create a `Loadable` file by hand or via component/container generators
with the 'Do you want to load resources asynchronously?' option activated.

This is the content of the file by default:

```JS
import loadable from 'loadable-components';

export default loadable(() => import('./index'));
```

In this case, the app won't show anything while loading your component. You can however make it display a custom loader with:

```JS
import loadable from 'loadable-components';

export default loadable(() => import('./Home'), {
  LoadingComponent: () => <div>Loading...</div>,
})
```

`loadable-components` also allows you to do prefetching, loading multiple components in parallel, handling loading errors and plenty more.

You can find more information on how to use `loadable-components` in [their docs](https://github.com/smooth-code/loadable-components).
