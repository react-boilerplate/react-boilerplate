# CSS Modules

With CSS Modules, all class names are locally scoped by default. This means
no more bugs from classname clashes. Being to compose primitives to build
up behaviour also lets us bring programming best practice to CSS: DRY, reusable,
modular code FTW!

For a detailed explanation see the
[official documentation](https://github.com/css-modules/css-modules).

## Usage

Write your CSS normally in the `styles.css` file in the component folder.

```CSS
/* styles.css */

.saveBtn {
  composes: btn from '../components/btn'; // Yay for composition!

  background-color: green;
  color:            white;
}
```

Then `import` the CSS file in your component JavaScript file, and reference the
class name in the `className` prop.

```JS
// index.js

import styles from './styles.css';

// ...inside the render()...

return (
  <button className={ styles.saveBtn }>
    Save!
  </button>
);
```

## Removing CSS modules

To remove this feature from your setup, stop importing `.css` files in your
components and delete the `modules` option from the `css-loader` declaration in
[`webpack.prod.babel.js`](/internals/webpack/webpack.prod.babel.js) and
[`webpack.base.babel.js`](/internals/webpack/webpack.base.babel.js)!
