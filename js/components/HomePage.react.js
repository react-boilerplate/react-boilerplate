import { changeProjectName, changeOwnerName } from '../actions/AppActions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Logo from '../../img/logo.png';

class HomePage extends Component {
	render() {
    const { dispatch, projectName, ownerName } = this.props;
    return (
			<div className="wrapper">
        <img className="logo" src={Logo} />
				<h1>Hello World!</h1>
        <h2>This is the demo for the <span className="home__text--red">{ projectName }</span> by <a href={'https://twitter.com/' + ownerName} >@{ ownerName }</a></h2>
        <label className="home__label">Change to your project name:
				  <input className="home__input" type="text" onChange={(evt) => { dispatch(changeProjectName(evt.target.value)); }} defaultValue="React.js Boilerplate" placeholder={projectName} />
        </label>
        <label className="home__label">Change to your name:
          <input className="home__input" type="text" onChange={(evt) => { dispatch(changeOwnerName(evt.target.value)); }} defaultValue="mxstbr" placeholder={projectName} />
        </label>
        <Link className="btn" to="/readme">Setup</Link>
			</div>
		);
  }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
  return {
    ownerName: state.ownerName,
    projectName: state.projectName
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(HomePage);
