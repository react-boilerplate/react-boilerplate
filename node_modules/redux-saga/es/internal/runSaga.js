import { is, check, uid as nextSagaId, wrapSagaDispatch, noop, log } from './utils';
import proc from './proc';

var RUN_SAGA_SIGNATURE = 'runSaga(storeInterface, saga, ...args)';
var NON_GENERATOR_ERR = RUN_SAGA_SIGNATURE + ': saga argument must be a Generator function!';

export function runSaga(storeInterface, saga) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var iterator = void 0;

  if (is.iterator(storeInterface)) {
    if (process.env.NODE_ENV === 'development') {
      log('warn', 'runSaga(iterator, storeInterface) has been deprecated in favor of ' + RUN_SAGA_SIGNATURE);
    }
    iterator = storeInterface;
    storeInterface = saga;
  } else {
    check(saga, is.func, NON_GENERATOR_ERR);
    iterator = saga.apply(undefined, args);
    check(iterator, is.iterator, NON_GENERATOR_ERR);
  }

  var _storeInterface = storeInterface,
      subscribe = _storeInterface.subscribe,
      dispatch = _storeInterface.dispatch,
      getState = _storeInterface.getState,
      context = _storeInterface.context,
      sagaMonitor = _storeInterface.sagaMonitor,
      logger = _storeInterface.logger,
      onError = _storeInterface.onError;


  var effectId = nextSagaId();

  if (sagaMonitor) {
    // monitors are expected to have a certain interface, let's fill-in any missing ones
    sagaMonitor.effectTriggered = sagaMonitor.effectTriggered || noop;
    sagaMonitor.effectResolved = sagaMonitor.effectResolved || noop;
    sagaMonitor.effectRejected = sagaMonitor.effectRejected || noop;
    sagaMonitor.effectCancelled = sagaMonitor.effectCancelled || noop;
    sagaMonitor.actionDispatched = sagaMonitor.actionDispatched || noop;

    sagaMonitor.effectTriggered({ effectId: effectId, root: true, parentEffectId: 0, effect: { root: true, saga: saga, args: args } });
  }

  var task = proc(iterator, subscribe, wrapSagaDispatch(dispatch), getState, context, { sagaMonitor: sagaMonitor, logger: logger, onError: onError }, effectId, saga.name);

  if (sagaMonitor) {
    sagaMonitor.effectResolved(effectId, task);
  }

  return task;
}