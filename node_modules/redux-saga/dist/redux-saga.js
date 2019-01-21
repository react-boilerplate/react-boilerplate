(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.ReduxSaga = {})));
}(this, (function (exports) { 'use strict';

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var defineEnumerableProperties = function (obj, descs) {
    for (var key in descs) {
      var desc = descs[key];
      desc.configurable = desc.enumerable = true;
      if ("value" in desc) desc.writable = true;
      Object.defineProperty(obj, key, desc);
    }

    return obj;
  };

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var objectWithoutProperties = function (obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  };

  var sym = function sym(id) {
    return '@@redux-saga/' + id;
  };

  var TASK = /*#__PURE__*/sym('TASK');
  var HELPER = /*#__PURE__*/sym('HELPER');
  var MATCH = /*#__PURE__*/sym('MATCH');
  var CANCEL = /*#__PURE__*/sym('CANCEL_PROMISE');
  var SAGA_ACTION = /*#__PURE__*/sym('SAGA_ACTION');
  var SELF_CANCELLATION = /*#__PURE__*/sym('SELF_CANCELLATION');
  var konst = function konst(v) {
    return function () {
      return v;
    };
  };
  var kTrue = /*#__PURE__*/konst(true);
  var noop = function noop() {};
  var ident = function ident(v) {
    return v;
  };

  function check(value, predicate, error) {
    if (!predicate(value)) {
      log('error', 'uncaught at check', error);
      throw new Error(error);
    }
  }

  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn(object, property) {
    return is.notUndef(object) && hasOwnProperty.call(object, property);
  }

  var is = {
    undef: function undef(v) {
      return v === null || v === undefined;
    },
    notUndef: function notUndef(v) {
      return v !== null && v !== undefined;
    },
    func: function func(f) {
      return typeof f === 'function';
    },
    number: function number(n) {
      return typeof n === 'number';
    },
    string: function string(s) {
      return typeof s === 'string';
    },
    array: Array.isArray,
    object: function object(obj) {
      return obj && !is.array(obj) && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
    },
    promise: function promise(p) {
      return p && is.func(p.then);
    },
    iterator: function iterator(it) {
      return it && is.func(it.next) && is.func(it.throw);
    },
    iterable: function iterable(it) {
      return it && is.func(Symbol) ? is.func(it[Symbol.iterator]) : is.array(it);
    },
    task: function task(t) {
      return t && t[TASK];
    },
    observable: function observable(ob) {
      return ob && is.func(ob.subscribe);
    },
    buffer: function buffer(buf) {
      return buf && is.func(buf.isEmpty) && is.func(buf.take) && is.func(buf.put);
    },
    pattern: function pattern(pat) {
      return pat && (is.string(pat) || (typeof pat === 'undefined' ? 'undefined' : _typeof(pat)) === 'symbol' || is.func(pat) || is.array(pat));
    },
    channel: function channel(ch) {
      return ch && is.func(ch.take) && is.func(ch.close);
    },
    helper: function helper(it) {
      return it && it[HELPER];
    },
    stringableFunc: function stringableFunc(f) {
      return is.func(f) && hasOwn(f, 'toString');
    }
  };

  var object = {
    assign: function assign(target, source) {
      for (var i in source) {
        if (hasOwn(source, i)) {
          target[i] = source[i];
        }
      }
    }
  };

  function remove(array, item) {
    var index = array.indexOf(item);
    if (index >= 0) {
      array.splice(index, 1);
    }
  }

  var array = {
    from: function from(obj) {
      var arr = Array(obj.length);
      for (var i in obj) {
        if (hasOwn(obj, i)) {
          arr[i] = obj[i];
        }
      }
      return arr;
    }
  };

  function deferred() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var def = _extends({}, props);
    var promise = new Promise(function (resolve, reject) {
      def.resolve = resolve;
      def.reject = reject;
    });
    def.promise = promise;
    return def;
  }

  function arrayOfDeffered(length) {
    var arr = [];
    for (var i = 0; i < length; i++) {
      arr.push(deferred());
    }
    return arr;
  }

  function delay(ms) {
    var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var timeoutId = void 0;
    var promise = new Promise(function (resolve) {
      timeoutId = setTimeout(function () {
        return resolve(val);
      }, ms);
    });

    promise[CANCEL] = function () {
      return clearTimeout(timeoutId);
    };

    return promise;
  }

  function createMockTask() {
    var _ref;

    var running = true;
    var _result = void 0,
        _error = void 0;

    return _ref = {}, _ref[TASK] = true, _ref.isRunning = function isRunning() {
      return running;
    }, _ref.result = function result() {
      return _result;
    }, _ref.error = function error() {
      return _error;
    }, _ref.setRunning = function setRunning(b) {
      return running = b;
    }, _ref.setResult = function setResult(r) {
      return _result = r;
    }, _ref.setError = function setError(e) {
      return _error = e;
    }, _ref;
  }

  function autoInc() {
    var seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    return function () {
      return ++seed;
    };
  }

  var uid = /*#__PURE__*/autoInc();

  var kThrow = function kThrow(err) {
    throw err;
  };
  var kReturn = function kReturn(value) {
    return { value: value, done: true };
  };
  function makeIterator(next) {
    var thro = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : kThrow;
    var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var isHelper = arguments[3];

    var iterator = { name: name, next: next, throw: thro, return: kReturn };

    if (isHelper) {
      iterator[HELPER] = true;
    }
    if (typeof Symbol !== 'undefined') {
      iterator[Symbol.iterator] = function () {
        return iterator;
      };
    }
    return iterator;
  }

  /**
    Print error in a useful way whether in a browser environment
    (with expandable error stack traces), or in a node.js environment
    (text-only log output)
   **/
  function log(level, message) {
    var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    /*eslint-disable no-console*/
    if (typeof window === 'undefined') {
      console.log('redux-saga ' + level + ': ' + message + '\n' + (error && error.stack || error));
    } else {
      console[level](message, error);
    }
  }

  function deprecate(fn, deprecationWarning) {
    return function () {
      log('warn', deprecationWarning);
      return fn.apply(undefined, arguments);
    };
  }

  var updateIncentive = function updateIncentive(deprecated, preferred) {
    return deprecated + ' has been deprecated in favor of ' + preferred + ', please update your code';
  };

  var internalErr = function internalErr(err) {
    return new Error('\n  redux-saga: Error checking hooks detected an inconsistent state. This is likely a bug\n  in redux-saga code and not yours. Thanks for reporting this in the project\'s github repo.\n  Error: ' + err + '\n');
  };

  var createSetContextWarning = function createSetContextWarning(ctx, props) {
    return (ctx ? ctx + '.' : '') + 'setContext(props): argument ' + props + ' is not a plain object';
  };

  var wrapSagaDispatch = function wrapSagaDispatch(dispatch) {
    return function (action) {
      return dispatch(Object.defineProperty(action, SAGA_ACTION, { value: true }));
    };
  };

  var cloneableGenerator = function cloneableGenerator(generatorFunc) {
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var history = [];
      var gen = generatorFunc.apply(undefined, args);
      return {
        next: function next(arg) {
          history.push(arg);
          return gen.next(arg);
        },
        clone: function clone() {
          var clonedGen = cloneableGenerator(generatorFunc).apply(undefined, args);
          history.forEach(function (arg) {
            return clonedGen.next(arg);
          });
          return clonedGen;
        },
        return: function _return(value) {
          return gen.return(value);
        },
        throw: function _throw(exception) {
          return gen.throw(exception);
        }
      };
    };
  };

  var BUFFER_OVERFLOW = "Channel's Buffer overflow!";

  var ON_OVERFLOW_THROW = 1;
  var ON_OVERFLOW_DROP = 2;
  var ON_OVERFLOW_SLIDE = 3;
  var ON_OVERFLOW_EXPAND = 4;

  var zeroBuffer = { isEmpty: kTrue, put: noop, take: noop };

  function ringBuffer() {
    var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
    var overflowAction = arguments[1];

    var arr = new Array(limit);
    var length = 0;
    var pushIndex = 0;
    var popIndex = 0;

    var push = function push(it) {
      arr[pushIndex] = it;
      pushIndex = (pushIndex + 1) % limit;
      length++;
    };

    var take = function take() {
      if (length != 0) {
        var it = arr[popIndex];
        arr[popIndex] = null;
        length--;
        popIndex = (popIndex + 1) % limit;
        return it;
      }
    };

    var flush = function flush() {
      var items = [];
      while (length) {
        items.push(take());
      }
      return items;
    };

    return {
      isEmpty: function isEmpty() {
        return length == 0;
      },
      put: function put(it) {
        if (length < limit) {
          push(it);
        } else {
          var doubledLimit = void 0;
          switch (overflowAction) {
            case ON_OVERFLOW_THROW:
              throw new Error(BUFFER_OVERFLOW);
            case ON_OVERFLOW_SLIDE:
              arr[pushIndex] = it;
              pushIndex = (pushIndex + 1) % limit;
              popIndex = pushIndex;
              break;
            case ON_OVERFLOW_EXPAND:
              doubledLimit = 2 * limit;

              arr = flush();

              length = arr.length;
              pushIndex = arr.length;
              popIndex = 0;

              arr.length = doubledLimit;
              limit = doubledLimit;

              push(it);
              break;
            default:
            // DROP
          }
        }
      },
      take: take,
      flush: flush
    };
  }

  var buffers = {
    none: function none() {
      return zeroBuffer;
    },
    fixed: function fixed(limit) {
      return ringBuffer(limit, ON_OVERFLOW_THROW);
    },
    dropping: function dropping(limit) {
      return ringBuffer(limit, ON_OVERFLOW_DROP);
    },
    sliding: function sliding(limit) {
      return ringBuffer(limit, ON_OVERFLOW_SLIDE);
    },
    expanding: function expanding(initialSize) {
      return ringBuffer(initialSize, ON_OVERFLOW_EXPAND);
    }
  };

  var queue = [];
  /**
    Variable to hold a counting semaphore
    - Incrementing adds a lock and puts the scheduler in a `suspended` state (if it's not
      already suspended)
    - Decrementing releases a lock. Zero locks puts the scheduler in a `released` state. This
      triggers flushing the queued tasks.
  **/
  var semaphore = 0;

  /**
    Executes a task 'atomically'. Tasks scheduled during this execution will be queued
    and flushed after this task has finished (assuming the scheduler endup in a released
    state).
  **/
  function exec(task) {
    try {
      suspend();
      task();
    } finally {
      release();
    }
  }

  /**
    Executes or queues a task depending on the state of the scheduler (`suspended` or `released`)
  **/
  function asap(task) {
    queue.push(task);

    if (!semaphore) {
      suspend();
      flush();
    }
  }

  /**
    Puts the scheduler in a `suspended` state. Scheduled tasks will be queued until the
    scheduler is released.
  **/
  function suspend() {
    semaphore++;
  }

  /**
    Puts the scheduler in a `released` state.
  **/
  function release() {
    semaphore--;
  }

  /**
    Releases the current lock. Executes all queued tasks if the scheduler is in the released state.
  **/
  function flush() {
    release();

    var task = void 0;
    while (!semaphore && (task = queue.shift()) !== undefined) {
      exec(task);
    }
  }

  var CHANNEL_END_TYPE = '@@redux-saga/CHANNEL_END';
  var END = { type: CHANNEL_END_TYPE };
  var isEnd = function isEnd(a) {
    return a && a.type === CHANNEL_END_TYPE;
  };

  function emitter() {
    var subscribers = [];

    function subscribe(sub) {
      subscribers.push(sub);
      return function () {
        return remove(subscribers, sub);
      };
    }

    function emit(item) {
      var arr = subscribers.slice();
      for (var i = 0, len = arr.length; i < len; i++) {
        arr[i](item);
      }
    }

    return {
      subscribe: subscribe,
      emit: emit
    };
  }

  var INVALID_BUFFER = 'invalid buffer passed to channel factory function';
  var UNDEFINED_INPUT_ERROR = 'Saga was provided with an undefined action';

  {
    UNDEFINED_INPUT_ERROR += '\nHints:\n    - check that your Action Creator returns a non-undefined value\n    - if the Saga was started using runSaga, check that your subscribe source provides the action to its listeners\n  ';
  }

  function channel() {
    var buffer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : buffers.fixed();

    var closed = false;
    var takers = [];

    check(buffer, is.buffer, INVALID_BUFFER);

    function checkForbiddenStates() {
      if (closed && takers.length) {
        throw internalErr('Cannot have a closed channel with pending takers');
      }
      if (takers.length && !buffer.isEmpty()) {
        throw internalErr('Cannot have pending takers with non empty buffer');
      }
    }

    function put(input) {
      checkForbiddenStates();
      check(input, is.notUndef, UNDEFINED_INPUT_ERROR);
      if (closed) {
        return;
      }
      if (!takers.length) {
        return buffer.put(input);
      }
      for (var i = 0; i < takers.length; i++) {
        var cb = takers[i];
        if (!cb[MATCH] || cb[MATCH](input)) {
          takers.splice(i, 1);
          return cb(input);
        }
      }
    }

    function take(cb) {
      checkForbiddenStates();
      check(cb, is.func, "channel.take's callback must be a function");

      if (closed && buffer.isEmpty()) {
        cb(END);
      } else if (!buffer.isEmpty()) {
        cb(buffer.take());
      } else {
        takers.push(cb);
        cb.cancel = function () {
          return remove(takers, cb);
        };
      }
    }

    function flush$$1(cb) {
      checkForbiddenStates(); // TODO: check if some new state should be forbidden now
      check(cb, is.func, "channel.flush' callback must be a function");
      if (closed && buffer.isEmpty()) {
        cb(END);
        return;
      }
      cb(buffer.flush());
    }

    function close() {
      checkForbiddenStates();
      if (!closed) {
        closed = true;
        if (takers.length) {
          var arr = takers;
          takers = [];
          for (var i = 0, len = arr.length; i < len; i++) {
            arr[i](END);
          }
        }
      }
    }

    return {
      take: take,
      put: put,
      flush: flush$$1,
      close: close,
      get __takers__() {
        return takers;
      },
      get __closed__() {
        return closed;
      }
    };
  }

  function eventChannel(subscribe) {
    var buffer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : buffers.none();
    var matcher = arguments[2];

    /**
      should be if(typeof matcher !== undefined) instead?
      see PR #273 for a background discussion
    **/
    if (arguments.length > 2) {
      check(matcher, is.func, 'Invalid match function passed to eventChannel');
    }

    var chan = channel(buffer);
    var close = function close() {
      if (!chan.__closed__) {
        if (unsubscribe) {
          unsubscribe();
        }
        chan.close();
      }
    };
    var unsubscribe = subscribe(function (input) {
      if (isEnd(input)) {
        close();
        return;
      }
      if (matcher && !matcher(input)) {
        return;
      }
      chan.put(input);
    });
    if (chan.__closed__) {
      unsubscribe();
    }

    if (!is.func(unsubscribe)) {
      throw new Error('in eventChannel: subscribe should return a function to unsubscribe');
    }

    return {
      take: chan.take,
      flush: chan.flush,
      close: close
    };
  }

  function stdChannel(subscribe) {
    var chan = eventChannel(function (cb) {
      return subscribe(function (input) {
        if (input[SAGA_ACTION]) {
          cb(input);
          return;
        }
        asap(function () {
          return cb(input);
        });
      });
    });

    return _extends({}, chan, {
      take: function take(cb, matcher) {
        if (arguments.length > 1) {
          check(matcher, is.func, "channel.take's matcher argument must be a function");
          cb[MATCH] = matcher;
        }
        chan.take(cb);
      }
    });
  }

  var IO = /*#__PURE__*/sym('IO');
  var TAKE = 'TAKE';
  var PUT = 'PUT';
  var ALL = 'ALL';
  var RACE = 'RACE';
  var CALL = 'CALL';
  var CPS = 'CPS';
  var FORK = 'FORK';
  var JOIN = 'JOIN';
  var CANCEL$1 = 'CANCEL';
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

  var detach = function detach(eff) {
    check(asEffect.fork(eff), is.object, 'detach(eff): argument must be a fork effect');
    eff[FORK].detached = true;
    return eff;
  };

  function take() {
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

  var takem = /*#__PURE__*/deprecate(take.maybe, /*#__PURE__*/updateIncentive('takem', 'take.maybe'));

  function put(channel, action) {
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

  function all(effects) {
    return effect(ALL, effects);
  }

  function race(effects) {
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

  function call(fn) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return effect(CALL, getFnCallDesc('call', fn, args));
  }

  function apply(context, fn) {
    var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    return effect(CALL, getFnCallDesc('apply', { context: context, fn: fn }, args));
  }

  function cps(fn) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    return effect(CPS, getFnCallDesc('cps', fn, args));
  }

  function fork(fn) {
    for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }

    return effect(FORK, getFnCallDesc('fork', fn, args));
  }

  function spawn(fn) {
    for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }

    return detach(fork.apply(undefined, [fn].concat(args)));
  }

  function join() {
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

  function cancel() {
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
    return effect(CANCEL$1, task || SELF_CANCELLATION);
  }

  function select(selector) {
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
  function actionChannel(pattern, buffer) {
    check(pattern, is.notUndef, 'actionChannel(pattern,...): argument pattern is undefined');
    if (arguments.length > 1) {
      check(buffer, is.notUndef, 'actionChannel(pattern, buffer): argument buffer is undefined');
      check(buffer, is.buffer, 'actionChannel(pattern, buffer): argument ' + buffer + ' is not a valid buffer');
    }
    return effect(ACTION_CHANNEL, { pattern: pattern, buffer: buffer });
  }

  function cancelled() {
    return effect(CANCELLED, {});
  }

  function flush$1(channel) {
    check(channel, is.channel, 'flush(channel): argument ' + channel + ' is not valid channel');
    return effect(FLUSH, channel);
  }

  function getContext(prop) {
    check(prop, is.string, 'getContext(prop): argument ' + prop + ' is not a string');
    return effect(GET_CONTEXT, prop);
  }

  function setContext(props) {
    check(props, is.object, createSetContextWarning(null, props));
    return effect(SET_CONTEXT, props);
  }

  var createAsEffectType = function createAsEffectType(type) {
    return function (effect) {
      return effect && effect[IO] && effect[type];
    };
  };

  var asEffect = {
    take: /*#__PURE__*/createAsEffectType(TAKE),
    put: /*#__PURE__*/createAsEffectType(PUT),
    all: /*#__PURE__*/createAsEffectType(ALL),
    race: /*#__PURE__*/createAsEffectType(RACE),
    call: /*#__PURE__*/createAsEffectType(CALL),
    cps: /*#__PURE__*/createAsEffectType(CPS),
    fork: /*#__PURE__*/createAsEffectType(FORK),
    join: /*#__PURE__*/createAsEffectType(JOIN),
    cancel: /*#__PURE__*/createAsEffectType(CANCEL$1),
    select: /*#__PURE__*/createAsEffectType(SELECT),
    actionChannel: /*#__PURE__*/createAsEffectType(ACTION_CHANNEL),
    cancelled: /*#__PURE__*/createAsEffectType(CANCELLED),
    flush: /*#__PURE__*/createAsEffectType(FLUSH),
    getContext: /*#__PURE__*/createAsEffectType(GET_CONTEXT),
    setContext: /*#__PURE__*/createAsEffectType(SET_CONTEXT)
  };

  var NOT_ITERATOR_ERROR = 'proc first argument (Saga function result) must be an iterator';

  var CHANNEL_END = {
    toString: function toString() {
      return '@@redux-saga/CHANNEL_END';
    }
  };
  var TASK_CANCEL = {
    toString: function toString() {
      return '@@redux-saga/TASK_CANCEL';
    }
  };

  var matchers = {
    wildcard: function wildcard() {
      return kTrue;
    },
    default: function _default(pattern) {
      return (typeof pattern === 'undefined' ? 'undefined' : _typeof(pattern)) === 'symbol' ? function (input) {
        return input.type === pattern;
      } : function (input) {
        return input.type === String(pattern);
      };
    },
    array: function array$$1(patterns) {
      return function (input) {
        return patterns.some(function (p) {
          return matcher(p)(input);
        });
      };
    },
    predicate: function predicate(_predicate) {
      return function (input) {
        return _predicate(input);
      };
    }
  };

  function matcher(pattern) {
    // prettier-ignore
    return (pattern === '*' ? matchers.wildcard : is.array(pattern) ? matchers.array : is.stringableFunc(pattern) ? matchers.default : is.func(pattern) ? matchers.predicate : matchers.default)(pattern);
  }

  /**
    Used to track a parent task and its forks
    In the new fork model, forked tasks are attached by default to their parent
    We model this using the concept of Parent task && main Task
    main task is the main flow of the current Generator, the parent tasks is the
    aggregation of the main tasks + all its forked tasks.
    Thus the whole model represents an execution tree with multiple branches (vs the
    linear execution tree in sequential (non parallel) programming)

    A parent tasks has the following semantics
    - It completes if all its forks either complete or all cancelled
    - If it's cancelled, all forks are cancelled as well
    - It aborts if any uncaught error bubbles up from forks
    - If it completes, the return value is the one returned by the main task
  **/
  function forkQueue(name, mainTask, cb) {
    var tasks = [],
        result = void 0,
        completed = false;
    addTask(mainTask);

    function abort(err) {
      cancelAll();
      cb(err, true);
    }

    function addTask(task) {
      tasks.push(task);
      task.cont = function (res, isErr) {
        if (completed) {
          return;
        }

        remove(tasks, task);
        task.cont = noop;
        if (isErr) {
          abort(res);
        } else {
          if (task === mainTask) {
            result = res;
          }
          if (!tasks.length) {
            completed = true;
            cb(result);
          }
        }
      };
      // task.cont.cancel = task.cancel
    }

    function cancelAll() {
      if (completed) {
        return;
      }
      completed = true;
      tasks.forEach(function (t) {
        t.cont = noop;
        t.cancel();
      });
      tasks = [];
    }

    return {
      addTask: addTask,
      cancelAll: cancelAll,
      abort: abort,
      getTasks: function getTasks() {
        return tasks;
      },
      taskNames: function taskNames() {
        return tasks.map(function (t) {
          return t.name;
        });
      }
    };
  }

  function createTaskIterator(_ref) {
    var context = _ref.context,
        fn = _ref.fn,
        args = _ref.args;

    if (is.iterator(fn)) {
      return fn;
    }

    // catch synchronous failures; see #152 and #441
    var result = void 0,
        error = void 0;
    try {
      result = fn.apply(context, args);
    } catch (err) {
      error = err;
    }

    // i.e. a generator function returns an iterator
    if (is.iterator(result)) {
      return result;
    }

    // do not bubble up synchronous failures for detached forks
    // instead create a failed task. See #152 and #441
    return error ? makeIterator(function () {
      throw error;
    }) : makeIterator(function () {
      var pc = void 0;
      var eff = { done: false, value: result };
      var ret = function ret(value) {
        return { done: true, value: value };
      };
      return function (arg) {
        if (!pc) {
          pc = true;
          return eff;
        } else {
          return ret(arg);
        }
      };
    }());
  }

  var wrapHelper = function wrapHelper(helper) {
    return { fn: helper };
  };

  function proc(iterator) {
    var subscribe = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
      return noop;
    };
    var dispatch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noop;
    var getState = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop;
    var parentContext = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
    var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
    var parentEffectId = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
    var name = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 'anonymous';
    var cont = arguments[8];

    check(iterator, is.iterator, NOT_ITERATOR_ERROR);

    var effectsString = '[...effects]';
    var runParallelEffect = deprecate(runAllEffect, updateIncentive(effectsString, 'all(' + effectsString + ')'));

    var sagaMonitor = options.sagaMonitor,
        logger = options.logger,
        onError = options.onError;

    var log$$1 = logger || log;
    var logError = function logError(err) {
      var message = err.sagaStack;

      if (!message && err.stack) {
        message = err.stack.split('\n')[0].indexOf(err.message) !== -1 ? err.stack : 'Error: ' + err.message + '\n' + err.stack;
      }

      log$$1('error', 'uncaught at ' + name, message || err.message || err);
    };
    var stdChannel$$1 = stdChannel(subscribe);
    var taskContext = Object.create(parentContext);
    /**
      Tracks the current effect cancellation
      Each time the generator progresses. calling runEffect will set a new value
      on it. It allows propagating cancellation to child effects
    **/
    next.cancel = noop;

    /**
      Creates a new task descriptor for this generator, We'll also create a main task
      to track the main flow (besides other forked tasks)
    **/
    var task = newTask(parentEffectId, name, iterator, cont);
    var mainTask = { name: name, cancel: cancelMain, isRunning: true };
    var taskQueue = forkQueue(name, mainTask, end);

    /**
      cancellation of the main task. We'll simply resume the Generator with a Cancel
    **/
    function cancelMain() {
      if (mainTask.isRunning && !mainTask.isCancelled) {
        mainTask.isCancelled = true;
        next(TASK_CANCEL);
      }
    }

    /**
      This may be called by a parent generator to trigger/propagate cancellation
      cancel all pending tasks (including the main task), then end the current task.
       Cancellation propagates down to the whole execution tree holded by this Parent task
      It's also propagated to all joiners of this task and their execution tree/joiners
       Cancellation is noop for terminated/Cancelled tasks tasks
    **/
    function cancel$$1() {
      /**
        We need to check both Running and Cancelled status
        Tasks can be Cancelled but still Running
      **/
      if (iterator._isRunning && !iterator._isCancelled) {
        iterator._isCancelled = true;
        taskQueue.cancelAll();
        /**
          Ending with a Never result will propagate the Cancellation to all joiners
        **/
        end(TASK_CANCEL);
      }
    }
    /**
      attaches cancellation logic to this task's continuation
      this will permit cancellation to propagate down the call chain
    **/
    cont && (cont.cancel = cancel$$1);

    // tracks the running status
    iterator._isRunning = true;

    // kicks up the generator
    next();

    // then return the task descriptor to the caller
    return task;

    /**
      This is the generator driver
      It's a recursive async/continuation function which calls itself
      until the generator terminates or throws
    **/
    function next(arg, isErr) {
      // Preventive measure. If we end up here, then there is really something wrong
      if (!mainTask.isRunning) {
        throw new Error('Trying to resume an already finished generator');
      }

      try {
        var result = void 0;
        if (isErr) {
          result = iterator.throw(arg);
        } else if (arg === TASK_CANCEL) {
          /**
            getting TASK_CANCEL automatically cancels the main task
            We can get this value here
             - By cancelling the parent task manually
            - By joining a Cancelled task
          **/
          mainTask.isCancelled = true;
          /**
            Cancels the current effect; this will propagate the cancellation down to any called tasks
          **/
          next.cancel();
          /**
            If this Generator has a `return` method then invokes it
            This will jump to the finally block
          **/
          result = is.func(iterator.return) ? iterator.return(TASK_CANCEL) : { done: true, value: TASK_CANCEL };
        } else if (arg === CHANNEL_END) {
          // We get CHANNEL_END by taking from a channel that ended using `take` (and not `takem` used to trap End of channels)
          result = is.func(iterator.return) ? iterator.return() : { done: true };
        } else {
          result = iterator.next(arg);
        }

        if (!result.done) {
          runEffect(result.value, parentEffectId, '', next);
        } else {
          /**
            This Generator has ended, terminate the main task and notify the fork queue
          **/
          mainTask.isMainRunning = false;
          mainTask.cont && mainTask.cont(result.value);
        }
      } catch (error) {
        if (mainTask.isCancelled) {
          logError(error);
        }
        mainTask.isMainRunning = false;
        mainTask.cont(error, true);
      }
    }

    function end(result, isErr) {
      iterator._isRunning = false;
      stdChannel$$1.close();
      if (!isErr) {
        iterator._result = result;
        iterator._deferredEnd && iterator._deferredEnd.resolve(result);
      } else {
        if (result instanceof Error) {
          Object.defineProperty(result, 'sagaStack', {
            value: 'at ' + name + ' \n ' + (result.sagaStack || result.stack),
            configurable: true
          });
        }
        if (!task.cont) {
          if (result instanceof Error && onError) {
            onError(result);
          } else {
            logError(result);
          }
        }
        iterator._error = result;
        iterator._isAborted = true;
        iterator._deferredEnd && iterator._deferredEnd.reject(result);
      }
      task.cont && task.cont(result, isErr);
      task.joiners.forEach(function (j) {
        return j.cb(result, isErr);
      });
      task.joiners = null;
    }

    function runEffect(effect, parentEffectId) {
      var label = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var cb = arguments[3];

      var effectId = uid();
      sagaMonitor && sagaMonitor.effectTriggered({ effectId: effectId, parentEffectId: parentEffectId, label: label, effect: effect });

      /**
        completion callback and cancel callback are mutually exclusive
        We can't cancel an already completed effect
        And We can't complete an already cancelled effectId
      **/
      var effectSettled = void 0;

      // Completion callback passed to the appropriate effect runner
      function currCb(res, isErr) {
        if (effectSettled) {
          return;
        }

        effectSettled = true;
        cb.cancel = noop; // defensive measure
        if (sagaMonitor) {
          isErr ? sagaMonitor.effectRejected(effectId, res) : sagaMonitor.effectResolved(effectId, res);
        }
        cb(res, isErr);
      }
      // tracks down the current cancel
      currCb.cancel = noop;

      // setup cancellation logic on the parent cb
      cb.cancel = function () {
        // prevents cancelling an already completed effect
        if (effectSettled) {
          return;
        }

        effectSettled = true;
        /**
          propagates cancel downward
          catch uncaught cancellations errors; since we can no longer call the completion
          callback, log errors raised during cancellations into the console
        **/
        try {
          currCb.cancel();
        } catch (err) {
          logError(err);
        }
        currCb.cancel = noop; // defensive measure

        sagaMonitor && sagaMonitor.effectCancelled(effectId);
      };

      /**
        each effect runner must attach its own logic of cancellation to the provided callback
        it allows this generator to propagate cancellation downward.
         ATTENTION! effect runners must setup the cancel logic by setting cb.cancel = [cancelMethod]
        And the setup must occur before calling the callback
         This is a sort of inversion of control: called async functions are responsible
        for completing the flow by calling the provided continuation; while caller functions
        are responsible for aborting the current flow by calling the attached cancel function
         Library users can attach their own cancellation logic to promises by defining a
        promise[CANCEL] method in their returned promises
        ATTENTION! calling cancel must have no effect on an already completed or cancelled effect
      **/
      var data = void 0;
      // prettier-ignore
      return (
        // Non declarative effect
        is.promise(effect) ? resolvePromise(effect, currCb) : is.helper(effect) ? runForkEffect(wrapHelper(effect), effectId, currCb) : is.iterator(effect) ? resolveIterator(effect, effectId, name, currCb)

        // declarative effects
        : is.array(effect) ? runParallelEffect(effect, effectId, currCb) : (data = asEffect.take(effect)) ? runTakeEffect(data, currCb) : (data = asEffect.put(effect)) ? runPutEffect(data, currCb) : (data = asEffect.all(effect)) ? runAllEffect(data, effectId, currCb) : (data = asEffect.race(effect)) ? runRaceEffect(data, effectId, currCb) : (data = asEffect.call(effect)) ? runCallEffect(data, effectId, currCb) : (data = asEffect.cps(effect)) ? runCPSEffect(data, currCb) : (data = asEffect.fork(effect)) ? runForkEffect(data, effectId, currCb) : (data = asEffect.join(effect)) ? runJoinEffect(data, currCb) : (data = asEffect.cancel(effect)) ? runCancelEffect(data, currCb) : (data = asEffect.select(effect)) ? runSelectEffect(data, currCb) : (data = asEffect.actionChannel(effect)) ? runChannelEffect(data, currCb) : (data = asEffect.flush(effect)) ? runFlushEffect(data, currCb) : (data = asEffect.cancelled(effect)) ? runCancelledEffect(data, currCb) : (data = asEffect.getContext(effect)) ? runGetContextEffect(data, currCb) : (data = asEffect.setContext(effect)) ? runSetContextEffect(data, currCb) : /* anything else returned as is */currCb(effect)
      );
    }

    function resolvePromise(promise, cb) {
      var cancelPromise = promise[CANCEL];
      if (is.func(cancelPromise)) {
        cb.cancel = cancelPromise;
      } else if (is.func(promise.abort)) {
        cb.cancel = function () {
          return promise.abort();
        };
        // TODO: add support for the fetch API, whenever they get around to
        // adding cancel support
      }
      promise.then(cb, function (error) {
        return cb(error, true);
      });
    }

    function resolveIterator(iterator, effectId, name, cb) {
      proc(iterator, subscribe, dispatch, getState, taskContext, options, effectId, name, cb);
    }

    function runTakeEffect(_ref2, cb) {
      var channel$$1 = _ref2.channel,
          pattern = _ref2.pattern,
          maybe = _ref2.maybe;

      channel$$1 = channel$$1 || stdChannel$$1;
      var takeCb = function takeCb(inp) {
        return inp instanceof Error ? cb(inp, true) : isEnd(inp) && !maybe ? cb(CHANNEL_END) : cb(inp);
      };
      try {
        channel$$1.take(takeCb, matcher(pattern));
      } catch (err) {
        return cb(err, true);
      }
      cb.cancel = takeCb.cancel;
    }

    function runPutEffect(_ref3, cb) {
      var channel$$1 = _ref3.channel,
          action = _ref3.action,
          resolve = _ref3.resolve;

      /**
        Schedule the put in case another saga is holding a lock.
        The put will be executed atomically. ie nested puts will execute after
        this put has terminated.
      **/
      asap(function () {
        var result = void 0;
        try {
          result = (channel$$1 ? channel$$1.put : dispatch)(action);
        } catch (error) {
          // If we have a channel or `put.resolve` was used then bubble up the error.
          if (channel$$1 || resolve) return cb(error, true);
          logError(error);
        }

        if (resolve && is.promise(result)) {
          resolvePromise(result, cb);
        } else {
          return cb(result);
        }
      });
      // Put effects are non cancellables
    }

    function runCallEffect(_ref4, effectId, cb) {
      var context = _ref4.context,
          fn = _ref4.fn,
          args = _ref4.args;

      var result = void 0;
      // catch synchronous failures; see #152
      try {
        result = fn.apply(context, args);
      } catch (error) {
        return cb(error, true);
      }
      return is.promise(result) ? resolvePromise(result, cb) : is.iterator(result) ? resolveIterator(result, effectId, fn.name, cb) : cb(result);
    }

    function runCPSEffect(_ref5, cb) {
      var context = _ref5.context,
          fn = _ref5.fn,
          args = _ref5.args;

      // CPS (ie node style functions) can define their own cancellation logic
      // by setting cancel field on the cb

      // catch synchronous failures; see #152
      try {
        var cpsCb = function cpsCb(err, res) {
          return is.undef(err) ? cb(res) : cb(err, true);
        };
        fn.apply(context, args.concat(cpsCb));
        if (cpsCb.cancel) {
          cb.cancel = function () {
            return cpsCb.cancel();
          };
        }
      } catch (error) {
        return cb(error, true);
      }
    }

    function runForkEffect(_ref6, effectId, cb) {
      var context = _ref6.context,
          fn = _ref6.fn,
          args = _ref6.args,
          detached = _ref6.detached;

      var taskIterator = createTaskIterator({ context: context, fn: fn, args: args });

      try {
        suspend();
        var _task = proc(taskIterator, subscribe, dispatch, getState, taskContext, options, effectId, fn.name, detached ? null : noop);

        if (detached) {
          cb(_task);
        } else {
          if (taskIterator._isRunning) {
            taskQueue.addTask(_task);
            cb(_task);
          } else if (taskIterator._error) {
            taskQueue.abort(taskIterator._error);
          } else {
            cb(_task);
          }
        }
      } finally {
        flush();
      }
      // Fork effects are non cancellables
    }

    function runJoinEffect(t, cb) {
      if (t.isRunning()) {
        var joiner = { task: task, cb: cb };
        cb.cancel = function () {
          return remove(t.joiners, joiner);
        };
        t.joiners.push(joiner);
      } else {
        t.isAborted() ? cb(t.error(), true) : cb(t.result());
      }
    }

    function runCancelEffect(taskToCancel, cb) {
      if (taskToCancel === SELF_CANCELLATION) {
        taskToCancel = task;
      }
      if (taskToCancel.isRunning()) {
        taskToCancel.cancel();
      }
      cb();
      // cancel effects are non cancellables
    }

    function runAllEffect(effects, effectId, cb) {
      var keys = Object.keys(effects);

      if (!keys.length) {
        return cb(is.array(effects) ? [] : {});
      }

      var completedCount = 0;
      var completed = void 0;
      var results = {};
      var childCbs = {};

      function checkEffectEnd() {
        if (completedCount === keys.length) {
          completed = true;
          cb(is.array(effects) ? array.from(_extends({}, results, { length: keys.length })) : results);
        }
      }

      keys.forEach(function (key) {
        var chCbAtKey = function chCbAtKey(res, isErr) {
          if (completed) {
            return;
          }
          if (isErr || isEnd(res) || res === CHANNEL_END || res === TASK_CANCEL) {
            cb.cancel();
            cb(res, isErr);
          } else {
            results[key] = res;
            completedCount++;
            checkEffectEnd();
          }
        };
        chCbAtKey.cancel = noop;
        childCbs[key] = chCbAtKey;
      });

      cb.cancel = function () {
        if (!completed) {
          completed = true;
          keys.forEach(function (key) {
            return childCbs[key].cancel();
          });
        }
      };

      keys.forEach(function (key) {
        return runEffect(effects[key], effectId, key, childCbs[key]);
      });
    }

    function runRaceEffect(effects, effectId, cb) {
      var completed = void 0;
      var keys = Object.keys(effects);
      var childCbs = {};

      keys.forEach(function (key) {
        var chCbAtKey = function chCbAtKey(res, isErr) {
          if (completed) {
            return;
          }

          if (isErr) {
            // Race Auto cancellation
            cb.cancel();
            cb(res, true);
          } else if (!isEnd(res) && res !== CHANNEL_END && res !== TASK_CANCEL) {
            var _response;

            cb.cancel();
            completed = true;
            var response = (_response = {}, _response[key] = res, _response);
            cb(is.array(effects) ? [].slice.call(_extends({}, response, { length: keys.length })) : response);
          }
        };
        chCbAtKey.cancel = noop;
        childCbs[key] = chCbAtKey;
      });

      cb.cancel = function () {
        // prevents unnecessary cancellation
        if (!completed) {
          completed = true;
          keys.forEach(function (key) {
            return childCbs[key].cancel();
          });
        }
      };
      keys.forEach(function (key) {
        if (completed) {
          return;
        }
        runEffect(effects[key], effectId, key, childCbs[key]);
      });
    }

    function runSelectEffect(_ref7, cb) {
      var selector = _ref7.selector,
          args = _ref7.args;

      try {
        var state = selector.apply(undefined, [getState()].concat(args));
        cb(state);
      } catch (error) {
        cb(error, true);
      }
    }

    function runChannelEffect(_ref8, cb) {
      var pattern = _ref8.pattern,
          buffer = _ref8.buffer;

      var match = matcher(pattern);
      match.pattern = pattern;
      cb(eventChannel(subscribe, buffer || buffers.fixed(), match));
    }

    function runCancelledEffect(data, cb) {
      cb(!!mainTask.isCancelled);
    }

    function runFlushEffect(channel$$1, cb) {
      channel$$1.flush(cb);
    }

    function runGetContextEffect(prop, cb) {
      cb(taskContext[prop]);
    }

    function runSetContextEffect(props, cb) {
      object.assign(taskContext, props);
      cb();
    }

    function newTask(id, name, iterator, cont) {
      var _done, _ref9, _mutatorMap;

      iterator._deferredEnd = null;
      return _ref9 = {}, _ref9[TASK] = true, _ref9.id = id, _ref9.name = name, _done = 'done', _mutatorMap = {}, _mutatorMap[_done] = _mutatorMap[_done] || {}, _mutatorMap[_done].get = function () {
        if (iterator._deferredEnd) {
          return iterator._deferredEnd.promise;
        } else {
          var def = deferred();
          iterator._deferredEnd = def;
          if (!iterator._isRunning) {
            iterator._error ? def.reject(iterator._error) : def.resolve(iterator._result);
          }
          return def.promise;
        }
      }, _ref9.cont = cont, _ref9.joiners = [], _ref9.cancel = cancel$$1, _ref9.isRunning = function isRunning() {
        return iterator._isRunning;
      }, _ref9.isCancelled = function isCancelled() {
        return iterator._isCancelled;
      }, _ref9.isAborted = function isAborted() {
        return iterator._isAborted;
      }, _ref9.result = function result() {
        return iterator._result;
      }, _ref9.error = function error() {
        return iterator._error;
      }, _ref9.setContext = function setContext$$1(props) {
        check(props, is.object, createSetContextWarning('task', props));
        object.assign(taskContext, props);
      }, defineEnumerableProperties(_ref9, _mutatorMap), _ref9;
    }
  }

  var RUN_SAGA_SIGNATURE = 'runSaga(storeInterface, saga, ...args)';
  var NON_GENERATOR_ERR = RUN_SAGA_SIGNATURE + ': saga argument must be a Generator function!';

  function runSaga(storeInterface, saga) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    var iterator = void 0;

    if (is.iterator(storeInterface)) {
      {
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


    var effectId = uid();

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

  function sagaMiddlewareFactory() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref$context = _ref.context,
        context = _ref$context === undefined ? {} : _ref$context,
        options = objectWithoutProperties(_ref, ['context']);
    var sagaMonitor = options.sagaMonitor,
        logger = options.logger,
        onError = options.onError;


    if (is.func(options)) {
      {
        throw new Error('You passed a function to the Saga middleware. You are likely trying to start a        Saga by directly passing it to the middleware. This is no longer possible starting from 0.10.0.        To run a Saga, you must do it dynamically AFTER mounting the middleware into the store.\n        Example:\n          import createSagaMiddleware from \'redux-saga\'\n          ... other imports\n\n          const sagaMiddleware = createSagaMiddleware()\n          const store = createStore(reducer, applyMiddleware(sagaMiddleware))\n          sagaMiddleware.run(saga, ...args)\n      ');
      }
    }

    if (logger && !is.func(logger)) {
      throw new Error('`options.logger` passed to the Saga middleware is not a function!');
    }

    if (options.onerror) {
      throw new Error('`options.onerror` was removed. Use `options.onError` instead.');
    }

    if (onError && !is.func(onError)) {
      throw new Error('`options.onError` passed to the Saga middleware is not a function!');
    }

    if (options.emitter && !is.func(options.emitter)) {
      throw new Error('`options.emitter` passed to the Saga middleware is not a function!');
    }

    function sagaMiddleware(_ref2) {
      var getState = _ref2.getState,
          dispatch = _ref2.dispatch;

      var sagaEmitter = emitter();
      sagaEmitter.emit = (options.emitter || ident)(sagaEmitter.emit);

      sagaMiddleware.run = runSaga.bind(null, {
        context: context,
        subscribe: sagaEmitter.subscribe,
        dispatch: dispatch,
        getState: getState,
        sagaMonitor: sagaMonitor,
        logger: logger,
        onError: onError
      });

      return function (next) {
        return function (action) {
          if (sagaMonitor && sagaMonitor.actionDispatched) {
            sagaMonitor.actionDispatched(action);
          }
          var result = next(action); // hit reducers
          sagaEmitter.emit(action);
          return result;
        };
      };
    }

    sagaMiddleware.run = function () {
      throw new Error('Before running a Saga, you must mount the Saga middleware on the Store using applyMiddleware');
    };

    sagaMiddleware.setContext = function (props) {
      check(props, is.object, createSetContextWarning('sagaMiddleware', props));
      object.assign(context, props);
    };

    return sagaMiddleware;
  }

  var done = { done: true, value: undefined };
  var qEnd = {};

  function safeName(patternOrChannel) {
    if (is.channel(patternOrChannel)) {
      return 'channel';
    } else if (Array.isArray(patternOrChannel)) {
      return String(patternOrChannel.map(function (entry) {
        return String(entry);
      }));
    } else {
      return String(patternOrChannel);
    }
  }

  function fsmIterator(fsm, q0) {
    var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'iterator';

    var updateState = void 0,
        qNext = q0;

    function next(arg, error) {
      if (qNext === qEnd) {
        return done;
      }

      if (error) {
        qNext = qEnd;
        throw error;
      } else {
        updateState && updateState(arg);

        var _fsm$qNext = fsm[qNext](),
            q = _fsm$qNext[0],
            output = _fsm$qNext[1],
            _updateState = _fsm$qNext[2];

        qNext = q;
        updateState = _updateState;
        return qNext === qEnd ? done : output;
      }
    }

    return makeIterator(next, function (error) {
      return next(null, error);
    }, name, true);
  }

  function takeEvery(patternOrChannel, worker) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    var yTake = { done: false, value: take(patternOrChannel) };
    var yFork = function yFork(ac) {
      return { done: false, value: fork.apply(undefined, [worker].concat(args, [ac])) };
    };

    var action = void 0,
        setAction = function setAction(ac) {
      return action = ac;
    };

    return fsmIterator({
      q1: function q1() {
        return ['q2', yTake, setAction];
      },
      q2: function q2() {
        return action === END ? [qEnd] : ['q1', yFork(action)];
      }
    }, 'q1', 'takeEvery(' + safeName(patternOrChannel) + ', ' + worker.name + ')');
  }

  function takeLatest(patternOrChannel, worker) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    var yTake = { done: false, value: take(patternOrChannel) };
    var yFork = function yFork(ac) {
      return { done: false, value: fork.apply(undefined, [worker].concat(args, [ac])) };
    };
    var yCancel = function yCancel(task) {
      return { done: false, value: cancel(task) };
    };

    var task = void 0,
        action = void 0;
    var setTask = function setTask(t) {
      return task = t;
    };
    var setAction = function setAction(ac) {
      return action = ac;
    };

    return fsmIterator({
      q1: function q1() {
        return ['q2', yTake, setAction];
      },
      q2: function q2() {
        return action === END ? [qEnd] : task ? ['q3', yCancel(task)] : ['q1', yFork(action), setTask];
      },
      q3: function q3() {
        return ['q1', yFork(action), setTask];
      }
    }, 'q1', 'takeLatest(' + safeName(patternOrChannel) + ', ' + worker.name + ')');
  }

  function throttle(delayLength, pattern, worker) {
    for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      args[_key - 3] = arguments[_key];
    }

    var action = void 0,
        channel$$1 = void 0;

    var yActionChannel = { done: false, value: actionChannel(pattern, buffers.sliding(1)) };
    var yTake = function yTake() {
      return { done: false, value: take(channel$$1) };
    };
    var yFork = function yFork(ac) {
      return { done: false, value: fork.apply(undefined, [worker].concat(args, [ac])) };
    };
    var yDelay = { done: false, value: call(delay, delayLength) };

    var setAction = function setAction(ac) {
      return action = ac;
    };
    var setChannel = function setChannel(ch) {
      return channel$$1 = ch;
    };

    return fsmIterator({
      q1: function q1() {
        return ['q2', yActionChannel, setChannel];
      },
      q2: function q2() {
        return ['q3', yTake(), setAction];
      },
      q3: function q3() {
        return action === END ? [qEnd] : ['q4', yFork(action)];
      },
      q4: function q4() {
        return ['q2', yDelay];
      }
    }, 'q1', 'throttle(' + safeName(pattern) + ', ' + worker.name + ')');
  }

  var deprecationWarning = function deprecationWarning(helperName) {
    return 'import { ' + helperName + ' } from \'redux-saga\' has been deprecated in favor of import { ' + helperName + ' } from \'redux-saga/effects\'.\nThe latter will not work with yield*, as helper effects are wrapped automatically for you in fork effect.\nTherefore yield ' + helperName + ' will return task descriptor to your saga and execute next lines of code.';
  };

  var takeEvery$1 = /*#__PURE__*/deprecate(takeEvery, /*#__PURE__*/deprecationWarning('takeEvery'));
  var takeLatest$1 = /*#__PURE__*/deprecate(takeLatest, /*#__PURE__*/deprecationWarning('takeLatest'));
  var throttle$1 = /*#__PURE__*/deprecate(throttle, /*#__PURE__*/deprecationWarning('throttle'));

  function takeEvery$2(patternOrChannel, worker) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    return fork.apply(undefined, [takeEvery, patternOrChannel, worker].concat(args));
  }

  function takeLatest$2(patternOrChannel, worker) {
    for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      args[_key2 - 2] = arguments[_key2];
    }

    return fork.apply(undefined, [takeLatest, patternOrChannel, worker].concat(args));
  }

  function throttle$2(ms, pattern, worker) {
    for (var _len3 = arguments.length, args = Array(_len3 > 3 ? _len3 - 3 : 0), _key3 = 3; _key3 < _len3; _key3++) {
      args[_key3 - 3] = arguments[_key3];
    }

    return fork.apply(undefined, [throttle, ms, pattern, worker].concat(args));
  }



  var effects = /*#__PURE__*/Object.freeze({
    take: take,
    takem: takem,
    put: put,
    all: all,
    race: race,
    call: call,
    apply: apply,
    cps: cps,
    fork: fork,
    spawn: spawn,
    join: join,
    cancel: cancel,
    select: select,
    actionChannel: actionChannel,
    cancelled: cancelled,
    flush: flush$1,
    getContext: getContext,
    setContext: setContext,
    takeEvery: takeEvery$2,
    takeLatest: takeLatest$2,
    throttle: throttle$2
  });



  var utils = /*#__PURE__*/Object.freeze({
    TASK: TASK,
    SAGA_ACTION: SAGA_ACTION,
    noop: noop,
    is: is,
    deferred: deferred,
    arrayOfDeffered: arrayOfDeffered,
    createMockTask: createMockTask,
    cloneableGenerator: cloneableGenerator,
    asEffect: asEffect,
    CHANNEL_END: CHANNEL_END
  });

  exports.default = sagaMiddlewareFactory;
  exports.effects = effects;
  exports.utils = utils;
  exports.runSaga = runSaga;
  exports.END = END;
  exports.eventChannel = eventChannel;
  exports.channel = channel;
  exports.buffers = buffers;
  exports.takeEvery = takeEvery$1;
  exports.takeLatest = takeLatest$1;
  exports.throttle = throttle$1;
  exports.delay = delay;
  exports.CANCEL = CANCEL;
  exports.detach = detach;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
