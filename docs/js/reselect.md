# `reselect`

reselect memoizes ("caches") previous state trees and calculations based on said
tree. This means repeated changes and calculations are fast and efficient,
providing us with a performance boost over standard `mapStateToProps`
implementations.

The [official documentation](Lee Bannard
https://github.com/reactjs/reselect) offers a good starting point!

## Usage

Generate a new selector with `$ npm run generate`. This will add a new file to the `app/selectors` folder. There are two different kinds of selectors, simple and complex ones.

Simple selectors are, as the name implies, quite simple: they take the application state and select a part of it.

```JS
const mySelector = (state) => state.get('someState');

export default mySelector;
```

We then use these simple selectors to build more complex ones which get nested state parts with reselects `createSelector` function. We import other selectors and pass them to the `createSelector` call:

```JS
import { createSelector } from 'reselect';
import mySelector from 'mySelector';

const myComplexSelector = createSelector(
  mySelector,
  (myState) => myState.get('someNestedState')
);

export default myComplexSelector;
```

These selectors can then either be used directly in our containers as `mapStateToProps` functions or be nested with `createSelector` once again:

```JS
export default connect(createSelector(
  myComplexSelector,
  (myNestedState) => ({ data: myNestedState })
))(SomeComponent);
```

## Removing `reselect`

To remove `reselect`, delete the `app/selectors` folder, remove it from your dependencies in `package.json` and then write your `mapStateToProps` functions like you normally would!
