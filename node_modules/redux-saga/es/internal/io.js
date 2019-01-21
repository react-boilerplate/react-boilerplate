import { sym, is, ident, check, deprecate, updateIncentive, createSetContextWarning, SELF_CANCELLATION } from './utils';

var IO = /*#__PURE__*/sym('IO');
var TAKE = 'TAKE';
var PUT = 'PUT';
var ALL = 'ALL';
var RACE = 'RACE';
var CALL = 'CALL';
var CPS = 'CPS';
var FORK = 'FORK';
var JOIN = 'JOIN';
var CANCEL = 'CANCEL';
var SELECT = 'SELECT';
var ACTION_CHANNEL = 'ACTION_CHANNEL';
var CANCELLED = 'CANCELLED';
var FLUSH = 'FLUSH';
var GET_CONTEXT = 'GET_CONTEXT';
var SET_CONTEXT = 'SET_CONTEXT';

var TEST_HINT = '\n(HINT: if you are getting this errors in tests, consider using createMockTask from redux-saga/utils)';

var effect = function effect(type, payload) {
  var _ref;

  return _ref = {}, _ref[IO] = true, _ref[type] = payload, _ref;
};

export var detach = function detach(eff) {
  check(asEffect.fork(eff), is.object, 'detach(eff): argument must be a fork effect');
  eff[FORK].detached = true;
  return eff;
};

export function take() {
  var patternOrChannel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';

  if (arguments.length) {
    check(arguments[0], is.notUndef, 'take(patternOrChannel): patternOrChannel is undefined');
  }
  if (is.pattern(patternOrChannel)) {
    return effect(TAKE, { pattern: patternOrChannel });
  }
  if (is.channel(patternOrChannel)) {
    return effect(TAKE, { channel: patternOrChannel });
  }
  throw new Error('take(patternOrChannel): argument ' + String(patternOrChannel) + ' is not valid channel or a valid pattern');
}

take.maybe = function () {
  var eff = take.apply(undefined, arguments);
  eff[TAKE].maybe = true;
  return eff;
};

export var takem = /*#__PURE__*/deprecate(take.maybe, /*#__PURE__*/updateIncentive('takem', 'take.maybe'));

export function put(channel, action) {
  if (arguments.length > 1) {
    check(channel, is.notUndef, 'put(channel, action): argument channel is undefined');
    check(channel, is.channel, 'put(channel, action): argument ' + channel + ' is not a valid channel');
    check(action, is.notUndef, 'put(channel, action): argument action is undefined');
  } else {
    check(channel, is.notUndef, 'put(action): argument action is undefined');
    action = channel;
    channel = null;
  }
  return effect(PUT, { channel: channel, action: action });
}

put.resolve = function () {
  var eff = put.apply(undefined, arguments);
  eff[PUT].resolve = true;
  return eff;
};

put.sync = /*#__PURE__*/deprecate(put.resolve, /*#__PURE__*/updateIncentive('put.sync', 'put.resolve'));

export function all(effects) {
  return effect(ALL, effects);
}

export function race(effects) {
  return effect(RACE, effects);
}

function getFnCallDesc(meth, fn, args) {
  check(fn, is.notUndef, meth + ': argument fn is undefined');

  var context = null;
  if (is.array(fn)) {
    var _fn = fn;
    context = _fn[0];
    fn = _fn[1];
  } else if (fn.fn) {
    var _fn2 = fn;
    context = _fn2.context;
    fn = _fn2.fn;
  }
  if (context && is.string(fn) && is.func(context[fn])) {
    fn = context[fn];
  }
  check(fn, is.func, meth + ': argument ' + fn + ' is not a function');

  return { context: context, fn: fn, args: args };
}

export function call(fn) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return effect(CALL, getFnCallDesc('call', fn, args));
}

export function apply(context, fn) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  return effect(CALL, getFnCallDesc('apply', { context: context, fn: fn }, args));
}

export function cps(fn) {
  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  return effect(CPS, getFnCallDesc('cps', fn, args));
}

