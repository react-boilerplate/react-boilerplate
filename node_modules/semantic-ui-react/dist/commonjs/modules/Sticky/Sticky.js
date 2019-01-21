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

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _lib = require("../../lib");

/**
 * Sticky content stays fixed to the browser viewport while another column of content is visible on the page.
 */
var Sticky =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Sticky, _Component);

  function Sticky() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Sticky);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Sticky)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      sticky: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "addListeners", function (props) {
      var scrollContext = props.scrollContext;

      if (scrollContext) {
        _lib.eventStack.sub('resize', _this.handleUpdate, {
          target: scrollContext
        });

        _lib.eventStack.sub('scroll', _this.handleUpdate, {
          target: scrollContext
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "removeListeners", function () {
      var scrollContext = _this.props.scrollContext;

      if (scrollContext) {
        _lib.eventStack.unsub('resize', _this.handleUpdate, {
          target: scrollContext
        });

        _lib.eventStack.unsub('scroll', _this.handleUpdate, {
          target: scrollContext
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "update", function (e) {
      var pushing = _this.state.pushing;
      _this.ticking = false;

      _this.assignRects();

      if (pushing) {
        if (_this.didReachStartingPoint()) return _this.stickToContextTop(e);
        if (_this.didTouchScreenBottom()) return _this.stickToScreenBottom(e);
        return _this.stickToContextBottom(e);
      }

      if (_this.isOversized()) {
        if (_this.contextRect.top > 0) return _this.stickToContextTop(e);
        if (_this.contextRect.bottom < window.innerHeight) return _this.stickToContextBottom(e);
      }

      if (_this.didTouchScreenTop()) {
        if (_this.didReachContextBottom()) return _this.stickToContextBottom(e);
        return _this.stickToScreenTop(e);
      }

      return _this.stickToContextTop(e);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleUpdate", function (e) {
      if (!_this.ticking) {
        _this.ticking = true;
        _this.frameId = requestAnimationFrame(function () {
          return _this.update(e);
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "assignRects", function () {
      var context = _this.props.context;
      _this.triggerRect = _this.triggerRef.getBoundingClientRect();
      _this.contextRect = (context || document.body).getBoundingClientRect();
      _this.stickyRect = _this.stickyRef.getBoundingClientRect();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "didReachContextBottom", function () {
      var offset = _this.props.offset;
      return _this.stickyRect.height + offset >= _this.contextRect.bottom;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "didReachStartingPoint", function () {
      return _this.stickyRect.top <= _this.triggerRect.top;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "didTouchScreenTop", function () {
      return _this.triggerRect.top < _this.props.offset;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "didTouchScreenBottom", function () {
      var bottomOffset = _this.props.bottomOffset;
      return _this.contextRect.bottom + bottomOffset > window.innerHeight;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "isOversized", function () {
      return _this.stickyRect.height > window.innerHeight;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "pushing", function (pushing) {
      var possible = _this.props.pushing;
      if (possible) _this.setState({
        pushing: pushing
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "stick", function (e, bound) {
      _this.setState({
        bound: bound,
        sticky: true
      });

      (0, _invoke2.default)(_this.props, 'onStick', e, _this.props);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "unstick", function (e, bound) {
      _this.setState({
        bound: bound,
        sticky: false
      });

      (0, _invoke2.default)(_this.props, 'onUnstick', e, _this.props);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "stickToContextBottom", function (e) {
      (0, _invoke2.default)(_this.props, 'onBottom', e, _this.props);

      _this.stick(e, true);

      _this.pushing(true);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "stickToContextTop", function (e) {
      (0, _invoke2.default)(_this.props, 'onTop', e, _this.props);

      _this.unstick(e, false);

      _this.pushing(false);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "stickToScreenBottom", function (e) {
      var bottom = _this.props.bottomOffset;

      _this.stick(e, false);

      _this.setState({
        bottom: bottom,
        top: null
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "stickToScreenTop", function (e) {
      var top = _this.props.offset;

      _this.stick(e, false);

      _this.setState({
        top: top,
        bottom: null
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleStickyRef", function (c) {
      return _this.stickyRef = c;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleTriggerRef", function (c) {
      return _this.triggerRef = c;
    });
    return _this;
  }

  (0, _createClass2.default)(Sticky, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!(0, _lib.isBrowser)()) return;
      var active = this.props.active;

      if (active) {
        this.handleUpdate();
        this.addListeners(this.props);
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this$props = this.props,
          current = _this$props.active,
          currentScrollContext = _this$props.scrollContext;
      var next = nextProps.active,
          nextScrollContext = nextProps.scrollContext;

      if (current === next) {
        if (currentScrollContext !== nextScrollContext) {
          this.removeListeners();
          this.addListeners(nextProps);
        }

        return;
      }

      if (next) {
        this.handleUpdate();
        this.addListeners(nextProps);
        return;
      }

      this.removeListeners();
      this.setState({
        sticky: false
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (!(0, _lib.isBrowser)()) return;
      var active = this.props.active;

      if (active) {
        this.removeListeners();
        cancelAnimationFrame(this.frameId);
      }
    } // ----------------------------------------
    // Events
    // ----------------------------------------

  }, {
    key: "computeStyle",
    value: function computeStyle() {
      var styleElement = this.props.styleElement;
      var _this$state = this.state,
          bottom = _this$state.bottom,
          bound = _this$state.bound,
          sticky = _this$state.sticky,
          top = _this$state.top;
      if (!sticky) return styleElement;
      return (0, _objectSpread2.default)({
        bottom: bound ? 0 : bottom,
        top: bound ? undefined : top,
        width: this.triggerRect.width
      }, styleElement);
    } // Return true when the component reached the bottom of the context

  }, {
    key: "render",
    // ----------------------------------------
    // Render
    // ----------------------------------------
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          className = _this$props2.className;
      var _this$state2 = this.state,
          bottom = _this$state2.bottom,
          bound = _this$state2.bound,
          sticky = _this$state2.sticky;
      var rest = (0, _lib.getUnhandledProps)(Sticky, this.props);
      var ElementType = (0, _lib.getElementType)(Sticky, this.props);
      var containerClasses = (0, _classnames.default)(sticky && 'ui', sticky && 'stuck-container', sticky && (bound ? 'bound-container' : 'fixed-container'), className);
      var elementClasses = (0, _classnames.default)('ui', sticky && (bound ? 'bound bottom' : 'fixed'), sticky && !bound && (bottom === null ? 'top' : 'bottom'), 'sticky');
      return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
        className: containerClasses
      }), _react.default.createElement("div", {
        ref: this.handleTriggerRef
      }), _react.default.createElement("div", {
        className: (0, _classnames.default)(elementClasses),
        ref: this.handleStickyRef,
        style: this.computeStyle()
      }, children));
    }
  }]);
  return Sticky;
}(_react.Component);

exports.default = Sticky;
(0, _defineProperty2.default)(Sticky, "defaultProps", {
  active: true,
  bottomOffset: 0,
  offset: 0,
  scrollContext: (0, _lib.isBrowser)() ? window : null
});
(0, _defineProperty2.default)(Sticky, "handledProps", ["active", "as", "bottomOffset", "children", "className", "context", "offset", "onBottom", "onStick", "onTop", "onUnstick", "pushing", "scrollContext", "styleElement"]);
Sticky.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** A Sticky can be active. */
  active: _propTypes.default.bool,

  /** Offset in pixels from the bottom of the screen when fixing element to viewport. */
  bottomOffset: _propTypes.default.number,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Context which sticky element should stick to. */
  context: _propTypes.default.object,

  /** Offset in pixels from the top of the screen when fixing element to viewport. */
  offset: _propTypes.default.number,

  /**
   * Callback when element is bound to bottom of parent container.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onBottom: _propTypes.default.func,

  /**
   * Callback when element is fixed to page.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onStick: _propTypes.default.func,

  /**
   * Callback when element is bound to top of parent container.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onTop: _propTypes.default.func,

  /**
   * Callback when element is unfixed from page.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onUnstick: _propTypes.default.func,

  /** Whether element should be "pushed" by the viewport, attaching to the bottom of the screen when scrolling up. */
  pushing: _propTypes.default.bool,

  /** Context which sticky should attach onscroll events. */
  scrollContext: _propTypes.default.object,

  /** Custom style for sticky element. */
  styleElement: _propTypes.default.object
} : {};