/**
 * Asynchronously loads the components for NotFoundPage
 */

import { errorLoading } from 'utils/asyncInjectors';

export default () => (cb) => {
  import('containers/NotFoundPage')
    .then(cb)
    .catch(errorLoading);
};
