/**
 * Asynchronously loads the component for FeaturePage
 */
import Loadable from 'routing/Loadable';

export default Loadable({
  loader: () => import('./index'),
});
