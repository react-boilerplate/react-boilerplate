# Files in the root folder

* `.babelrc`: The Babel configuration. Babel is a ES6 to ES5 JavaScript transpiler, which means it's the tool that allows us to use ES6 in our applications.

* `.eslintignore`: Tell `eslint` to ignore certain files that should not be linted. (Analyse your code for potential errors/suspicious usage)

* `.eslintrc`: The `eslint` configuration, which checks that the JavaScript files are written in a standardised way.

* `.gitattributes`: Normalizes how `git`, the version control system this boilerplate uses, handles certain files.

* `.gitignore`: Tells `git` to ignore certain files and folders which don't need to be version controlled, like the build folder.

* `.htaccess`: A default server configuration for a single page applications for the Apache web server. See the [`README`](README.md) for more information.

* `index.html`: The HTML file that your web application uses.

* `makewebpackconfig.js`: Generates the webpack configuration. In development mode, we add hot reloading and don't minify our code. In production mode, we minify everything.

  * `webpack.dev.config.js`: Generates the webpack configuration for development.

  * `webpack.prod.config.js`: Generates the webpack configuration for production.

* `manifest.json`: On Chrome for Android (soon hopefully more browsers), users can add a webpage to the homescreen. This file specifies the name/icon/... that is displayed.

* `package.json`: The `npm` configuration file. When you run `npm install`, this is the list that tells `npm` which packages/libraries to download. Also, `npm start`, `npm run build`,... commands are specified here.

* `server.js`: The development server that runs when `npm start` is entered into the command line.

* `serviceworker.js`: The script that tells the serviceworker how to cache our files for offline usage.
