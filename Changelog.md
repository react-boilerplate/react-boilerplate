# Changelog

## 3.5 September 2017

## News

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
