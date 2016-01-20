import React from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';

import Button from 'Button';

function NotFound(props) {
  console.log(props);
  return (
    <article>
      <h1>Page not found.</h1>
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
function mapStateToProps(state) {
  return {
    location: state.routing.location
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(routeActions.push(url))
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(NotFound);
