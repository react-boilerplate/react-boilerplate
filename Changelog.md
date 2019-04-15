# Changelog

## RBP v4: "The One With Hooks (And Much More)" Edition (April 2019)

### News

React Boilerplate v4.0.0 is out and it's a doozy! Here are the highlights:

- React has added many new features and it's time for React Boilerplate to embrace them.
  - We now use `React.lazy` and `Suspense` for component lazy-loading instead of an external library.
  - We've added `useInjectSaga` and `useInjectReducer` hooks to manage saga and reducer injection. They're integrated into the generators and thus become the new defaults. (Should you need them, the HOCs are still there.)
  - The generators don't support classes anymore. The `PureComponent` vs `Component` choice was replaced with an option to wrap your component inside `React.memo`.
- After much deliberation, `Immutable.js` is finally gone. We've added `Immer` instead. With it, we can write very concise and readable reducers while sticking to native JavaScript data structures.
- Following the release of React Hooks, it's become even clearer that `react-testing-library` is now the industry-standard for React DOM testing. Workarounds for the incompatibilities between `enzyme` and `styled-components` are gone and we can now write leaner and more meaningful tests.

There are many more changes to our documentation, internals and general project setup. You can find a full changelog below.

Huge thanks to @Mensae, @gretzky, @jwinn and everyone who helped review or submit PRs! If I've forgotten your contribution in the credits below, please let me know.

We hope you enjoy this release and welcome any feedback, bug reports or feature suggestions you can send our way!

### Main

- **Remove `Immutable.js` in favor of `Immer`** (**@julienben**, **@robertaird**)
- **Migrate from `enzyme` to `react-testing-library`** (**@mensae**)
  - New instructions for snapshot and behavior testing
- **Embracing Hooks** (**@julienben**)
  - Add `eslint-plugin-react-hooks`
  - Migrate all class components to functions
  - Add `useInjectSaga` and `useInjectReducer` hooks
  - Remove generator options to extend `Component` or `PureComponent`. Replace with a `React.memo` option.
- **Use `React.lazy` and `Suspense` instead of `loadable-components` to code-split and asynchronously load components** (**@julienben**)

### Documentation updates

- Update Heroku deployment instructions (**@TheAncientGoat**)
- Add subfolder deployment instructions (**@nshimiye**)
- Add AWS EB deployment instructions (**@Al-un**)
- Spelling and grammar fixes (**@khayyamsaleem**, **@ngtan**)

### Internals updates

- Many dependency updates including: (**@julienben**)
  - react and react-dom (`16.6` to `16.8.6`)
  - react-redux (`5` to `7`) (**@bumi001**, **@jwinn**)
  - connected-react-router (`4` to `6`)
  - react-router-dom (`4` to `5`)
  - redux-saga (`0.16` to `1`)
  - sanitize.css (`4` to `8`)
- Update default saga injection mode to DAEMON (**@howardya**)
- Update generators to reflect all the stack changes
- Migrate default Node version to `lts/dubnium` (**@julienben**)
- Fix support for `stylelint` (**@jwinn**)
- Fix setup script for Windows environments (**@mensae**)
- Generate passing tests for components/containers (**@mjhost**)
- Rewrite generators code (**@mensae**)
- Complete rewrite or `generate-templates-for-linting.js` (**@mensae**)
- `webpack.DefinePlugin` => `webpack.EnvironmentPlugin` (**@nshimiye**)
- New Webpack code splitting config (**@julienben**)
- Remove `process.noDeprecation = true` (**@spawnia**)
- Miscellaneous fixes (**@ngtan**)

### Project maintenance

