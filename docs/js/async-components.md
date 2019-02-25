# Loading components with React.lazy and Suspense

To load a component asynchronously, create a `Loadable` file by hand or via component/container generators with the 'Do you want to load resources asynchronously?' option activated.

This is the content of the file by default:

```JS
import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
```

In this case, the app won't show anything while loading your component. You can however make it display a custom loader with:

```JS
import React from 'react';
import loadable from 'utils/loadable';

export default loadable(() => import('./index'), {
  fallback: <div>Loading...</div>,
});
```

This feature is built into the boilerplate using React's `lazy` and `Suspense` features.

If you need server-side rendering or are looking for more complex behaviors such as prefetching, loading multiple components in parallel, handling loading errors and more, we recommend  [loadable-components](https://github.com/smooth-code/loadable-components).

You can read a comparison between our solution and that of `loadable-components` on [this page](https://www.smooth-code.com/open-source/loadable-components/docs/loadable-vs-react-lazy/).
