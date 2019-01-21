# CHANGELOG

:information_source: For all later changes, please see https://github.com/NekR/offline-plugin/releases

### 4.8.1

* Fix TypeScript typings

### 4.8.0

* [Internals]: Async `waitUntil` is now a thing (polyfilled)
* Added `TypeScript` definitions
* RegExp support in cache paths [#205](https://github.com/NekR/offline-plugin/pull/205)
* Added `ServiceWorker.minify` option to force to minify [#204](https://github.com/NekR/offline-plugin/pull/204) &  [#206](https://github.com/NekR/offline-plugin/pull/206)
* Allow ServiceWorker to be installed on any local IP (`127.*.*.*`) [#251](https://github.com/NekR/offline-plugin/pull/251)
* Ship `ServiceWorker.minify` option which controls if ServiceWorker's code will be minified or not

### 4.7.0

* ServiceWorker can now be registered at `127.0.0.1` [#188](https://github.com/NekR/offline-plugin/pull/188)
* New `ServiceWorker.navigateFallbackForRedirects` option which is `true` by default (compatibility reasons) [#230](https://github.com/NekR/offline-plugin/pull/230)
* Fixed new security restriction introduced in browsers regardless navigation requests and redirects [#231](https://github.com/NekR/offline-plugin/issues/231)

### 4.6.2

* Wrap `applicationCache.update()` with `try..catch` #189

### 4.6.1

* Fixed syntax error in `runtime-template.js`

### 4.6.0

* Fixed compatibility with `hard-source-webpack-plugin` #148
* Added `autoUpdate` option and `runtime.update()` method #169

### 4.5.5

* Fix `request.headers` typo in `validatePrefetch` which was preventing setting custom headers for prefetch requests

### 4.5.4

* Use `compilation.errors` instead of `callback(new Error('...'))` when runtime is missing

### 4.0.0 - 4.5.3

* `relativePaths` is now automatically set to `false` when `publicPath` is used
* `publicPath` now uses `webpack.config.js`'s `output.publicPath` by default (when not set in `OfflinePlugin` itself)
* Added `AppCache.output` which is replacement for `AppCache.directory`. The last is deprecated now
* Added `ServiceWorker.publicPath` and `AppCache.publicPath`
* Added `:externals:` keyword for caches. When used, keyword is replaced with URLs listed in `externals` option
* `caches: 'all'` is now equivalent of `caches: { main: [':rest:', ':externals:'] }`. In other words, `externals` URLs are now included in `caches` by default
* Default options of `offline-plugin` are now exposed as `require('offline-plugin').defaultOptions`
* `ignoreSearch` isn't applied to assets added with `externals` anymore. i.e. full URLs with `?query` can now be added to the caches
* Added `responseStrategy` option. Thanks to [@MoOx](https://github.com/MoOx). [#112](https://github.com/NekR/offline-plugin/pull/112)
* Added `ServiceWorker.cacheName` option. Useful (but very dangerous) when you need to run more than one project on the same domain
* Make `updateStrategy` default to `'changed'`
* Added `ServiceWorker.prefetchRequest` option
* Plugin now outputs its version to generated `ServiceWorker`/`AppCache` files
* Implemented `cacheMaps` option
* Made AppCache to not include cross origin URLs by default (because they don't work there on HTTPS). Could be returned back with `AppCache.includeCrossOrigin = true`
* Dropped Node 0.10, Node 0.12 and IO.js support
* Updated `minimatch` to 3.*
* Add AppVeyor CI tests


### 3.4.0

* Added `ServiceWorker.navigateFallbackURL` option (see #71)
* Added warning about development mode in `runtime.js` when used without `OfflinePlugin` in `webpack.config.js` (see #74)

### 3.3.0

* Fixed absolute URLs being prefixed with relative path when `relativePaths: true` is used ([#39](https://github.com/NekR/offline-plugin/issues/39), [#60](https://github.com/NekR/offline-plugin/issues/60))
* Added `scope` option to ServiceWorker ([#19](https://github.com/NekR/offline-plugin/issues/19)). See [ServiceWorker.register](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register) docs.

### 3.0.0 - 3.2.0

* All assets are now requested cache-bust query parameter (`__uncache=${ Date.now() }`)
* Assets matching in caches now ignores search (query) path of URLs
* Rename `scope` option to `publicPath` (`scope` is deprecated now and will produce warnings upon use)
* Make `publicPath: ''` (empty string) by default
* Make `relativePaths: true` by default
* Cache sections `'additional'` and `'optional'` are now allowed only when `updateStrategy` option is set to `'changed'`
* `changed` is now default `updateStrategy` and `hash` strategy is gone. `offline-plugin` now uses webpack's build hashes to apply `change` update strategy even when generate file names are the same. [Issue 6](https://github.com/NekR/offline-plugin/issues/6). More details about change in docs.
* Any of `updateStrategy` is now using `version` option for its version tag
* `version` now is not set by default and returns (when not set, e.g. default) compilation hash for `updateStrategy: 'changed'` and `version` for `updateStrategy: 'all'`
* `version` now has interpolation value, use `[hash]` to insert compilation hash to your version string
* `install()` method signature now is `install(options)` (callbacks are removed)
* Runtime events are not implemented for ServiceWorker (and some for AppCache): `onUpdating`, `onUpdateReady`, `onUpdated`, `onInstalled`.  
  Example: `runtime.install({ onInstalled: () => ... })`
* Added `applyUpdate()` method to runtime
* Absolute URLs can now be specified in `caches` as any other assets (they are required to be marked as `externals`)
* Added basic test and Travis CI

### 2.2.0

* Disallow pattern matching in `externals`

### 2.1.0

* Allow pattern matching in `externals`

### 2.0.0

* Added `relativePaths` option. When `true`, all generated paths are relative to `ServiceWorker` file or `AppCache` folder. Useful in cases when app isn't in the root of domain, e.g. Github Pages. Setting `scope` to `''` (empty string) is the same now as `relativePaths: true`.
* Added `excludes` option to exclude assets from caches. Exclusion is global and is performed before any assets added to cache sections.
* Not specified sections in caches now equals to empty selection. Previously, `:rest:` keyword was added automatically, now isn't.
* ':rest:' keyword is now handled after all caches sections were handled. Previously it was handled immediately when found.
* Plugin now throws an error when keyword `:rest:` is used more than once.
* `ServiceWorker` generation now used Child Compilation instead weird hacks with entry injections.

### 1.3.1

Improved `ServiceWorker` entry generation: use `compilation.namedChunks` instead of `compilation.assets` to access service-entry and replace it. See #10 for more details.

### 1.3

Added `FALLBACK` back section for `AppCache` and fixed generation of a `NETWORK` section.

### 1.2

Remove support of multi-stage caching from `AppCache`. Reason is that files cached in second manifest cannot be accessed from page cached by first one, since `NETWORK` section can only dictate to use _network_ (`*`) or _nothing_ (pretend offline), but not _fallback to browser defaults_. This means that any attempt to access files of second manifest goes to the network or fails immediately, instead of reading from cache.

### 1.1

Fix `ServiceWorker` login to not cache `additional`'s section assets on `activate` event, instead, cache them without blocking any events. Other `ServiceWorker` logic fixes.

### 1.0

Release
