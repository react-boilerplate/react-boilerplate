/**
 *
 * Asynchronously loads the component for ThemePicker
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