- Switch from Gitter to Spectrum (**@gretzky**)
- Update Code of Conduct and Contribution Guidelines (**@julienben**)
- New Issue Templates (**@gretzky**)
- New bots to help with issue management (**@gretzky**)
- Better recognition of contributors via adherence to [All Contributors](https://allcontributors.org/) specification (**@julienben**)

## 3.7 October 2018

### News

Welcome to a new React Boilerplate release with improvements aplenty, bug fixes and major dependency upgrades! Big thanks to @gretzky, @justingreenberg, @jwinn and everyone who helped review and submit PRs for this release!

For existing projects, the only way to upgrade from `3.6.0` is to manually apply the changes from #2403 to your project. Please be careful when doing so as it isn't officially supported and could break things on your end.

Next steps will include re-thinking immutability in the store (RFC @ #2092), re-organizing docs, saga improvements, smart bundling and plenty more. Please keep the PRs coming. And if you're up for it, remember that you can use the dev branch to test all the latest updates and report bugs!

### Main

- **Upgrades to Babel 7, React 16.6, ESLint 5, styled-components 4** (@julienben)
  - Config file and Babel plugin cleanup (@gretzky)
  - Fix extract-intl script for Babel 7 (@fanixk)
- **Webpack improvements**
  - Removal of dll plugin (@gretzky)
  - Gzipping and better optimization config in prod (@gretzky)
  - react-app-polyfill for targeted IE support (@gretzky)
  - Switch from UglifyJS to Terser plugin (@robertaird)
  - Icons generated by webpack-pwa-manifest plugin (@Mensae)
- **Switch from Yarn back to npm** (@julienben)
  - CI improvements (@jwinn)
- **New documentation section for forks**
  - SSR (@gretzky)
  - Electron (@mjangir)
  - TypeScript (@Can-Sahin)

### Other Updates

- Migration from deprecated react-router-redux to connected-react-router (@julienben)
- Migration from react-loadable to loadable-components (@julienben)
- Quick start - Clone to a named directory (@spawnia)
- Scoped variables in i18n messages (@hatsuo)
- Use .prettierrc path relative to .eslintrc.js (@abeMedia)
- Fixes to generators (@julienben, @hatsuo, @ngtan)
- babel-plugin-lodash for easier import syntax (@julienben)
- Bug fix in setup script (@autechr3)

Lots of additional documentation updates thanks to @doaboa, @cheickmec, @nicogreenarry, @sduquej, @diwakar-s-maurya.

## 3.6 June 2018

### News

Major version updates are finally here! It's been awhile, but we're a small team that's been pushing this for awhile. Thanks to several users' PRs, we were able to cherry-pick a lot from the dev branch to push this release out. We decided because of the amount of dependencies that needed to be updated- we would overshoot some of the changes made on the dev branch and just grab the most pressing ones.

Next steps for us will be revisiting the dev branch, revisiting outstanding PRs and RFCs (like Immutable), and also plugging away at a create-react-app spinoff for react-boilerplate.

### Main

- **Upgrade Webpack to v4** (@julienben @stern-shawn)
  - Syntax / function changes (mode, optimization, etc.)
  - Remove webpack loader syntax from main app
  - Better SVG handling
- **Upgrade Redux to v4** (@gretzky)
- **Upgrade React to v16** (@blling @gretzky)
- **Upgrade Enzyme to v3** (@blling @gretzky)
  - Add in new Adapter, as required
  - Minor Jest config tweaks to include new Enzyme setup config
- **Upgrade styled-components to v3** (@julienben)
  - Reconfigure Jest snapshot testing for styled-components (@gretzky)
- **Added support for node v9, v8** (@julienben)
  - Removed support for node v6
- **Add Prettier** (@julienben)
- **Upgrade ESLint to v4** (@julienben)
- **Add stylelint and stylelint config** (@julienben)

### Other Updates

- Add `--fix` flag to eslint command (@shobhitchittora)
- Correct babel plugin order (@petrhanak)
- Add missing `import PropTypes` to component generators (@GoldAnna)
- Remove unnecessary `onRejected()` from FontFaceObserver (@akarve)
- Include "Setting Up Your Editor" in documentation (@mjbvz)
- Add login / authentication flow example into documentation (@tinavanschelt)
- More detailed redux-saga usage documentation (@acharlop)
- Fix ejection error of done sagas (@outdooricon)

## 3.5 September 2017

### News

So, a few things have changed in the JS ecosystem since the original release of React Boilerplate, and there was a discussion in #1776 around the it's future. TLDR; we had two incompatible PRs — one for server-side rendering, and another for react-router v4. The community decided that we would keep our dependencies up to date (upgrade react-router) and establish a clear mission for React Boilerplate:

**React Boilerplate is a rock-solid foundation for crafting large, high-performance enterprise-grade frontend web applications that have advanced/custom requirements.**

- Static output designed for CDN and edge caches
- Extreme Developer Ergonomics
  - Parallelized Tests
  - DLL manifest in development for blazing rebuilds
  - Scaffolding tools
- Pre-baked i18n support
- Low level tooling that gives developer complete control

We may include SSR in a future version, but for now this is our focus... create-react-app and next.js are doing an awesome job and strongly recommend these projects for most use cases.

### Breaking

- **Upgrade React Router to v4.x.x** (@anuraaga, @Dattaya, et al)
  - Use React-Loadable for data lifecycle management
  - Refactor `asyncInjectors`: improve code splitting/saga management
  - For a complete overview of changes, please see #1746

### Main

- **Upgrade React to v15.6** (@g0ddish)
- **Upgrade Webpack and related dependencies to v3.x.x** (@KarandikarMihir)
- **Upgrade `styled-components` to v2.x.x** (@justingreenberg)
- Replace `babel-preset-hmre` with vanilla Webpack HMR (@Dattaya)
- Serve Dlls via `add-asset-html-webpack-plugin` (@skidding)
- Migrate from `React.PropTypes` to `prop-types` (@dennybiasioll

### Other Updates

- Add Stateless Functions to Container generator (@outdooricon)
- Change development sourcemap style (@samit4me)
- Create new documentation for dependency updates (@gihrig)
- Downgrade `sanitize.css` (@Dattaya)
- Enable rule `react/no-array-index-key` (@carloscuatin)
- Fix `Intl` polyfill in language generator (@tmf)
- Handle 204 and 205 HTTP response (@williamdclt)
- Icon updates and improvements (@samit4me)
- Import only necessary components for RRv4 (@sorin-davidoi)
- Improve `<List>` component tests (@chaintng)
- Improve component tests in demo (@dennybiasiolli)
- Improve setup to recognize repo before clearing git (@Aftabnack)
- Make build output less verbose (@KarandikarMihir)
- Move `onSubmitForm` test into `mapDispatchToProps` test (@tomasfrancisco)
- NPM script and dependency updates, many fixes (@gihrig)
- Remove state update in componentWillUpdate (@mawi12345)
- Remove unused Sinon dependency (@avdeev)
- Remove route names from `app/routes` (@beardedtim)
- Rename `store.js` to `configureStore.js` to prevent conflict (@howardya)
- Separate `dev` and `prod` middleware (@tomazy)
- Sort ESLint config in `package.json` (@bt)
- Support OpenType fonts with `.otf` file extension (@kachkaev)
- Turn `App` into a functional component (@Dattaya)
- Update FAQ for styles getting overridden (@samit4me)
- Update the 'tagged template literals' link (@joncass)
- Use camelcase for reducer and saga key to match selector (@anuraaga)
- Use correct selector names in tests (@Dattaya)
- Use local instance of `shelljs` (@KarandikarMihir)
- Use optimized version of the RBP banner (@tomazy)
- Use relative path for `manifest.json` (@mrharel)

Many fixes to documentation thanks to @Aftabnack, @auchenberg, @danielrob, @gregoralbrecht, @JonathanMerklin, @marciopuga, @NicholasAnthony, @Skaronator, and @vedatmahir

## 3.4 January 2017

### Main

- **Switch to Jest for testing**, massive thanks to @dmitriiabramov
- **Update to webpack 2 RC** (includes switching from `System.import` to `import()`), thanks to @Dattaya
- **Add progress bar while loading code splitted routes**, thanks to @KarandikarMihir
- **Add the "Hitchhikers Guide to `react-boilerplate` to the docs**, massive thanks to @KarandikarMihir
- Update all dependencies, as always huge thanks to @gihrig, our master of dependencies
- Enable `import/first` eslint rule and rewrite all imports, huge thanks to @KarandikarMihir
- Add Node v7 support and deprecate v4 support, thanks to @samit4me @MariusRumpf
- Prevent i18n language duplication, thanks to @harijoe
- Add the webpack circular dependency plugin to avoid hard to debug errors, thanks to @haikyuu
- Refactor all selectors and generators with new naming convention, thanks to @Dattaya
- Update generator templates, thanks to @Virsaviya @jeremyadavis
- Add support for the `--host` parameter when running `npm start`, thanks to @ifedotov
- Showcase reselects `createStructuredSelector` in the example, thanks to @Dattaya
- Exclude test files from coverage report, thanks to @samit4me
- Lint the templates for the generators, thanks to @Dattaya
- Huge improvement to DX testing a freshly cleaned project, thanks to @outdooricon

### Other Updates

- **Remove the webpack DedupePlugin** as it leads to errors in production and is now included by default, thanks to @samit4me
- Remove the `npm run pagespeed` command and all related dependencies and files, thanks to @mkhazov
- Trigger a full page reload when HMR fails, thanks @kachkaev
- Don't import all of lodash, thanks to @jwinn
- Improve `.editconfig`, thanks to @avdeev
- Improve the example components, thanks to @tomazy
- Fix `npm run clean` not working as expected, thanks to @adjnor
- Fix the i18n button not updating with new state, thanks to @adjnor
- Fix console error when changing language, thanks to @samit4me
- Fix default polyfill language, thanks to @web2style
- Fix language generation, thanks to @chaintng
- Switch to new webpack query syntax, thanks to @shrynx
- Add an Introductory document to help people get started, thanks to @KarandikarMihir
- Add security configuration recommendations for Nginx (`.nginx.conf`), thanks to @supergicko
- Add and fix lots to stuff in the documentation, thanks to @pavlin-policar, @samit4me @outdooricon @PierrickGT @nndung179 @outdooricon @kelsonic @jimmyheaddon
- A wide variety of small fixes, thanks to @Dattaya @gihrig @outdooricon

### News

Welcome @KarandikarMihir to the team! Karandikar has been all over the repo, providing fixes and features. Happy to have him on board to make `react-boilerplate` even better!

Special thanks as always to @gihrig for diligently testing everything and keeping our dependencies up to date!

Also, huge props to @samit4me and @Dattaya for being everywhere and fixing so many issues and of course to @KarandikarMihir for all his hard work.

If you want to help us make react-boilerplate great, please use the `dev` branch, test all the things and report all the bugs!

### Supporters

This release was made possible by [Fullstack React](https://www.fullstackreact.com/) and [Serverless](http://serverless.com)! _Want to support us too? [Click here!](http://opencollective.com/react-boilerplate)_

## RBP v3.0: The "JS Fatigue Antivenin" Edition

React Boilerplate (RBP) v3.0.0 is out, and it's a _complete_ rewrite! :tada:

We've focused on becoming a rock-solid foundation to start your next project
with, no matter what its scale. You get to focus on writing your app because we
focus on making that as easy as pie.

website!

## Highlights

- **Scaffolding**: Thanks to @somus, you can now run `npm run generate` in your
  terminal and immediately create new components, containers, sagas, routes and
  selectors! No more context switching, no more "Create new file, copy and paste
  that boilerplate structure, bla bla": just `npm run generate <thing>` and go.

  Oh... and starting a project got a whole lot easier too: `npm run setup`. Done.

- **Revamped architecture**: Following the incredible discussion in #27 (thanks
  everybody for sharing your thoughts), we now have a weapons-grade, domain-driven
  application architecture.

  "Smart" containers are now isolated from stateless and/or generic components,
  tests are now co-located with the code that they validate.

- **New industry-standard JS utilities** We're now making the most of...

  - ImmutableJS
  - reselect
  - react-router-redux
  - redux-saga

- **Huge CSS Improvements**

  - _[CSS Modules](docs/css/css-modules.md)_: Finally, truly modular, reusable
    styles!
  - _Page-specific CSS_: smart Webpack configuration means that only the CSS
    your components need is served
  - _Standards rock:_ Nothing beats consistent styling so we beefed up the
    quality checks with **[stylelint](docs/css/stylelint.md)** to help ensure
    that you and your team stay on point.

- **Performance**

  - _Code splitting_: splitting/chunking by route means the leanest, meanest
    payload (because the fastest code is the code you don't load!)

- **Testing setup**: Thanks to @jbinto's herculean efforts, testing is now a
  first-class citizen of this boilerplate. (the example app has _99% test coverage!_)
  Karma and enzyme take care of unit testing, while ngrok tunnels your local
  server for access from anywhere in the world – perfect for testing on different
  devices in different locations.

- **New server setup**: Thanks to the mighty @grabbou, we now use express.js to
  give users a production-ready server right out of the box. Hot reloading is
  still as available as always, but adding a custom API or a non-React page to
  your application is now easier than ever :smile:

- **Cleaner layout:** We've taken no prisoners with our approach to keeping your
  code the star of the show: wherever possible, the new file layout keeps the
  config in the background so that you can keep your focus where it needs to be.

- **Documentation**: Thanks to @oliverturner, this boilerplate has some of the best
  documentation going. Not just clearly explained usage guides, but easy-to-follow
  _removal_ guides for most features too. RBP is just a launchpad: don't want to
  use a bundled feature? Get rid of it quickly and easily without having to dig
  through the code.

- **Countless small improvements**: Everything, from linting pre-commit (thanks
  @okonet!) to code splitting to cross-OS compatibility is now tested and ready
  to go:

  - We finally added a **[CoC](CODE_OF_CONDUCT.md)**
  - Windows compatibility has improved massively
