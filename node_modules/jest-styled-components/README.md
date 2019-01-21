[![NPM version](https://img.shields.io/npm/v/jest-styled-components.svg)](https://www.npmjs.com/package/jest-styled-components)
[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/styled-components/jest)

[![Build Status](https://travis-ci.org/styled-components/jest-styled-components.svg?branch=master)](https://travis-ci.org/styled-components/jest-styled-components)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

# Jest Styled Components
A set of utilities for testing [Styled Components](https://github.com/styled-components/styled-components) with [Jest](https://github.com/facebook/jest).
This package improves the snapshot testing experience and provides a brand new matcher to make expectations on the style rules.

# Quick Start

## Installation

```sh
yarn add --dev jest-styled-components
```

## Usage

```js
import React from 'react'
import styled from 'styled-components'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

const Button = styled.button`
  color: red;
`

test('it works', () => {
  const tree = renderer.create(<Button />).toJSON()
  expect(tree).toMatchSnapshot()
  expect(tree).toHaveStyleRule('color', 'red')
})
```

Table of Contents
=================

   * [Snapshot Testing](#snapshot-testing)
      * [Enzyme](#enzyme)
      * [react-testing-library](#react-testing-library)
      * [Theming](#theming)
      * [Preact](#preact)
      * [Serializer](#serializer)
   * [toHaveStyleRule](#tohavestylerule)
   * [Global installation](#global-installation)
   * [Working with multiple packages](#working-with-multiple-packages)
   * [Contributing](#contributing)

# Snapshot Testing

Jest [snapshot testing](https://facebook.github.io/jest/docs/snapshot-testing.html) is an excellent way to test [React](https://facebook.github.io/react/) components (or any serializable value) and make sure things don't change unexpectedly.
It works with Styled Components but there are a few problems that this package addresses and solves.

For example, suppose we create this styled Button:

```js
import styled from 'styled-components'

const Button = styled.button`
  color: red;
`
```

Which we cover with the following test:

```js
import React from 'react'
import renderer from 'react-test-renderer'

test('it works', () => {
  const tree = renderer.create(<Button />).toJSON()
  expect(tree).toMatchSnapshot()
})
```

When we run our test command, Jest generates a snapshot containing a few class names (which we didn't set) and no information about the style rules:

```js
exports[`it works 1`] = `
<button
  className="sc-bdVaJa rOCEJ"
/>
`;
```

Consequently, changing the color to green:

```js
const Button = styled.button`
  color: green;
`
```

Results in the following diff, where Jest can only tell us that the class names are changed.
Although we can assume that if the class names are changed the style rules are also changed, this is not optimal ([and is not always true](https://github.com/styled-components/jest-styled-components/issues/29)).

```diff
- Snapshot
+ Received

 <button
-  className="sc-bdVaJa rOCEJ"
+  className="sc-bdVaJa hUzqNt"
 />
```

Here's where Jest Styled Components comes to rescue.

We import the package into our test file:

```js
import 'jest-styled-components'
```

When we rerun the test, the output is different: the style rules are included in the snapshot, and the hashed class names are substituted with placeholders that make the diffs less noisy:

```diff
- Snapshot
+ Received

+.c0 {
+  color: green;
+}
+
 <button
-  className="sc-bdVaJa rOCEJ"
+  className="c0"
 />
```

This is the resulting snapshot:

```js
exports[`it works 1`] = `
.c0 {
  color: green;
}

<button
  className="c0"
/>
`;
```

Now, suppose we change the color again to blue:

```js
const Button = styled.button`
  color: blue;
`
```

Thanks to Jest Styled Components, Jest is now able to provide the exact information and make our testing experience even more delightful 💖:

```diff
- Snapshot
+ Received

 .c0 {
-  color: green;
+  color: blue;
 }

 <button
   className="c0"
 />
```

## Enzyme

[enzyme-to-json](https://www.npmjs.com/package/enzyme-to-json) is necessary to generate snapshots using [Enzyme](https://github.com/airbnb/enzyme)'s [shallow](http://airbnb.io/enzyme/docs/api/shallow.html) or [full DOM](http://airbnb.io/enzyme/docs/api/mount.html) rendering.

```sh
yarn add --dev enzyme-to-json
```

It can be enabled globally in the `package.json`:

```js
"jest": {
  "snapshotSerializers": [
    "enzyme-to-json/serializer"
  ]
}
```

Or imported in each test:

```js
import toJson from 'enzyme-to-json'

// ...

expect(toJson(wrapper)).toMatchSnapshot()
```

Jest Styled Components works with shallow rendering:

```js
import { shallow } from 'enzyme'

test('it works', () => {
  const wrapper = shallow(<Button />)
  expect(wrapper).toMatchSnapshot()
})
```

And full DOM rendering as well:

```js
import { mount } from 'enzyme'

test('it works', () => {
  const wrapper = mount(<Button />)
  expect(wrapper).toMatchSnapshot()
})
```

## react-testing-library

To generate snapshots with [react-testing-library](https://github.com/kentcdodds/react-testing-library), you can follow the example below:

```js
import { render } from 'react-testing-library'

test('it works', () => {
  const { container } = render(<Button />)
  expect(container.firstChild).toMatchSnapshot()
})
```

> The snapshots will contain `class` instead of `className` because the snapshots are of DOM elements

## Theming

In some scenarios, testing components that depend on a theme can be [tricky](https://github.com/styled-components/jest-styled-components/issues/61),
especially when using Enzyme's shallow rendering.

For example:

```js
const Button = styled.button`
  color: ${props => props.theme.main};
`

const theme = {
  main: 'mediumseagreen',
}
```

The recommended solution is to pass the theme as a prop:

```js
const wrapper = shallow(<Button theme={theme} />)
```

The following function might also help for shallow rendering:

```js
const shallowWithTheme = (tree, theme) => {
  const context = shallow(<ThemeProvider theme={theme} />)
    .instance()
    .getChildContext()
  return shallow(tree, { context })
}

const wrapper = shallowWithTheme(<Button />, theme)
```

and for full DOM rendering:

```js
const mountWithTheme = (tree, theme) => {
  const context = shallow(<ThemeProvider theme={theme} />)
    .instance()
    .getChildContext()

  return mount(tree, {
    context,
    childContextTypes: ThemeProvider.childContextTypes,
  })
}
```

## Preact

To generate snapshots of [Preact](https://preactjs.com/) components,
add the following configuration:

```js
"jest": {
  "moduleNameMapper": {
    "^react$": "preact-compat"
  }
}
```

And render the components with [preact-render-to-json](https://github.com/nathancahill/preact-render-to-json):

```js
import React from 'react'
import styled from 'styled-components'
import render from 'preact-render-to-json'
import 'jest-styled-components'

const Button = styled.button`
  color: red;
`

test('it works', () => {
  const tree = render(<Button />)
  expect(tree).toMatchSnapshot()
})
```

> The snapshots will contain `class` instead of `className`.
[Learn more](https://github.com/developit/preact/issues/103).

## Serializer

The serializer can be imported separately from `jest-styled-components/serializer`.
This makes it possible to use this package with [specific-snapshot](https://github.com/igor-dv/jest-specific-snapshot) and other libraries.

```js
import React from 'react'
import styled from 'styled-components'
import renderer from 'react-test-renderer'
import { styleSheetSerializer } from "jest-styled-components/serializer"
import { addSerializer } from "jest-specific-snapshot"

addSerializer(styleSheetSerializer)

const Button = styled.button`
  color: red;
`

test('it works', () => {
  const tree = renderer.create(<Button />).toJSON()
  expect(tree).toMatchSpecificSnapshot("./Button.snap")
})
````

# toHaveStyleRule

The `toHaveStyleRule` matcher is useful to test if a given rule is applied to a component.
The first argument is the expected property, the second is the expected value which can be a String, RegExp, Jest asymmetric matcher or `undefined`.

```js
const Button = styled.button`
  color: red;
  border: 0.05em solid ${props => props.transparent ? 'transparent' : 'black'};
  cursor: ${props => !props.disabled && 'pointer'};
  opacity: ${props => props.disabled && '.65'};
`

test('it applies default styles', () => {
  const tree = renderer.create(<Button />).toJSON()
  expect(tree).toHaveStyleRule('color', 'red')
  expect(tree).toHaveStyleRule('border', '0.05em solid black')
  expect(tree).toHaveStyleRule('cursor', 'pointer')
  expect(tree).toHaveStyleRule('opacity', undefined) // equivalent of the following
  expect(tree).not.toHaveStyleRule('opacity', expect.any(String))
})

test('it applies styles according to passed props', () => {
  const tree = renderer.create(<Button disabled transparent />).toJSON()
  expect(tree).toHaveStyleRule('border', expect.stringContaining('transparent'))
  expect(tree).toHaveStyleRule('cursor', undefined)
  expect(tree).toHaveStyleRule('opacity', '.65')
})
```

The matcher supports an optional third `options` parameter which makes it possible to search for rules nested within an [At-rule](https://developer.mozilla.org/en/docs/Web/CSS/At-rule) ([media](https://developer.mozilla.org/en-US/docs/Web/CSS/@media)) or to add modifiers to the class selector. This feature is supported in React only, and more options are coming soon.

```js
const Button = styled.button`
  @media (max-width: 640px) {
    &:hover {
      color: red;
    }
  }
`

test('it works', () => {
  const tree = renderer.create(<Button />).toJSON()
  expect(tree).toHaveStyleRule('color', 'red', {
    media: '(max-width:640px)',
    modifier: ':hover',
  })
})
```

If a rule is nested within another styled-component, the `modifier` option can be used with the [`css`](https://www.styled-components.com/docs/api#css) helper to target the nested rule.

```js
const Button = styled.button`
  color: red;
`

const ButtonList = styled.div`
  display: flex;

  ${Button} {
    flex: 1 0 auto;
  }
`

import { css } from 'styled-components';

test('nested buttons are flexed', () => {
  const tree = renderer.create(<ButtonList><Button /></ButtonList>).toJSON()
  expect(tree).toHaveStyleRule('flex', '1 0 auto', {
    modifier: css`${Button}`,
  })
})
```

This matcher works with trees serialized with `react-test-renderer`, `react-testing-library`, or those shallow rendered or mounted with Enzyme.
It checks the style rules applied to the root component it receives, therefore to make assertions on components further in the tree they must be provided separately (Enzyme's [find](http://airbnb.io/enzyme/docs/api/ShallowWrapper/find.html) might help).

> Note: for `react-testing-library`, you'll need to pass the first child to check the top-level component's style. To check the styles of deeper components, you can use one of the `getBy*` methods to find the element (e.g. `expect(getByTestId('styled-button')).toHaveStyleRule('color', 'blue')`)

To use the `toHaveStyleRule` matcher with [React Native](https://facebook.github.io/react-native/), change the import statement to:

```js
import 'jest-styled-components/native'
```

# Global installation

It is possibile to setup this package for all the tests using the [setupTestFrameworkScriptFile](https://facebook.github.io/jest/docs/en/configuration.html#setuptestframeworkscriptfile-string) option:

```js
"jest": {
  "setupTestFrameworkScriptFile": "./setupTest.js"
}
```

And import the library once in the `setupTest.js` as follows:

```js
import 'jest-styled-components'
```

# Working with multiple packages

If Jest Styled Components is not working, it is likely caused by loading multiple instances of `styled-components`. This can happen especially when working with a Lerna monorepo. Starting with `styled-components@3.2.0`, a warning will be logged when multiple instances of it are being included and run as part of the Jest tests. Using `styled-components@3.1.6` and lower with multiple instances will cause a silent error with unexpected results.

To debug and fix multiple instances of `styled-components` see the FAQ on ["Why am I getting a warning about several instances of module on the page?"](https://www.styled-components.com/docs/faqs#why-am-i-getting-a-warning-about-several-instances-of-module-on-the-page).

# Contributing

Please [open an issue](https://github.com/styled-components/jest-styled-components/issues/new) and discuss with us before submitting a PR.
