# React.js Boilerplate [![Dependency Status][dep-status-img]][dep-status-link] [![devDependency Status][dev-dep-status-img]][dev-dep-status-link] [![Build Status][ci-img]][ci-link] [![Code Coverage][coverage-img]][coverage-link]

Quick setup for new performance orientated, offline–first React.js applications featuring Redux, hot–reloading, PostCSS, react-router, ServiceWorker, AppCache, FontFaceObserver and Mocha.

Made with :heart: by [Max Stoiber](https://twitter.com/mxstbr) and [contributors](https://github.com/mxstbr/react-boilerplate/graphs/contributors). *If you're using this boilerplate, we'd love to [hear from you](https://github.com/mxstbr/react-boilerplate/issues/115)!*

[dep-status-img]: https://david-dm.org/mxstbr/react-boilerplate/v3.0.0.svg
[dep-status-link]: https://david-dm.org/mxstbr/react-boilerplate/v3.0.0
[dev-dep-status-img]: https://david-dm.org/mxstbr/react-boilerplate/v3.0.0/dev-status.svg
[dev-dep-status-link]: https://david-dm.org/mxstbr/react-boilerplate/v3.0.0#info=devDependencies
[ci-img]: https://travis-ci.org/mxstbr/react-boilerplate.svg?branch=v3.0.0
[ci-link]: https://travis-ci.org/mxstbr/react-boilerplate?branch=v3.0.0
[coverage-link]: https://coveralls.io/r/mxstbr/react-boilerplate?branch=v3.0.0
[coverage-img]: https://coveralls.io/repos/github/mxstbr/react-boilerplate/badge.svg?branch=v3.0.0

## Features

- **Instant feedback** Enjoy the best DX and code your app at the speed of thought! Your saved changes to the CSS and JS are reflected instantaneously without refreshing the page. Preserve application state even when you update something in the underlying code!

- **Predictable state management** with unidirectional data flow and time travel debugging.

- **Next generation JavaScript** use string templating, object destructuring, arrow functions, JSX syntax and more, today.

- **Next generation CSS**. Write composable CSS that's co-located with your components for complete modularity. Unique generated class names keep the  specificity low while eliminating clashes. Ship only the styles that are on the page for the best performance.

- **Industry-standard routing** It's natural to think of your site as a series of loosely-coupled mini applications: routing makes this possible.

- **Offline-first** The next frontier in performant web apps: availability without a network connection as soon as the website has been loaded once.

But wait... there's more!

  - **Built-in unit testing** the only way to guarantee code quality
  - **Native web app** functionality: your app's new home is the homescreen
  - **The fastest fonts** say goodbye to vacant text

**Coming soon!** render server-side for the most performant, accessible user experience possible.

## Documentation

- [General](docs/general)
  - [**Getting started**](docs/general/getting-started.md)
  - [Prerequisites](docs/general/prerequisites.md)
  - [Features](docs/general/features.md)
  - [**Commands**](docs/general/commands.md)
  - [Files](docs/general/files.md)
  - [FAQ](docs/general/faq.md)
- [Testing](docs/testing)
  - [Unit Testing](docs/general/unit-testing.md)
  - [Component Testing](docs/general/component-testing.md)
  - [Remote Testing](docs/general/remote-testing.md)
- [CSS](docs/css)


## Quick start

> Note: You'll need Node, npm and git installed for this to work, see the [prerequisites](./docs/general/prerequisites.md)!

1. Clone this repo using `$ git clone git@github.com:mxstbr/react-boilerplate`.

2. Run `$ npm run setup` to initialize a new project.

3. Run `$ npm start` to start the local development environment.

Now you can go to `http://localhost:3000` and see your app!

### Building & Deploying

1. Run `$ npm run build`, which will compile all the necessary files to the `build` folder.

2. Upload the contents of the `build` folder to your web servers root folder.

## Overview

### Structure

As a developer making an application, check out the `app/` folder and the files in there. The rest of the folders and files only exist to make your life easier, and should not have to be touched. *(If they have to be changed, please submit an issue!)*

`app/` contains your entire application code, including CSS, JavaScript, HTML and tests.

### CSS

Each component has a unique `styles.css` file associated with it that is `import`ed in the main JavaScript file. (`index.js`) Each of those files gets run through PostCSS and is compiled into one big stylesheet that is sent down the pipe.

See the [CSS documentation](docs/css/README.md) for more information about PostCSS and CSS modules.

### JS

We bundle all your clientside scripts and chunk them into several files if possible using code splitting. We automatically optimize your code when building for production so you don't have to worry about that.

See the [JS documentation](docs/js/README.md) for more information about the JavaScript side of things.

### Testing

For a throughout explanation of the testing procedure, see the [testing documentation](docs/testing/README.md)!

#### Performance testing

With the development server running (i.e. while `$ npm start` is running in another tab), enter `$ npm run pagespeed` to run Google PageSpeed Insights and get a performance check right in your terminal!

#### Browser testing

With `$ npm run serve` you can start a server that's accessible in the entire world and shows the version of the app that's in the `build` folder. Useful for testing on different devices!

#### Unit testing

Unit tests live in `test/` directories right next to the components being tested and are run with `$ npm run test`.

## License

This project is licensed under the MIT license, Copyright (c) 2015 Maximilian Stoiber. For more information see `LICENSE.md`.
