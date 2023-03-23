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

export const LOAD_STR = 'REACT-BOILERPLATE/App/LOAD_REPOS';
export const LOAD_STR_SUCCESS = 'REACT-BOILERPLATE/App/LOAD_STR_SUCCESS';
export const LOAD_STR_ERROR = 'REACT-BOILERPLATE/App/LOAD_STR_ERROR';
export const ADD_NEW_STR = 'REACT-BOILERPLATE/App/ADD_NEW_STR';
export const CHANGE_STRING = 'REACT-BOILERPLATE/App/CHANGE_STRING';
