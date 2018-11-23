/**
 *
 * Asynchronously loads the component for AddItem
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
