# CSS Modules

With CSS Modules, all class names are locally scoped by default. This means
there is no overriding due to the CSS cascade anymore, which gets rid of a lots
of bugs. For a detailed explanation see the [official documentation](https://github.com/css-modules/css-modules).

## Usage

Write your CSS normally in the `styles.css` file in the component folder.

```CSS
/* styles.css */

.myClassName {
  color: green;
}
```

Then `import` the CSS file in your component JavaScript file, and reference the
class name in the `className` prop.

```JS
// index.js

import styles from './styles.css';

// ...inside the render()...

return (
  <div className={ styles.myClassName }>
  </div>
);
```

## Removing CSS modules

To remove this feature from your setup, stop importing `.css` files in your
components and delete the `modules` option from the `css-loader` declaration in
[`webpack.prod.babel.js`](/internals/webpack/webpack.prod.babel.js) and
[`webpack.base.babel.js`](/internals/webpack/webpack.base.babel.js)!
