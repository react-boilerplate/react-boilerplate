/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectForm = state => state.get('form', {});

const makeSelectManufacturerFormData = () =>
  createSelector(
    selectForm,
    formState => formState.createManufacturerForm.values,
  );

export { selectForm, makeSelectManufacturerFormData };
