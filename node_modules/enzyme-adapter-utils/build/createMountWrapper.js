'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports['default'] = createMountWrapper;

var _object = require('object.assign');

var _object2 = _interopRequireDefault(_object);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint react/forbid-prop-types: 0 */

var stringOrFunction = _propTypes2['default'].oneOfType([_propTypes2['default'].func, _propTypes2['default'].string]);
var makeValidElementType = function makeValidElementType(adapter) {
  if (!adapter) {
    return stringOrFunction;
  }

  function validElementType(props, propName) {
    if (!adapter.isValidElementType) {
      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      return stringOrFunction.apply(undefined, [props, propName].concat(args));
    }
    var propValue = props[propName];
    if (propValue == null || adapter.isValidElementType(propValue)) {
      return null;
    }
    return new TypeError(String(propName) + ' must be a valid element type!');
  }
  validElementType.isRequired = function () {
    function validElementTypeRequired(props, propName) {
      if (!adapter.isValidElementType) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        return stringOrFunction.isRequired.apply(stringOrFunction, [props, propName].concat(args));
      }
      var propValue = props[propName]; // eslint-disable-line react/destructuring-assignment
      if (adapter.isValidElementType(propValue)) {
        return null;
      }
      return new TypeError(String(propName) + ' must be a valid element type!');
    }

    return validElementTypeRequired;
  }();
  return validElementType;
};

/**
 * This is a utility component to wrap around the nodes we are
 * passing in to `mount()`. Theoretically, you could do everything
 * we are doing without this, but this makes it easier since
 * `renderIntoDocument()` doesn't really pass back a reference to
 * the DOM node it rendered to, so we can't really "re-render" to
 * pass new props in.
 */
function createMountWrapper(node) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var adapter = options.adapter;

  var WrapperComponent = function (_React$Component) {
    _inherits(WrapperComponent, _React$Component);

    function WrapperComponent() {
      var _ref;

      _classCallCheck(this, WrapperComponent);

      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      var _this = _possibleConstructorReturn(this, (_ref = WrapperComponent.__proto__ || Object.getPrototypeOf(WrapperComponent)).call.apply(_ref, [this].concat(args)));

      var _this$props = _this.props,
          props = _this$props.props,
          context = _this$props.context;

      _this.state = {
        mount: true,
        props: props,
        context: context
      };
      return _this;
    }

    _createClass(WrapperComponent, [{
      key: 'setChildProps',
      value: function () {
        function setChildProps(newProps, newContext) {
          var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
          var _state = this.state,
              oldProps = _state.props,
              oldContext = _state.context;

          var props = (0, _object2['default'])({}, oldProps, newProps);
          var context = (0, _object2['default'])({}, oldContext, newContext);
          this.setState({ props: props, context: context }, callback);
        }

        return setChildProps;
      }()
    }, {
      key: 'getInstance',
      value: function () {
        function getInstance() {
          var component = this._reactInternalInstance._renderedComponent;
          var inst = component.getPublicInstance();
          if (inst === null) {
            return component._instance;
          }
          return inst;
        }

        return getInstance;
      }()
    }, {
      key: 'getWrappedComponent',
      value: function () {
        function getWrappedComponent() {
          var component = this._reactInternalInstance._renderedComponent;
          var inst = component.getPublicInstance();
          if (inst === null) {
            return component._instance;
          }
          return inst;
        }

        return getWrappedComponent;
      }()
    }, {
      key: 'setChildContext',
      value: function () {
        function setChildContext(context) {
          var _this2 = this;

          return new Promise(function (resolve) {
            return _this2.setState({ context: context }, resolve);
          });
        }

        return setChildContext;
      }()
    }, {
      key: 'render',
      value: function () {
        function render() {
          var Component = this.props.Component;
          var _state2 = this.state,
              mount = _state2.mount,
              props = _state2.props;

          if (!mount) return null;
          return _react2['default'].createElement(Component, props);
        }

        return render;
      }()
    }]);

    return WrapperComponent;
  }(_react2['default'].Component);

  WrapperComponent.propTypes = {
    Component: makeValidElementType(adapter).isRequired,
    props: _propTypes2['default'].object.isRequired,
    context: _propTypes2['default'].object
  };
  WrapperComponent.defaultProps = {
    context: null
  };

  if (options.context && (node.type.contextTypes || options.childContextTypes)) {
    // For full rendering, we are using this wrapper component to provide context if it is
    // specified in both the options AND the child component defines `contextTypes` statically
    // OR the merged context types for all children (the node component or deeper children) are
    // specified in options parameter under childContextTypes.
    // In that case, we define both a `getChildContext()` function and a `childContextTypes` prop.
    var childContextTypes = (0, _object2['default'])({}, node.type.contextTypes, options.childContextTypes);

    WrapperComponent.prototype.getChildContext = function () {
      function getChildContext() {
        return this.state.context;
      }

      return getChildContext;
    }();
    WrapperComponent.childContextTypes = childContextTypes;
  }
  return WrapperComponent;
}