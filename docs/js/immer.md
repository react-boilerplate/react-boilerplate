# Immer

Immutable data structures can be deeply compared in no time. This allows us to
efficiently determine if our components need to rerender since we know if the
`props` changed or not!

Check out [Introducing Immer: Immutability the easy way](https://hackernoon.com/introducing-immer-immutability-the-easy-way-9d73d8f71cb3)
and/or [The Rise of Immer in React](https://www.netlify.com/blog/2018/09/12/the-rise-of-immer-in-react/)
for a good explanation of how Immer works and the more intricate benefits it provides.

## Usage

The basic idea behind Immer is that you will apply all your changes to a temporary
draftState, which is a proxy of the currentState. Once all your mutations are completed,
Immer will produce the nextState based on the mutations to the draft state. (See the
[official docs](https://github.com/mweststrate/immer) for more details.)

The Immer package exposes the `produce` function which we use in the following way inside our reducers:

```JS
import produce from 'immer';
import { SOME_ACTION, SOME_OTHER_ACTION } from './actions';

// […]

/* eslint-disable default-case, no-param-reassign */
const myReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SOME_ACTION:
        draft.myData = action.payload;
        break;
      case SOME_OTHER_ACTION:
        draft.myData.message = action.payload;
        break;
    }
  });
```

We use [`reselect`](./reselect.md) to efficiently cache our computed application
state.

```JS
const myDataSelector = (state) => state.myData;
const messageSelector = (state) => state.myData.message;

export default myDataSelector;
```

To learn more, check out [`reselect.md`](reselect.md)!
