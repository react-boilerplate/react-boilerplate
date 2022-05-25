/** ----  Vault Vision added code file ---- */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignOutButton from '../../components/AuthButton/signout';
import { PreTag } from '../../components/PreTag';

export function Profile({ user }) {
  /**
   * Show a profile, pull user context from the global state
   */
  return (
    <div>
      <h1> Profile</h1>
      <PreTag>
        <code>{JSON.stringify(user, null, 2)}</code>
      </PreTag>
      <SignOutButton>Logout</SignOutButton>
    </div>
  );
}
Profile.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = state => state.global;

export default connect(mapStateToProps)(Profile);
