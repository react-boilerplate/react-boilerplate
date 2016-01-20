/*
 * HomePage
 * This is the first thing users see of our App
 */

import { asyncChangeProjectName, asyncChangeOwnerName } from './HomePage.actions';
import React from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import Button from 'Button/Button.react';

import styles from './HomePage.css';

class HomePage extends React.Component {
  constructor() {
    super();
    this.onChangeProjectName = this.onChangeProjectName.bind(this);
    this.onChangeOwnerName = this.onChangeOwnerName.bind(this);
    this.onChangeRoute = this.onChangeRoute.bind(this);
    this.changeRouteToReadme = this.changeRouteToReadme.bind(this);
  }
  onChangeOwnerName(evt) {
    this.props.changeOwnerName(evt.target.value);
  }
  onChangeProjectName(evt) {
    this.props.changeProjectName(evt.target.value);
  }

  onChangeRoute(url) {
    this.props.changeRoute(url);
  }

  changeRouteToReadme() {
    this.onChangeRoute('/readme');
  }

  render() {
    const { projectName, ownerName } = this.props.data;
    const { pathname } = this.props.location;

    return (
      <div>
        <h1>Hello World!</h1>
        <h2>This is the demo for the { projectName } by
          <a href={`https://twitter.com/${ownerName}`} className={styles.link} > @{ ownerName }</a>
        </h2>
        <label className={styles.label}>Change to your project name:
          <input className={styles.input} type="text"
            onChange={ this.onChangeProjectName }
            defaultValue="React.js Boilerplate" value={projectName}
          />
        </label>
        <label className={styles.label}>Change to your name:
          <input className={styles.input} type="text"
            onChange={ this.onChangeOwnerName }
            defaultValue="mxstbr" value={ownerName}
          />
        </label>
        <Button handleRoute = { this.changeRouteToReadme }>Setup</Button>
        <p> Here is {"'"}{ pathname }{"'"}</p>
      </div>
    );
  }
}

// react-redux stuff
function mapStateToProps(state) {
  return {
    location: state.routing.location,
    data: state.home
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(routeActions.push(url)),
    changeProjectName: (value) => dispatch(asyncChangeProjectName(value)),
    changeOwnerName: (value) => dispatch(asyncChangeOwnerName(value))
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
