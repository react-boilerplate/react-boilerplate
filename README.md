# React.js Boilerplate [![Dependency Status][dep-status-img]][dep-status-link] [![devDependency Status][dev-dep-status-img]][dev-dep-status-link] [![Build Status][ci-img]][ci]

Quick setup for new performance orientated, offline–first React.js applications featuring Redux, hot–reloading, PostCSS, react-router, ServiceWorker, AppCache, FontFaceObserver and Mocha.

Made with :heart: by [Max Stoiber](https://twitter.com/mxstbr).

*If you're using this boilerplate, we'd love to [hear from you](https://github.com/mxstbr/react-boilerplate/issues/115)!*

[dep-status-img]: https://david-dm.org/mxstbr/react-boilerplate/v3.0.0.svg
[dep-status-link]: https://david-dm.org/mxstbr/react-boilerplate/v3.0.0
[dev-dep-status-img]: https://david-dm.org/mxstbr/react-boilerplate/v3.0.0/dev-status.svg
[dev-dep-status-link]: https://david-dm.org/mxstbr/react-boilerplate/v3.0.0#info=devDependencies
[ci-img]: https://travis-ci.org/mxstbr/react-boilerplate.svg?branch=v3.0.0
[ci]: https://travis-ci.org/mxstbr/react-boilerplate?branch=v3.0.0

## Features

- Using [**react-transform-hmr**](https://github.com/gaearon/react-transform-hmr), your changes in the CSS and JS get reflected in the app instantly without refreshing the page. That means that the **current application state persists** even when you change something in the underlying code! For a very good explanation and demo watch Dan Abramov himself [talking about it at react-europe](https://www.youtube.com/watch?v=xsSnOQynTHs).

- [**Redux**](https://github.com/gaearon/redux) is a much better implementation of a flux–like, unidirectional data flow. Redux makes actions composable, reduces the boilerplate code and makes hot–reloading possible in the first place. For a good overview of redux check out the talk linked above or the [official documentation](https://gaearon.github.io/redux/)!

- [**PostCSS**](https://github.com/postcss/postcss) is like Sass, but modular and capable of much more. Using an array of plugins, we automatically prefix our CSS with the necessary vendor prefixes, are able to use as-of-yet-unreleased CSS4 features (variables, custom media queries,...) and much more awesome things.

- [**CSS Modules**](https://github.com/css-modules/css-modules) make our styles component specific. When building our application, all class names are scoped and become completely unique to the component. This means the end of global CSS and `!important` rules, and the beginning of a new era of CSS.

- [**Karma**](https://github.com/karma-runner/karma) in combination with [**Mocha**](https://github.com/mochajs/mocha) verify that our application is working exactly how it should without us lifting a single finger. Congratulations, you just won a First Class ticket to world domination, fasten your seat belt please!

- [**react-router**](https://github.com/rackt/react-router) is used for routing in this boilerplate. Since the URL the user is visiting is in reality a part of the application state, we use [**react-router-redux**](https://github.com/rackt/react-router-redux) to bind the current route to our application state.

- [**ServiceWorker**](http://www.html5rocks.com/en/tutorials/service-worker/introduction/) and [**AppCache**](http://www.html5rocks.com/en/tutorials/appcache/beginner/) make it possible to use your application offline. As soon as the website has been opened once, it is cached and available without a network connection. [**`manifest.json`**](https://developer.chrome.com/multidevice/android/installtohomescreen) makes it so users can add the website to the homescreen and use it like a native app!

## Getting started

> Note: You'll need Node, npm and git installed for this to work – if you don't have them installed, have never heard of them or one of those steps throws an error, check out the [prerequisites](./docs/general/prerequisites.md)!

1. Clone this repo using `git clone git@github.com:mxstbr/react-boilerplate`.

2. Run `npm run setup` to initialize a new project.

3. Run `npm start` to start the local development environment.

Now you can go to `http://localhost:3000` and see your app!

## Building & Deploying

1. Run `npm run build`, which will compile all the necessary files in a `build` folder.

2. Upload the contents of the `build` folder to your web server.

### Server Configuration

#### Apache

This boilerplate includes a `.htaccess` file that does two things:

1. Redirect all traffic to HTTPS because ServiceWorker only works for encrypted traffic

2. Rewrite all pages (e.g. yourdomain.com/subpage) to the `index.html` to let `react-router` take care of presenting the correct page

## Structure

As a developer making an application, check out the `app/` folder and the files inside. The rest of the folders and files only exist to make your life easier, and should not have to be touched. *(If they have to be changed, please submit an issue!)*

`app/` contains your entire application code, including CSS, JavaScript, HTML and tests.

## CSS

Each component has a unique `styles.css` file associated with it that is `import`ed in the main JavaScript file. (`index.js`) Each of those files gets run through PostCSS and is compiled into one big stylesheet that is sent down the pipe.

See the [CSS documentation](docs/css/README.md) for more information about PostCSS and CSS modules.

## JS

All files that are `import`ed/`require`d somewhere get compiled into one big file at build time. (`build/bundle.js`) Webpack automatically optimizes your JavaScript with `UglifyJS`, so you don't have to worry about that.

See the [JS documentation](docs/js/README.md) for more information about the JS.

## Testing

For a throughout explanation of the testing procedure, see the [testing documentation](docs/testing/README.md)!

### Performance testing

With the development server running (i.e. while `$ npm start` is running in another tab), enter `$ npm run pagespeed` to run Google PageSpeed Insights and get a performance check right in your terminal!

### Browser testing

With `$ npm run serve` you can start a server that's accessible in the entire world and shows the version of the app that's in the `build` folder. Useful for testing on different devices!

### Unit testing

Unit tests live in `test/` directories right next to the components being tested and are run with `$ npm run test`.

## Files in the root folder

For a full explanation of all files, see [`docs/general/files.md`](docs/general/files.md).

## Opinionated features

### Web Fonts

If you simply use web fonts in your project, the page will stay blank until these fonts are downloaded. That means a lot of waiting time in which users could already read the content.

[FontFaceObserver](https://github.com/bramstein/fontfaceobserver) adds a class to the `body` when the fonts have loaded. You should specify an initial `font-family` with save fonts on the `body`, and a class with the web fonts in the `font-family`. See [`app.js`](app/app.js#L26-L32) and [`App/styles.css`](app/containers/App/styles.css).

#### Adding a new font

1. Either add the `@font-face` declaration to `base/_fonts.css` or add a `<link>` tag to the [`index.html`](app/index.html). (Don't forget to remove the `<link>` for Open Sans from the [`index.html`](app/index.html))

2. In `app/base/_base.css`, specify your initial `font-family` in the `body` tag with only save fonts. In the `body.js-<font-name>-loaded` tag, specify your `font-family` stack with your web font.

3. In `app/js/app.js` add a `<font-name>Observer` for your font.

#### Removing performant web font loading

**Careful** about removing this, as perceived performance might be highly impacted.

To remove `FontFaceObserver`, don't import it in [`app.js`](app/js/app.js) and remove it from the [`package.json`](package.json).

### Offline access

Using a `ServiceWorker` and the `Application Cache`, your application is cached for offline usage.

#### Cache a new file

To cache a file, add it to the `urlsToCache` variable in the [`serviceworker.js`](app/serviceworker.js) file.

#### Removing offline access

**Careful** about removing this, as there is no real downside to having your application available when the users network connection isn't perfect.

To remove offline capability, delete the `offline-plugin` from the [`package.json`](package.json), remove the import of the plugin in [`app.js`](app/js/app.js) and remove the plugin from the [`webpack.prod.babel.js`](webpack/webpack.prod.babel.js).

### Add To Homescreen

On Chrome for Android (soon hopefully more browsers), users can add a webpage to the homescreen. Combined with offline caching, this means your web app can be used exactly like a native application.

The name and icon to be displayed are set in the `app/manifest.json` file. Change them to your project name and icon, and try it!

#### Removing add to homescreen functionality

Delete [`manifest.json`](app/manifest.json) and remove the `<link rel="manifest" href="manifest.json">` tag from the [`index.html`](app/index.html).

## License

This project is licensed under the MIT license, Copyright (c) 2015 Maximilian Stoiber. For more information see `LICENSE.md`.
