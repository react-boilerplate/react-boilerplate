import { DEFAULT_ACTION } from '../constants/AppConstants';

export function defaultAction(elem) {
  return { type: DEFAULT_ACTION, elem };
}
