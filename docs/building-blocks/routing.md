# Routing

`react-router` is the de-facto standard routing solution for react applications.
The thing is that with redux and a single state tree, the URL is part of that
state. `connected-react-router` takes care of synchronizing the location of our
application with the application state.

(See the [`connected-react-router` FAQ](https://github.com/supasate/connected-react-router/blob/master/FAQ.md)
for more information)

## Usage

To add a new route, simply import the `Route` component and use it standalone or inside the `Switch` component (all part of [RR5 API](https://reacttraining.com/react-router/web/api)):

```ts
<Route exact path="/" component={HomePage} />
```

Top level routes are located in `src/app/index.tsx`.

If you want your route component (or any component for that matter) to be loaded asynchronously, use container or component generator with 'Do you want to load resources asynchronously?' option activated.

To go to a new page use the `push` function by `connected-react-router`:

```ts
import { push } from 'connected-react-router';

dispatch(push('/path/to/somewhere'));
```

You can do the same thing in a saga:

```ts
import { push } from 'connected-react-router';
import { put } from 'redux-saga/effects';

export function* mySaga() {
  yield put(push('/home'));
}
```

## Child Routes

For example, if you have a route called `about` at `/about` and want to make a child route called `team` at `/about/our-team`, follow the example
in `src/app/index.tsx` to create a `Switch` within the parent component. Also remove the `exact` property from the `about` parent route.

#### `AboutPage/index.tsx`

```ts
import { Switch, Route } from 'react-router-dom';

export function AboutPage() {
  return (
    <Switch>
      <Route exact path="/about/our-team" />
    </Switch>
  );
}
```

You can read more in [`react-router`'s documentation](https://reacttraining.com/react-router/web/api).
