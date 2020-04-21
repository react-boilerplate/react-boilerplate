# Async Components

To load a component asynchronously, create a `Loadable` file by hand or via component/container generators with the 'Do you want to load resources asynchronously?' option activated.

This is the content of the file by default:

#### `Loadable.tsx`

```ts
import { lazyLoad } from 'utils/loadable';

export const HomePage = lazyLoad(
  () => import('./index'),
  module => module.HomePage, // Select your exported HomePage function for lazy loading
);
```

In this case, the app won't show anything while loading your component. You can however make it display a custom loader with:

```ts
import React from 'react';
import { lazyLoad } from 'utils/loadable';

export const HomePage = lazyLoad(() => import('./index'), {
  fallback: <div>Loading...</div>,
});
```

This feature is built into the boilerplate using React's `lazy` and `Suspense` features.
