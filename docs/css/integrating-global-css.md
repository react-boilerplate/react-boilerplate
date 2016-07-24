# Integrating Global CSS

With CSS Modules, all class names are locally scoped by default. While this has
all the benefits outlined [here](css-modules.md), it requires some additional
setup and consideration to work correctly with traditional global CSS.

Let's use [Bootstrap](http://getbootstrap.com/) as an example.  First of all,
because we are in the React environment, it is widely recommended to not use
the Javascript code that is packaged with Bootstrap, but rather to re-write that
code in a React-friendly way.  Thankfully
[react-bootstrap](https://react-bootstrap.github.io/) exists which provides
components built using the native Bootstrap CSS classes.  But because these
components are built using the native global CSS, even with react-bootstrap
there is the need to deal with global CSS.  As an additional constraint for
this example, let's use npm and webpack to manage our dependencies so that
there is no need to manually add any script tags to `index.html`.

## Preparation
Edit `package.json` and make the following modifications
```
  "dllPlugin": {
    ...
    "exclude": [
      "bootstrap-css-only",
      ...
    ],
    ...
  },
  "dependencies": {
    ...
    "bootstrap-css-only": "3.3.6",
    "react-bootstrap", "0.29.5",
    ...
  },
```
The `exclude` configuration change is necessary to ensure that the dllPlugin build
process does not attempt to parse the global CSS.  If you do not do this
there will be an error during the build process and you will not be able to
run the application.

Now edit `internals/config.js` and make the following modifications
```js
const ReactBoilerplate = {
  /* ... */
  dllPlugin: {
    defaults: {
      /* ... */
      exclude: [
        'bootstrap-css-only',
        /* ... */
      ],

      /* ... */
};
```

## Usage

There are multiple approaches you can use to use and customize the global CSS.

You can use the global styles directly.
```javascript
<div className="container-fluid"></div>
```

You can use `react-bootstrap`.
```javascript
<Grid fluid></div>
```

You can customize global styles in your CSS module.
```css
:global .container-fluid {
  margin-left: 20px;
}
```

Or you can add customization via another local scope and
[classnames](https://github.com/JedWatson/classnames)
```css
.localContainer {
  margin-left: 20px;
}
```
```javascript
import styles from './styles.css';
import classNames from 'classnames';
<div className={ classNames('container-fluid', styles.localContainer) }></div>
```

Doing the same via `react-bootstrap`
```javascript
import styles from './styles.css';
<Grid fluid className={ styles.localContainer }></Grid>
```
---

_Don't like this feature? [Click here](remove.md)_
