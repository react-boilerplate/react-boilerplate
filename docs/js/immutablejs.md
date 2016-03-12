# ImmutableJS

Immutable data structures can be deeply compared in no time. This allows us to efficiently determine if our components need to rerender since we know if the `props` changed or not! Check out the [official documentation](https://facebook.github.io/immutable-js/) for a good explanation of the more intricate benefits it has.

## Usage

In our reducers, we make the initial state an immutable data structure with the `fromJS` function. We pass it an object or an array, and it takes care of (deeply) converting it to a compatible one. (so nested arrays/objects are immutable stuctures too!)

```JS
import { fromJS } from 'immutable';

const initialState = fromJS({
  myData: 'Hello World!',
});
```

To react to an incoming actions our reducers can use the `.set` and the `.setIn` functions.

```JS
import { SOME_ACTION } from './actions';

// […]

function myReducer(state = initialState, action) {
  switch (action.type) {
    case SOME_ACTION:
      return state.set('myData', action.payload);
    default:
      return state;
  }
}
```

We use [`reselect`](./reselect.md) to select our application state. Since that state is now immutable, we need to use the `.get` and `.getIn` functions to select the part we want.

```JS
const myDataSelector = (state) => state.get('myData');

export default myDataSelector;
```

To learn more about that, check out [`reselect.md`](reselect.md)!

## Removing ImmutableJS
