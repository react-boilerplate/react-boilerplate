# Files

Some explanation for a few of the configuration files lying around this boilerplate.

## Files in the root folder

* `.babelrc`: The Babel configuration. Babel is a ES6 to ES5 JavaScript transpiler, which means it's the tool that allows us to use ES6 in our applications.

* `.eslintignore`: Tell `eslint` to ignore certain files that should not be linted. (Analyse your code for potential errors/suspicious usage)

* `.eslintrc`: The `eslint` configuration, which checks that the JavaScript files are written in a standardised way.

* `.gitattributes`: Normalizes how `git`, the version control system this boilerplate uses, handles certain files.

* `.gitignore`: Tells `git` to ignore certain files and folders which don't need to be version controlled, like the build folder.

* `.travis.yml`: The Continuous Integration configuration. This boilerplate uses [Travis CI](https://travis-ci.com), but feel free to swap this for your own CI.

* `package.json`: The `npm` configuration file. When you run `npm install`, this is the list that tells `npm` which packages/libraries to download. Also, `npm start`, `npm run build`,... commands are specified here.

## Files in the `webpack/` folder

* `pagespeed`: The script that is run when `$ npm run pagespeed` is entered into the terminal.

* `karma.conf.js`: The Karma testing configuration.

* `webpack.base.babel.js`: The shared webpack configuration. In development mode, we add hot reloading and don't minify our code. In production mode, we minify everything.

  * `webpack.dev.babel.js`: Generates the webpack configuration for development.

  * `webpack.prod.babel.js`: Generates the webpack configuration for production.

  * `webpack.test.babel.js`: Generates the webpack configuration for testing.

* `server.dev.js`: The development server that runs when `npm start` is entered into the command line.

* `server.prod.js`: The server that runs when `npm run serve` is entered into the command line.
