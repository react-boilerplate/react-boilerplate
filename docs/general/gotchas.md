# Gotchas

These are some things to be aware of when using this boilerplate.

1. [Special images in HTML files](#special-images)
2. [Load reducers optimistically](#optimistic-reducers)
3. [Exclude modules from Babel processing](#exclude-modules)
4. [Running tests in watch mode](#watch-test)

## Special images in HTML files<a name="special-images"></a>

If you specify your images in the `.html` files using the `<img>` tag, everything
will work fine. The problem comes up if you try to include images using anything
except that tag, like meta tags:

```HTML
<meta property="og:image" content="img/yourimg.png" />
```

The webpack `html-loader` does not recognise this as an image file and will not
transfer the image to the build folder. To get webpack to transfer them, you
have to import them with the file loader in your JavaScript somewhere, e.g.:

```JavaScript
import 'file?name=[name].[ext]!../img/yourimg.png';
```

Then webpack will correctly transfer the image to the build folder.

## Load reducers optimistically<a name="optimistic-reducers"></a>

If you have some `containers` that aren't _route specific_ and that should be available throughout the app, like a `NavigationBar`, you need to add their respective reducers to the root reducer with the help of `combineReducers`.

``` js
// In app/reducers.js

...
import { combineReducers } from 'redux-immutable';
...

import navigationBarReducer from 'containers/NavigationBar/reducer';

export default combineReducers({
  route: routeReducer,
  global: globalReducer,
  language: languageProviderReducer,
  navigationBar: navigationBarReducer,
  ...asyncReducers,
});
```

## Exclude modules from Babel processing<a name="exclude-modules"></a>

Excluding modules from babel processing has never been so easy! Just add the package name to `exclude` array in `internals/config.js` and you're all set!

``` js
// in internals/config.js

exclude: [
  'chalk',
  'compression',
  'cross-env',
  'express',
  'ip',
  'minimist',
  'sanitize.css',
  'your-unwanted-package', <- add your-unwanted-package
  ...
]
```

## Running tests in `watch` mode<a name="watch-test"></a>

You may have to install `watchman` to run tests in watch mode. If you're using a Mac, simply run `brew install watchman`

You can also install `watchman` from source. Please visit their [official guide](https://facebook.github.io/watchman/docs/install.html) for more information.
