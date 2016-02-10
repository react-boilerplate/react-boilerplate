# Design Decisions

## Framework

Lets pretend you want to build a Single Page Application. You read about all the different frameworks everybody seems to be using at the moment, trying out some tutorials and maybe even writing very basic helper apps with them. You decide to go with [React.js] in the end because it's highly performant, the component structure makes sense, easy to understand once you're past the initial learning curve, the ecosystem is booming and Facebook uses it in production.

[React.js]: ()

## Application state

You start building your app, and you realize your application needs state saved somewhere, so you start using [`this.setState()`] inside your components. That works fine until you reach a point where you have components accessing the same state and you're getting race conditions and state not being where it should be and you're thinking "There's gotta be a better way to do this". Thankfully, during your initial research you heard a lot about a pattern Facebook devised to manage application state called [Flux]. You try it out and you grasp the basics of the action -> store -> render flow so you start using it to manage your application state.

[`this.setState()`]: ()
[Flux]: ()

Multiple people are now working on your application, and you realize you need unit tests to make sure your changes don't unexpectedly break anything. Since Flux is using events to communicate between actions, the store and the components you try to emulate those behaviours, but it's very tedious and won't scale very well, so you start looking around for another pattern. You find [Redux], which follows the same general action -> store -> render pattern but is based in functional programming concepts. This means it is much easier to test, and you get a exploding ecosystem of tools around Redux with it! A win-win, so you switch your entire application over to Redux.

[Redux]: ()

### Data fetching

You hired a backend engineer because you want to store real user data now. They build you an API, but you have to somehow query it from your application and load the data into your application state. You start by doing a bunch of AJAX calls in your lifecycle methods (like `componentDidMount`), but that feels very dirty and becomes unweildy very quickly.

## Routing

Your application is now at a state where it has multiple views that should be linkable to. You want to be able to have subpages, an about page for example, so you start looking around for routing solutions. You find [react-router], which is the community favorite and uses JSX to define routes – very clever! You start using it, but after a while you feel weird about the URL your application is at not being in the app state. It feels like a big part of what your app shows, so it should be with the rest of your Redux state! You start searching again if anybody has made something like that, and, lucky you, you find [react-router-redux]. It plugs into react-router, and integrates the router state to your global application state. Perfect!

[react-router]: ()
[react-router-redux]: ()
