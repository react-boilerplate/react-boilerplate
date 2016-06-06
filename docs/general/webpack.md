# Webpack Options

## DLL Plugin

[Webpack Wiki](https://github.com/webpack/docs/wiki/list-of-plugins#dllplugin)

The DLL Plugin is a way of caching the module dependency graph that Webpack builds every time it loads our project.  It doesn't execute any of the code, but simply makes it available to any modules which depend on it. It is perfect for boilerplates due to the fact that many of the dependency decisions are made up front and won't need to change that frequently.  

Using the DLL Plugin allows Webpack to prioritize building your application's code, while relying on caching to handle the dependency code.  The end result is a significant boost in both server startup time and in hot-module reload times.

The DLL plugin is enabled by default for development, and depends on a configuration property `dllPlugin` being found in the project's `package.json`.  There is also a one-time build step that will take place before the webpack development configuration can be used.

### DLL Plugin Configuration Options

#### Automatic Configuration

By default, a DLL bundle is generated for all of the modules listed as dependencies in the project's `package.json` file. 

```
{
  "dllPlugin": {
    "dlls": "package.json",
    "exclude": ["express","chalk"]
    "include": ["babel-polyfill", "core-js", "eventsource-polyfill"]
  }
}
```

Certain production dependencies which don't belong in the browser bundle can be excluded by naming them in the `exclude` list. Other dependencies which may not be listed in the project's package.json, can be explicitly included by naming them in the `include` list.  For example using `babel-polyfill` will include `core-js` and hot module reloading dependencies may also include `lodash`.  

Using the `npm run analyse` script will give you a good idea of what exactly is part of your bundle.

### Manual Configuration

There may be situations where you want fine grained control over the DLL Plugin.  In that case you can specify which dependencies belong to which DLL using the following: 

```
{
  "dllPlugin": {
    "dlls": {
      "reactCore": [
        "react",
        "react-dom",
        "react-router",
        "redux",
        "react-redux",
        "redux-think",
        "redux-saga"
      ],
      "reactBootstrap": [
        "jquery",
        "bootstrap",
        "react-bootstrap"
      ]
    }
  }
}
```

### Generating DLL Files

The cost of the performance boost given to us by the DLL Plugin is that we will need to occasionally update the module manifest and dependency bundle.  

This can be accomplished by running the `npm run build:dll` script. This will create a dependency bundle javascript file, a JSON manifest, in the `app/dlls` folder in your project.  These files are excluded from git using the `.gitignore` file.

This script will automatically be run after an `npm install`
