# Redux

If you haven't worked with Redux, it's highly recommended (possibly indispensable!)
to read through the (amazing) [official documentation](http://redux.js.org)
and/or watch this [free video tutorial series](https://egghead.io/series/getting-started-with-redux).

## Usage

See above! As minimal as Redux is, the challenge it addresses - app state
management - is a complex topic that is too involved to properly discuss here.

You can attach a dynamic reducer to a component whether it's a regular component
or a component that will be loaded dynamically. Dynamic means that it will be
injected when the component it attached to is mounted. In your component's `index.js`:

```JS
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';

// ...

export function mapDispatchToProps(dispatch) {
  // ...
}

const mapStateToProps = createStructuredSelector({
  // ...
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'yourcomponent', reducer });

export default compose(
  // Put `withReducer` before `withConnect`
  withReducer,
  withConnect,
)(YourComponent);
```

You don't need to do it by hand, a `container` generator will generate everything
that's necessary.

### Login Flow Example

To get you started on a login flow, there's a great example [here](https://github.com/tinavanschelt/recycled-login-flow).

**Note:** Based off of react-boilerplate **v3.4**

## Removing redux

There are a few reasons why we chose to bundle redux with React Boilerplate, the
biggest being that it is widely regarded as the current best Flux implementation
in terms of architecture, support and documentation.

You may feel differently! This is completely OK :)

Below are a few reasons you might want to remove it:

### I'm just getting started and Flux is hard

You're under no obligation to use Redux or any other Flux library! The complexity
of your application will determine the point at which you need to introduce it.

Here are a couple of great resources for taking a minimal approach:

- [Misconceptions of Tooling in JavaScript](http://javascriptplayground.com/blog/2016/02/the-react-webpack-tooling-problem)
- [Learn Raw React — no JSX, no Flux, no ES6, no Webpack…](http://jamesknelson.com/learn-raw-react-no-jsx-flux-es6-webpack/)

### It's overkill for my project!

See above.

### I prefer `(Alt|MobX|SomethingElse)`!

React Boilerplate is a baseline for _your_ app: go for it!

If you feel that we should take a closer look at supporting your preference
out of the box, please let us know.
