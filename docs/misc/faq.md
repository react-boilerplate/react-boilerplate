# FAQ

- [Using global reducers instead of injecting](#load-reducers-optimistically)
- [Keeping up-to-date with the template](#keeping-up-to-date-with-the-template)
- [Are there any examples or tutorials?](#examples-and-tutorials)

## Using reducers optimistically

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

## Keeping up-to-date with the template

Eventhough the template is an npm package it's not possible for you to **just update** the package, since you start CRA with this template initially. The suggested way to keep an eye on the [CHANGELOG](../../CHANGELOG.md) file. All the changes that **concerns** the template user will be displayed there, like bug fixes, documentation updates, new features etc... You can check each change's commits and file changes and see what has been changed. Then, the decision is yours if you want to apply those to your code.

## Examples & Tutorials

Take a look our [another 'how to' repo](https://github.com/react-boilerplate/cra-template-examples) for examples and common web app implementations & patterns
