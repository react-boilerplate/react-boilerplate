/** ----  Vault Vision added code file ---- */
import { UserManager } from 'oidc-client';

/**
 * Create the UserManager
 */
const oidcConfig = {
  authority: process.env.VV_AUTHORITY,
  client_id: process.env.VV_CLIENT_ID,
  response_type: 'code',
  scope: 'openid email profile',
  redirect_uri: process.env.VV_CALLBACK_URI,
  loadUserInfo: 'true',
  post_logout_redirect_uri: process.env.VV_POST_LOGOUT_URI,
  automaticSilentRenew: false,
  monitorSession: false,
};

// Log.logger = console;
// Log.level = Log.DEBUG;

export const userManager = new UserManager(oidcConfig);
export const userManagerRegister = new UserManager({
  ...oidcConfig,
  extraQueryParams: { vv_action: 'register' },
});
