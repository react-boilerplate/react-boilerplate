/** ----  Vault Vision added code file ---- */
/**
 *  SignOutButton Component
 *  The button handles signOut process
 */

import React from 'react';
import { Button } from './buttonStyles';
import { userManager } from '../../utils/userManager';
import PropTypes from "prop-types";
import SignInButton from "./signin";

// eslint-disable-next-line react/prop-types
function SignOutButton({ children }) {

  /**
   *  If auth.userData it shows the signOut button
   */
  return (
    <Button onClick={() => userManager.signoutRedirect()}>{children}</Button>
  );
}

SignOutButton.propTypes = {
  children: PropTypes.node.isRequired,
};
export default SignOutButton;
