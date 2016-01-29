/*
 * ReadmePage
 *
 * This is the page users see when they click the "Setup" button on the HomePage
 */

import React from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import Button from 'Button';
import H2 from 'Heading2';

class ReadmePage extends React.Component {
  constructor() {
    super();
    this.onChangeRoute = this.onChangeRoute.bind(this);
    this.changeRouteToHome = this.changeRouteToHome.bind(this);
  }

  onChangeRoute(url) {
    this.props.changeRoute(url);
  }

  changeRouteToHome() {
    this.onChangeRoute('/');
  }

  render() {
    return (
      <div>
        <H2>Further Setup</H2>

        <Button handleRoute= { this.changeRouteToHome } >Home</Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    location: state.get('route').location
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(routeActions.push(url))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReadmePage);
