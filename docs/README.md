# Documentation

**Add ToC of the documentation here as soon as it's finished**

## Overview

### Development

Run `$ npm start` to see your app at `localhost:3000`!

### Building & Deploying

1. Run `$ npm run build`, which will compile all the necessary files to the `build` folder.

2. Upload the contents of the `build` folder to your web servers root folder.

### Structure

As a developer making an application, check out the [`app/`](app) folder and the files in there. The rest of the folders and files only exist to make your life easier, and should not have to be touched. *(If they have to be changed, please submit an issue!)*

`app/` contains your entire application code, including CSS, JavaScript, HTML and tests.

### CSS

Each component has a unique `styles.css` file associated with it that is `import`ed in your components main JavaScript file. (`index.js`) Each of those files gets run through PostCSS and is compiled into one big stylesheet that is sent down the pipe.

See the [CSS documentation](./css/README.md) for more information about PostCSS and CSS modules.

### JS

We bundle all your clientside scripts and chunk them into several files if possible using code splitting. We automatically optimize your code when building for production so you don't have to worry about that.

See the [JS documentation](./js/README.md) for more information about the JavaScript side of things.

### Testing

For a throughout explanation of the testing procedure, see the [testing documentation](./testing/README.md)!

#### Performance testing

With the production server running (i.e. while `$ npm run serve` is running in another tab), enter `$ npm run pagespeed` to run Google PageSpeed Insights and get a performance check right in your terminal!

#### Browser testing

With `$ npm run serve` you can start a server that's accessible in the entire world and shows the version of the app that's in the `build` folder. Useful for testing on different devices!

#### Unit testing

Unit tests live in `test/` directories right next to the components being tested and are run with `$ npm run test`.
