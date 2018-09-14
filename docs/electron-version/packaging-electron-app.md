If you noticed earlier, while we were installing all the electron development specific dependencies, we installed [Electron Builder](https://www.electron.build/) that is used to package our electron application as binary file for various platforms like windows, mac and linux.

In this article we are going to package our electron app with the help of electron builder.

Building or packaging the application means, we are bundling the react source code with our binary file. In our root package.json file, we have to put electron builder configuration under **build** key and tell the builder to add certain folders and files while packaging the app for any platform.

In our case, we want to send the entire **webpack compiled build folder** with the binary. I'm providing the minimal configuration (only for windows) for electron builder here. You can read the [builder docs](https://www.electron.build/) for more information:

#### Modify root package.json file and add a key "build"
```Json
"build": {
    "appId": "org.react-boilerplate",
    "asar": true,
    "files": [
        "build",
        "node_modules/",
        "electron/",
        "package.json"
    ],
    "copyright": "©2018 React Boilerplate Electron App",
    "snap": {
      "synopsis": "React Boilerplate Electron App"
    },
    "win": {
      "target": [
        {
          "target": "nsis"
        }
      ],
      "publisherName": "React Boilerplate Official"
    },
    "nsis": {
      "perMachine": true,
      "oneClick": false,
      "allowToChangeInstallationDirectory": true
    },
    "directories": {
      "output": "release"
    }
}
```

So our target is, compile the main process with webpack, then compile the react app with webpack and finally run ```build``` command of electron builder.

### Very Very Important
If you see in the above JSON config, we are adding **build** folder in files array and the electron builder will try to find out this folder in **app** because our electron target directory is **project_root/app**. So anyhow, we must have to move this **webpack compiled build folder** in **app**.

#### Only 2 changes are required to do so

##### 1. Change output path in webpack.base.babe.js like below:
```Javascript
output: Object.assign(
    {
      path: path.resolve(process.cwd(), 'app/build'),
      publicPath: '/',
      libraryTarget: 'commonjs2',
    },
    options.output,
),
```

##### 2. Change the path of index.html in app/electron/main.dev.js as:
```Javascript
mainWindow.loadURL(
    `file://${path.resolve(path.join(__dirname, '..', 'build'))}/index.html`,
);
```

### If everything above is donne, run the following 3 commands one by one, and you will get an exe file in "release" folder in project root

#### Command -1 (Compile Main Process With Webpack)
```Shell
cross-env NODE_ENV=production BABEL_ENV=electron node --trace-warnings -r babel-register ./node_modules/webpack/bin/webpack --config internals/webpack/webpack.prod.babel.js --colors
```

#### Command -2 (Compile React App With Webpack)
```Shell
cross-env NODE_ENV=production BABEL_ENV=electron node --trace-warnings -r babel-register ./node_modules/webpack/bin/webpack --config internals/webp ack/webpack.main.prod.js --colors
```

#### Command -3 (Build EXE/DMG/DEB with electron builder)
```Shell
node ./node_modules/electron-builder/out --publish never
```