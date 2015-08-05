import { defaultAction } from '../actions/AppActions';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class App extends Component {
	render() {
    const { dispatch, someVariable } = this.props;
    return (
			<div>
				<h1>Hello World! someVariable: { someVariable.toString() }</h1>
				<button onClick={() => dispatch(defaultAction(!someVariable))} >
					Toggle someVariable
				</button>
			</div>
		);
  	}
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  someVariable: PropTypes.bool.isRequired
};

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
  return {
    someVariable: state.someVariable
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App);
