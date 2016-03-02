/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';

class App extends React.Component {
  render() {
    return this.props.children;
  }
}

export default App;
