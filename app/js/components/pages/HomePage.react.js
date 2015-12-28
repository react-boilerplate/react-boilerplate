/*
 * HomePage
 * This is the first thing users see of our App
 */

import { asyncChangeProjectName, asyncChangeOwnerName } from '../../actions/AppActions';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

function HomePage(props) {
  const dispatch = props.dispatch;
  const { projectName, ownerName } = props.data;
  return (
    <div>
      <h1>Hello World!</h1>
      <h2>This is the demo for the <span className="home__text--red">{ projectName }</span> by <a href={'https://twitter.com/' + ownerName} >@{ ownerName }</a></h2>
      <label className="home__label">Change to your project name:
        <input className="home__input" type="text" onChange={(evt) => { dispatch(asyncChangeProjectName(evt.target.value)); }} defaultValue="React.js Boilerplate" value={projectName} />
      </label>
      <label className="home__label">Change to your name:
        <input className="home__input" type="text" onChange={(evt) => { dispatch(asyncChangeOwnerName(evt.target.value)); }} defaultValue="mxstbr" value={ownerName} />
      </label>
      <Link className="btn" to="/readme">Setup</Link>
    </div>
  );
}

// REDUX STUFF

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(HomePage);
