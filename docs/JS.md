# `JS`

## Folder Structure

The folder structure of the JS files reflects how [Redux](https://github.com/gaearon/redux) works. If you are not familiar with Redux check out the [official documentation](https://gaearon.github.io/redux/).

* `actions`: Actions get dispatched with this/these utility module(s)

* `components`: The main JS folder. All your React components should be in this folder, for big projects they might be grouped into seperate subfolders. E.g. a navigation component `Nav.react.js`

    * `/pages`: Actual pages (routes) users can visit.

* `constants`: Action constants are defined in this/these utility module(s)

* `reducers`: Reducers manage the state of an app, basically a simplified implementation of Stores in Flux. For an introduction to reducers, watch [this talk](https://www.youtube.com/watch?v=xsSnOQynTHs) by @gaearon.

* `app.js`: The entry point of the application. Mostly setup and boilerplate code. Routes are configured in the JSX here!
