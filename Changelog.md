# Changelog

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
