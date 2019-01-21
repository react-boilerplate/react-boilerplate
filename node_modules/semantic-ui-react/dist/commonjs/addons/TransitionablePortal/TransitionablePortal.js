"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _Portal = _interopRequireDefault(require("../Portal"));

var _Transition = _interopRequireDefault(require("../../modules/Transition"));

var _lib = require("../../lib");

/**
 * A sugar for `Portal` and `Transition`.
 * @see Portal
 * @see Transition
 */
var TransitionablePortal =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(TransitionablePortal, _Component);

  function TransitionablePortal(props) {
    var _this;

    (0, _classCallCheck2.default)(this, TransitionablePortal);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TransitionablePortal).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handlePortalClose", function () {
      _this.setState({
        portalOpen: false
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handlePortalOpen", function () {
      _this.setState({
        portalOpen: true
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleTransitionHide", function (nothing, data) {
      var portalOpen = _this.state.portalOpen;

      _this.setState({
        transitionVisible: false
      });

      (0, _invoke2.default)(_this.props, 'onClose', null, (0, _objectSpread2.default)({}, data, {
        portalOpen: false,
        transitionVisible: false
      }));
      (0, _invoke2.default)(_this.props, 'onHide', null, (0, _objectSpread2.default)({}, data, {
        portalOpen: portalOpen,
        transitionVisible: false
      }));
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleTransitionStart", function (nothing, data) {
      var portalOpen = _this.state.portalOpen;
      var status = data.status;
      var transitionVisible = status === _Transition.default.ENTERING;
      (0, _invoke2.default)(_this.props, 'onStart', null, (0, _objectSpread2.default)({}, data, {
        portalOpen: portalOpen,
        transitionVisible: transitionVisible
      })); // Heads up! TransitionablePortal fires onOpen callback on the start of transition animation

      if (!transitionVisible) return;

      _this.setState({
        transitionVisible: transitionVisible
      });

      (0, _invoke2.default)(_this.props, 'onOpen', null, (0, _objectSpread2.default)({}, data, {
        transitionVisible: transitionVisible,
        portalOpen: true
      }));
    });
    _this.state = {
      portalOpen: props.open
    };
    return _this;
  } // ----------------------------------------
  // Lifecycle
  // ----------------------------------------


  (0, _createClass2.default)(TransitionablePortal, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(_ref) {
      var open = _ref.open;
      this.setState({
        portalOpen: open
      });
    } // ----------------------------------------
    // Callback handling
    // ----------------------------------------

  }, {
    key: "render",
    // ----------------------------------------
    // Render
    // ----------------------------------------
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          transition = _this$props.transition;
      var _this$state = this.state,
          portalOpen = _this$state.portalOpen,
          transitionVisible = _this$state.transitionVisible;
      var open = portalOpen || transitionVisible;
      var rest = (0, _lib.getUnhandledProps)(TransitionablePortal, this.props);
      return _react.default.createElement(_Portal.default, (0, _extends2.default)({}, rest, {
        open: open,
        onOpen: this.handlePortalOpen,
        onClose: this.handlePortalClose
      }), _react.default.createElement(_Transition.default, (0, _extends2.default)({}, transition, {
        transitionOnMount: true,
        onStart: this.handleTransitionStart,
        onHide: this.handleTransitionHide,
        visible: portalOpen
      }), children));
    }
  }]);
  return TransitionablePortal;
}(_react.Component);

exports.default = TransitionablePortal;
(0, _defineProperty2.default)(TransitionablePortal, "defaultProps", {
  transition: {
    animation: 'scale',
    duration: 400
  }
});
(0, _defineProperty2.default)(TransitionablePortal, "handledProps", ["children", "onClose", "onHide", "onOpen", "onStart", "open", "transition"]);
TransitionablePortal.propTypes = process.env.NODE_ENV !== "production" ? {
  /** Primary content. */
  children: _propTypes.default.node.isRequired,

  /**
   * Called when a close event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and internal state.
   */
  onClose: _propTypes.default.func,

  /**
   * Callback on each transition that changes visibility to hidden.
   *
   * @param {null}
   * @param {object} data - All props with transition status and internal state.
   */
  onHide: _propTypes.default.func,

  /**
   * Called when an open event happens.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and internal state.
   */
  onOpen: _propTypes.default.func,

  /**
   * Callback on animation start.
   *
   * @param {null}
   * @param {object} data - All props with transition status and internal state.
   */
  onStart: _propTypes.default.func,

  /** Controls whether or not the portal is displayed. */
  open: _propTypes.default.bool,

  /** Transition props. */
  transition: _propTypes.default.object
} : {};