import { createSelector } from 'reselect';

const formSelector = (state) => state.get('form');

const usernameSelector = createSelector(
  formSelector,
  (formState) => formState.get('username')
);

const passwordSelector = createSelector(
  formSelector,
  (formState) => formState.get('password')
);

const errorSelector = createSelector(
  formSelector,
  (formState) => formState.get('error')
);

const twoFactorSelector = createSelector(
  formSelector,
  (formState) => formState.get('twoFactor')
);

export default createSelector(
  usernameSelector,
  passwordSelector,
  errorSelector,
  twoFactorSelector,
  (username, password, error, twoFactor) => ({ username, password, error, twoFactor })
);
