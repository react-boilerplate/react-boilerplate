# `redux-saga`

`redux-saga` is a library to manage side effects in your application. It works beautifully for data fetching, concurrent computations and a lot more. [Sebastien Lorber](https://twitter.com/sebastienlorber) put it best:

> imagine there is widget1 and widget2. When some button on widget1 is clicked, then it should have an effect on widget2. Instead of coupling the 2 widgets together (ie widget1 dispatch an action that targets widget2), widget1 only dispatch that its button was clicked. Then the saga listen for this button click and then update widget2 by dispaching a new event that widget2 is aware of.

> This adds a level of indirection that is unnecessary for simple apps, but make it more easy to scale complex applications. You can now publish widget1 and widget2 to different npm repositories so that they never have to know about each others, without having them to share a global registry of actions. The 2 widgets are now bounded contexts that can live separately. They do not need each others to be consistent and can be reused in other apps as well. The saga is the coupling point between the two widgets that coordinate them in a meaningful way for your business.

*[Source](https://stackoverflow.com/questions/34570758/why-do-we-need-middleware-for-async-flow-in-redux/34623840#34623840)*

## Usage

Start off with the [official documentation](https://github.com/yelouafi/redux-saga), read [this comparison](https://stackoverflow.com/questions/34930735/pros-cons-of-using-redux-saga-with-es6-generators-vs-redux-thunk-with-es7-async/34933395) if you're used to `redux-thunk` and explore some examples!

## Removing `redux-saga`

**We don't recommend removing `redux-saga`**, as we strongly feel that it's the way to go for most redux based applications.

If you really want to get rid of it, delete the `sagas/` folder, remove the `import` and the `sagaMiddleware` from the `store.js` and finally remove it from the `package.json`. Then you should be good to go with whatever side-effect management library you want to use!
