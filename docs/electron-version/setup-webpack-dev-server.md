## Setup Webpack Dev Server
As in the previous step, we have removed express server from the app, that was using webpack dev middleware to provide a development server to see the changes on the fly. So to have the same enviornment again, we have to setup webpack dev server and need to modify the ```internals/webpack/webpack.dev.babel.js``` file accordingly.

### Install required regular and dev dependencies for WDS
Install webpack dev server with the following command:
```Shell
npm install --save-dev webpack-dev-server
```

Also, we need to install react hot loader to enable hot module replacement as we have lost ```webpack-hot-middleware``` by deleting the server folder. HMR is used to see the live development changes in real time on the UI without refreshing the page. [Check out here](https://webpack.js.org/guides/hot-module-replacement/) to know more about HMR.

Install React Hot Loader with the following command:
```Shell
npm install --save react-hot-loader
```
**Note:** As RHL author said on their readme,
>You can safely install react-hot-loader as a regular dependency instead of a dev dependency as it automatically ensures it is not executed in production and the footprint is minimal.

We are  installing it as a regular dep.

### Modify internals/webpack/webpack.dev.babel.js
To modify the webpack dev config, we need to replace Hot Module strategy and add dev server config object in the file. I'm rewriting the modified keys below instead of putting whole javascript file:

**Add port constant above config object**
```Shell
const port = process.env.IP || 3000;
```

**Replace entry files with the following**
```Shell
entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${port}/`,
    'webpack/hot/only-dev-server',
    path.join(process.cwd(), 'app/app.js'), // Start with js/app.js
  ],
```

**Add public path to output option**
```Shell
....
output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: `http://localhost:${port}/`,
  },
....
```

**Add webpack dev server config object in existing object**
```Shell
....
devServer: {
    port,
    publicPath: `http://localhost:${port}/`,
    compress: true,
    noInfo: false,
    stats: 'errors-only',
    inline: true,
    lazy: false,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: path.join(__dirname, '..', '..', 'build'),
    watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
      poll: 100,
    },
    historyApiFallback: {
      verbose: true,
      disableDotRule: false,
    },
  },
  ....
```

**Also add the devServer key in webpack.base.babel.js**
```Shell
devServer: options.devServer
```

After doing all the above changes, try to run the following command in root folder:

```Shell
cross-env NODE_ENV=development node --trace-warnings ./node_modules/webpack-dev-server/bin/webpack-dev-server --config internals/webpack/webpack.dev.babel.js
```
and open ```http://localhost:3000``` in the browser, you should see the correct home page of the boilerplate. If you see it properly, then move forward.

**Note:** We will add this command as script in package.json at the end.