import React from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';

import {
  changeUsername,
  changePassword,
  submitForm
} from './actions';

import H2 from 'H2';

import styles from './styles.css';
import selector from './selector';

class LoginForm extends React.Component {
  constructor() {
    super();
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    return (
      <div className={ styles.formWrapper }>
        <div className={ styles.header }>
          <H2 className={ styles.title }>Github Login</H2>
        </div>
        <form
          onSubmit={ this.props.onFormSubmit }
        >
          { this.props.error !== null ? (
            <div className={ styles.errorWrapper }>
              <p className={ styles.error }>{ this.props.error }</p>
            </div>
          ) : (null) }
          <div className={ styles.inputWrapper }>
            <input
              className={ styles.input }
              value={ this.props.username }
              onChange={ this.props.onChangeUsername }
              id="username"
            />
            <label className={ styles.label } htmlFor="username">Username</label>
          </div>

          <div className={ styles.inputWrapper }>
            <input
              className={ styles.input }
              value={ this.props.password }
              onChange={ this.props.onChangePassword }
              type="password"
              id="password"
            />
            <label className={ styles.label } htmlFor="password">Password</label>
          </div>
          <div className={ styles.submitBtnWrapper }>
            <button className={ styles.submitBtn } type="submit">Log In</button>
          </div>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    onChangePassword: (evt) => dispatch(changePassword(evt.target.value)),
    onFormSubmit: (evt) => {
      evt.preventDefault();
      dispatch(submitForm());
    }
  };
}

export default connect(selector, mapDispatchToProps)(LoginForm);
