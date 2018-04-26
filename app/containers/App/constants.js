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

export const DEFAULT_LOCALE = 'en';

export const GET_BOOKS = 'GET_BOOKS';
export const SET_BOOKS = 'SET_BOOKS';
export const SET_PRAISE = 'SET_PRAISE';
export const SET_DESCRIPTION = 'SET_DESCRIPTION';

export const GET_AUTHOR = 'GET_AUTHOR';
export const SET_AUTHOR = 'SET_AUTHOR';
