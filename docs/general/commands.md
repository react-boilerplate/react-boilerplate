# Command Line Commands

## Initialization

```Shell
$ npm run initProject
```

Initializes a new project with this boilerplate. Deletes the `react-boilerplate` git history, installs the dependencies and initializes a new repository.

> Note: This command is self-destructive, once you've run it the init script is gone forever. This is for your own safety, so you can't delete your projects history irreversibly on accident.

## Development

```Shell
$ npm start
```

Starts the development server and makes your application accessible at `localhost:3000`. Changes in the application code will be hot-reloaded.

## Building

```Shell
$ npm run build
```

Gets your application ready for deployment. Optimizes and minifies all files, and generates a folder called `build`. `build` includes all files you need for your application. Upload the contents of `build` to your web server to see it live!

## Testing

## Unit testing

```Shell
$ npm run test
```

Tests your application with the unit tests specified in the `*test.js` files throughout the application. This'll run the tests in Chrome, but you can choose different browsers.

### Browsers

To choose the browser to run your unit tests in (Chrome is run by default), run one of the following commands:

#### Firefox

```Shell
$ npm run test:firefox
```

#### Safari

```Shell
$ npm run test:safari
```

#### Internet Explorer

*Windows only!*

```Shell
$ npm run test:ie
```

### Watching

To watch changes to your application and rerun tests whenever a file changes run

```Shell
$ npm run test:watch
```

### Performance testing

```Shell
$ npm run pagespeed
```

With the development server running (i.e. while `$ npm start` is running in another tab), enter this command to run Google PageSpeed Insights and get a performance check right in your terminal!

### Test around the world

```Shell
$ npm run serve
```

This will run a server that's accessible on the entire world and shows the version of the app that's in the `build` folder. Useful for testing on different devices in different locations!

> Note: This assumes you have done a build with `npm run build` before. The changes you make in your application won't be reflected in the application unless you run `npm run build` again.

## Linting

Lint your JavaScript with this command.

```Shell
$ npm run lint
```
