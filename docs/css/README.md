# Styling (CSS)

- [Next Generation CSS](#next-generation-css)
  - [Linting](#linting)
  - [sanitize.css](#sanitizecss)
- [CSS Support](#css-support)
- [styled-components](#styled-components)
- [Stylesheet](#stylesheet)
- [CSS Modules](#css-modules)
  - [Setup](#setup)
  - [Usage](#usage)
- [Sass](#sass)
  - [Setup](#setup-1)
  - [Usage](#usage-1)
- [LESS](#less)
  - [Setup](#setup-2)
  - [Usage](#usage-2)

## Next Generation CSS

This boilerplate uses [`styled-components`](https://github.com/styled-components/styled-components) :nail_care:
for styling react components. `styled-components` allows you to write actual CSS inside your JavaScript,
enabling you to use the [full power of CSS](https://github.com/styled-components/styled-components/blob/master/docs/css-we-support.md) :muscle:
without mapping between styles and components.
There are many ways to style react applications, but many find `styled-components`
to be a more natural approach to styling components.
Watch this video for a comparison and to see how it enforces best practices!

[![Styled-components: Enforcing best practices](http://img.youtube.com/vi/jaqDA7Btm3c/0.jpg)](https://youtu.be/jaqDA7Btm3c)

### Linting

To complement `styled-components`, this boilerplate also has a CSS linting setup. It uses `stylelint` which will help you stay consistent with modern CSS standards. Read about it [here](linting.md).

### sanitize.css

In addition, this boilerplate also uses
[`sanitize.css`](https://github.com/jonathantneal/sanitize.css)
to make browsers render all elements more consistently and in line with modern standards,
it's a modern alternative to CSS resets. More info available on the [`sanitize.css` page](sanitize.md).

## CSS Support

We support and recommend the use of [`styled-components`](#components).
We also support the use of CSS [stylesheets](#stylesheet).

There are many ways to style web applications, unfortunately, we cannot support them all.
However, you can integrate the following by using the guides below:

- [CSS Modules](#css-modules)
- [Sass](#sass)
- [LESS](#less)

## styled-components

Below creates two styled react components (`<Title>`, `<Wrapper>`) and renders them
as children of the `<Header>` component:

```jsx
import React from 'react';
import styled from 'styled-components';

// Create a <Title> react component that renders an <h1> which is
// centered, palevioletred and sized at 1.5em
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

// Create a <Wrapper> react component that renders a <section> with
// some padding and a papayawhip background
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

// Use them like any other React component – except they're styled!
function Button() {
  return (
    <Wrapper>
      <Title>
        Hello {this.props.name}, this is your first styled component!
      </Title>
      ...
    </Wrapper>
  );
}
```

_(The CSS rules are automatically vendor prefixed, so you don't have to think about it!)_

> For more information about `styled-components` see https://github.com/styled-components/styled-components

## Stylesheet

[Webpack](https://webpack.js.org/) allows you to import more than JavaScript.
Using the [`css-loader`](https://webpack.js.org/loaders/css-loader/) you can import CSS
into a JavaScript:

**`Button.css`**

```css
.danger {
  background-color: red;
}
```

**`Button.js`**

```js
import React from 'react';
import './Button.css'; // Tell Webpack that Button.js uses these styles

function Button() {
  // You can use them as regular CSS styles
  return <button className="danger">Click me</button>;
}
```

> For more information about Stylesheets and the `css-loader` see https://github.com/webpack-contrib/css-loader

## CSS Modules

### Setup

Modify [`webpack.base.babel.js`][webpackconfig]
to look like:

```diff
{
  test: /\.css$/,
  exclude: /node_modules/,
- use: ['style-loader', 'css-loader'],
+ use: [
+   'style-loader',
+   {
+     loader: 'css-loader',
+     options: {
+       modules: true,
+     },
+   },
+ ],
}
```

### Usage

The syntax is very similar to using a [Stylesheet](#stylesheet)
and this often catches people out.
The key difference in CSS Modules is that you import styles to a variable.

**`Button.css`**

```css
.danger {
  background-color: red;
}
```

**`Button.js`**

```js
import React from 'react';
import styles from './Button.css'; // different import compared to stylesheets

function Button() {
  // different usage to stylesheets
  return <button className={styles.danger}>Click me</button>;
}
```

**IMPORTANT: if you enable this rule, [stylesheets](#stylesheet) will no longer work,
it's one or the other unless you include or exclude specific directories.**

> For more information about CSS Modules see https://github.com/css-modules/css-modules

## Sass

### Setup

Install `sass-loader` and the `node-sass` dependancy.

```
npm i -D sass-loader node-sass
```

Modify [`webpack.base.babel.js`][webpackconfig]
to look like:

```diff
{
- test: /\.css$/,
+ test: /\.scss$/,
  exclude: /node_modules/,
- use: ['style-loader', 'css-loader'],
+ use: ['style-loader', 'css-loader', 'sass-loader'],
}
```

### Usage

**`Button.scss`**

```scss
$error-color: red;

.danger {
  background-color: $error-color;
}
```

**`Button.js`**

```js
import React from 'react';
import './Button.scss';

function Button() {
  return <button className="danger">Click me</button>;
}
```

> For more information about Sass and the `sass-loader` see https://github.com/webpack-contrib/sass-loader

## LESS

### Setup

Install `less-loader` and the `less` dependancy.

```
npm i -D less-loader less
```

Modify [`webpack.base.babel.js`][webpackconfig]
to look like:

```diff
{
- test: /\.css$/,
+ test: /\.less$/,
  exclude: /node_modules/,
- use: ['style-loader', 'css-loader'],
+ use: [
+ 'style-loader',
+ {
+   loader: 'css-loader',
+   options: {
+     importLoaders: 1,
+   },
+ },
+ 'less-loader',
+],
}
```

### Usage

**`Button.less`**

```less
@error-color: red;

.danger {
  background-color: @error-color;
}
```

**`Button.js`**

```js
import React from 'react';
import './Button.less';

function Button() {
  return <button className="danger">Click me</button>;
}
```

> For more information about LESS and the `less-loader` see https://github.com/webpack-contrib/less-loader.

[webpackconfig]: ../../internals/webpack/webpack.base.babel.js 'Webpack config'
