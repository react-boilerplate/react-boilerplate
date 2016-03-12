# JavaScript

This boilerplate handles application state with [Redux](redux.md), keeps that state immutable with [`ImmutableJS`](immutablejs.md) and select it with [`reselect`](reselect.md). For managing asynchronous flows in our application (e.g. logging in) we use [`redux-saga`](redux-saga.md).

## `components` and `containers`

We adopted a split between stateless, reusable components called `components` (duh) and stateful components called `containers`. See [this article](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) by Dan Abramov for a great introduction to this approach.

## Learn more

- [Redux](redux.md)
- [ImmutableJS](immutablejs.md)
- [reselect](reselect.md)
- [redux-saga](redux-saga.md)
