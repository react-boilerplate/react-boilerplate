## [4.0.8](https://github.com/reactjs/react-router-redux/compare/v4.0.7...v4.0.8)

- Don't run listeners synchronously with history 3 [`b2c2259`](https://github.com/reactjs/react-router-redux/commit/b2c2259c189cafad3e6e68eac7729e74f2bd56a9)

## [4.0.7](https://github.com/reactjs/react-router-redux/compare/v4.0.6...v4.0.7)

- Support history 3 [#476](https://github.com/reactjs/react-router-redux/pull/476)

## [4.0.6](https://github.com/reactjs/react-router-redux/compare/v4.0.5...v4.0.6)

- Makes sure the state in the store matches the state in history when using SSR [#445](https://github.com/reactjs/react-router-redux/pull/445)

## [4.0.5](https://github.com/reactjs/react-router-redux/compare/v4.0.4...v4.0.5)

- Initialize currentLocation to initial location from the store. [#403](https://github.com/reactjs/react-router-redux/pull/403)

## [4.0.4](https://github.com/reactjs/react-router-redux/compare/v4.0.2...v4.0.4)

- Added a UMD build. [#362](https://github.com/reactjs/react-router-redux/pull/362)

## [4.0.2](https://github.com/reactjs/react-router-redux/compare/v4.0.1...v4.0.2)

- Calling routerReducer() with no args crashes. [#350](https://github.com/reactjs/react-router-redux/pull/350)

## [4.0.1](https://github.com/reactjs/react-router-redux/compare/v4.0.0...v4.0.1)

- Fix IE8 compatbility. [#344](https://github.com/reactjs/react-router-redux/pull/344)

## [4.0.0](https://github.com/reactjs/react-router-redux/compare/3.0.0...v4.0.0)

This is a big breaking release, but the last one for the foreseeable future. The scope of this library has changed, so please re-evaluate its usefulness to you. You may not need it and this is ok!

#### Summary of Changes

The provided action creators and middleware are now separate from the history<->state syncing function. For the vast majority of cases, using action creators to trigger navigation is obsoleted by React Router's [new history singletons](https://github.com/reactjs/react-router/blob/master/upgrade-guides/v2.0.0.md#history-singletons-provided) provided in 2.0. Building this functionality in by default and coupling it to our history syncing logic no longer makes sense.

We now sync by enhancing the history instance to listen for navigation events and dispatch those into the store. The enhanced history has its `listen` method overridden to respond to store changes, rather than directly to navigation events. When this history is provided to `<Router>`, the router will listen to it and receive these store changes. This means if we time travel with the store, the router will receive those store changes and update based on the location in the store, instead of what the browser says. Normal navigation events (hitting your browser back/forward buttons, telling a history singleton to `push` a location) flow through the history's listener like normal, so all the usual stuff works A-OK.

## [3.0.0](https://github.com/reactjs/react-router-redux/compare/2.1.0...3.0.0)

Technically, 2.1.0 broke semver. The appropriate @timdorr's have been flogged. So, we're bumping the major version to catch up.

- Fixed Resets in Redux Dev Tools. [3ae8110f](https://github.com/reactjs/react-router-redux/commit/3ae8110f)
- Ensure the initialState is set properly. [a00acfd4](https://github.com/reactjs/react-router-redux/commit/a00acfd4)
- Support any number of args on action creators [524898b5](https://github.com/reactjs/react-router-redux/commit/524898b5)

## [2.1.0](https://github.com/reactjs/react-router-redux/compare/2.0.4...2.1.0)

- `listenForReplays` has a `selectLocationState` selector. [#218](https://github.com/reactjs/react-router-redux/pull/218)
- Provide unscoped action creators. [#225](https://github.com/reactjs/react-router-redux/pull/225)
- Example updated to use fully ES2015 syntax.

## [2.0.4](https://github.com/reactjs/react-router-redux/compare/2.0.2...2.0.4)

- Remove `history` module published within the tarball. [#133](https://github.com/reactjs/react-router-redux/issues/133)
- Make actions conform to [Flux Standard Action](https://github.com/acdlite/flux-standard-action). [#208](https://github.com/reactjs/react-router-redux/pull/208)

## [2.0.2](https://github.com/reactjs/react-router-redux/compare/1.0.2...2.0.2)

Versions 2.0.0 and 2.0.1 were test releases for the 2.* series. 2.0.2 is the first public release.

**A whole new API, with many breaking changes:**

* `syncReduxAndRouter` is gone. Instead, call `syncHistory` with just the `history` object, which returns a middleware that you need to apply. (#141)
* If you use redux devtools, you need to call `middleware.listenForReplays(store)` on the middleware returned from `syncHistory`. Create the store first with the middleware, then call this function with the store.
* Action creators are now contained in a single object called `routeActions`. `go`, `goBack`, and `goForward` action creators have been added.
* `UPDATE_PATH` is now `UPDATE_LOCATION`.
* The fully parsed [location object](https://github.com/reactjs/history/blob/master/docs/Location.md) is now stored in the state instead of a URL string. To access the path, use `state.routing.location.pathname` instead of `state.routing.path`.

[View the new docs](https://github.com/reactjs/react-router-redux#api)

## [1.0.2](https://github.com/reactjs/react-router-redux/compare/1.0.1...1.0.2)

* Only publish relevant files to npm

## [1.0.1](https://github.com/reactjs/react-router-redux/compare/1.0.0...1.0.1)

* Solve problem with `basename` causing infinite redirects (#103)
* Switched to ES6 imports/exports internally, but should not affect outside users

## [1.0.0](https://github.com/reactjs/react-router-redux/compare/0.0.10...1.0.0)
> 2015-12-09

This release changes quite a bit so you'll have to update your code.

**Breaking Changes:**

* The `updatePath` action creator has been removed in favor of `pushPath` and `replacePath`. Use `pushPath` to get the same behavior as before. (#38)
* We have added support for routing state (#38)
* Our actions are now [FSA compliant](https://github.com/acdlite/flux-standard-action). This means if you are listening for the `UPDATE_PATH` action in a reducer you should get properties off the `payload` property. (#63)

Other fixes:

* Redux DevTools should now work as expected (#73)
* As we no longer depend on `window.location`, `<base href="...">` should now work (#62)
* We've done lots of work on finding the right way to stop cycles, so hopefully we shouldn't have any unnecessary location or store updates (#50)
