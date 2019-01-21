/**
 * Asynchronously loads the component for HomePage
 */
import loadable from 'loadable-components';

export default loadable(() => import('./index'));
