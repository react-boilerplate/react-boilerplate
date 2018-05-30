import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Redirect } from 'react-router-dom';


import { LoginForm, Input } from './styled';
import Button from '../../components/common/Button';
import { login } from '../App/actions';
import { selectUser } from '../App/selectors';

class Login extends Component {
  onSubmit = (evt) => {
    evt.preventDefault();
    this.props.dispatchLogin(evt.target.username.value, evt.target.password.value);
  }

  render() {
    return (
      <LoginForm onSubmit={this.onSubmit}>
        {this.props.user && <Redirect to="/" />}
        <Input name="username" placeholder="Enter Username" type="text" value="richard-bernstein" />
        <Input name="password" placeholder="Enter Password" type="password" value={localStorage.password} />
        <Button type="submit" height="30px">Submit</Button>
      </LoginForm>
    );
  }
}

Login.propTypes = {
  dispatchLogin: PropTypes.func.isRequired,
  user: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: selectUser(),
});

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (username, password) => dispatch(login(username, password)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Login);
