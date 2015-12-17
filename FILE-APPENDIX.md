# Files in the root folder

* `.babelrc`: The Babel configuration. Babel is a ES6 to ES5 JavaScript transpiler, which means it's the tool that allows us to use ES6 in our applications.

* `.eslintignore`: Tell `eslint`, the JavaScript linter I have installed in my IDE (and you should too) to ignore certain files I don't want to have linted. Linting a file means to check that the syntax of the language is correct, which helps us catch typos/structural errors before we get an error in the browser console.

* `.eslintrc`: The `eslint` configuration, which checks that the JavaScript files are written in my preferred way of writing JS.

* `.gitattributes`: Normalizes how `git`, the version control system this boilerplate uses, handles certain files.

* `.gitignore`: Tells `git` to ignore certain files and folders which don't need to be version controlled, like the build folder.

* `.htaccess`: A default server configuration for a single page applications for the Apache web server. See the [`README`](README.md) for more information.

* `index.html`: The HTML file that your web application uses.

* `makewebpackconfig.js`: Generates the webpack configuration based on the environment. If we're in development, we add hot reloading and don't minify our code. If we're in production, we minify everything.

  * `webpack.dev.config.js`: Calls `makewebpackconfig.js`, setting the environment to `development`.

  * `webpack.prod.config.js`: Calls `makewebpackconfig.js`, setting the environment to `production`.

* `manifest.json`: Adds `Add to Homescreen` functionality on specific mobile phones. See the [`README`](README.md) for more information.

* `package.json`: `npm`, the package manager this boilerplate uses, specifies the dependencies and tools we use in this file. When you run `npm install`, this is the list that tells `npm` which packages/libraries to download. Also, `npm start`, `npm run build`,... commands are specified here.

* `server.js`: The development server, which allows us to go to `localhost:3000` and see the application live. Also makes hot-reloading work.

* `serviceworker.js`: The script that tells the serviceworker how to cache our files.
