## How ElectronJS Works?
>In Electron, the process that runs package.json's main script is called the main process. The script that runs in the main process can display a GUI by creating web pages. An Electron app always has one main process, but never more.
>
>Since Electron uses Chromium for displaying web pages, Chromium's multi-process architecture is also used. Each web page in Electron runs in its own process, which is called the renderer process.

According to above, to start an electron application, we have create a javascript file that will be used to start main process by electron CLI. The file will contain necessary code to launch the main process, load the react application url (```http://localhost:3000``` in our case) in electron's chromium and setup some dev tools to debug it.

Lets create a folder called **electron** in **app** and main process JS file as well. It would be something like:
```project_root/app/electron/main.dev.js```

Before putting anything inside this file, first install the following necessary dev and regular dependencies to develop an electron application:

#### Install the following dependencies

|**Name**   |  **Dep Type** | **Command**  | **About**  |
| :------------ | :------------ | :------------ | :------------ |
|  Electron | Dev  | ```npm install --save-dev electron```  | This is the core electron dependency that creates main and renderer process  |
|  Electron Builder | Dev  | ```npm install --save-dev electron-builder```  | Electron builder is used to package and build the binary application for multiple os platforms as well as publish the app on server  |
|  Electron Devtools Installer | Dev  | ```npm install --save-dev electron-devtools-installer```  | In dev mode, we need to debug our react or redux app code and devtools installer helps in setting up those debug tools  |
|  Electron Rebuild | Dev  | ```npm install --save-dev electron-rebuild```  | As we discussed eariler, native node modules need to be compiled on user's machine with appropriate node version. Electron rebuild helps us to rebuild or compile native deps with the node version that is used by electronJS not the one that is installed on user's machine separately  |
|  Electron Debug | Regular  | ```npm install --save electron-debug```  | We are installing it as a regular dependency as it can be used to show the chromium devtools in both production and dev mode  |
| Source Map Support  | Regular  | ```npm install --save source-map-support```  | Source maps are used to debug the code and reach to the correct line in case of minifications  |

You can install all these in one go:
```Shell
npm install --save-dev electron electron-builder electron-devtools-installer electron-rebuild && npm install --save electron-debug source-map-support && npm run build:dll 
```

Once you are done with installing the above stuff, lets put the following code inside the ```app/electron/main.dev.js``` file:

```Javascript
/* eslint global-require: 0, no-console: 0 */
import { app, BrowserWindow } from 'electron';

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload)),
  ).catch(console.log);
};

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
  });
  mainWindow.loadURL('http://localhost:3000');

  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
```

As you can see, the above Javascript code has been written in ES6 that cannot be run directly through command line without transpiling it with babel. To do so, we need to install the ```babel-register``` hook that will make our node command a little bit powerful.

#### Install Babel Register
```Shell
npm install babel-register
```

###### Modify the env target in babel config in package.json as the application is going to run in electron not in regular browser. Also we need to put one more env in babel. Putting the whole new babel configuration here:
```Shell
"babel": {
    "plugins": [
      "styled-components"
    ],
    "presets": [
      [
        "env",
        {
          "targets": {
            "node": 7
          },
          "useBuiltIns": true,
          "modules": false
        }
      ],
      "react",
      "stage-0"
    ],
    "env": {
      "electron": {
        "presets": [
          [
            "env",
            {
              "targets": {
                "node": 7
              },
              "useBuiltIns": true
            }
          ]
        ]
      },
      "production": {
        "only": [
          "app"
        ],
        "plugins": [
          "transform-react-remove-prop-types",
          "transform-react-inline-elements",
          "transform-react-constant-elements"
        ]
      },
      "test": {
        "plugins": [
          "transform-es2015-modules-commonjs",
          "dynamic-import-node"
        ]
      }
    }
  },
```
Change node version as per your need.

### Change target and compiled libraryTarget in webpack configurations as the application is no more going to run in regular browser.

#### Modifications in webpack.base.babel.js
Add library target in output option
```Shell
output: Object.assign(
    {
      // Compile into js/build.js
      path: path.resolve(process.cwd(), 'build'),
      publicPath: '/',
      libraryTarget: 'commonjs2',
    },
    options.output,
),
```
Add .json extension in resolve as it is required by some electron modules
```Shell
resolve: {
    modules: ['node_modules', 'app'],
    extensions: ['.js', '.jsx', '.react.js', '.json'],
    mainFields: ['browser', 'jsnext:main', 'main'],
},
```
Modify or add the following keys
```Shell
target: options.target || 'web', // Target will be passed from child configs
devServer: options.devServer, // Dev server added
node: options.node,
```

#### Modifications in webpack.dev.babel.js
Add Target as electron-renderer, so that webpack can do necessary changes to run the app in electron. Also tell webpack to not to touch Node's path components like __dirname and __filename etc.
```Shell
target: 'electron-renderer',

node: {
__dirname: false,
__filename: false,
},
```

#### Modifications in webpack.dev.dll.js
Add libraryTarget to var so that all the dll deps will be required as global variable otherwise you may get error of ```ReactBoilerplateDeps is not defined```
```Shell
output: {
    filename: '[name].dll.js',
    path: outputPath,
    library: '[name]',
    libraryTarget: 'var',
},
```
Similarylly add the target to electron-renderer
```Shell
target: 'electron-renderer',
```

### Fantastic!! You have created the main process file and as a renderer, we already have our fabulous react application.

Now run these following commands in two separate terminals:

**Start Main Process In Dev**
```Shell
cross-env HOT=1 NODE_ENV=development BABEL_ENV=electron node --trace-warnings ./node_modules/electron/cli.js -r babel-register ./app/electron/main.dev.js
```

**Start Renderer Process In Dev**
```Shell
cross-env NODE_ENV=development node --trace-warnings ./node_modules/webpack-dev-server/bin/webpack-dev-server --config internals/webpack/webpack.dev.babel.js
```

**Don't worry, we will put those commands in package.json scripts**

If you see blank page in electron window, try refreshing it as webpack dev server might take a little bit time to compile our react application.

HOPEFULLY, YOU SHOULD SEE THE REACT BOILERPLATE HOMEPAGE IN ELECTRON WINDOW

### Like This:
![React Boilerplate Electron Version](https://i.imgur.com/n71SibZ.png)