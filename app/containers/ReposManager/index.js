/**
 *
 * ReposManager
 *
 */

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { reducer } from './slice';
import saga from './saga';

function ReposManager() {
  useInjectReducer({ key: 'reposManager', reducer });
  useInjectSaga({ key: 'reposManager', saga });

  return null;
}

export default ReposManager;
