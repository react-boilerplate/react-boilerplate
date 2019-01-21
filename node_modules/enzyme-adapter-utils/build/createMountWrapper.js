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

  var WrapperComponent = function (_React$Component) {
    _inherits(WrapperComponent, _React$Component);

    function WrapperComponent() {
      var _ref;

      _classCallCheck(this, WrapperComponent);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var _this = _possibleConstructorReturn(this, (_ref = WrapperComponent.__proto__ || Object.getPrototypeOf(WrapperComponent)).call.apply(_ref, [this].concat(args)));

      _this.state = {
        mount: true,
        props: _this.props.props,
        context: _this.props.context
      };
      return _this;
    }

    _createClass(WrapperComponent, [{
      key: 'setChildProps',
      value: function () {
        function setChildProps(newProps, newContext) {
          var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

          var props = (0, _object2['default'])({}, this.state.props, newProps);
          var context = (0, _object2['default'])({}, this.state.context, newContext);
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
          var _state = this.state,
              mount = _state.mount,
              props = _state.props;

          if (!mount) return null;
          return _react2['default'].createElement(Component, props);
        }

        return render;
      }()
    }]);

    return WrapperComponent;
  }(_react2['default'].Component);

  WrapperComponent.propTypes = {
    Component: _propTypes2['default'].oneOfType([_propTypes2['default'].func, _propTypes2['default'].string]).isRequired,
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