# Consolidated All The Commands At One Place

In this page, I'm putting all the consolidated commands at one place.

### Install concurrently as dev dependency because I've used it in one command
```Shell
npm install --save-dev concurrently && npm run build:dll
```

### Put the following before hook in webpack dev server in webpack.dev.babel.js
Under ```devServer:``` key, you can put this
```Javascript
before() {
      if (process.env.START_HOT) {
        console.log('Starting Main Process...');
        const { spawn } = require('child_process');
        spawn('npm', ['run', 'start-main-dev'], {
          shell: true,
          env: process.env,
          stdio: 'inherit',
        })
          .on('close', code => process.exit(code))
          .on('error', spawnError => console.error(spawnError));
      }
},
```

And finally replace the entire **scripts** key in root package.json with the following one:

```Json
"scripts": {
    "analyze:clean": "rimraf stats.json",
    "preanalyze": "npm run analyze:clean",
    "analyze": "node ./internals/scripts/analyze.js",
    "extract-intl": "node ./internals/scripts/extract-intl.js",
    "npmcheckversion": "node ./internals/scripts/npmcheckversion.js",
    "preinstall": "npm run npmcheckversion",
    "postinstall": "npm run build:dll && electron-builder install-app-deps package.json",
    "prebuild": "npm run build:clean",
    "build:clean": "rimraf ./app/build",
    "build:dll": "node ./internals/scripts/dependencies.js",
    "presetup": "npm i chalk shelljs",
    "setup": "node ./internals/scripts/setup.js",
    "postsetup": "npm run build:dll",
    "clean": "shjs ./internals/scripts/clean.js",
    "clean:all": "npm run analyze:clean && npm run test:clean && npm run build:clean",
    "generate": "plop --plopfile internals/generators/index.js",
    "lint": "npm run lint:js && npm run lint:css",
    "lint:css": "stylelint './app/**/*.js'",
    "lint:eslint": "eslint --ignore-path .gitignore --ignore-pattern internals/scripts",
    "lint:eslint:fix": "eslint --ignore-path .gitignore --ignore-pattern internals/scripts --fix",
    "lint:js": "npm run lint:eslint -- . ",
    "lint:staged": "lint-staged",
    "pretest": "npm run test:clean && npm run lint",
    "test:clean": "rimraf ./coverage",
    "test": "cross-env NODE_ENV=test jest --coverage",
    "test:watch": "cross-env NODE_ENV=test jest --watchAll",
    "coveralls": "cat ./coverage/lcov.info | coveralls",
    "prettify": "prettier --write",
    "prestart": "npm run build",
    "start": "cross-env NODE_ENV=production electron ./app/",
    "dev": "cross-env START_HOT=1 npm run start-renderer-dev",
    "start-main-dev": "cross-env HOT=1 NODE_ENV=development BABEL_ENV=electron electron -r babel-register ./app/electron/main.dev.js",
    "start-renderer-dev": "cross-env NODE_ENV=development node --trace-warnings ./node_modules/webpack-dev-server/bin/webpack-dev-server --config internals/webpack/webpack.dev.babel.js",
    "build": "concurrently \"npm run build:main\" \"npm run build:renderer\"",
    "build:main": "cross-env NODE_ENV=production BABEL_ENV=electron node --trace-warnings -r babel-register ./node_modules/webpack/bin/webpack --config internals/webpack/webpack.main.prod.js --colors",
    "build:renderer": "cross-env NODE_ENV=production BABEL_ENV=electron node --trace-warnings -r babel-register ./node_modules/webpack/bin/webpack --config internals/webpack/webpack.prod.babel.js --colors",
    "release:clean": "rimraf ./release",
    "package": "npm run release:clean && npm run build && build --publish never",
    "package-all": "npm run release:clean && npm run build && build -mwl",
    "package-linux": "npm run release:clean && npm run build && build --linux",
    "package-win": "npm run release:clean && npm run build && build --win --x64"
},
```

### Run Electron Application In Development Mode
```Shell
npm run dev
```

### Run Electron Application In Production Mode
```Shell
npm start
```

### Package The Application For Currently Running Operating System
```Shell
npm run package
```

### Package The Application For All
```Shell
npm run package-all
```

For more information, you can go to Electron Builder official website and read the documentation regarding publishing stuff etc.

# A BIG THANKS TO READ WITH PATIENCE TILL THE END