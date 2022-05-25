/** ----  Vault Vision added code file ---- */
/**
 *  SignInButton Component
 *  The button handles signIn process
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './buttonStyles';
import { userManager } from '../../utils/userManager';

// eslint-disable-next-line react/prop-types
function SignInButton({ children }) {
  return (
    <Button onClick={() => userManager.signinRedirect()}>{children}</Button>
  );
}

SignInButton.propTypes = {
  children: PropTypes.node.isRequired,
};
export default SignInButton;
