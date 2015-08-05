# React.js Boilerplate

Quick setup for new React.js projects utilizing the Flux application architecture. It uses the Grunt task runner for PostCSS and browserify, which compile and minify all the CSS and JS automatically when you change something.

To deploy the app, all you need to upload is `index.html`, `js/bundle.min.js` and `css/compiled.css`.

## Setup

1. Clone this repo using `git clone git@github.com:mxstbr/react-boilerplate`.

2. Delete the existing git repository by running `rm -rf .git`.

3. Initialize a new git repository with `git init`, `git add .` and `git commit -m "Initial commit"`.

4. Run `npm install` to install the dependencies.

5. Run `grunt` to start the local web server.

6. Go to `http://localhost:8000` and you should see the app running!

## Deploying

Deploying in two simple steps:

1. Run `grunt build`.

2. Upload contents of the `build` folder to your webserver.

## CSS Structure

The CSS modules found in the `css` subfolders all get imported into the `main.css` file, which get inlined and minified into the `compiled.css` file. To add/change the styling, either write the CSS into the appropriate module or make a new one and `@import` it in the `main.css` file at the appropriate place.

### PostCSS

The boilerplate uses PostCSS, and includes a few plugins by default:

* `postcss-import`: Inlines `@import`ed stylesheets to create one big stylesheet.

* `postcss-simple-vars`: Makes it possible to use $variables in your CSS.

* `postcss-focus`: Adds a `:focus` selector to every `:hover`.

* `autoprefixer-core`: Prefixes your CSS automatically, supporting the last two versions of all major browsers, 99%+ of users and IE 8.

* `cssnano`: Optimizes your CSS file. For a full list of optimizations check [the offical website](http://cssnano.co/optimisations/).

* `postcss-reporter`: Makes warnings by the above plugins visible in the console.

For a full, searchable catalog of plugins you can include go to [postcss.parts](http://postcss.parts).

### Folder Structure

The boilerplate comes with a basic folder structure to keep the CSS files organised. This is what the folders are for:

* `base`: Global styling, e.g. setting the box–model for all elements

* `components`: Component specific styling, e.g. buttons, modals,...

* `layout`: Global layouts, e.g. article, homepage,...

* `utils`: Utility files, e.g. variables, mixins, functions,...

* `vendor`: External files, e.g. a CSS reset

## JS Structure

Assuming they are `require()`'d somewhere, the JS files found in the `js` subfolders all get compiled into the `bundle.js` file, which gets minified into the `bundle.min.js` file.

### Folder Structure

The folder structure of the JS files reflects the Flux methodology, so if you have worked with Flux before you will know what they are for. 

* `actions`: Actions get dispatched with this/these utility module(s)

* `components`: The main JS folder. All your React components should be in this folder, for big projects they might even be grouped into seperate subfolders, e.g. a navigation components `Nav.react.js`

* `constants`: Actions need to be defined in this/these utility module(s).

* `dispatcher`: Action Dispatchers live in this folder.

* `stores`: The stores your app uses, actions get registered and data changes here.

* `utils`: Miscellany functions used in several modules are defined here. E.g. `getFileSize()`

## License

This project is licensed under the MIT license. For more information see `LICENSE.md`.