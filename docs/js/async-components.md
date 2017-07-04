# Loading components with react-loadable

[`react-loadable`](https://github.com/thejameskyle/react-loadable) is integrated into 
`react-boilerplate` because of its rich functionality and good design (it does not 
conflate routes with asynchronous components).
 
To load component asynchronously, create a `Loadable` file by hand or via component/container generators with
'Do you want an async loader?' option activated. This is how it can look like:

```JS
import Loadable from 'react-loadable';

import LoadingIndicator from 'components/LoadingIndicator';

export default Loadable({
  loader: () => import('./index'),
  loading: LoadingIndicator,
});
```

You can find more information on how to use `react-loadable` in [their docs](https://github.com/thejameskyle/react-loadable).
