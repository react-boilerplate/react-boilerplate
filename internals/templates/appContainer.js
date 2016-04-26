/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';

function App(props) {
  return (
    <div>
      {props.children}
    </div>
  );
}

export default App;
