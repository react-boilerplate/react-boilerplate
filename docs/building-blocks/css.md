# Styling (CSS)

## Next Generation CSS

This boilerplate uses [`styled-components`](https://github.com/styled-components/styled-components) for styling react components. `styled-components` allows you to write actual CSS inside your JavaScript,
enabling you to use the [full power of CSS](https://github.com/styled-components/styled-components/blob/master/docs/css-we-support.md) :muscle:
without mapping between styles and components.
There are many ways to style react applications, but many find `styled-components`
to be a more natural approach to styling components.

### Linting

To complement `styled-components`, this boilerplate also has a CSS linting setup. It uses `stylelint` which will help you stay consistent with modern CSS standards. Read about it [here](linting.md).

### `sanitize.css`

In addition, this boilerplate also uses
[`sanitize.css`](https://github.com/jonathantneal/sanitize.css)
to make browsers render all elements more consistently and in line with modern standards,
it's a modern alternative to CSS resets. More info available on the [`sanitize.css` page](sanitize.md).

## styled-components

Below creates two styled react components (`<Title>`, `<Wrapper>`) and renders them
as children of the `<Header>` component:

```ts
import React from 'react';
import styled from 'styled-components/macro';

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
      <Title>Hello this is your first styled component!</Title>
      ...
    </Wrapper>
  );
}
```

_(The CSS rules are automatically vendor prefixed, so you don't have to think about it!)_

{% hint style="info" %}

🧙**Tips:** Importing from `styled-components/macro` will enable some features you can [see here](https://styled-components.com/docs/tooling#babel-macro)

{% endhint %}

## Media queries

Type-safe media queries can be complicated if you haven't mastered the typescript. Therefore we include a [media utility file](../../src/styles/media.ts) to make things easier for you.

### Example Usage

```ts
import { media } from 'styles/media';

const SomeDiv = styled.div`
  display: flex;
  ....
    ${media.medium`
      display: block
  `};
`;
```
