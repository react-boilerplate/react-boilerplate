# `redux-injectors`

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

```JS
import { useInjectSaga, useInjectReducer, SagaInjectionModes } from 'redux-injectors';
import saga from './saga';
import reducer from './reducer';

export default function NewContainer(props) {
  useInjectReducer({ key: 'newContainer', reducer })
  useInjectSaga({ key: 'newContainer', saga, mode: SagaInjectionModes.DAEMON });

  // ...
}
```
