/**
 * Export all your sagas here so the sagaMiddleware imports them
 */

import { getGithubData } from './getGithubData.saga';

export default [
  getGithubData,
];
