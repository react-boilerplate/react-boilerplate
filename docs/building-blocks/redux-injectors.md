# Redux Injectors

[`redux-injectors`](https://github.com/react-boilerplate/redux-injectors) is
an official `react-boilerplate` companion library. We built it so that it can be
used and maintained independently from react-boilerplate. It allows you to
dynamically load reducers and sagas as needed, instead of loading them all
upfront. This has some nice benefits, such as avoiding having to manage a big
global list of reducers and sagas. It also allows more effective use of
[code-splitting](https://webpack.js.org/guides/code-splitting/).

You can find the main repo for the library
[here](https://github.com/react-boilerplate/redux-injectors) and read the docs
[here](https://github.com/react-boilerplate/redux-injectors/blob/master/docs/api.md).

## Usage

```ts
import {
  useInjectSaga,
  useInjectReducer,
  SagaInjectionModes,
} from 'utils/redux-injectors';
import { saga } from './saga';
import { reducer } from './slice';

export function NewContainer() {
  useInjectReducer({ key: 'newContainer', reducer });
  useInjectSaga({ key: 'newContainer', saga, mode: SagaInjectionModes.DAEMON });

  // ...
}
```

{% hint style="info" %}

**Note:** Importing `redux-injectors` from `utils/redux-injectors` will add extra type-safety

{% endhint %}
