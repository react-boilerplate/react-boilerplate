/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';

/** ----  Vault Vision added code block ---- */
// Added action for the login callback and the initial local session user load
export const AUTH_SUCCESS = 'boilerplate/App/AUTH_SUCCESS';
export const VALIDATE_AUTH_CALLBACK = 'boilerplate/App/VALIDATE_AUTH_CALLBACK';
export const VALIDATE_AUTH_ERROR = 'boilerplate/App/VALIDATE_AUTH_ERROR';

export const LOAD_USER = 'boilerplate/App/LOAD_USER';
export const LOAD_USER_SUCCESS = 'boilerplate/App/LOAD_USER_SUCCESS';
/** ---- end block ----  */
