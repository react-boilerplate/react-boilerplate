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

export default createSelector(
  usernameSelector,
  passwordSelector,
  errorSelector,
  (username, password, error) => ({ username, password, error })
);
