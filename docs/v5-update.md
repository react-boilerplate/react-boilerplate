# About the version 5.0

React Boilerplate V5 is built from scratch using `create-react-app`.

## Why?

The version `4.0` was stale for almost a year. There are mainly two reasons for this;

- Lack of contributors
- Difficulty in maintaining a Boilerplate

It's very hard to maintain the boilerplate **decently**. There are so many parts in the game and JS world has a very high pace. Testing and updating all of them while keeping an eye on the new stuff is pretty time consuming. In short, these kind of reasons left the project stale. So we wanted to utilize the `create-react-app` to make things safer and maintainable. There is [discussion](https://github.com/react-boilerplate/react-boilerplate/issues/2906) you can read more into this.

## How?

All the code is built from scratch with `typescript`. The boilerplate is nearly 5 years old and there were so many outdated stuff in it. So, starting fresh and clean was necessary. There are quite some changes introduced and here a summary

### Major Changes & Updates

- **New UI** 🎉
  - Example application comes with much better, tutorial-based web app
  - Users can check the features out by trying them one-by-one
- **Redux Toolkit** 🎉
  - Redux Toolkit was on hold for quite a time here on `dev`.
- **Documention on Gitbook** 🎉 [Take a look](https://cansahin.gitbook.io/react-boilerplate/)
  - Documentation moved to gitbook with many updates and touches
- **i18next**
  - Replaced `react-intl` with [i18next](https://github.com/i18next/i18next/)
  - Much simpler and react friendly.
- **Typescript**
  - Boost your DX, scalability, productivity. Typescript is the future for complex projects.
  - Completely built with `ts`. Therefore, **100% intellisense support EVERYWHERE🎉**
  - `type-safety` and `compile-time-safety` will be your best friend :)
  - Still want to write `js`? Hmm, you still can. I'm sure you will quit very soon once you get the taste:)

### Minor Changes

- Started from scratch. Therefore all the dead, not necessary codes and sections are removed
- Switched to `styled-components/macro` instead of a `babel-plugin`
- Switched to `github workflows`.

and many more touches...

## Migrating from v4.0

Sadly, this boilerplate has never been 'update-friendly`. All your apps logic and base is built around it and highly entangled with it. This makes the version updates very hard and we cannot provide a method for that. It's all up to you and your customized app.

Same applies for the `v5` update. Its completely built from scratch with the `create-react-app`. There is no single way of migrating to that. It all varies according to how built your project up. However, we suggest you to migrate with a `top to bottom` approach. If you have followed the basic boilerplate folder structure it shouldn't very hard. For example:

- Create another directory in your projects root and initialze the `v5` boilerplate inside.

- First, transfer `lint`, `prettier` etc... that the things not coupled with your web application

- Then, go a level deeper into the `src` folder and carry over your `store configuration`, `i18n configuration`.

- At last it comes down to carrying the `app` folder which contains your web application. Here it totaly depends on how you built your app.

### Clarification on Typescript

`v5` is built with `typescript`, but, this doesn't mean you need to switch to `ts`. It supports both `js` and `ts`. You can take a look at the [example](https://github.com/react-boilerplate/cra-template-examples/tree/master/example_javascript) code written in `js`.
