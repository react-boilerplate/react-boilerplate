# A beginner's guide to react-boilerplate
The [`README.md`](https://github.com/mxstbr/react-boilerplate#features) gives you adequate information on how to clone boilerplate files, install dependencies and launch the example app. Once you have been successfull at that, you might be interested in how things work under the hood. This boilerplate will be intimidating for beginners. You might have come across this while reading `README.md`-
>Please note that this boilerplate is production-ready and not meant for beginners! If you're just starting out with react or redux, please refer to https://github.com/petehunt/react-howto instead. If you want a solid, battle-tested base to build your next product upon and have some experience with react, this is the perfect start for you.

## Creating Issues
Opening an issue is the fastest way to draw attention of the contributors, but please make it a point to read the [docs](https://github.com/mxstbr/react-boilerplate/tree/master/docs) and [contribution instructions](https://github.com/mxstbr/react-boilerplate/blob/master/.github/CONTRIBUTING.md) before you do. The issues section is specifically used for pointing out defects, suggesting enhancements and submitting pull requests.

## Foreword
This boilerplate will give you the best DX (Developer eXperience). But it won't make it easier on beginners. It's supposed to make it easier on browsers. The boilerplate can be a little daunting but it shouldn't have to be. Before you get your hands dirty with the source code, we'd like you to go through a checklist, that will help you determine whether or not you're eligible to use this boilerplate. It's not because we're _holier-than-thou_, but we genuinely want to save you the frustration.

## Tech Stack
Here's a curated list of packages (in no particular order) that you should have in-depth knowledge of, before starting your awesome project. However, the best way to have a complete list of dependencies is to see [package.json](https://github.com/mxstbr/react-boilerplate/blob/master/package.json).
### Core
- [ ] [React](https://facebook.github.io/react/)
- [ ] [React Router](https://github.com/ReactTraining/react-router)
- [ ] [Redux](http://redux.js.org/)
- [ ] [Redux Saga](http://yelouafi.github.io/redux-saga/)
- [ ] [Reselect](https://github.com/reactjs/reselect)
- [ ] [ImmutableJS](https://facebook.github.io/immutable-js/)
- [ ] [Styled Components](https://github.com/styled-components/styled-components)
- [ ] [Webpack](https://webpack.js.org/)

### Unit Testing
- [ ] [Jest](http://facebook.github.io/jest/)
- [ ] [Enzyme](http://airbnb.io/enzyme/)

### Linting
- [ ] [ESLint](http://eslint.org/)

There are 80+ node packages in `package.json`. If you're willing to go that extra mile, we'd suggest you do a google on each and every package and find out how it works and fits in this boilerplate. That will give you a sense of how even the smallest of things work.

Note that several features of react-boilerplate are optional and there are instructions in the docs on how to remove them.
- Redux-saga and reselect [here](https://github.com/mxstbr/react-boilerplate/blob/master/docs/js/remove.md).
- Offline-first, add to homescreen, performant web font loading and image optimization [here](https://github.com/mxstbr/react-boilerplate/blob/master/docs/general/remove.md)
- Sanitize.css [here](https://github.com/mxstbr/react-boilerplate/blob/master/docs/css/remove.md)
- i18n and react-intl [here](https://github.com/mxstbr/react-boilerplate/blob/0f88f55ed905f8432c3dd7b452d713df5fb76d8e/docs/js/i18n.md#removing-i18n-and-react-intl)

## Project Structure
Let's start with understanding why this boilerplate has chosen this particular structure. It has been an [evolving discussion](https://github.com/mxstbr/react-boilerplate/issues/27).
- Your source code will reside in the `app` folder.
- Configuration, Generator and Template files reside in the `internals` folder.
- The files in `mocks` are maintained autmatically by Jest.
- The `server` folder contains development and production server configuration files.

### `app/`
We use [container/component architecture](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.4rmjqneiw). `containers/` contains React components which are connected to the redux store. `components/` contains dumb React components which depend on containers for data. Generally, you'd want to treat one webpage (such as Login, Home etc.) as one container and a small part (such as Login form, Navigation bar) of that page as a component. But there are no rigid rules. You can bend this structure to your needs.

### `internals/`
You can call this area the build engine of your `app/`. Your source code cannot be executed as-is in the web browser. It needs to pass through webpack to get converted into a form that web browsers understand.

`internals/webpack`: You'll most probably use EcmaScript 6 or EcmaScript 7 to write the source code of your app. [EcmaScript](http://stackoverflow.com/a/33748400/5241520) is the standard for JavaScript. Most people are still using browsers which understand EcmaScript 5. So your code must be [transpiled](https://scotch.io/tutorials/javascript-transpilers-what-they-are-why-we-need-them) into browser-understandable code. To apply the transpiler to your source code, you will use webpack. Feeling the jitters already? [Don't worry](https://hackernoon.com/how-it-feels-to-learn-javascript-in-2016-d3a717dd577f#.d2uasw2n6). Take a tea-break and then read on.

`internals/generators`: This folder has the code to scaffold out new components, containers and routes. Read [more about scaffolding](https://github.com/mxstbr/react-boilerplate/tree/master/docs/general#quick-scaffolding) in the docs.

There are other folders there too, but for brevity let's just skip them.

### `server`
As the name suggests, this folder contains development and production server configuration.

## Basic Building Blocks
These days when musicians produce music, they record different parts of the song separately. So vocals, drums, guitar, bass may be played in separate sessions and when they're satisfied with their work, the sessions are combined into a beautiful song. In a similar fashion, let's understand the role of different technologies and in the end, we'll see how everything converges into a single application.

You can launch the example app by running `npm start`. To fully understand its workings, you'll have to understand multiple technologies and how they interact. From this point, we're going into an overdrive of implementation details. We'll simplify the technical jargon as much as we can. So please bear with us.

### How does the application boot up?
Your single page application hooks into [`app/index.html`](https://github.com/mxstbr/react-boilerplate/blob/master/app/index.html). That means React will render your components inside a `div` which is injected into  `index.html`.
But how do we include all of our react components into a single html? That's where webpack comes into the picture. Webpack will literally pack your application into small javascript chunks. These files will be included in a `<script>` tag which is injected into `index.html` .
When your application is deployed on a server, browsers will load this html file. The javascript files that webpack has included will be executed by the browser, thereby booting up your react application! It's magic really!! No, not really, though is certainly can seem that way. Let's dissect this phenomenon to better know what's really going on.

### `app/app.js`:
When you run `npm start`, a webpack development server will be launched inside your terminal. You can then start browsing at [http://localhost:3000](http://localhost:3000).

Before launching the server, Webpack requires an entry point to your application. Think of it as a door to your source code. In this boilerplate [`app/app.js`](https://github.com/mxstbr/react-boilerplate/blob/master/app/app.js) will be that entry point. Webpack will access the entire app from this file, transpile the application into ES5 and will create small chunks of  transpiled code. Only the required chunks will be loaded in the browser so that you won't have to worry about the size of your application.

`app/app.js` could be one of the most confusing files for any beginner. It contains all the things that are globally applied to your app. You'll see that there's a lot going on. Let's break it down.
- `babel-polyfill` This will emulate a full ES2015 environment which in turn enables cool stuff like generator functions, `Promise`s, etc.
- A redux `store` is instantiated.
- A `history` object is created which remembers all the browsing history of your app. (BTW, very useful for analytics)
- A Router is set up, with all of your routes. See [`routes.js`](https://github.com/mxstbr/react-boilerplate/blob/master/app/routes.js)
- Hot module replacement setup.
- i18n internationalization support setup.
- Offline plugin support to make your app [offline-first](https://developers.google.com/web/fundamentals/getting-started/codelabs/offline/).
- `ReactDOM.render()` not only renders the [root react component](https://github.com/mxstbr/react-boilerplate/blob/master/app/containers/App/index.js) called `<App />`, of your application, but it renders it with `<Provider />`, `<LanguageProvider />` and `<Router />`.
 * `<Provider />` connects your app with the redux `store`.
 * `<LanguageProvider />` provides language translation support to your app.
 * `<Router />` will have information for your application routes.

### React Router:
`<Router />` has the crucial information for your routes. Check out [`routes.js`](https://github.com/mxstbr/react-boilerplate/blob/master/app/routes.js) to see how route `path`s are mapped with application containers.

- Path `"/"` corresponds to container `<HomePage />`
- Path `"/features"` corresponds to container `<FeaturePage />`
- Path `"*"` i.e. all other paths correspond to the `<NotFoundPage />`

These containers along with their corresponding reducer and sagas are loaded asynchronously with the help of dynamic `import()`. Whenever webpack encounters `import()` in the code, it creates a separate chunk for those imports. That means for every route, there will be a separate chunk. And by corollary, only those javascript chunks will be downloaded by the browser which are required for the current route. So when you navigate to `"/"`, only chunks related to `<HomePage />` will be downloaded and subsequently executed. This makes your application incredibly lightweight and lightning fast.

### Redux:
Redux is going to play a huge role in your application. If you're new to redux, we'd strongly suggest you to complete this checklist and then come back-

- [ ] Understand the motivation behind redux
- [ ] Understand the three principles of redux
- [ ] Understand and rewrite **ALL** [example apps](http://redux.js.org/docs/introduction/Examples.html) from their repo on your own.

Redux `store` is the heart of your application. Check out [`store.js`](https://github.com/mxstbr/react-boilerplate/blob/master/app/store.js) to see how we have configured the store.

The store is created with the `createStore()` factory, which accepts three parameters.

1. **Root reducer:** A master reducer combining all reducers.
2. **Initial state:** You can initialize your state beforehand.
3. **Middleware/enhancers:** Middleware are third party libraries which intercept each redux action dispatched to the redux store and do stuff. For example, if you install [`redux-logger`](https://github.com/evgenyrodionov/redux-logger) as a middleware, it will listen to all the actions being dispatched to the store and print previous and next state in the javascript console. It's particulary helpful for developers to track application activity.

In our application we are using two such middleware.

1. **Router middleware:** Keeps your routes in sync with the redux `store`.
2. **Redux saga:** Used for managing _side-effects_ such as dispatching actions asynchronously or accessing browser data.

### Reselect:
Reselect is a library used for slicing your redux state and providing only the relevant sub-tree to a react component. It has three key features-

1. Computational power
2. Memoization
3. Composability

Imagine an application that shows a list of users. Its redux state tree stores an array of usernames with signatures -

`{id: int, username: string, gender: string, age: number }`.

Let's see how the three features of reselect help.

- **Computation:** While performing a search operation, reselect will filter the original array and return only matching usernames. Redux state does not have to store a separate array of filtered usernames.
- **Memoization:** A selector will not compute a new result unless one of its arguments change. That means, if you are repeating the same search key, reselect will not filter the array again and again. It will just return the previous result, like caching. Reselect compares old and new arguments and decides whether to compute a new result.
- **Composability:** You can combine multiple selectors. For example, one selector can filter usernames according to a search key and another selector can filter the already filtered array according to gender. One more selector can further filter according to age. You combine these selectors by using `createSelector()`

### Redux Saga:
If your application is going to interact with some back-end application for data, we recommend using redux saga for side effect management. Too much of jargon? Let's simplify.

Imagine that your application is fetching data in json format from a back-end. For every API call, ideally you should define at least three kinds of [action creators](http://redux.js.org/docs/basics/Actions.html):

1. `API_REQUEST`: Upon dispatching this, your application should show a spinner to let the user know that something's happening.
2. `API_SUCCESS`: Upon dispatching this, your application should show the data to the user.
3. `API_FAILURE`: Upon dispatching this, your application should show an error message to the user.

And this is only for **_one_** API call. In a real-world scenario, one page of your application could be making tens of API calls. How do we manage all of them effectively? This essentially boils down to controlling the flow of your application. What if there was a background process that handles multiple actions simultaneously, communicates with redux store and react containers at the same time? This is where redux-saga comes into the picture. Redux-saga docs are so well-written that we could not put it better than this-

>The mental model is that a saga is like a separate thread in your application that's solely responsible for side effects. redux-saga is a redux middleware, which means this thread can be started, paused and cancelled from the main application with normal redux actions, it has access to the full redux application state and it can dispatch redux actions as well.

## Example App: Behind the scenes
The react-boilerplate building blocks interoperate to produce a seamless application. Let's join these pieces together.

<img src="workflow.png" alt="boilerplate workflow" align="center" />

### Workflow
The example application is a simple service which shows a list of repositories for github users using github's public API. You type in a username and the application will show you a list of repositories for that user. It also shows how navigating away to a different route can be done. You can switch between English and German language by selecting the desired option from the menu in the footer.

#### `<HomePage />`
Run `npm start` to launch the application. If you start browsing at [https://localhost:3000](https://localhost:3000), by default you will be navigated to the home page. Here, notice that route is `"/"`, so the [`<HomePage />`](https://github.com/mxstbr/react-boilerplate/blob/master/app/containers/HomePage/index.js) container will be mounted. It is responsible for rendering a `<form />` with a textbox and a `<List />` of repositories.

- `mapDispatchToProps()`: Generally, we provide outgoing action creators (functions that create [action](http://redux.js.org/docs/basics/Actions.html) objects) to the react component through this method. Notice that for every keypress in textbox, your state will be updated by dispatching a `changeUsername` action to the store. So at any point in time, your redux state will hold the currently typed username. When you submit the form, another action, `loadRepos` will be dispatched.

- `mapStateToProps()`: Generally, we provide incoming state from redux store to the react component through this method. Notice that the we do not provide the entire state to the component, simply because we don't want the react component to have access to irrelevant data. The state will be filtered by selectors such as `selectRepos`, `selectUsername` etc.

Together these two methods work like magic. When you type something in the textbox the following things will happen in a sequential manner-

1. `changeUsername()` will send text to the redux store. The text can be accessed using `evt.target.value`. Here, `evt` is the `onChange` event emmited by pressing a key.
2. Redux store will consult with its corresponding reducer, since a reducer knows what to with the data.
3. When a reducer computes a new state tree, the store will update its state with the newly typed data.
4. An update has occured in the state, therefore `mapStateToProps()` will be triggered and your react component will get the new data.
5. The updated data will be set as the `value` to your `<Input />`.

_So you see, if you type something in the textbox, it will not be directly reflected in the DOM. It must pass through redux. Redux will update the state and return it to the component. It's the component's responsibility to show the updated data._

#### `HomePage/sagas.js`
You must be wondering where does the list of repositories come from! Sagas are primarily used for making API calls. Sagas intercept actions dispatched to the redux store. That means a saga will listen to the actions and if it finds an action of interest, it will do something.

Sagas are nothing but ES6 [generator functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*). These functions act as normal functions, the only difference is that they can be "paused" and "resumed" at any point in time. Redux saga provides an intuitive API for managing asynchronous operations.

Check out [HomePage/sagas.js](https://github.com/mxstbr/react-boilerplate/blob/master/app/containers/HomePage/sagas.js). It can be confusing for untrained eyes. But the API of redux-saga is self-descriptive.
- You can `fork` a saga to send it to the background. That way, your code will not get blocked even when the saga is continuously running.
- `takeLatest` is used for listening for a particular action. In this case, it will wait for a `LOAD_REPOS` action. Whenever you disptach this action, the saga will understand that you want to fetch repos from github's public API by calling `getRepos()`.
- If the API successfully returns some data, a `reposLoaded()` action will be dispatched which carries the data. When redux store receives this action, [a reducer](https://github.com/mxstbr/react-boilerplate/blob/master/app/containers/App/reducer.js) will set incoming data in the new state tree.

_An update has occurred!_ `mapStateToProps()` will be triggered. `<HomePage />` will receive the new data. It's now the  container's responsibility to properly display the list of repositories.

## Why all this fuss just to load a list of repos?
Quite an understandable question! In the example app, we're basically using a [bazooka](https://en.wikipedia.org/wiki/Bazooka) to kill a fly. For this little application all you need is at the most 15-20 lines of jQuery code. But the primary purpose of this boilerplate is to provide a robust and scalable example infrastructure for your project. When you create tens of containers and hundreds of components, you're likely to consume data from many APIs. At a large scale, every bit of your project should be predictable. You should have granular control over all the operations. It is said that Facebook uses more than 20 thousand components in their application. Imagine maintaining that kind of codebase! If you want to build a mature application you're going to need a mature infrastructure like this boilerplate. Good luck!
