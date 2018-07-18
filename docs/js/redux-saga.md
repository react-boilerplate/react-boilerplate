# `redux-saga`

`redux-saga` is a library to manage side effects in your application. It works
beautifully for data fetching, concurrent computations and a lot more.
[Sebastien Lorber](https://twitter.com/sebastienlorber) put it best:

> Imagine there is widget1 and widget2. When some button on widget1 is clicked,
  then it should have an effect on widget2. Instead of coupling the 2 widgets
  together (ie widget1 dispatch an action that targets widget2), widget1 only
  dispatch that its button was clicked. Then the saga listen for this button
  click and then update widget2 by dispatching a new event that widget2 is aware of.
>
> This adds a level of indirection that is unnecessary for simple apps, but make
  it more easy to scale complex applications. You can now publish widget1 and
  widget2 to different npm repositories so that they never have to know about
  each others, without having them to share a global registry of actions. The 2
  widgets are now bounded contexts that can live separately. They do not need
  each others to be consistent and can be reused in other apps as well. **The saga
  is the coupling point between the two widgets that coordinate them in a
  meaningful way for your business.**

_Note: It is well worth reading the [source](https://stackoverflow.com/questions/34570758/why-do-we-need-middleware-for-async-flow-in-redux/34623840#34623840)
of this quote in its entirety!_

To learn more about this amazing way to handle concurrent flows, start with the
[official documentation](https://redux-saga.github.io/redux-saga) and explore
some examples! (read [this comparison](https://stackoverflow.com/questions/34930735/pros-cons-of-using-redux-saga-with-es6-generators-vs-redux-thunk-with-es7-async/34933395) if you're used to `redux-thunk`)

## Usage

Sagas are associated with a container, just like actions, constants, selectors
and reducers. If your container already has a `saga.js` file, simply add your
saga to that. If your container does not yet have a `saga.js` file, add one with
this boilerplate structure:

```JS
import { takeLatest, call, put, select } from 'redux-saga/effects';

// Root saga
export default function* rootSaga() {
  // if necessary, start multiple sagas at once with `all` 
  yield [
    takeLatest(LOAD_REPOS, getRepos),
    takeLatest(LOAD_USERS, getUsers),
  ];
}
```

Then, in your `index.js`, use a decorator to inject the root saga:

```JS
import injectSaga from 'utils/injectSaga';
import { RESTART_ON_REMOUNT } from 'utils/constants';
import saga from './saga';

// ...

// `mode` is an optional argument, default value is `RESTART_ON_REMOUNT`
const withSaga = injectSaga({ key: 'yourcomponent', saga, mode: RESTART_ON_REMOUNT });

export default compose(
  withSaga,
)(YourComponent);
```

A `mode` argument can be one of three constants (import them from `utils/constants`):

- `RESTART_ON_REMOUNT` (default value)—starts a saga when a component is being mounted 
and cancels with `task.cancel()` on component un-mount for improved performance;
- `DAEMON`—starts a saga on component mount and never cancels it or starts again;
- `ONCE_TILL_UNMOUNT`—behaves like `RESTART_ON_REMOUNT` but never runs the saga again.

Now add as many sagas to your `saga.js` file as you want!

---

_Don't like this feature? [Click here](remove.md)_
