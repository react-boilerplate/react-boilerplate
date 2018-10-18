# Frequently Asked Questions

- [Where are Babel, Prettier and ESLint configured?](#where-are-babel-prettier-and-eslint-configured)
- [Where are the files coming from when I run `npm start`?](#where-are-the-files-coming-from-when-i-run-npm-start)
- [How do I fix `Error: listen EADDRINUSE 127.0.0.1:3000`?](#how-do-i-fix-error-listen-eaddrinuse-1270013000)
  - [OS X / Linux:](#os-x--linux)
  - [Windows](#windows)
- [Issue with local caching when running in production mode (F5 / ctrl+F5 / cmd+r weird behavior)](#issue-with-local-caching-when-running-in-production-mode-f5--ctrlf5--cmdr-weird-behavior)
    - [Quick fix on your local browser:](#quick-fix-on-your-local-browser)
    - [Full in-depth explanation](#full-in-depth-explanation)
- [Local webfonts not working for development](#local-webfonts-not-working-for-development)
- [Non-route containers](#non-route-containers)
  - [Where do I put the reducer?](#where-do-i-put-the-reducer)
- [Use CI with bitbucket pipelines](#use-ci-with-bitbucket-pipelines)
- [How to keep my project up-to-date with `react-boilerplate`?](#how-to-keep-my-project-up-to-date-with-react-boilerplate)
- [How to turn off Webpack performance warnings after production build?](#how-to-turn-off-webpack-performance-warnings-after-production-build)
- [Styles getting overridden?](#styles-getting-overridden)
- [Have another question?](#have-another-question)

## Where are Babel, Prettier and ESLint configured?

ESLint, Babel and Prettier all have their own config files in the root of the project. Same for Jest and stylelint.

## Where are the files coming from when I run `npm start`?

In development Webpack compiles your application runs it in-memory. Only when
you run `npm run build` will it write to disk and preserve your bundled
application across computer restarts.

## How do I fix `Error: listen EADDRINUSE 127.0.0.1:3000`?

This simply means that there's another process already listening on port 3000.
The fix is to kill the process and rerun `npm start`.

### OS X / Linux:

1.  Find the process id (PID):

    ```Shell
    ps aux | grep node
    ```

    > This will return the PID as the value following your username:
    >
    > ```Shell
    > janedoe    29811  49.1  2.1  3394936 356956 s004  S+    4:45pm   2:40.07 node server
    > ```
    >
    > Note: If nothing is listed, you can try `lsof -i tcp:3000`

2.  Then run
    ```Shell
    kill -9 YOUR_PID
    ```
    > e.g. given the output from the example above, `YOUR_PID` is `29811`, hence
    > that would mean you would run `kill -9 29811`

### Windows

1.  Find the process id (PID):

    ```Shell
    netstat -a -o -n
    ```

    > This will return a list of running processes and the ports they're
    > listening on:
    >
    > ```
    > Proto     Local Address     Foreign Address   State       PID
    > TCP       0.0.0.0:25        0.0.0.0:0         Listening   4196
    > ...
    > TCP       0.0.0.0:3000      0.0.0.0:0         Listening   28344
    > ```

    ```

    ```

1.  Then run
    ```Shell
    taskkill /F /PID YOUR_PID
    ```
    > e.g. given the output from the example above, `YOUR_PID` is `28344`, hence
    > that would mean you would run `taskkill /F /PID 28344`

## Issue with local caching when running in production mode (F5 / ctrl+F5 / cmd+r weird behavior)

Your production site isn't working? You update the code and nothing changes? It drives you insane?

#### Quick fix on your local browser:

To fix it on your local browser, just do the following. (Suited when you're testing the production mode locally)

`Chrome dev tools > Application > Clear Storage > Clear site data` _(Chrome)_

#### Full in-depth explanation

Read more at https://github.com/NekR/offline-plugin/blob/master/docs/updates.md

## Local webfonts not working for development

In development mode CSS sourcemaps require that styling is loaded by blob://,
resulting in browsers resolving font files relative to the main document.

A way to use local webfonts in development mode is to add an absolute
output.publicPath in webpack.dev.babel.js, with protocol.

```javascript
// webpack.dev.babel.js

output: {
  publicPath: 'http://127.0.0.1:3000/',
  /* … */
},
```

## Non-route containers

> Note: Container will always be nested somewhere below a route. Even if there's dozens of components
> in between, somewhere up the tree will be route. (maybe only "/", but still a route)

### Where do I put the reducer?

While you can include the reducer statically in `reducers.js`, we don't recommend this as you lose
the benefits of code splitting. Instead, add it as a _composed reducer_. This means that you
pass actions onward to a second reducer from a lower-level route reducer like so:

```JS
// Main route reducer

function myReducerOfRoute(state, action) {
  switch (action.type) {
    case SOME_OTHER_ACTION:
      return someOtherReducer(state, action);
  }
}
```

That way, you still get the code splitting at route level, but avoid having a static `combineReducers`
call that includes all of them by default.

_See [this and the following lesson](https://egghead.io/lessons/javascript-redux-reducer-composition-with-arrays?course=getting-started-with-redux) of the egghead.io Redux course for more information about reducer composition!_

## Use CI with bitbucket pipelines

Your project is on bitbucket? Take advantage of the pipelines feature (Continuous Integration) by creating a 'bitbucket-pipelines.yml' file at the root of the project and use the following code to automatically test your app at each commit:

```YAML
image: gwhansscheuren/bitbucket-pipelines-node-chrome-firefox

pipelines:
  default:
    - step:
        script:
          - node --version
          - npm --version
          - npm install
          - npm test
```

## How to keep my project up-to-date with `react-boilerplate`?

While it's possible to keep your project up-to-date or "in sync" with `react-boilerplate`, it's usually
very difficult and is therefore **_at your own risk_** and not recommended. You should not need to do it either, as
every version you use will be amazing! There is a long term goal to make this much easier but no ETA at the moment.

## How to turn off Webpack performance warnings after production build?

Webpack recommends having those performance hints turned off in development but to keep them on in production. If you still want to disable them, add the next lines to the config in `webpack.prod.babel.js`:

```js
performance: {
  hints: false;
}
```

You can find more information about the `performance` option (how to change maximum allowed size of a generated file, how to exclude some files from being checked and so on) in the [Webpack documentation](https://webpack.js.org/configuration/performance/).

## Styles getting overridden?

There is a strong chance that your styles are getting imported in the wrong order. Confused?
Let me try and explain with an example!

```javascript
// MyStyledComponent.js
const MyStyledComponent = styled.div`
  background-color: green;
`;
```

```css
/* styles.css */
.alert {
  background-color: red;
}
```

```javascript
// ContrivedExample.js
import MyStyledComponent from './MyStyledComponent';
import './styles.css';

const ContrivedExample = props => (
  <MyStyledComponent className="alert">{props.children}</MyStyledComponent>
);
```

With the magic of [webpack](https://webpack.js.org/), both `MyStyledComponent.js` and `styles.css`
will each generate a stylesheet that will be injected at the end of `<head>` and applied to `<MyStyledComponent>`
via the [`class` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes#attr-class).

So, will `<ContrivedExample>` have a green background or a red background?

Applying the rules of [specificity](https://developer.mozilla.org/en/docs/Web/CSS/Specificity), you
may think red as `styles.css` was imported last. Unfortunately, at the time of writing
an open issue ["CSS resolving order"](https://github.com/webpack/webpack/issues/215)
means you cannot control the order in which the stylesheets are injected. So, with this contrived
example, the background could be either green or red.

To resolve the issue, you can either:

**1) Increase the specificity of the CSS you want to win**

```css
/* styles.css (imported css to win) */
.alert.alert {
  background-color: red;
}
```

```javascript
// MyStyledComponent.js (styled-component css to win)
const MyStyledComponent = styled.div`
  && {
    background-color: green;
  }
`;
```

**2) Import the CSS in the `<head>` of your `index.html` manually**

This is a good choice if you are having issues with third-party styles

```javascript
// Import bootstrap style (e.g. move this into the <head> of index.html)
import 'bootstrap/dist/css/bootstrap.min.css';
```

**3) Change the position of `<GlobalStyle>` in the rendering of `<App>`**

You can do that inside `containers/App/index.js`.

More information is available in the [official documentation](https://github.com/styled-components/styled-components/blob/master/docs/existing-css.md).

## Have another question?

Submit an [issue](https://github.com/react-boilerplate/react-boilerplate/issues),
hop onto the [Gitter channel](https://gitter.im/mxstbr/react-boilerplate)
or contact Max direct on [twitter](https://twitter.com/mxstbr)!
