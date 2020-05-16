# Gotchas

These are some things to be aware of when using this boilerplate.

- [Load reducers optimistically](#load-reducers-optimistically)

## Load reducers optimistically

If you have containers that should be available throughout the app, like a `NavigationBar` (they aren't route specific), you need to add their respective reducers to the root reducer with the help of `combineReducers`.

```ts
// In src/store/reducers.ts

...
import { combineReducers } from '@reduxjs/toolkit';
...

import navigationBarReducer from 'containers/NavigationBar/reducer';

export function createReducer(injectedReducers: InjectedReducersType = {}) {
  const rootReducer = combineReducers({
    navigationBar: navigationBarReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
```
