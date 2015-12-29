import React from 'react';

import Button from '../../components/Button/Button.react';

function NotFound() {
  return (
    <article>
      <h1>Page not found.</h1>
      <Button route="/">Home</Button>
    </article>
  );
}

export default NotFound;
