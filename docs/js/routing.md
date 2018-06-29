# Routing via `react-router` and `react-router-redux`

`react-router` is the de-facto standard routing solution for react applications.
The thing is that with redux and a single state tree, the URL is part of that
state. `react-router-redux` takes care of synchronizing the location of our
application with the application state.

(See the [`react-router-redux` documentation](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux)
for more information)

## Usage

To add a new route, simply import the `Route` component and use it standalone or inside the `Switch` component (all part of [RR4 API](https://reacttraining.com/react-router/web/api)):

```JS
<Route exact path="/" component={HomePage} />
```

Top level routes are located in `App.js`.

If you want your route component (or any component for that matter) to be loaded asynchronously, use container or component generator with 'Do you want an async loader?' option activated.

To go to a new page use the `push` function by `react-router-redux`:

```JS
import { push } from 'react-router-redux';

dispatch(push('/some/page'));
```

## Child Routes

For example, if you have a route called `about` at `/about` and want to make a child route called `team` at `/about/our-team`, follow the example
in `App.js` to create a `Switch` within the parent component. Also remove the `exact` property from the `about` parent route.

```JS
// AboutPage/index.js
import { Switch, Route } from 'react-router-dom';

class AboutPage extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path="/about/our-team" />
      </Switch>
    );
  }
}
```

Note that with React Router v4, route re-rendering is handled by React's `setState`. This
means that when wrapping route components in a redux connected container, or `PureComponent` or any other component with
`shouldComponentUpdate`, you need to create a [ConnectedSwitch](https://github.com/ReactTraining/react-router/issues/5072#issuecomment-310184271)
container that receives `location` directly from a redux store. Read more about this in
[Dealing with Update Blocking](https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking).

You can read more in [`react-router`'s documentation](https://reacttraining.com/react-router/web/api).
