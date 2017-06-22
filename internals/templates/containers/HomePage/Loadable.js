/**
 * Asynchronously loads the component for HomePage
 */
import Loadable from 'routing/Loadable';

export default Loadable({
  loader: () => import('./index'),
});
