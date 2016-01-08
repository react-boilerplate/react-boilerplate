# Component testing

Testing your Redux actions and reducers is nice, but you can do even more to make sure nothing breaks your application. The most integral part of a React app are your components.

React provides us with a nice add-on called the Shallow Renderer. This renderer will render a React component **one level deep**. Lets take a look at what that means with a simple `Button` component.

## Shallow rendering

Our `Button` renders a `<button>` element containing a checkmark icon and some text:

```JS
// Button.react.js

import CheckmarkIcon from './CheckmarkIcon.react';

function Button(props) {
  return (
    <button className="btn">
      <CheckmarkIcon />
      { props.children }
    </button>
  );
}

export default Button;
```

> Note: This is a [stateless ("dumb") component](../js/react/README.md#components-and-containers)!

It might be used in another component like this:

```JS
// HomePage.react.js

import Button from './Button.react';

class HomePage extends React.Component {
  render() {
    return(
      <Button>Click me!</Button>
    );
  }
}
```

> Note: This is a [stateful ("smart") component](../js/react/README.md#components-and-containers)!

When rendered normally with the standard `ReactDOM.render` function, this will be the HTML output (*comments added by hand for easier understanding*):

```HTML
<!-- <Button> -->
<button>
  <i class="fa fa-checkmark"></i>  <!-- <CheckmarkIcon /> -->
  Click Me!                        <!-- { props.children } -->
</button>
<!-- </Button> -->
```

In comparison, when rendered with the shallow renderer, we'll get a String containing this "HTML":

```HTML
<!-- <Button> -->
<button>
  <CheckmarkIcon />
  Click Me!          <!-- { props.children } -->
</button>
<!-- </Button> -->
```

If we tested our `Button` with the normal renderer, and there was a problem with the `CheckmarkIcon`, the test for the `Button` would fail as well and it would be hard to find the culprit of the failures. Using the shallow renderer, we can correctly asses and identify the problems since we only ever render one component!

The problem with the shallow renderer is that all assertions have to be done manually, and you cannot do anything that needs the browsers DOM.

Thankfully, [AirBnB](https://twitter.com/AirBnBNerds) has open sourced their wrapper around the React shallow renderer and jsdom, called `enzyme`. `enzyme` is a testing utility that gives us a very nice assertion/traversment/manipulation API.

## enzyme
