In the previous step, we started our electron application in dev mode where we loaded the webpack dev server url (```http://localhost:3000```) in renderer window which we didn't want to do.

In this article, we will load the index.html file with ```file://``` protocol whether in dev mode or prod mode. If you clearly see, our react app's index.html file is generated dynamically with webpack's compiled bundles injected by famous [HTML Webpack Plugin](https://github.com/jantimon/html-webpack-plugin) and this file is not written on the disc in case of webpack dev server running. As long as a file is not on the disc, we cannot load it with name as we don't know the exact path.

To make us able to load it via file protocol, first we would need to write this generated index.html file on disc (probabely in build folder) and that can be achieved [HTML Webpack Hard Disc Plugin](https://github.com/jantimon/html-webpack-harddisk-plugin).

### Install HTML Webpack Hard Disc Plugin And Modify Webpack Config

Install it with:

```Shell
npm install --save-dev html-webpack-harddisk-plugin && npm run build:dll
```

### Modify the **webpack.dev.babel.js** file as below:

##### Require plugin in file
```Javascript
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
```

##### Add in plugins array and add ```alwaysWriteToDisk: true```
```Javascript
new HtmlWebpackPlugin({
    inject: true,
    template: 'app/index.html',
    alwaysWriteToDisk: true,
}),
new HtmlWebpackHarddiskPlugin(),
```

### Modify app/electron/main.dev.js and load index.html with file:// instead of http://
```Javascript
const path = require('path');
mainWindow.loadURL(
    `file://${path.resolve(path.join(__dirname, '..', '..', 'build'))}/index.html`,
);
```

### Convert Browser History to Hash History in our react application
Browser history won't work with file protocol, so we need to change it as Hash history.

**Change:**
```Javascript
import createHistory from 'history/createBrowserHistory';
```
**To**
```Javascript
import createHistory from 'history/createHashHistory';
```

### Once all the above changes are done, Run the following 2 commands in separate terminals again.
**Start Main Process In Dev**
```Shell
cross-env HOT=1 NODE_ENV=development BABEL_ENV=electron node --trace-warnings ./node_modules/electron/cli.js -r babel-register ./app/electron/main.dev.js
```

**Start Renderer Process In Dev**
```Shell
cross-env NODE_ENV=development node --trace-warnings ./node_modules/webpack-dev-server/bin/webpack-dev-server --config internals/webpack/webpack.dev.babel.js
```

HOPEFULLY YOU SHOULD SEE THE SAME THING IN ELECTRON WINDOW