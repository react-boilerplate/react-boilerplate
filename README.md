# React.js Boilerplate

Quick setup for new performance orientated, offline–first React.js applications featuring Redux, hot–reloading, PostCSS, react-router, ServiceWorker, AppCache, FontFaceObserver and Mocha.

-----

## Features

- Using [**react-hot-loader**](https://github.com/gaearon/react-hot-loader), your changes in the CSS and JS get reflected in the app instantly without refreshing the page. That means that the **current application state persists** even when you change something in the underlying code! For a very good explanation and demo watch Dan Abramov himself [talking about it at react-europe](https://www.youtube.com/watch?v=xsSnOQynTHs).

- [**Redux**](https://github.com/gaearon/redux) is a much better implementation of a flux–like, unidirectional data flow. Redux makes actions composable, reduces the boilerplate code and makes hot–reloading possible in the first place. For a good overview of redux check out the talk linked above or the [official documentation](https://gaearon.github.io/redux/)!

- [**PostCSS**](https://github.com/postcss/postcss) is like Sass, but modular and capable of much more. PostCSS is, in essence, just a wrapper for plugins which exposes an easy to use, but very powerful API. While it is possible to [replicate Sass features](https://github.com/jonathantneal/precss) with PostCSS, PostCSS has an [ecosystem of amazing plugins](http://postcss.parts) with funcionalities Sass cannot even dream about having.

- **Unit tests** should be an important part of every web application developers toolchain. [Mocha](https://github.com/mochajs/mocha) checks your application is working exactly how it should without you lifting a single finger. Congratulations, you just won a First Class ticket to world domaination, fasten your seat belt please!

- [**react-router**](https://github.com/rackt/react-router) is used for routing in this boilerplate. Using the new, and currently unreleased, `1.0` version, react-router makes routing really easy to do and takes care of a lot of the work. Since the version is not officially out yet, the [documentation](https://github.com/rackt/react-router/blob/master/doc/00%20Guides/0%20Overview.md) is not fully finished, but by far finished enough to work for most needs.

- [ServiceWorker](http://www.html5rocks.com/en/tutorials/service-worker/introduction/) and [AppCache](http://www.html5rocks.com/en/tutorials/appcache/beginner/) make it possible to use your application offline. As soon as the website has been opened once, it is cached and available without a network connection. [`manifest.json`](https://developer.chrome.com/multidevice/android/installtohomescreen) is specifically for Chrome on Android. Users can add the website to the homescreen and use it like a native app!

## Getting started

1. Clone this repo using `git clone git@github.com:mxstbr/react-boilerplate`.

2. Delete the existing git repository by running `rm -rf .git`.

3. Initialize a new git repository with `git init`, `git add .` and `git commit -m "Initial commit"`.

4. Run `npm install` to install the dependencies.

5. Run `npm start` to start the local web server.

6. Go to `http://localhost:3000` and you should see the app running!

## Building & Deploying

1. Run `npm run build`, which will compile all the necessary files in a `build` folder.

2. Upload the contents of the `build` folder to your web server.

3. ?????? (You figure this part out)

4. Profit!

## CSS

The CSS modules found in the `css` subfolders all get imported into the `main.css` file, which get inlined and minified into the `compiled.css` file. To add/change the styling, either write the CSS into the appropriate module or make a new one and `@import` it in the `main.css` file at the appropriate place.

### PostCSS Plugins

The boilerplate uses PostCSS, and includes a few plugins by default:

* `postcss-import`: Inlines `@import`ed stylesheets to create one big stylesheet.

* `postcss-simple-vars`: Makes it possible to use `$variables in your CSS.

* `postcss-focus`: Adds a `:focus` selector to every `:hover`.

* `autoprefixer-core`: Prefixes your CSS automatically, supporting the last two versions of all major browsers and IE 8 and up.

* `cssnano`: Optimizes your CSS file. For a full list of optimizations check [the offical website](http://cssnano.co/optimisations/).

* `postcss-reporter`: Makes warnings by the above plugins visible in the console.

For a full, searchable catalog of plugins go to [postcss.parts](http://postcss.parts).

### Folder Structure

The boilerplate comes with a basic folder structure to keep the CSS files organised. This is what the folders are for:

* `base`: Global styling, e.g. setting the box–model for all elements

* `components`: Component specific styling, e.g. buttons, modals,...

* `layout`: Global layouts, e.g. article, homepage,...

* `utils`: Utility files, e.g. variables, mixins, functions,...

* `vendor`: External files, e.g. a CSS reset

## JS

All files that are `import`ed/`require`d somewhere get compiled into one big file at build time. (`build/bundle.js`) Webpack automatically optimizes your JavaScript with `UglifyJS`, so you do not have to worry about that.

### Folder Structure

The folder structure of the JS files reflects how [Redux](https://github.com/gaearon/redux) works, so if you are not familiar with Redux check out the [official documentation](https://gaearon.github.io/redux/).

* `actions`: Actions get dispatched with this/these utility module(s)

* `components`: The main JS folder. All your React components should be in this folder, for big projects they might be grouped into seperate subfolders. E.g. a navigation component `Nav.react.js`

* `constants`: Action constants need to be defined in this/these utility module(s)

* `reducers`: Reducers manage the state of an app, basically a simplified implementation of Stores in Flux. For an introduction to reducers, watch [this talk](https://www.youtube.com/watch?v=xsSnOQynTHs) by @gaearon.

## Testing

Unit tests live in the `test` directory, and are run with `npm test`. There are two files in there already, testing that the current AppActions and Reducers are working correctly. Should you be stuck and have no idea what is going on check out the official [Mocha documentation](http://mochajs.org)!

## Opinionated features

### Web Fonts

If you simply use web fonts in your project, the page will stay blank until these fonts are downloaded. That means a lot of waiting time in which users could already read the content.

[FontFaceObserver](https://github.com/bramstein/fontfaceobserver) adds a `js-<font-name>-loaded` class to the `body` when the fonts have loaded. You should specify an initial `font-family` with save fonts, and a `.js-<font-name>-loaded` `font-family` which includes your web font.

#### Adding a new font

1. Add the `@font-face` declaration to `base/_fonts.css`.

2. In `base/_base.css`, specify your initial `font-family` in the `body` tag with only save fonts. In the `body.js-<font-name>-loaded` tag, specify your `font-family` stack with your web font.

3. In `js/app.js` add a `<font-name>Observer` for your font.

### Offline access

Using a `ServiceWorker` and the `App Cache`, your application is cached for offline usage. TO cache a file, add it to `cache` variable of the `AppCachePlugin` in `webpack.build.config.js` and to the `urlsToCache` variable in the `serviceworker.js` file.

### Add To Homescreen

On Chrome for Android (soon hopefully more browsers), users can add a webpage to the homescreen. Combined with offline caching, this means your web app can be used exactly like a native application.

The name and icon to be displayed are set in the `manifest.json` file. Change them to your project name and icon, and try it!

## License

This project is licensed under the MIT license, Copyright (c) 2015 Maximilian Stoiber. For more information see `LICENSE.md`.