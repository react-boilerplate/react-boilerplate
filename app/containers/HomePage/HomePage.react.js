/*
 * HomePage
 * This is the first thing users see of our App
 */

import { asyncChangeProjectName, asyncChangeOwnerName } from './HomePage.actions';
import React from 'react';
import { connect } from 'react-redux';

import Button from 'Button';

import styles from './HomePage.css';

class HomePage extends React.Component {
  constructor() {
    super();
    this.onChangeProjectName = this.onChangeProjectName.bind(this);
    this.onChangeOwnerName = this.onChangeOwnerName.bind(this);
  }

  onChangeProjectName(evt) {
    this.props.dispatch(asyncChangeProjectName(evt.target.value));
  }

  onChangeOwnerName(evt) {
    this.props.dispatch(asyncChangeOwnerName(evt.target.value));
  }

  render() {
    const { projectName, ownerName } = this.props.data;

    return (
      <div>
        <h1>Hello World!</h1>
        <h2>This is the demo for the { projectName } by
          <a href={`https://twitter.com/${ownerName}`} className={styles.link} > @{ ownerName }</a>
        </h2>
        <label className={styles.label}>Change to your project name:
          <input className={styles.input} type="text"
            onChange={this.onChangeProjectName}
            defaultValue="React.js Boilerplate" value={projectName}
          />
        </label>
        <label className={styles.label}>Change to your name:
          <input className={styles.input} type="text"
            onChange={this.onChangeOwnerName}
            defaultValue="mxstbr" value={ownerName}
          />
        </label>
        <Button route="/readme">Setup</Button>
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
export default connect(select)(HomePage);
