/** ----  Vault Vision added code file ---- */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignOutButton from '../../components/AuthButton/signout';

export function Dashboard({ user }) {
  /**
   * Show a Dashboard, pull user context from the global state
   */
  return (
    <div>
      <h1> Dashboard</h1>
      {/** h4 shows welcome, user profile name */}
      <h4>Welcome, {user && user.profile.name}</h4>
      {/** Designed button component that handles signOut */}
      <SignOutButton>Logout</SignOutButton>
    </div>
  );
}
Dashboard.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = state => state.global;

export default connect(mapStateToProps)(Dashboard);
