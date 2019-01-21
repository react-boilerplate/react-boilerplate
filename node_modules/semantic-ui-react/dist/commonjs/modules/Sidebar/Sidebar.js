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

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _eventStack = _interopRequireDefault(require("@semantic-ui-react/event-stack"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _Ref = _interopRequireDefault(require("../../addons/Ref"));

var _lib = require("../../lib");

var _SidebarPushable = _interopRequireDefault(require("./SidebarPushable"));

var _SidebarPusher = _interopRequireDefault(require("./SidebarPusher"));

/**
 * A sidebar hides additional content beside a page.
 */
var Sidebar =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Sidebar, _Component);

  function Sidebar() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Sidebar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Sidebar)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {});
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleAnimationStart", function () {
      var _this$props = _this.props,
          duration = _this$props.duration,
          visible = _this$props.visible;
      var callback = visible ? 'onVisible' : 'onHide';

      _this.setState({
        animating: true
      }, function () {
        clearTimeout(_this.animationTimer);
        _this.animationTimer = setTimeout(_this.handleAnimationEnd, duration);

        if (_this.skipNextCallback) {
          _this.skipNextCallback = false;
          return;
        }

        (0, _invoke2.default)(_this.props, callback, null, _this.props);
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleAnimationEnd", function () {
      var visible = _this.props.visible;
      var callback = visible ? 'onShow' : 'onHidden';

      _this.setState({
        animating: false
      });

      (0, _invoke2.default)(_this.props, callback, null, _this.props);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleDocumentClick", function (e) {
      if (!(0, _lib.doesNodeContainClick)(_this.ref, e)) {
        _this.skipNextCallback = true;
        (0, _invoke2.default)(_this.props, 'onHide', e, (0, _objectSpread2.default)({}, _this.props, {
          visible: false
        }));
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleRef", function (c) {
      return _this.ref = c;
    });
    return _this;
  }

  (0, _createClass2.default)(Sidebar, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var prevVisible = prevProps.visible;
      var currentVisible = this.props.visible;
      if (prevVisible !== currentVisible) this.handleAnimationStart();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.animationTimer);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          animation = _this$props2.animation,
          className = _this$props2.className,
          children = _this$props2.children,
          content = _this$props2.content,
          direction = _this$props2.direction,
          target = _this$props2.target,
          visible = _this$props2.visible,
          width = _this$props2.width;
      var animating = this.state.animating;
      var classes = (0, _classnames.default)('ui', animation, direction, width, (0, _lib.useKeyOnly)(animating, 'animating'), (0, _lib.useKeyOnly)(visible, 'visible'), 'sidebar', className);
      var rest = (0, _lib.getUnhandledProps)(Sidebar, this.props);
      var ElementType = (0, _lib.getElementType)(Sidebar, this.props);
      return _react.default.createElement(_Ref.default, {
        innerRef: this.handleRef
      }, _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
        className: classes
      }), _lib.childrenUtils.isNil(children) ? content : children, visible && _react.default.createElement(_eventStack.default, {
        name: "click",
        on: this.handleDocumentClick,
        target: target
      })));
    }
  }]);
  return Sidebar;
}(_react.Component);

(0, _defineProperty2.default)(Sidebar, "defaultProps", {
  direction: 'left',
  duration: 500
});
(0, _defineProperty2.default)(Sidebar, "autoControlledProps", ['visible']);
(0, _defineProperty2.default)(Sidebar, "Pushable", _SidebarPushable.default);
(0, _defineProperty2.default)(Sidebar, "Pusher", _SidebarPusher.default);
(0, _defineProperty2.default)(Sidebar, "handledProps", ["animation", "as", "children", "className", "content", "direction", "duration", "onHidden", "onHide", "onShow", "onVisible", "target", "visible", "width"]);
Sidebar.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Animation style. */
  animation: _propTypes.default.oneOf(['overlay', 'push', 'scale down', 'uncover', 'slide out', 'slide along']),

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** Direction the sidebar should appear on. */
  direction: _propTypes.default.oneOf(['top', 'right', 'bottom', 'left']),

  /** Duration of sidebar animation. */
  duration: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * Called before a sidebar begins to animate out.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onHide: _propTypes.default.func,

  /**
   * Called after a sidebar has finished animating out.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onHidden: _propTypes.default.func,

  /**
   * Called when a sidebar has finished animating in.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onShow: _propTypes.default.func,

  /**
   * Called when a sidebar begins animating in.
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onVisible: _propTypes.default.func,

  /** A sidebar can handle clicks on the passed element. */
  target: _propTypes.default.object,

  /** Controls whether or not the sidebar is visible on the page. */
  visible: _propTypes.default.bool,

  /** Sidebar width. */
  width: _propTypes.default.oneOf(['very thin', 'thin', 'wide', 'very wide'])
} : {};
var _default = Sidebar;
exports.default = _default;