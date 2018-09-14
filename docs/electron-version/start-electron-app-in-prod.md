Everything worked in Dev. Its time to render the webpack compiled react app in electron renderer. There are basically two things we need to do:

### 1. Compile our react app with webpack that is already there in this boilerplate.
We just need to modify the target in ```webpack.prod.babel.js``` so that the compiled bundle can run in electron.

##### Add publicPath in output to './' as both index.html and compiled assets are put in same build folder
```Javascript
output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    publicPath: './',
},
```

##### Add target and node specific config same as we did in dev
```Javascript
target: 'electron-renderer',
node: {
    __dirname: false,
    __filename: false,
},
```

### 2. Create webpack.main.prod.js to compile and bundle main process file.
Create a new file **internals/webpack/webpack.main.prod.js** and put the following contents in it:
```Javascript
import path from 'path';
import webpack from 'webpack';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import baseConfig from './webpack.base.babel';

export default baseConfig({
  devtool: 'source-map',
  mode: 'production',
  target: 'electron-main',
  entry: path.resolve(process.cwd(), 'app/electron/main.dev.js'),
  output: {
    path: path.resolve(process.cwd(), 'app/electron/'),
    filename: './main.prod.js',
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        parallel: true,
        sourceMap: true,
        cache: true,
      }),
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG_PROD: false,
      START_MINIMIZED: false,
    }),
  ],
  node: {
    __dirname: false,
    __filename: false,
  },
});
```
Remember the target here is **electron-main**

### We will be runing 3 commands one by one

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
cross-env HOT=1 NODE_ENV=production BABEL_ENV=electron node --trace-warnings ./node_modules/electron/cli.js -r bab el-register ./app/electron/main.prod.js 
```

On successful execution of the above 3 commands, you will see the same application in electron window again.

WE ARE JUST A FEW THINGS AWAY FROM PACKAGING THE APPLICATION AS BINARY.