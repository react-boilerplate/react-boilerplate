# Understanding `react-boilerplate`

This document is intended to give you a taste of how **`react-boilerplate`** works. It still assumes basic knowledge of React, Redux and `react-router`. **If you're completely new to React, please refer to https://github.com/petehunt/react-howto instead!**

This is a production-ready boilerplate, not for beginners. It includes tools to help you manage performance, asynchrony, styling, everything you need to build a **real** application. Before you get your hands dirty with the source code, we'd like you to go through a checklist that will help you determine whether or not you're ready to use this boilerplate. It's not because we're _holier-than-thou_, but rather because we genuinely want to save you the frustration.

## Tech Stack

Here's a curated list of packages that you should be at least familiar with before starting your awesome project. However, the best way to see a complete list of the dependencies is to check **`package.json`**

### Core

- [React](https://facebook.github.io/react/)
- [React Router](https://github.com/ReactTraining/react-router)
- [Redux](http://redux.js.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Reselect](https://github.com/reactjs/reselect)
- [Redux Saga](https://redux-saga.github.io/redux-saga/)
- [Styled Components](https://github.com/styled-components/styled-components)
- [Typescript](https://github.com/microsoft/TypeScript)
- [React-i18next](https://github.com/i18next/react-i18next)

### Unit Testing

- [Jest](http://facebook.github.io/jest/)
- [react-testing-library](https://github.com/testing-library/react-testing-library)

### Linting

- [ESLint](http://eslint.org/)
- [Prettier](https://prettier.io/)
- [Stylelint](https://stylelint.io/)

## Code/Folder Structure

Let's start with understanding why we have chosen our particular structure. It has been an [evolving discussion](https://github.com/react-boilerplate/react-boilerplate/issues/27), and if you have an afternoon or two we recommend you read the full thread.

In any case, here's the TL;DR:

- You will write your app in the **`src/app`** folder. This is the folder you will spend most, if not all, of your time in.
- Configuration, generators and templates are in the **`internals`** folder.

### `src/app`

We use the [container/component architecture](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.4rmjqneiw). **`containers/`** contains React components which are connected to the redux store. **`components/`** contains dumb React components which depend on containers for data. **Container components care about how things work, while components care about how things look.**

We've found that for many applications treating single pages (e.g. the LoginPage, the HomePage, etc.) as containers and their small parts (e.g. the Login form, the Navigation bar) as components works well, but there are no rigid rules. **Bend the architecture to the needs of your app, nothing is set in stone!**

{% hint style="warning" %}

🧙**Learn More:** See [this article](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
by Dan Abramov for a great introduction to this approach.

{% endhint %}

### `src/`

Here is the rest of the code that doesn't actually make your visible app but contains the features like creating redux store, translations, styles & themes, and your redux state types (or any custom typings)...

### `internals/`

This section you won't be bothering with much. We ship some extra functionalities to help with your web app and here it lies. It contains the code for :

- `internals/generators`: This folder has the code to scaffold out new components, containers and routes

- `internals/testing`: This folder contains mocks which Jest uses when testing your app, e.g. for images.

{% hint style="warning" %}

👀 We will dive into more details in the [Building Blocks](building-blocks/overview) section.

{% endhint %}

[create-react-app]: https://github.com/facebook/create-react-app
[react-boilerplate]: https://github.com/react-boilerplate/react-boilerplate
