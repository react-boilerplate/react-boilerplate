/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { connect } from 'react-redux';

import Img from '../../components/Img.react';
import Logo from '../../assets/logo.png';

import styles from './App.css';

function App(props) {
  return (
    <div className={styles.wrapper}>
      <Img className={styles.logo} src={Logo} alt="Max Stoiber - Logo"/>
      { props.children }
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
export default connect(select)(App);
