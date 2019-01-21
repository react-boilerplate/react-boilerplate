'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__RewireAPI__ = exports.__ResetDependency__ = exports.__set__ = exports.__Rewire__ = exports.__GetDependency__ = exports.__get__ = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var createConnectedRouter = function createConnectedRouter(structure) {
  var getIn = structure.getIn,
      toJS = structure.toJS;
  /*
   * ConnectedRouter listens to a history object passed from props.
   * When history is changed, it dispatches action to redux store.
   * Then, store will pass props to component to render.
   * This creates uni-directional flow from history->store->router->components.
   */

  var ConnectedRouter = function (_get__2) {
    _inherits(ConnectedRouter, _get__2);

    function ConnectedRouter(props, context) {
      _classCallCheck(this, ConnectedRouter);

      var _this = _possibleConstructorReturn(this, (ConnectedRouter.__proto__ || Object.getPrototypeOf(ConnectedRouter)).call(this, props));

      _this.inTimeTravelling = false;

      // Subscribe to store changes
      _this.unsubscribe = context.store.subscribe(function () {
        // Extract store's location
        var _toJS = toJS(getIn(context.store.getState(), ['router', 'location'])),
            pathnameInStore = _toJS.pathname,
            searchInStore = _toJS.search,
            hashInStore = _toJS.hash;
        // Extract history's location


        var _props$history$locati = props.history.location,
            pathnameInHistory = _props$history$locati.pathname,
            searchInHistory = _props$history$locati.search,
            hashInHistory = _props$history$locati.hash;

        // If we do time travelling, the location in store is changed but location in history is not changed

        if (pathnameInHistory !== pathnameInStore || searchInHistory !== searchInStore || hashInHistory !== hashInStore) {
          _this.inTimeTravelling = true;
          // Update history's location to match store's location
          props.history.push({
            pathname: pathnameInStore,
            search: searchInStore,
            hash: hashInStore
          });
        }
      });

      var handleLocationChange = function handleLocationChange(location, action) {
        // Dispatch onLocationChanged except when we're in time travelling
        if (!_this.inTimeTravelling) {
          props.onLocationChanged(location, action);
        } else {
          _this.inTimeTravelling = false;
        }
      };

      // Listen to history changes
      _this.unlisten = props.history.listen(handleLocationChange);
      // Dispatch a location change action for the initial location
      handleLocationChange(props.history.location, props.history.action);
      return _this;
    }

    _createClass(ConnectedRouter, [{
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.unlisten();
        this.unsubscribe();
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props,
            history = _props.history,
            children = _props.children;


        return _get__('React').createElement(
          _get__('Router'),
          { history: history },
          children
        );
      }
    }]);

    return ConnectedRouter;
  }(_get__('Component'));

  ConnectedRouter.contextTypes = {
    store: _get__('PropTypes').shape({
      getState: _get__('PropTypes').func.isRequired,
      subscribe: _get__('PropTypes').func.isRequired
    }).isRequired
  };

  ConnectedRouter.propTypes = {
    history: _get__('PropTypes').shape({
      action: _get__('PropTypes').string.isRequired,
      listen: _get__('PropTypes').func.isRequired,
      location: _get__('PropTypes').object.isRequired,
      push: _get__('PropTypes').func.isRequired
    }).isRequired,
    location: _get__('PropTypes').oneOfType([_get__('PropTypes').object, _get__('PropTypes').string]).isRequired,
    action: _get__('PropTypes').string.isRequired,
    basename: _get__('PropTypes').string,
    children: _get__('PropTypes').oneOfType([_get__('PropTypes').func, _get__('PropTypes').node]),
    onLocationChanged: _get__('PropTypes').func.isRequired
  };

  var mapStateToProps = function mapStateToProps(state) {
    return {
      action: getIn(state, ['router', 'action']),
      location: getIn(state, ['router', 'location'])
    };
  };

  var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
      onLocationChanged: function onLocationChanged(location, action) {
        return dispatch(_get__('onLocationChanged')(location, action));
      }
    };
  };

  return _get__('connect')(mapStateToProps, mapDispatchToProps)(ConnectedRouter);
};

exports.default = _get__('createConnectedRouter');

function _getGlobalObject() {
  try {
    if (!!global) {
      return global;
    }
  } catch (e) {
    try {
      if (!!window) {
        return window;
      }
    } catch (e) {
      return this;
    }
  }
}

;
var _RewireModuleId__ = null;

function _getRewireModuleId__() {
  if (_RewireModuleId__ === null) {
    var globalVariable = _getGlobalObject();

    if (!globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__) {
      globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0;
    }

    _RewireModuleId__ = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++;
  }

  return _RewireModuleId__;
}

function _getRewireRegistry__() {
  var theGlobalVariable = _getGlobalObject();

  if (!theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__) {
    theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
  }

  return __$$GLOBAL_REWIRE_REGISTRY__;
}

function _getRewiredData__() {
  var moduleId = _getRewireModuleId__();

  var registry = _getRewireRegistry__();

  var rewireData = registry[moduleId];

  if (!rewireData) {
    registry[moduleId] = Object.create(null);
    rewireData = registry[moduleId];
  }

  return rewireData;
}

