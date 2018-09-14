### Two Package.json Structure
Till now, we were just having our react application that was being rendered with electron renderer. There was no native dependencies or electron specific dependencies. To start an electron manually, all the previous stuff was enough. We don't need anything more.

**But but but...** electron applications work a little bit differently. If you quickly have a look at [this first electron app](https://electronjs.org/docs/tutorial/first-app), you will find that we need to tell electron tool the target directory with a valid package.json file. And thats what we are going to do in this article.

We will initiate ```npm init``` in our **app** folder to make it a valid electron target directory and in its package.json,  put **./electron/main.prod.js** as a main file path.

Let's have a look:
```Json
{
  "name": "reactron",
  "productName": "Reactron",
  "version": "1.0.8",
  "description": "Reactron Desktop App",
  "license": "MIT",
  "copyright": "Manish Jangir",
  "author": {
    "name": "Manish Jangir",
    "email": "mjangir70@gmail.com"
  },
  "main": "./electron/main.prod.js",
  "scripts": {},
  "dependencies": {}
}
```
all the above information is used by the electron builder whenever you package your application as binary.

### Important
Whatever native dependency (like ```node-ffi```) or electron specific modules like ```electron-is-dev``` you need, always install them in the app directory. Once you install anything in this directory, a ```node_modules folder``` will be created in app folder and we will copy it with our react source code while packaging as binary.

##### As we don't want webpack to touch this inner node_modules, while compiling and building our react application, wherever webpack finds a native dependency resolution required, it will throw errors. So we need to tell our webpack base config that all the modules in inner node_modules folder are external. Never touch them.

#### Modify webpack.base.babel.js
Extract the inner package.json dependencies first with the following code:
```Javascript
const { dependencies: externals } = require('../../app/package.json');
```

Then put those extracted modules as externals in webpack config in same file:
```Javascript
externals: [...Object.keys(externals || {})],
```

#### Add this inner node_modules as global path in main process (app/electron/main.dev.js) like below:
```Javascript
if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'node_modules');
  require('module').globalPaths.push(p);
}
```

**Thats it!** Now in production or development mode (enviornment other than binary file), the inner dependencies will be resolved from **app/node_modules** folder by node engine. In binary file, we are going to copy this folder during packaging.


### We will be runing the previous 3 commands again one by one but the third one has been changed a bit

#### 1. Compile react application with webpack (Build: Main)
```Shell
cross-env NODE_ENV=production BABEL_ENV=electron node --trace-warnings -r babel-register ./node_modules/webpack/bin/webpack --config internals/webpack/webpack.prod.babel.js --colors
```

#### 2. Compile main process file with webpack (Build: Renderer)
```Shell
cross-env NODE_ENV=production BABEL_ENV=electron node --trace-warnings -r babel-register ./node_modules/webpack/bin/webpack --config internals/webp ack/webpack.main.prod.js --colors
```

#### 3. Run main process prod file with electron (Start Prod)
```Shell
cross-env HOT=1 NODE_ENV=production BABEL_ENV=electron node --trace-warnings ./node_modules/electron/cli.js -r bab el-register ./app/
```