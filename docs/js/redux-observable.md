# `redux-observable`

`redux-observable` is a library that allows reactive programming in your
application using [RxJS 5](http://github.com/ReactiveX/RxJS). Compose and cancel
async actions to create side effects and more.
[Ben Lesh](https://twitter.com/BenLesh) put it best:

> lodash for async

## Observables

Observables are a _stream_ of zero, one or more values over time. They are very
similar to Promises but with the differences that they can have multiple
outputs. They are currently being standardized for ECMAScript like Promises.

Observables can be transformed using functional composition just like arrays
are:

    map, filter, reduce

and because they are over time they can be very trivially handled for time based
problems:

    debounce, throttle, buffer

To learn more about this amazing way to handle concurrent flows, start with the
[official documentation](https://redux-observable.js.org).
Watch [this video](https://www.youtube.com/watch?v=AslncyG8whg)

## Epics

A function that take a stream of all actions dispatched and returns a stream of
new actions to dispatch.

````JS
const pingPongEpic = (action$, store) =>
  action$.ofType('PING')
    .delay(1000)      // delay the pong action by 1 second
    .map((action) => ({ type: 'PONG'}))
````

Wherever the dollar sign ($) is appended to a parameter, this denotes that that
parameter represents a stream. They are associated with a container, just like
actions, constants, selectors and reducers. If your container already has an
`epics.js` file, simply add your epic to that. If your container does not yet
have an `epics.js` file, add one with this boilerplate structure:

````JS
````

Then, in your `routes.js`, add injection for the newly added epic:

```JS
getComponent(nextState, cb) {
  const importModules = Promise.all([
    import('containers/YourComponent/reducer'),
    import('containers/YourComponent/epics'),
    import('containers/YourComponent'),
  ]);

  const renderRoute = loadModule(cb);

  importModules.then(([reducer, epics, component]) => {
    injectReducer('home', reducer.default);
    injectEpics(epics.default); // Inject the epic

    renderRoute(component);
  });

  importModules.catch(errorLoading);
},
```

Now add as many epics to your `epics.js` file as you want!

---

_Don't like this feature? [Click here](remove.md)_