(function registerResetAll() {
  var theGlobalVariable = _getGlobalObject();

  if (!theGlobalVariable['__rewire_reset_all__']) {
    theGlobalVariable['__rewire_reset_all__'] = function () {
      theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
    };
  }
})();

var INTENTIONAL_UNDEFINED = '__INTENTIONAL_UNDEFINED__';
var _RewireAPI__ = {};

(function () {
  function addPropertyToAPIObject(name, value) {
    Object.defineProperty(_RewireAPI__, name, {
      value: value,
      enumerable: false,
      configurable: true
    });
  }

  addPropertyToAPIObject('__get__', _get__);
  addPropertyToAPIObject('__GetDependency__', _get__);
  addPropertyToAPIObject('__Rewire__', _set__);
  addPropertyToAPIObject('__set__', _set__);
  addPropertyToAPIObject('__reset__', _reset__);
  addPropertyToAPIObject('__ResetDependency__', _reset__);
  addPropertyToAPIObject('__with__', _with__);
})();

function _get__(variableName) {
  var rewireData = _getRewiredData__();

  if (rewireData[variableName] === undefined) {
    return _get_original__(variableName);
  } else {
    var value = rewireData[variableName];

    if (value === INTENTIONAL_UNDEFINED) {
      return undefined;
    } else {
      return value;
    }
  }
}

function _get_original__(variableName) {
  switch (variableName) {
    case 'Component':
      return _react.Component;

    case 'PropTypes':
      return _propTypes2.default;

    case 'onLocationChanged':
      return _actions.onLocationChanged;

    case 'connect':
      return _reactRedux.connect;

    case 'createConnectedRouter':
      return createConnectedRouter;

    case 'React':
      return _react2.default;

    case 'Router':
      return _reactRouter.Router;
  }

  return undefined;
}

function _assign__(variableName, value) {
  var rewireData = _getRewiredData__();

  if (rewireData[variableName] === undefined) {
    return _set_original__(variableName, value);
  } else {
    return rewireData[variableName] = value;
  }
}

function _set_original__(variableName, _value) {
  switch (variableName) {}

  return undefined;
}

function _update_operation__(operation, variableName, prefix) {
  var oldValue = _get__(variableName);

  var newValue = operation === '++' ? oldValue + 1 : oldValue - 1;

  _assign__(variableName, newValue);

  return prefix ? newValue : oldValue;
}

function _set__(variableName, value) {
  var rewireData = _getRewiredData__();

  if ((typeof variableName === 'undefined' ? 'undefined' : _typeof(variableName)) === 'object') {
    Object.keys(variableName).forEach(function (name) {
      rewireData[name] = variableName[name];
    });
  } else {
    if (value === undefined) {
      rewireData[variableName] = INTENTIONAL_UNDEFINED;
    } else {
      rewireData[variableName] = value;
    }

    return function () {
      _reset__(variableName);
    };
  }
}

function _reset__(variableName) {
  var rewireData = _getRewiredData__();

  delete rewireData[variableName];

  if (Object.keys(rewireData).length == 0) {
    delete _getRewireRegistry__()[_getRewireModuleId__];
  }

  ;
}

function _with__(object) {
  var rewireData = _getRewiredData__();

  var rewiredVariableNames = Object.keys(object);
  var previousValues = {};

  function reset() {
    rewiredVariableNames.forEach(function (variableName) {
      rewireData[variableName] = previousValues[variableName];
    });
  }

  return function (callback) {
    rewiredVariableNames.forEach(function (variableName) {
      previousValues[variableName] = rewireData[variableName];
      rewireData[variableName] = object[variableName];
    });
    var result = callback();

    if (!!result && typeof result.then == 'function') {
      result.then(reset).catch(reset);
    } else {
      reset();
    }

    return result;
  };
}

var _typeOfOriginalExport = typeof createConnectedRouter === 'undefined' ? 'undefined' : _typeof(createConnectedRouter);

function addNonEnumerableProperty(name, value) {
  Object.defineProperty(createConnectedRouter, name, {
    value: value,
    enumerable: false,
    configurable: true
  });
}

if ((_typeOfOriginalExport === 'object' || _typeOfOriginalExport === 'function') && Object.isExtensible(createConnectedRouter)) {
  addNonEnumerableProperty('__get__', _get__);
  addNonEnumerableProperty('__GetDependency__', _get__);
  addNonEnumerableProperty('__Rewire__', _set__);
  addNonEnumerableProperty('__set__', _set__);
  addNonEnumerableProperty('__reset__', _reset__);
  addNonEnumerableProperty('__ResetDependency__', _reset__);
  addNonEnumerableProperty('__with__', _with__);
  addNonEnumerableProperty('__RewireAPI__', _RewireAPI__);
}

exports.__get__ = _get__;
exports.__GetDependency__ = _get__;
exports.__Rewire__ = _set__;
exports.__set__ = _set__;
exports.__ResetDependency__ = _reset__;
exports.__RewireAPI__ = _RewireAPI__;