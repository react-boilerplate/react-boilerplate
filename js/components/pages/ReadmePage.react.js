/*
 * ReadmePage
 *
 * This is the page users see when they click the "Setup" button on the HomePage
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';

export default class ReadmePage extends Component {
  render() {
    const dispatch = this.props.dispatch;
    const { pathname } = this.props.location;
    return (
      <div>
        <h2>Further Setup</h2>
        <p>Assuming you have already cloned the repo and ran all the commands from the README (otherwise you would not be here), these are the further steps:</p>

        <ol>
          <li>Replace my name and the package name in the package.json file</li>
          <li>Replace the two components with your first component</li>
          <li>Replace the default actions with your first action</li>
          <li>Delete css/components/_home.css and add the styling for your component</li>
          <li>And finally, update the unit tests</li>
        </ol>

        <button className="btn" onClick={ ()=> dispatch(routeActions.push('/')) }>Back Home</button>
        <p> Here is {"'"}{ pathname }{"'"}</p>
      </div>
    );
  }
}

// REDUX STUFF

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    location: state.routing.location
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(ReadmePage);
