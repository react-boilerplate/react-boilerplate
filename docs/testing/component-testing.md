# Component testing

[Unit testing your Redux actions and reducers](unit-testing.md) is nice, but you
can do even more to make sure nothing breaks your application. Since React is
the _view_ layer of your app, let's see how to test Components too!

<!-- TOC depthFrom:2 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Shallow rendering](#shallow-rendering)
- [react-testing-library](#react-testing-library)
  - [Snapshot testing](#snapshot-testing)
  - [Behavior testing](#behavior-testing)

<!-- /TOC -->

## Shallow rendering

React provides us with a nice add-on called the Shallow Renderer. This renderer
will render a React component **one level deep**. Lets take a look at what that
means with a simple `<Button>` component.

This component renders a `<button>` element containing a checkmark icon and some
text:

```javascript
// Button.js

import React from 'react';
import CheckmarkIcon from './CheckmarkIcon';

function Button(props) {
  return (
    <button className="btn" onClick={props.onClick}>
      <CheckmarkIcon />
      {React.Children.only(props.children)}
    </button>
  );
}

export default Button;
```

_Note: This is a [state**less** ("dumb") component](../js/README.md#architecture-components-and-containers)_

It might be used in another component like this:

```javascript
// HomePage.js

import Button from './Button';

function HomePage() {
  return <Button onClick={this.doSomething}>Click me!</Button>;
}
```

_Note: This is a [state**ful** ("smart") component](../js/README.md#architecture-components-and-containers)!_

When rendered normally with the standard `ReactDOM.render` function, this will
be the HTML output
(_Comments added in parallel to compare structures in HTML from JSX source_):

```html
<button>                           <!-- <Button>             -->
  <i class="fa fa-checkmark"></i>  <!--   <CheckmarkIcon />  -->
  Click Me!                        <!--   { props.children } -->
</button>                          <!-- </Button>            -->
```

Conversely, when rendered with the shallow renderer, we'll get a String
containing this "HTML":

```html
<button>              <!-- <Button>             -->
  <CheckmarkIcon />   <!--   NOT RENDERED!      -->
  Click Me!           <!--   { props.children } -->
</button>             <!-- </Button>            -->
```

If we test our `Button` with the normal renderer and there's a problem
with the `CheckmarkIcon` then the test for the `Button` will fail as well.
This makes it harder to find the culprit. Using the _shallow_ renderer, we isolate
the problem's cause since we don't render any other components other than the
one we're testing!

The problem with the shallow renderer is that all assertions have to be done
manually, and you cannot do anything that needs the DOM.

## react-testing-library

In order to write more maintainable tests which also resemble more closely the way
our component is used in real life, we have included [react-testing-library](https://github.com/kentcdodds/react-testing-library).
This library renders our component within an actual DOM and provides utilities for querying it.

Let's give it a go with our `<Button />` component, shall we? First, let's check that it renders our component with its
children, if any, and second that it handles clicks.

This is our test setup:

```javascript
import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import Button from '../Button';

describe('<Button />', () => {
  it('renders and matches the snapshot', () => {});

  it('handles clicks', () => {});
});
```

### Snapshot testing

Let's start by ensuring that it renders our component and no changes happened to it since the last time it was
successfully tested.

We will do so by rendering it and creating a _[snapshot](https://jestjs.io/docs/en/snapshot-testing)_
which can be compared with a previously committed snapshot. If no snapshot exists, a new one is created.

For this, we first call `render`. This will render our `<Button />` component into a _container_, by default a 
`<div>`, which is appended to `document.body`. We then create a snapshot and `expect` that this snapshot is the same as
the existing snapshot, taken in a previous run of this test and committed to the repository.

```javascript
it('renders and matches the snapshot', () => {
  const text = 'Click me!';
  const { container } = render(<Button>{text}</Button>);

  expect(container.firstChild).toMatchSnapshot();
});
```

`render` returns an object that has a property `container` and yes, this is the container our
`<Button />` component has been rendered in.

As this is rendered within a _normal_ DOM we can query our
component with `container.firstChild`. This will be our subject for a snapshot.
Snapshots are placed in the `__snapshots__` folder within our `tests` folder. Make sure you commit
these snapshots to your repository.

Great! So, now if anyone makes any change to our `<Button />` component the test will fail and we get notified of what
changed.

### Behavior testing

Onwards to our last and most advanced test: checking that our `<Button />` handles clicks correctly.

We'll use a [mock function](https://jestjs.io/docs/en/mock-functions) for this. A mock function is a function that
keeps track of _if_, _how often_, and _with what arguments_ it has been called. We pass this function as the `onClick` handler to our component, 
simulate a click and, lastly, check that our mock function was called:

```javascript
it('handles clicks', () => {
  const onClickMock = jest.fn();
  const text = 'Click me!';
  const { getByText } = render(<Button onClick={onClickMock}>{text}</Button>);

  fireEvent.click(getByText(text));
  expect(onClickSpy).toHaveBeenCalledTimes(1);
});
```
Our finished test file looks like this:

```javascript
import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import Button from '../Button';

describe('<Button />', () => {
  it('renders and matches the snapshot', () => {
    const text = 'Click me!';
    const { container } = render(<Button>{text}</Button>);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('handles clicks', () => {
    const onClickMock = jest.fn();
    const text = 'Click me!';
    const { getByText } = render(<Button onClick={onClickMock}>{text}</Button>);
  
    fireEvent.click(getByText(text));
    expect(onClickSpy).toHaveBeenCalledTimes(1);
  });
});
```

And that's how you unit test your components and make sure they work correctly!

Also have a look at our example application. It deliberately shows some variations of implementing tests with
react-testing-library.

_Continue to learn how to test your components [remotely](remote-testing.md)!_
