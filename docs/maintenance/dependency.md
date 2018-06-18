# Update Project Dependencies

Updating the dependencies is a tedious job. This doc is intended to help streamline the process and make it painless.

## Maintain Update Log

There's a sample `Update Log` at the end of this document. Create a new file where you can dump the Version Diff, Test results, Chrome/Node/Yarn versions. Mention the dependencies that you had to roll back along with the reason. Optionally you can mention the errors/warnings that you encountered while updating dependencies.

## Managing Node Versions

It is recommended that you use [Node Version Manager](https://github.com/creationix/nvm) or [Node Version Control](https://github.com/tj/n) to switch node versions quickly in order to run and test this project on multiple node versions.

## Update Tooling

**Update Yarn:**

1.  For OSX users- `brew unlink yarn && brew install yarn`

2.  For other users, follow [yarn docs](https://yarnpkg.com/en/docs/install).
3.  Run `yarn --version` and record yarn version in `Update Log`.

**Update Chrome**

1.  Download the [latest version](https://www.google.com/chrome/browser/desktop/index.html) or go to [chrome://settings/](chrome://settings/) and update.

2.  Go to `Chrome -> About` and record version number in `Update Log`

## Update Dependencies

[npm-check-updates](https://github.com/tjunnone/npm-check-updates) is a great tool to update your dependencies. It will only update your `package.json`. Run `npm install` or `yarn` if you want to install updated package versions. There are 3 useful commands.

1.  `ncu -u --semverLevel minor`
2.  `ncu -u --semverLevel major`
3.  `ncu -u`

Confirm/adjust eslint-config-airbnb compatible [dependency versions](https://www.npmjs.com/package/eslint-config-airbnb)

`npm info "eslint-config-airbnb@latest" peerDependencies`

### Pinned Version Numbers

`react-boilerplate` does not use "^", "~", etc., and these should be removed from `package.json`, if present. See [#598](https://github.com/react-boilerplate/react-boilerplate/issues/598) for more details.

At this point, you should copy and paste the version diff from the terminal into your `Update Log`.

## Correct Errors and Rollback Dependencies

Run `yarn` to install updated versions and then start the example app by running `npm start`. Make sure that the project is running smoothly. If not, track down the dependencies that are causing problems and try to roll them back one by one and check if the example application is running.

Note down the rolled back dependencies and state the reason in your `Update Log`.

## Full Regression Testing

Most of the errors/warnings would go away once you roll back the problemetic dependencies. But we need to make sure that the internal commands, tools, scaffolding etc. are functional too.

**Example App:**

- `rm -rf node_modules && rm yarn.lock`
- `yarn && npm start`

- Browse example app on development server
  - Browse Features page, change language to `de`
  - Browse NotFound page
- Browse example app on dev tunnel
- Browse example app on Production server
- Browse example app offline

Identify problems that occur and try to resolve them by rolling back the respective dependencies. Update the `Update Log`.

**Internal Commands:**

- `npm run clean` (Be careful, this will commit all your changes.)
- `npm run generate component` TestComp /w defaults
- `npm run generate container` TestPage /w defaults
- Add a new route in the App container:

```js
import TestPage from 'containers/TestPage/Loadable';

<Route path="/test" component={TestPage} />;
```

- Use TestComp on TestPage -> bypass all tests in TestComp and TestPage (set true = true)
- `npm start` > `localhost:3000/test`
- `npm test` (expect test failure due to incomplete test coverage)
- `npm run build`
- `npm run start:prod` > `localhost:3000/test`

# Sample Update Log

## Tooling Versions

- Node 7.5.0
- npm 4.1.2
- yarn 0.20.0
- Mac OS 10.11.6
- Chrome 56.0.2924.87 (64-bit)

## :spiral_notepad: Notes

1.  `react-router` was not updated. Thanks to @anuraaga for all his work. Ref- #1746
2.  `history` was not updated because of `react-router v3`'s dependency on it. Should go away when #1746 is merged.
3.  `react-test-renderer` was added as a dev-dependency because enzyme was showing warnings-
    > A few deprecation warnings were added in React 15.5. This supports the new APIs that React recommends. Ref. [#876](https://github.com/airbnb/enzyme/pull/876)
4.  If you see a package-name being repeated, note that the version number of the last occurrence will get precedence.

## :package: Version Diff

**[0] PATCH UPDATES**

```
 fontfaceobserver                        2.0.8  →    2.0.9
 ip                                      1.1.4  →    1.1.5
 react-redux                             5.0.2  →    5.0.5
 react-router                            3.0.2  →    3.0.5
 react-router-redux                      4.0.7  →    4.0.8
 react-router-scroll                     0.4.1  →    0.4.2
 redux-saga                             0.14.3  →   0.14.8
 whatwg-fetch                            2.0.2  →    2.0.3
 babel-plugin-dynamic-import-node        1.0.0  →    1.0.2
 coveralls                             2.11.15  →  2.11.16
 css-loader                             0.26.1  →   0.26.4
 exports-loader                          0.6.3  →    0.6.4
 file-loader                            0.10.0  →   0.10.1
 html-loader                             0.4.4  →    0.4.5
 imports-loader                          0.7.0  →    0.7.1
 lint-staged                             3.3.0  →    3.3.2
 ngrok                                   2.2.6  →    2.2.9
 offline-plugin                          4.6.1  →    4.6.2
 shelljs                                 0.7.6  →    0.7.7
 sinon                             2.0.0-pre.5  →    2.0.0
 style-loader                           0.13.1  →   0.13.2
 url-loader                              0.5.7  →    0.5.8
 webpack-dev-middleware                 1.10.0  →   1.10.2
```

**[1] MINOR UPDATES**

```
 babel-polyfill                                   6.22.0  →                 6.23.0
 cross-env                                         3.1.4  →                  3.2.4
 express                                          4.14.1  →                 4.15.3
 history                                           3.2.1  →                  3.3.0
 react                                            15.4.2  →                 15.5.4
 react-dom                                        15.4.2  →                 15.5.4
 react-intl                                        2.2.3  →                  2.3.0
 redux-immutable                                  3.0.11  →                  3.1.0
 redux-saga                                       0.14.8  →                 0.15.3
 babel-cli                                        6.22.2  →                 6.24.1
 babel-core                                       6.22.1  →                 6.24.1
 babel-eslint                                      7.1.1  →                  7.2.3
 babel-loader                                     6.2.10  →                  6.4.1
 babel-plugin-transform-es2015-modules-commonjs   6.22.0  →                 6.24.1
 babel-plugin-transform-react-constant-elements   6.22.0  →                 6.23.0
 babel-plugin-transform-react-remove-prop-types   0.2.12  →                  0.4.5
 babel-preset-env                                  1.4.0  →                  1.5.1
 babel-preset-react                               6.22.0  →                 6.24.1
 babel-preset-stage-0                             6.22.0  →                 6.24.1
 coveralls                                       2.11.16  →                 2.13.1
 css-loader                                       0.26.4  →                 0.28.4
 enzyme                                            2.7.1  →                  2.8.2
 eslint                                           3.13.1  →                 3.19.0
 eslint-config-airbnb                             14.0.0  →                 14.1.0
 eslint-config-airbnb-base                        11.0.1  →                 11.2.0
 eslint-plugin-import                              2.2.0  →                  2.3.0
 eslint-plugin-react                               6.9.0  →                 6.10.3
 file-loader                                      0.10.1  →                 0.11.1
 jest-cli                                         18.1.0  →  18.5.0-alpha.7da3df39
 lint-staged                                       3.3.2  →                  3.5.1
 node-plop                                         0.5.5  →                  0.7.0
 offline-plugin                                    4.6.2  →                  4.8.1
 plop                                              1.7.4  →                  1.8.0
 react-addons-test-utils                          15.4.2  →                 15.5.1
 rimraf                                            2.5.4  →                  2.6.1
 sinon                                             2.0.0  →                  2.3.2
 style-loader                                     0.13.2  →                 0.18.1
 webpack                                           2.2.1  →                  2.6.1
 webpack-hot-middleware                           2.16.1  →                 2.18.0
```

**[3] MAJOR UPDATES**

```
 cross-env                                   3.2.4  →       5.0.0
 history                                     3.3.0  →       4.6.1
 react-helmet                                4.0.0  →       5.1.3
 react-router                                3.0.5  →       4.1.1
 redux-immutable                             3.1.0  →       4.0.0
 reselect                                    2.5.4  →       3.0.1
 sanitize.css                                4.1.0  →       5.0.0
 babel-loader                                6.4.1  →       7.0.0
 circular-dependency-plugin                  2.0.0  →       3.0.0
 eslint-config-airbnb                       14.1.0  →      15.0.1
 eslint-plugin-jsx-a11y                      3.0.2  →       5.0.3
 eslint-plugin-react                        6.10.3  →       7.0.1
 image-webpack-loader                        2.0.0  →       3.3.1
 jest-cli                    18.5.0-alpha.7da3df39  →      20.0.4
```

**[4] ROLLBACKS**

```
 history                                     3.3.0  →       4.6.1 <--- rolled back
 react-router                                3.0.5  →       4.1.1 <--- rolled back
 image-webpack-loader                        2.0.0  →       3.0.0 <--- rolled back
```

**[5] NEW DEPENDENCIES**

```
react-test-renderer                                     15.5.4
```

## Errors Encountered

- Incompatible per `npm info "eslint-config-airbnb@latest" peerDependencies` adjust eslint-config-airbnb compatible dependency versions. see: https://www.npmjs.com/package/eslint-config-airbnb

  **_eslint 3.13.1 → 3.15.0 <--- rolled back_**

- Error observed in Travis CI build

```bash
   ERROR in ./~/react-router-scroll/lib/StateStorage.js
   Module not found: Error: Can't resolve 'history/lib/DOMStateStorage' in '
   /home/travis/build/gihrig/react-boilerplate/node_modules/react-router-scroll/lib'
    @ ./~/react-router-scroll/lib/StateStorage.js 5:23-61
    @ ./~/react-router-scroll/lib/ScrollBehaviorContext.js
    @ ./~/react-router-scroll/lib/useScroll.js
    @ ./~/react-router-scroll/lib/index.js
    @ ./app/app.js
    @ multi ./app/app.js
```

- `history` Incompatible

  react-boilerplate@3.4.0 /Users/glen/Documents/JavaScript/Research/react-bp
  └── UNMET PEER DEPENDENCY history@4.5.1

  npm ERR! peer dep missing: history@^2.0.0 || ^3.0.0, required by react-router-scroll@0.4.1

  **_history 3.2.1 → 4.5.1 <--- rolled back_**

Addressed here https://github.com/imagemin/imagemin-pngquant/issues/32 **_Needs Testing_**

- Error: (some OS X installations only, not version specific)

  Addressed here https://github.com/imagemin/imagemin-pngquant/issues/32, but throws warnings (below)

  In ./app/components/Header/banner.jpg
  Module build failed: Error: dyld: Library not loaded: /usr/local/opt/libpng/lib/libpng16.16.dylib
  Referenced from: ~/react-boilerplate/node_modules/mozjpeg/vendor/cjpeg
  Reason: image not found

  **_image-webpack-loader 2.0.0 → 3.0.0 <--- rolled back_**
  see: https://github.com/mxstbr/react-boilerplate/pull/1322#issuecomment-266264527 and #1335

- Warning: Observed on `npm start`

  WARNING in ./app/components/Header/banner.jpg
  DEPRECATED. Configure gifsicle's interlaced option in it's own options. (gifsicle.interlaced)
  @ ./app/components/Header/index.js 47:0-34
  @ ./app/containers/App/index.js
  @ ./app/app.js
  @ multi eventsource-polyfill webpack-hot-middleware/client?reload=true ./app/app.js
  WARNING in ./app/components/Header/banner.jpg
  DEPRECATED. Configure optipng's optimizationLevel option in it's own options. (optipng.optimizationLevel)
  @ ./app/components/Header/index.js 47:0-34
  @ ./app/containers/App/index.js
  @ ./app/app.js
  @ multi eventsource-polyfill webpack-hot-middleware/client?reload=true ./app/app.js

  **_image-webpack-loader 2.0.0 → 3.2.0 <--- Rolled back_**
