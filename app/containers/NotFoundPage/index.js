/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';

import Button from 'Button';
import H1 from 'H1';

export function NotFound(props) {
  return (
    <article>
      <H1>Page not found.</H1>
      <Button
        handleRoute={function redirect() {
          props.changeRoute('/');
        }}
      >
        Home
      </Button>
    </article>
  );
}

// react-redux stuff
function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(routeActions.push(url))
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(null, mapDispatchToProps)(NotFound);
