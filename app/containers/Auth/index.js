/** ----  Vault Vision added code file ---- */

import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';

import { createStructuredSelector } from 'reselect';
import {
  makeSelectUser,
  makeSelectUserLoading,
} from 'containers/App/selectors';
import PropTypes from 'prop-types';
import { userManager } from '../../utils/userManager';
import history from '../../utils/history';

export function Auth({ user, userLoading }) {
  /**
   * checks if user is authenticated
   * if user isn't authenticated then redirect to Vault Vision login flow
   */

  if (userLoading) {
    return (
      <div>
        <h1> Loading...</h1>
      </div>
    );
  }
  if (user) {
    // user object is there, go back to where the request started
    // or go to the dashboard
    if (history.length > 1) {
      history.goBack();
      return (
        <div>
          <h1> Loading...</h1>
        </div>
      );
    }
    return <Redirect to="/dashboard" />;
  }
  // no user object and no loading, start a sign in flow
  console.log('Start Signin Flow');
  userManager.signinRedirect();
  return (
    <div>
      <h1> Loading...</h1>
    </div>
  );
}

Auth.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  userLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  userLoading: makeSelectUserLoading(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(Auth);
