/*
 * HomePage
 * This is the first thing users see of our App
 */

import { asyncChangeProjectName, asyncChangeOwnerName } from './HomePageActions';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import styles from './HomePage.css';

function HomePage(props) {
  const dispatch = props.dispatch;
  const { projectName, ownerName } = props.data;
  return (
    <div>
      <h1>Hello World!</h1>
      <h2>This is the demo for the { projectName } by <a href={'https://twitter.com/' + ownerName} className={styles.link} >@{ ownerName }</a></h2>
      <label className={styles.label}>Change to your project name:
        <input className={styles.input} type="text" onChange={(evt) => { dispatch(asyncChangeProjectName(evt.target.value)); }} defaultValue="React.js Boilerplate" value={projectName} />
      </label>
      <label className={styles.label}>Change to your name:
        <input className={styles.input} type="text" onChange={(evt) => { dispatch(asyncChangeOwnerName(evt.target.value)); }} defaultValue="mxstbr" value={ownerName} />
      </label>
      <Link className={styles.btn} to="/readme">Setup</Link>
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