export function fork(fn) {
  for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return effect(FORK, getFnCallDesc('fork', fn, args));
}

export function spawn(fn) {
  for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  return detach(fork.apply(undefined, [fn].concat(args)));
}

export function join() {
  for (var _len5 = arguments.length, tasks = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    tasks[_key5] = arguments[_key5];
  }

  if (tasks.length > 1) {
    return all(tasks.map(function (t) {
      return join(t);
    }));
  }
  var task = tasks[0];
  check(task, is.notUndef, 'join(task): argument task is undefined');
  check(task, is.task, 'join(task): argument ' + task + ' is not a valid Task object ' + TEST_HINT);
  return effect(JOIN, task);
}

export function cancel() {
  for (var _len6 = arguments.length, tasks = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    tasks[_key6] = arguments[_key6];
  }

  if (tasks.length > 1) {
    return all(tasks.map(function (t) {
      return cancel(t);
    }));
  }
  var task = tasks[0];
  if (tasks.length === 1) {
    check(task, is.notUndef, 'cancel(task): argument task is undefined');
    check(task, is.task, 'cancel(task): argument ' + task + ' is not a valid Task object ' + TEST_HINT);
  }
  return effect(CANCEL, task || SELF_CANCELLATION);
}

export function select(selector) {
  for (var _len7 = arguments.length, args = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
    args[_key7 - 1] = arguments[_key7];
  }

  if (arguments.length === 0) {
    selector = ident;
  } else {
    check(selector, is.notUndef, 'select(selector,[...]): argument selector is undefined');
    check(selector, is.func, 'select(selector,[...]): argument ' + selector + ' is not a function');
  }
  return effect(SELECT, { selector: selector, args: args });
}

/**
  channel(pattern, [buffer])    => creates an event channel for store actions
**/
export function actionChannel(pattern, buffer) {
  check(pattern, is.notUndef, 'actionChannel(pattern,...): argument pattern is undefined');
  if (arguments.length > 1) {
    check(buffer, is.notUndef, 'actionChannel(pattern, buffer): argument buffer is undefined');
    check(buffer, is.buffer, 'actionChannel(pattern, buffer): argument ' + buffer + ' is not a valid buffer');
  }
  return effect(ACTION_CHANNEL, { pattern: pattern, buffer: buffer });
}

export function cancelled() {
  return effect(CANCELLED, {});
}

export function flush(channel) {
  check(channel, is.channel, 'flush(channel): argument ' + channel + ' is not valid channel');
  return effect(FLUSH, channel);
}

export function getContext(prop) {
  check(prop, is.string, 'getContext(prop): argument ' + prop + ' is not a string');
  return effect(GET_CONTEXT, prop);
}

export function setContext(props) {
  check(props, is.object, createSetContextWarning(null, props));
  return effect(SET_CONTEXT, props);
}

var createAsEffectType = function createAsEffectType(type) {
  return function (effect) {
    return effect && effect[IO] && effect[type];
  };
};

export var asEffect = {
  take: /*#__PURE__*/createAsEffectType(TAKE),
  put: /*#__PURE__*/createAsEffectType(PUT),
  all: /*#__PURE__*/createAsEffectType(ALL),
  race: /*#__PURE__*/createAsEffectType(RACE),
  call: /*#__PURE__*/createAsEffectType(CALL),
  cps: /*#__PURE__*/createAsEffectType(CPS),
  fork: /*#__PURE__*/createAsEffectType(FORK),
  join: /*#__PURE__*/createAsEffectType(JOIN),
  cancel: /*#__PURE__*/createAsEffectType(CANCEL),
  select: /*#__PURE__*/createAsEffectType(SELECT),
  actionChannel: /*#__PURE__*/createAsEffectType(ACTION_CHANNEL),
  cancelled: /*#__PURE__*/createAsEffectType(CANCELLED),
  flush: /*#__PURE__*/createAsEffectType(FLUSH),
  getContext: /*#__PURE__*/createAsEffectType(GET_CONTEXT),
  setContext: /*#__PURE__*/createAsEffectType(SET_CONTEXT)
};