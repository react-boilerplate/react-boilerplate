import React from 'react';
import { connect } from 'react-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';

import {
  changeUsername,
  changePassword,
  submitForm
} from './actions';

import styles from './styles.css';
import selector from './selector';

class LoginForm extends React.Component {
  constructor() {
    super();
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    return (
      <form
        className={ styles.form }
        onSubmit={ this.props.onFormSubmit }
      >
        { this.props.error !== null ? (
          <p>{ this.props.error }</p>
        ) : (null) }
        <label className={ styles.label }>Username
          <input
            className={ styles.input }
            value={ this.props.username }
            onChange={ this.props.onChangeUsername }
          />
        </label>
        <label className={ styles.label }>Password
          <input
            className={ styles.input }
            value={ this.props.password }
            onChange={ this.props.onChangePassword }
            type="password"
          />
        </label>
        <input type="submit" value="Post" />
      </form>
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
