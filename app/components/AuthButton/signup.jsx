/** ----  Vault Vision added code file ---- */
/**
 *  SignUpButton Component
 *  The button handles signOut process
 */

import React from 'react';
import { Button } from './buttonStyles';
import { userManagerRegister } from '../../utils/userManager';
import PropTypes from "prop-types";
import SignOutButton from "./signout";

// eslint-disable-next-line react/prop-types
function SignUpButton({ children }) {
  /**
   *  If auth.userData it shows the signUp button
   */
  return (
    <Button onClick={() => userManagerRegister.signinRedirect()}>
      {children}
    </Button>
  );
}

SignUpButton.propTypes = {
  children: PropTypes.node.isRequired,
};
export default SignUpButton;
