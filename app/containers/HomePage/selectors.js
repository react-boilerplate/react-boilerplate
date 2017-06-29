/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { prop } from 'ramda';

const selectHome = prop('home');

const makeSelectUsername = () => createSelector(selectHome, prop('username'));

export { selectHome, makeSelectUsername };
