import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { LoginForm, Input } from './styled';
import Button from '../../components/common/Button';
import { login } from '../App/actions';
/* eslint-disable */
class Login extends Component {
  onSubmit = (evt) => {
	  evt.preventDefault();
		this.props.dispatchLogin(evt.target.username.value, evt.target.password.value);
	}

	render() {
		return (
	  	<LoginForm onSubmit={this.onSubmit}>
		    <Input name="username" placeholder="Enter Username" type="text" />
		    <Input name="password" placeholder="Enter Password" type="password" />
		    <Button type="submit" height="30px">Submit</Button>
	   	</LoginForm>
		);
	}
}

Login.propTypes = {
  dispatchLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (username, password) => dispatch(login(username, password)),
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(Login);
