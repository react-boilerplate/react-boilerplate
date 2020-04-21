# Reselect

reselect memoizes ("caches") previous state trees and calculations based on said
tree. This means repeated changes and calculations are fast and efficient,
providing us with a performance boost over standard `useSelector`
implementations.

The [official documentation](https://github.com/reactjs/reselect)
offers a good starting point!

## Usage

There are two different kinds of selectors, simple and complex ones.

### Simple selectors

Simple selectors are just that: they take the application state and select a
part of it.

```ts
export const mySelector = (state: MyRootState) => state.someState;
```

### Complex selectors

If we need to, we can combine simple selectors to build more complex ones which
get nested state parts with reselect's `createSelector` function. We import other
selectors and pass them to the `createSelector` call:

#### `selectors.ts`

```ts
import { createSelector } from '@reduxjs/toolkit';

export const mySelector = (state: MyRootState) => state.someState;

// Here type of `someState` will be inferred ✅
const myComplexSelector = createSelector(
  mySelector,
  someState => someState.someNestedState,
);

export { myComplexSelector };
```

### Using your selectors in containers

#### `index.tsx`

```ts
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUsername } from './selectors';

export function HomePage() {
  // Type of the `username` will be inferred  ✅
  const username = useSelector(selectUsername);
  // ...
}
```

{% hint style="info" %}

🎉 **Good News:** You don't need to write this boilerplate code by hand, the `container` generator will generate it for you ✓

{% endhint %}
