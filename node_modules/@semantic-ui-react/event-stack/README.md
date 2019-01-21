<!-- Name -->
<h1 align="center">Event Stack</h1>

<!-- Badges -->
<p align="center">
  <a href="https://www.npmjs.com/package/@semantic-ui-react/event-stack">
    <img alt="npm" src="https://img.shields.io/npm/v/@semantic-ui-react/event-stack.svg?style=flat-square" />
  </a>
  <a href="https://circleci.com/gh/layershifter/event-stack">
    <img alt="Circle CI" src="https://img.shields.io/circleci/project/github/layershifter/event-stack/master.svg?logo=circleci&style=flat-square" />
  </a>
  <a href="https://ci.appveyor.com/project/layershifter/event-stack">
      <img alt="AppVeyor CI" src="https://img.shields.io/appveyor/ci/layershifter/event-stack/master.svg?logo=appveyor&style=flat-square" />
    </a>
  <a href="https://codecov.io/gh/layershifter/event-stack">
    <img alt="Codecov" src="https://img.shields.io/codecov/c/github/layershifter/event-stack/master.svg?style=flat-square" />
  </a>
  <a href="https://david-dm.org/layershifter/event-stack">
    <img alt="David" src="https://img.shields.io/david/layershifter/event-stack.svg?style=flat-square" />
  </a>
 
  <img src="http://img.badgesize.io/https://unpkg.com/@semantic-ui-react/event-stack/lib/cjs/event-stack.production.js?compression=gzip&label=gzip%20size&style=flat-square">
</p>

> A React component for binding events on the global scope.

## Installation

```bash
yarn add @semantic-ui-react/event-stack
# or
npm install @semantic-ui-react/event-stack
```

## Why?

The `EventStack` solves two design problems:

1. Reduces the number of connected listeners to DOM nodes compared to `element.addListener()`.
2. Respects event ordering. Example, two modals are open and you only want the top modal to close on document click.

## Usage

```jsx
import React, { Component } from 'react'
import EventStack from '@semantic-ui-react/event-stack'

class MyComponent extends Component {
  handleResize = () => {
    console.log('resize')
  }

  render() {
    return (
      <div>
        <EventStack name="resize" on={this.handleResize} target="window" />
      </div>
    )
  }
}
```

##### Note on server-side rendering

When doing server side rendering, document and window aren't available. You can use a string as a `target`, or check that they exist before rendering the component with [`exenv`](https://github.com/JedWatson/exenv), for example.

##### Note on performance

You should avoid passing inline functions for listeners, because this creates a new Function instance on every render, defeating `EventListener`'s `shouldComponentUpdate`, and triggering an update cycle where it removes its old listeners and adds its new listeners (so that it can stay up-to-date with the props you passed in).

## Implementation details

The `EventStack` is a public API that allows subscribing a DOM node to events. The event subscription for
each unique DOM node creates a new `EventTarget` object.

```
+------------+          +-------------+
|            |   0..*   |             |
| EventStack | +------> | EventTarget |
|            |          |             |
+------------+          +-------------+
```

## EventTarget

Each `EventTarget` is assigned to an unique DOM node. An `EventTarget` tracks event handlers for
the target's DOM node. Making multiple subscriptions to a `click` event for a single DOM node will
result in a single registered `handler` for that DOM node. An `EventPool` also handles `EventPool`
relations, it stores only unique pools.

```
+-------------+          +---------+
|             |   0..*   |         |
| EventTarget | +------> | handler |
|             |          |         |
+-------------+          +---------+

      +                  +-----------+
      |           0..*   |           |
      +----------------> | EventPool |
                         |           |
                         +-----------+
```

A `handler` is a generated function that will notify the corresponding subscribed `EventPool`.

## EventPool & EventSet

An `EventPool` notifies its `EventSet`, while an `EventSet` stores a set of subscribed
event handlers. An `EventSet` is also responsible for event ordering and dispatching to
subscribed handlers.

```
+-----------+       +----------+
|           |   1   |          |
| EventPool | +---> | EventSet |
|           |       |          |
+-----------+       +----------+
```

#### Credits

The idea of a React component is taken from [`react-event-listener`](https://www.npmjs.com/package/react-event-listener).
