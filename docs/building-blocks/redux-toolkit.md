# Redux and Redux-Toolkit

If you haven't worked with Redux, it's highly recommended (possibly indispensable!)
to read through the (amazing) [official documentation](http://redux.js.org)
and/or watch this [free video tutorial series](https://egghead.io/series/getting-started-with-redux).

As minimal as Redux is, the challenge it addresses - app state
management - is a complex topic that is too involved to properly discuss here.

## Usage

### Declaring your state

Redux manages your **state** so we have to declare our state first. We can create a `types.ts` file in our container. Types are crucial for efficient and safe development. Your compiler and code completion will understand the shape of your state and help you code the rest of your project faster and safer.

Lets say our container is called `HomePage`

#### `types.ts`

```ts
/* --- STATE --- */
export interface HomepageState {
  username: string;
  // declare what you want in your Homepage state
}

/* 
  If you want to use 'ContainerState' keyword everywhere in your feature folder, 
  instead of the 'HomePageState' keyword.
*/
export type ContainerState = HomepageState;
```

### Updating your Redux State

Now that you are adding another `slice` to your state you also need to declare this in your `types/RootState.ts` file. Since we are adding redux slices **asynchronously** with [redux-injectors](redux-injectors.md) the compiler cannot tell what the Redux State is during the build time. So, we explicitly declare them `types/RootState.ts` file

#### `types/RootState.ts`

```ts
import { HomepageState } from 'app/containers/HomePage/types';

// Properties are optional because they are injected when the components are mounted sometime in your application's life. So, not available always
export interface RootState {
  homepage?: HomepageState;
}
```

### Creating your slice

Fortunately, [Redux Toolkit](https://redux-toolkit.js.org) handles the most of the work us. To create our slice we create `slice.ts` file in our container as well. This will be responsible for

- Our slice's **initial state**
- **Actions** we can trigger
- **Reducers** that decide what how the state will change given the action received

#### `slice.ts`

```ts
import { PayloadAction } from '@reduxjs/toolkit';
// Importing from `utils` makes them more type-safe ✅
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';

// The initial state of the HomePage container
export const initialState: ContainerState = {
  username: 'Initial username for my state',
};

const homepageSlice = createSlice({
  name: 'homepage',
  initialState,
  reducers: {
    changeUsername(state, action: PayloadAction<string>) {
      // Here we say lets change the username in my homepage state when changeUsername actions fires
      // Type-safe: It will expect `string` when firing the action. ✅
      state.username = action.payload;
    },
  },
});

/*
 * `reducer` will be used to add this slice to our Redux Store
 * `actions` will be used to trigger change in the state from where ever you want
 * `name` will be used to add this slice to our Redux Store
 */
export const { actions, reducer, name: sliceKey } = homepageSlice;
```

### Adding the slice to your Redux Store

You can attach a dynamic reducer to a component whether it's a regular component
or a component that will be loaded dynamically. Dynamic means that it will be
injected when the component it attached to is mounted. In your component's `index.tsx`:

#### `index.tsx`

```ts
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer } from 'utils/redux-injectors';
import { sliceKey, reducer, actions } from './slice';
import { selectUsername } from './selectors';

export function HomePage() {
  // Used to dispatch slice actions
  const dispatch = useDispatch();

  // Inject the slice to redux
  useInjectReducer({ key: sliceKey, reducer: reducer });

  // `selectors` are used to read the state. Explained in other chapter
  // Will be inferred as `string` type ✅
  const username = useSelector(selectUsername);

  const textInputChanged = evt => {
    // Trigger the action to change the state. It accepts `string` as we declared in `slice.ts`. Fully type-safe ✅
    dispatch(actions.changeUsername(evt.target.value));
  };
  // ...
}
```

{% hint style="info" %}

🎉 **Good News:** You don't need to write this boilerplate code by hand, the `container` generator will generate it for you ✓

{% endhint %}
