# Routing

`react-router` is the de-facto standard routing solution for react applications.

## Why not using [connected-react-router](https://github.com/supasate/connected-react-router)?

There is detailed explanation [here](https://reacttraining.com/react-router/web/guides/deep-redux-integration). In short, it is not suggested to integrate route with redux, simply because it shouldn't be needed. There are other ways of navigating as explained there.

## Usage

To add a new route, simply import the `Route` component and use it standalone or inside the `Switch` component (all part of [RR5 API](https://reacttraining.com/react-router/web/api)):

```ts
<Route exact path="/" component={HomePage} />
```

Top level routes are located in `src/app/index.tsx`.

If you want your route component (or any component for that matter) to be loaded asynchronously, use container or component generator with 'Do you want to load resources asynchronously?' option activated.

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

## Routing programmatically

You can use the [react-router hooks](https://reacttraining.com/react-router/web/api/Hooks) to change the route or get params etc...

```ts
import { useHistory } from 'react-router-dom';

function HomeButton() {
  let history = useHistory();

  function handleClick() {
    history.push('/home');
  }

  return (
    <button type="button" onClick={handleClick}>
      Go home
    </button>
  );
}
```

{% hint style="info" %}

You can read more in [`react-router`'s documentation](https://reacttraining.com/react-router/web/api).

{% endhint %}
