# ImmutableJS

Immutable data structures can be deeply compared in no time. This allows us to
efficiently determine if our components need to rerender since we know if the
`props` changed or not!

Check out the [official documentation](https://facebook.github.io/immutable-js/)
for a good explanation of the more intricate benefits it has.

While the benefits of ImmutableJS are incredibly huge as your app scales, there
are many gotchas to be aware of. The [official documenation](http://redux.js.org/docs/recipes/UsingImmutableJS.html)
from Redux elaborates more on the intricacies to be aware of.

## Usage

In our reducers, we make the initial state an immutable data structure with the
`fromJS` function. We pass it an object or an array, and it takes care of
converting it to a immutable data structure. (Note: the conversion is performed deeply so
that even arbitrarily nested arrays/objects are immutable structures too!)

```JS
import { fromJS } from 'immutable';

const initialState = fromJS({
  myData: {
    message: 'Hello World!'
  },
});
```

When a reducer is subscribed to an action and needs to return the new state they can do so by using setter methods such as [`.set`](https://facebook.github.io/immutable-js/docs/#/Map/set) and [`.update`](https://facebook.github.io/immutable-js/docs/#/Map/update) and [`.merge`](https://facebook.github.io/immutable-js/docs/#/Map/merge).
If the changing state data is nested, we can utilize the 'deep' versions of these setters: [`.setIn`](https://facebook.github.io/immutable-js/docs/#/Map/setIn) and [`.updateIn`](https://facebook.github.io/immutable-js/docs/#/Map/updateIn), [`.mergeIn`](https://facebook.github.io/immutable-js/docs/#/Map/mergeIn).


```JS
import { fromJS } from 'immutable';
import { SOME_ACTION, SOME_OTHER_ACTION } from './actions';

// […]

function myReducer(state = initialState, action) {
  switch (action.type) {
    case SOME_ACTION:
      return state.set('myData', fromJS(action.payload));
    case SOME_OTHER_ACTION:
      return state.setIn(['myData', 'message'], fromJS(action.payload));
    default:
      return state;
  }
}
```

Please note that that we have to wrap the set value in a `fromJS` call to ensure that `action.payload` is converted into
either an ImmutableJS collection. Since we're not sure if `action.payload` is an Array (`[1, 2, 3, 4]`) or an Object (`{ foo: 'bar'}`),
we use `fromJS` to convert this to a [`ImmutableJS List`](https://facebook.github.io/immutable-js/docs/#/List) or [`ImmutableJS Map`](https://facebook.github.io/immutable-js/docs/#/Map), respectively.

Please note that only Arrays and Objects (non-primitives) need to be wrapped in a `fromJS` call.

```JS
import { fromJS } from 'immutable';
import { LOAD_REPOS, LOAD_REPOS_SUCCESS } from './actions';

// […]

function myReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPOS:
      return state.set('loading', true);
    case LOAD_REPOS_SUCCESS:
      return state.setIn(['myData', 'repos'], fromJS(action.repos));
    default:
      return state;
  }
}
```

In this example, `true` is a Boolean which is Javascript primitive type. Since all [primitives in Javascript are immutable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Primitive_values),
there is no reason to wrap it in `fromJS` as ImmutableJS cannot offer any benefit.

## Reselect

We use [`reselect`](./reselect.md) to efficiently cache our computed application
state. Since that state is now immutable, we need to use the [`.get`](https://facebook.github.io/immutable-js/docs/#/Iterable/get) and [`.getIn`](https://facebook.github.io/immutable-js/docs/#/Iterable/getIn)
functions to select the part we want.

```JS
const myDataSelector = (state) => state.get('myData');
const messageSelector = (state) => state.getIn(['myData', 'message']);

export default myDataSelector;
```

To learn more, check out [`reselect.md`](reselect.md)!

## toJS

ImmutableJS can offer a huge performance gain, but we don't want to scatter the implementation details of using `get` and `getIn`
to our [presentational components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0). Hence, React Boilerplate
offers a [Higher Order Component](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e) to convert
ImmutableJS props to plain Javascript props.

```JS
// […]
import toJS from 'utils/toJS';

class MyPresentationalComponent extends React.Component {
  render () {
    const { repos } this.props;
    const repoItems = repos.map((repo) =>
      <li>{repo.name}</li>
    );
    return (
      <ul>
        {repoItems}
      </ul>
    )
  }
}

const mapStateToProps = state => {
  return {
    repos: makeSelectRepos()
  }
}

export default connect(
  mapStateToProps
)(toJS(MyPresentationalComponent))
```

Observe that when we are creating our list of repos, we can use the dot notation to access `name` with `repo.name` vs `repo.get('name')`.

## Immutable Records

ImmutableJS provides a number of immutable structures such as [`Map`](https://facebook.github.io/immutable-js/docs/#/Map), [`Set`](https://facebook.github.io/immutable-js/docs/#/Set) and [`List`](https://facebook.github.io/immutable-js/docs/#/List).
One drawback to these structures is that properties must be accessed via the getter methods (`.get` or `.getIn`) and cannot be accessed with dot notation as they would in a plain javascript object.
For instance you'll write `map.get('property')` instead of `object.property`, and `list.get(0)` instead of `array[0]`.
This can make your code a little harder to follow and requires you to be extra cautious when passing arguments or props to functions or components that try to access values with regular dot notation.
ImmutableJS's [`Record`](https://facebook.github.io/immutable-js/docs/#/Record) structure offers a solution to this issue.

A `Record` is similar to a `Map` but has a fixed shape, meaning its property keys are predefined and you can't later add a new property after the record is created. Attempting to set new properties will cause an error.
One benefit of `Record` is that you can now, along with other immutable read methods (.get, .set, .merge and so on), use the dot notation to access properties.

The creation of a record is less simple than simply calling `.toJS()`.
First, you have to define the `Record` shape. With the example above, to create your initial state, you'll write:

```JS
// Defining the shape
const StateRecord = Record({
  myData: {
      message: 'Hello World!'
  }
});

const initialState = new StateRecord({}); // initialState is now a new StateRecord instance
                                          // initialized with myData.message set by default as 'Hello World!'
```

Now, if you want to access `myData`, you can just write `state.myData` in your reducer code and to access the `message` property you can write `state.myData.message` as you would in a plain javascript object.

### Gotchas of Using Records

Although dot notation can now be used to read properties the same does not apply to setting properties. Any attempts to set a property on a `Record` using dot notation will result in errors.
Instead setter methods ( `.set`, `.update`, `.merge`) should be used.

Certain properties can not be set on a record as they would conflict with the API. Consider the below example:
```JS
const ProductRecord = Record({
    type: 'tshirt',
    size: 'small'
});
```

Because record.size is used to return the records count (similar to array.length), the above definition would throw an error.
