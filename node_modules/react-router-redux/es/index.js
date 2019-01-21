import _ConnectedRouter from './ConnectedRouter';
export { _ConnectedRouter as ConnectedRouter };

export { getLocation, createMatchSelector } from './selectors';
export { LOCATION_CHANGE, routerReducer } from './reducer';
export { CALL_HISTORY_METHOD, push, replace, go, goBack, goForward, routerActions } from './actions';
import _routerMiddleware from './middleware';
export { _routerMiddleware as routerMiddleware };