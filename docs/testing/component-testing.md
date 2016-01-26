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
    <button className="btn" onClick={props.onClick}>
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
      <Button onClick={this.doSomething}>Click me!</Button>
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

If we tested our `Button` with the normal renderer, and there was a problem with the `CheckmarkIcon`, the test for the `Button` would fail as well and it would be hard to find the culprit of the failures. Using the shallow renderer, we can asses and identify the problems since we don't render any other components other than the one we're testing!

The problem with the shallow renderer is that all assertions have to be done manually, and you cannot do anything that needs the DOM.

Thankfully, [AirBnB](https://twitter.com/AirBnBNerds) has open sourced their wrapper around the React shallow renderer and jsdom, called `enzyme`. `enzyme` is a testing utility that gives us a nice assertion/traversment/manipulation API.

## enzyme

Lets test our `<Button>` component! We're going to assess three things: First, that it renders a HTML `<button>` tag, second that it renders its children we pass it and third that handles clicks!

This is our Mocha setup:

```JS
describe('<Button />', () => {
  it('renders a <button>', () => {});

  it('renders its children', () => {});

  it('handles clicks', () => {});
});
```

Lets start with testing that it renders a `<button>`. To do that we first `shallow` render it, and then `expect` that a `<button>` node exists.

```JS
it('renders a <button>', () => {
  const renderedComponent = shallow(
    <Button></Button>
  );
  expect(
    renderedComponent.find("button").node
  ).toExist();
});
```

Nice, if somebody breaks our button component by having it render an `<a>` tag or something else we'll immediately know! Lets do something a bit more advanced now, and asses that our `<Button>` renders its children.

We render our button component with some text, and then asses that our text exists:

```JS
it('renders its children', () => {
  const text = "Click me!";
  const renderedComponent = shallow(
    <Button>{ text }</Button>
  );
  expect(
    renderedComponent.contains(text)
  ).toEqual(true);
});
```

Great! Onwards to our last and most advanced test, which assesses that our `<Button>` handles clicks correctly. We'll use a Spy for that, a Spy is a function that knows if and how often it has been called. `expect` thankfully provides them for us, so all we have to do is use them. We create the Spy, pass it as the `onClick` function to our component, simulate a click on the `<button>` tag and lastly assess that our spy was called!

```JS
it('handles clicks', () => {
  const onClickSpy = expect.createSpy();
  const renderedComponent = shallow(<Button onClick={onClickSpy} />);
  renderedComponent.find('button').simulate('click');
  expect(onClickSpy).toHaveBeenCalled();
});
```

That's how you unit test your components and make sure they work correctly!
