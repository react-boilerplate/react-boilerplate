/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  CREATE_MANUFACTURER,
  CREATE_MANUFACTURER_PROCESSING,
  CREATE_MANUFACTURER_STATUS,
  VIEW_ALL_MANUFACTURER, VIEW_ALL_MANUFACTURER_PROCESSING,
  VIEW_ALL_MANUFACTURER_STATUS
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function createManufacturer() {
  return {
    type: CREATE_MANUFACTURER,
  };
}

export function createManufacturerProcessing(data) {
  return {
    type: CREATE_MANUFACTURER_PROCESSING,
    payload: data
  };
}

export function createManufacturerSuccess(data) {
  return {
    type: CREATE_MANUFACTURER_STATUS,
    payload: data
  };
}

export function getAllManufacturers() {
  return {
    type: VIEW_ALL_MANUFACTURER,
  };
}

export function getAllManufacturersProcessing(data) {
  return {
    type: VIEW_ALL_MANUFACTURER_PROCESSING,
    payload: data
  };
}

export function getAllManufacturersSuccess(data) {
  return {
    type: VIEW_ALL_MANUFACTURER_STATUS,
    payload: data
  };
}
