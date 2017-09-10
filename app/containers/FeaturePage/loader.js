/**
 * Asynchronously loads the components for FeaturePage
 */

import { errorLoading } from 'utils/asyncInjectors';

export default () => (cb) => {
  import('containers/FeaturePage')
    .then(cb)
    .catch(errorLoading);
};
