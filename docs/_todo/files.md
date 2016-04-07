# Files

Some explanation for a few of the configuration files lying around this boilerplate.

## The root folder

* `.editorconfig`: Sets the default configuration for certain files across editors. (e.g. indentation)

* `.eslintignore`: Tell `eslint` to ignore certain files that should not be linted. `eslint` lints your JavaScript. (it analyse your code for potential errors/suspicious usage)

* `.gitattributes`: Normalizes how `git`, the version control system this boilerplate uses, handles certain files.

* `.gitignore`: Tells `git` to ignore certain files and folders which don't need to be version controlled, like the build folder.

* `.travis.yml`: The Continuous Integration configuration. This boilerplate uses [Travis CI](https://travis-ci.com), but feel free to swap this for your own CI.

* `package.json`: The `npm` configuration file. When you run `npm install`, this is the list that tells `npm` which packages/libraries to download. Also, `npm start`, `npm run build`,... commands are specified here. Also includes

  * `babelConfig`: The Babel configuration. Babel is a JavaScript transpiler, which means it's the tool that allows us to use ESNext in our applications.

  * `eslintConfig`: The `eslint` configuration.

  * `stylelint`: The `stylelint` configuration.

<!-- ## The `webpack/` folder

* `webpack.base.babel.js`: The shared webpack configuration. In development mode, we add hot reloading and don't minify our code. In production mode, we minify everything.

* `webpack.dev.babel.js`: Generates the webpack configuration for development.

* `webpack.prod.babel.js`: Generates the webpack configuration for production.

* `webpack.test.babel.js`: Generates the webpack configuration for testing.
-->
