/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import {initialState} from "./reducer";

const createManufacturerForm = state => state.get('form', initialState);
const manufacturerState = state => state.get('manufacturer', initialState);

const makeSelectManufacturerFormData = () =>
  createSelector(createManufacturerForm, formState => formState.createManufacturerForm.values);

const makeSelectAllManufacturers = () =>
  createSelector(manufacturerState, manufacturerState => manufacturerState.get('manufacturersList'));


export { createManufacturerForm, makeSelectManufacturerFormData, makeSelectAllManufacturers };
