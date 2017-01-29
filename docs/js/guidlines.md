# JavaScript Style Guidelines

React Boilerplate subscribes to AirBnB's well established [JavaScript](https://github.com/airbnb/javascript) and [React](https://github.com/airbnb/javascript/tree/master/react) style guides with a few tweaks

These tweaks are defined in the [`package.json`](../../tree/master/package.json) and some are explained throughout this document.

While it's good practice to follow a common code style, the most important thing is that you and your team agree on a consistant coding style. The default style guides included here in React Boilerplate are highly recommended, but if your team would like to change some rules - feel free to do so!

## Overrides

### arrow-parens 

eslint: [`arrow-parens`](http://eslint.org/docs/rules/arrow-parens)

> Why? Not sure

```js
// Bad
a => {}

// Good
(a) => {}
```

### arrow-body-style 

eslint: [`arrow-body-style `](http://eslint.org/docs/rules/arrow-body-style)

> Why? In cases where a function returns a single expression the function block and explicit return statement can be ommited, leaving just the expression.

```js
// Bad
const foo = () => {
    return 'something';
};

// Good
const foo = () => 'something';
```

### comma-dangle

eslint: [`comma-dangle`](http://eslint.org/docs/rules/comma-dangle) 

> Why? Adding trailing commas to multiline object & array literals helps keep diffs clean since adding or removing items does not require adding or removing an extra comma to otherwise untouched lines as in the following example diffs:

```diff
// Bad
const foo = {
-   bar: 'baz',
-   qux: 'quux'
+   bar: 'baz'
};

// Good
const foo = {
    bar: 'baz',
-   qux: 'quux',
};
```