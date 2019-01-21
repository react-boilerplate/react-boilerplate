"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _values2 = _interopRequireDefault(require("lodash/values"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _has2 = _interopRequireDefault(require("lodash/has"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _mapValues2 = _interopRequireDefault(require("lodash/mapValues"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _lib = require("../../lib");

var _Transition = _interopRequireDefault(require("./Transition"));

/**
 * A Transition.Group animates children as they mount and unmount.
 */
var TransitionGroup =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(TransitionGroup, _React$Component);

  function TransitionGroup() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, TransitionGroup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(TransitionGroup)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleOnHide", function (nothing, childProps) {
      var reactKey = childProps.reactKey;

      _this.setState(function (state) {
        var children = (0, _objectSpread2.default)({}, state.children);
        delete children[reactKey];
        return {
          children: children
        };
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "wrapChild", function (child) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _this$props = _this.props,
          animation = _this$props.animation,
          duration = _this$props.duration;
      var key = child.key;
      var _options$visible = options.visible,
          visible = _options$visible === void 0 ? true : _options$visible,
          _options$transitionOn = options.transitionOnMount,
          transitionOnMount = _options$transitionOn === void 0 ? false : _options$transitionOn;
      return _react.default.createElement(_Transition.default, {
        animation: animation,
        duration: duration,
        key: key,
        onHide: _this.handleOnHide,
        reactKey: key,
        transitionOnMount: transitionOnMount,
        visible: visible
      }, child);
    });
    var _children = _this.props.children;
    _this.state = {
      children: (0, _mapValues2.default)((0, _lib.getChildMapping)(_children), function (child) {
        return _this.wrapChild(child);
      })
    };
    return _this;
  }

  (0, _createClass2.default)(TransitionGroup, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var prevMapping = this.state.children;
      var nextMapping = (0, _lib.getChildMapping)(nextProps.children);
      var children = (0, _lib.mergeChildMappings)(prevMapping, nextMapping);
      (0, _forEach2.default)(children, function (child, key) {
        var hasPrev = (0, _has2.default)(prevMapping, key);
        var hasNext = (0, _has2.default)(nextMapping, key);
        var prevChild = prevMapping[key];
        var isLeaving = !(0, _get2.default)(prevChild, 'props.visible'); // Heads up!
        // An item is new (entering), it will be picked from `nextChildren`, so it should be wrapped

        if (hasNext && (!hasPrev || isLeaving)) {
          children[key] = _this2.wrapChild(child, {
            transitionOnMount: true
          });
          return;
        } // Heads up!
        // An item is old (exiting), it will be picked from `prevChildren`, so it has been already
        // wrapped, so should be only updated


        if (!hasNext && hasPrev && !isLeaving) {
          children[key] = (0, _react.cloneElement)(prevChild, {
            visible: false
          });
          return;
        } // Heads up!
        // An item item hasn't changed transition states, but it will be picked from `nextChildren`,
        // so we should wrap it again


        var _prevChild$props = prevChild.props,
            visible = _prevChild$props.visible,
            transitionOnMount = _prevChild$props.transitionOnMount;
        children[key] = _this2.wrapChild(child, {
          transitionOnMount: transitionOnMount,
          visible: visible
        });
      });
      this.setState({
        children: children
      });
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.state.children;
      var ElementType = (0, _lib.getElementType)(TransitionGroup, this.props);
      var rest = (0, _lib.getUnhandledProps)(TransitionGroup, this.props);
      return _react.default.createElement(ElementType, rest, (0, _values2.default)(children));
    }
  }]);
  return TransitionGroup;
}(_react.default.Component);

exports.default = TransitionGroup;
(0, _defineProperty2.default)(TransitionGroup, "defaultProps", {
  animation: 'fade',
  duration: 500
});
(0, _defineProperty2.default)(TransitionGroup, "handledProps", ["animation", "as", "children", "duration"]);
TransitionGroup.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Named animation event to used. Must be defined in CSS. */
  animation: _propTypes.default.oneOf(_lib.SUI.TRANSITIONS),

  /** Primary content. */
  children: _propTypes.default.node,

  /** Duration of the CSS transition animation in milliseconds. */
  duration: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.shape({
    hide: _propTypes.default.number.isRequired,
    show: _propTypes.default.number.isRequired
  }), _propTypes.default.string])
} : {};