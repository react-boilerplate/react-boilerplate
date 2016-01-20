/*
 * ReadmePage
 *
 * This is the page users see when they click the "Setup" button on the HomePage
 */

import React from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import Button from 'Button';

import styles from './styles.css';

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
        <h2>Further Setup</h2>
        <p>
          Assuming you have already cloned the repo and ran all the commands from
          the README (otherwise you would not be here), these are the further steps:
        </p>

        <ol className={styles.list}>
          <li>Replace my name and the package name in the package.json file</li>
          <li>Replace the two components with your first component</li>
          <li>Replace the default actions with your first action</li>
          <li>Delete css/components/_home.css and add the styling for your component</li>
          <li>And finally, update the unit tests</li>
        </ol>

        <Button handleRoute= { this.changeRouteToHome } >Home</Button>
      </div>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(ReadmePage);
