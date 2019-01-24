/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CREATE_MANUFACTURER = 'manin/manufacturer/CREATE_MANUFACTURER';
export const CREATE_MANUFACTURER_PROCESSING =
  'manin/manufacturer/CREATE_MANUFACTURER_PROCESSING';
export const CREATE_MANUFACTURER_STATUS =
  'manin/manufacturer/CREATE_MANUFACTURER_STATUS';

export const VIEW_ALL_MANUFACTURER = 'manin/manufacturer/VIEW_ALL_MANUFACTURER';
export const VIEW_ALL_MANUFACTURER_PROCESSING =
  'manin/manufacturer/VIEW_ALL_MANUFACTURER_PROCESSING';
export const VIEW_ALL_MANUFACTURER_STATUS =
  'manin/manufacturer/VIEW_ALL_MANUFACTURER_STATUS';

export const VIEW_MANUFACTURER_DETAIL =
  'manin/manufacturer/VIEW_MANUFACTURER_DETAIL';
export const VIEW_MANUFACTURER_DETAIL_PROCESSING =
  'manin/manufacturer/VIEW_MANUFACTURER_DETAIL_PROCESSING';
export const VIEW_MANUFACTURER_DETAIL_STATUS =
  'manin/manufacturer/VIEW_MANUFACTURER_DETAIL_STATUS';

export const DELETE_MANUFACTURER = 'manin/manufacturer/DELETE_MANUFACTURER';
