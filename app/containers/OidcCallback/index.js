/** ----  Vault Vision added code file ---- */

/**
 * OidcCallback page
 * Receives the auth callback from the Vault Vision user login flow
 * Then initiates a validate action to validate the JWT token received from that flow
 * and use that token to retrieve the rest of the user profile data
 */
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';

import PropTypes from 'prop-types';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectUser } from 'containers/App/selectors';
import { validateAuthCallback } from '../App/actions';

import saga from './saga';
const key = 'oidc-callback';

const OidcCallback = ({ user }) => {
  useInjectSaga({ key, saga });

  const dispatch = useDispatch();

  useEffect(() => {
    // When initial page loads
    dispatch(validateAuthCallback());
  }, []);

  if (user) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div>
      <h2>Loading... </h2>
    </div>
  );
};

OidcCallback.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(OidcCallback);
