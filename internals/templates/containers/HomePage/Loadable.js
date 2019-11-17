/**
 * Asynchronously loads the component for HomePage
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
