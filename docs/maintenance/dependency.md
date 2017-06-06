# Update Project Dependencies

Updating the dependencies is a tedious job. This doc is intended to help streamline the process and make it painless.

## Maintain Update Log

There's a sample `Update Log` at the end of this document. Create a new file where you can dump the Version Diff, Test results, Chrome/Node/Yarn versions. Mention the dependencies that you had to roll back along with the reason. Optionally you can mention the errors/warnings that you encountered while updating dependencies.

## Managing Node Versions
It is recommended that you use [Node Version Manager](https://github.com/creationix/nvm) or [Node Version Control](https://github.com/tj/n) to switch node versions quickly in order to run and test this project on multiple node versions.

## Update Tooling

**Update Yarn:** 

1. For OSX users- `brew unlink yarn && brew install yarn`

2. For other users, follow [yarn docs](https://yarnpkg.com/en/docs/install).
3. Run `yarn --version` and record yarn version in `Update Log`.

**Update Chrome**

1. Download the [latest version](https://www.google.com/chrome/browser/desktop/index.html) or go to [chrome://settings/](chrome://settings/) and update.

2. Go to `Chrome -> About` and record version number in `Update Log`

## Update Dependencies
[npm-check-updates](https://github.com/tjunnone/npm-check-updates) is a great tool to update your dependencies. It will only update your `package.json`. Run `npm install` or `yarn` if you want to install updated package versions. There are 3 useful commands. 

1. `ncu -u --semverLevel minor`
2. `ncu -u --semverLevel major`
3. `ncu -u`

Confirm/adjust eslint-config-airbnb compatible [dependency versions](https://www.npmjs.com/package/eslint-config-airbnb)

`npm info "eslint-config-airbnb@latest" peerDependencies`

**NOTE:** Copy and paste the version diff from the terminal into your `Update Log`.

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

- `npm run clean`
- `npm run generate component` TestComp /w defaults
- `npm run generate container TestPage` /w defaults
- `npm run generate route` to TestPage - /test
    
    Use TestComp on TestPage -> bypass all tests in TestComp and TestPage (set true = true)
- `npm start` > `localhost:3000/test`
- `npm test` (expect test failure due to incomplete test coverage)
- `npm run build`
- `npm run start:prod`  > `localhost:3000/test`

Notes:

n = 

ncu = 

--- In react-bolierplate parent dir --

**Update tooling:**

-- Check Node/Npm versions: --

node: 	`sudo n latest` (see https://nodejs.org/en/download/releases/)
npm: 	`curl -0 -L https://npmjs.org/install.sh | sudo sh`

** [Check Yarn:](https://github.com/yarnpkg/yarn)
yarn: update with Homebrew**

		`brew unlink yarn`
		`brew install yarn`

Chrome:	Chrome > About...

Record version numbers in `Update Log`

** git clone **

`https://github.com/react-boilerplate/react-boilerplate.git react-bp && cd react-bp && git checkout dev`

`rm yarn.lock`\

`ncu -u --semverLevel minor` (update to latest - review previous hold/rollback notes)

`ncu -u --semverLevel major` (update to latest - review previous hold/rollback notes)

`ncu -u` (update to latest - review previous hold/rollback notes)

`npm info "eslint-config-airbnb@latest" peerDependencies` (confirm/adjust eslint-config-airbnb compatible
	[dependency versions](https://www.npmjs.com/package/eslint-config-airbnb)

--- Run Test script as below, correct errors/rollback deps, record Update Log ---

--- In react-bolierplate project --

Update (fetch/merge) local dev branch

`git checkout dev`
`git checkout -b update-deps`

copy package.json and yarn.lock from react-bp

`git add .`
`git commit -m "chore(deps): update deps roll-up Aug-27-2016"` <-- fix date

`git push -u origin update-deps`

Open PR from origin update-deps to upstream dev (Copy "Test script and currernt "Update Log" as PR comment)


-- Test script --

`git add .``
`git commit -m "testing..."`


-- Update log --

Node 7.5.0
npm 4.1.2
yarn 0.20.0
Mac OS 10.11.6
Chrome 56.0.2924.87 (64-bit)

chore(deps): update deps roll-up Feb-04-2017

- **Patch Updates:**
 express                                         4.14.0  →  4.14.1
 fontfaceobserver                                 2.0.7  →   2.0.8
 redux-immutable                                 3.0.10  →  3.0.11
 babel-plugin-react-intl                          2.3.0  →   2.3.1
 babel-plugin-transform-react-remove-prop-types  0.2.11  →  0.2.12
 enzyme                                           2.7.0  →   2.7.1
 eslint                                          3.13.0  →  3.13.1
 lint-staged                                      3.2.7  →   3.2.9
 ngrok                                            2.2.5  →   2.2.6
 node-plop                                        0.5.4  →   0.5.5
 plop                                             1.7.3  →   1.7.4
 webpack                                          2.2.0  →   2.2.1

- **Minor updates:**
 history                  3.0.0  →   3.2.1
 styled-components        1.3.1  →   1.4.3
 file-loader              0.9.0  →  0.10.0
 html-webpack-plugin     2.26.0  →  2.28.0
 lint-staged              3.2.9  →   3.3.0
 offline-plugin           4.5.5  →   4.6.1
 webpack-dev-middleware   1.9.0  →  1.10.0
 webpack-hot-middleware  2.15.0  →  2.16.1

 - Incompatible per `npm info "eslint-config-airbnb@latest" peerDependencies`
   adjust eslint-config-airbnb compatible dependency versions.
   see: https://www.npmjs.com/package/eslint-config-airbnb

   ***eslint                  3.13.1  →  3.15.0 <--- rolled back***

- **Major updates:**
 none

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

   react-boilerplate@3.4.0 /Users/glen/Documents/JavaScript/Research/react-bp
   └── UNMET PEER DEPENDENCY history@4.5.1

   npm ERR! peer dep missing: history@^2.0.0 || ^3.0.0, required by react-router-scroll@0.4.1

   ***history               3.2.1  →   4.5.1 <--- rolled back***

 Addressed here https://github.com/imagemin/imagemin-pngquant/issues/32 ***Needs Testing***
 - Error: (some OS X installations only, not version specific)

   Addressed here https://github.com/imagemin/imagemin-pngquant/issues/32, but throws warnings (below)

   In ./app/components/Header/banner.jpg
   Module build failed: Error: dyld: Library not loaded: /usr/local/opt/libpng/lib/libpng16.16.dylib
     Referenced from: ~/react-boilerplate/node_modules/mozjpeg/vendor/cjpeg
     Reason: image not found

   ***image-webpack-loader              2.0.0  →    3.0.0 <--- rolled back***
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

   ***image-webpack-loader  2.0.0  →   3.2.0 <--- Rolled back***
