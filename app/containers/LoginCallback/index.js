import React from 'react';
import { connect } from 'react-redux';
import { loginCallbackRequest } from './actions';

export class LoginCallback extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    dispatchLoginCallbackRequest: React.PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.dispatchLoginCallbackRequest();
  }

  render() {
    return <span>Welcome back, one moment please...</span>;
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    dispatchLoginCallbackRequest() {
      dispatch(loginCallbackRequest());
    },
  };
}

export default connect(null, mapDispatchToProps)(LoginCallback);
