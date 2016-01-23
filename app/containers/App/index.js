/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { connect } from 'react-redux';

import Img from 'Img';
import Footer from 'Footer';
import Logo from './logo.png';
import Anchor from 'Anchor';

import styles from './styles.css';

class App extends React.Component {
  render() {
    return (
      <div className={ styles.wrapper }>
        <Anchor
          className={ styles.logoWrapper }
          href="https://twitter.com/mxstbr"
        >
          <Img
            className={styles.logo}
            src={Logo}
            alt="Max Stoiber - Logo"
          />
        </Anchor>
        { this.props.children }
        <Footer />
      </div>
    );
  }
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
