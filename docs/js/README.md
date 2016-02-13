# JavaScript

This boilerplate uses React.js, and handles data flow with [Redux](http://redux.js.org). If you haven't worked with Redux yet, read through the [official documentation](http://redux.js.org) and/or watch this [video tutorial](https://egghead.io/series/getting-started-with-redux).

Our application state uses [`ImmutableJS`](immutablejs.md), and to select the application state we want in our containers, we use [`reselect`](https://github.com/reactjs/reselect). Both `ImmutableJS` and `reselect` offer a big performance gain over traditional implementations. Immutable Maps can be deeply compared much quicker, which is really important when you have a big state tree. `reselect` cache previous state trees and calculations based on that. For managing asynchronous flows in our application (e.g. logging in) we use [`redux-saga`](https://github.com/yelouafi/redux-saga). 

## `components` and `containers`

We adopted a split between stateless, reusable components called `components` (duh) and stateful components called `containers`. See [this article](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) by Dan Abramov for a great introduction to this approach.
