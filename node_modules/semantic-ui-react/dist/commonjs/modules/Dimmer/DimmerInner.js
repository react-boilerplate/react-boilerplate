"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

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
 * An inner element for a Dimmer.
 */
var DimmerInner =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(DimmerInner, _Component);

  function DimmerInner() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, DimmerInner);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(DimmerInner)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "containerRef", (0, _react.createRef)());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "contentRef", (0, _react.createRef)());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleClick", function (e) {
      var contentRef = _this.contentRef.current;
      (0, _invoke2.default)(_this.props, 'onClick', e, _this.props);

      if (contentRef && contentRef !== e.target && (0, _lib.doesNodeContainClick)(contentRef, e)) {
        return;
      }

      (0, _invoke2.default)(_this.props, 'onClickOutside', e, _this.props);
    });
    return _this;
  }

  (0, _createClass2.default)(DimmerInner, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var active = this.props.active;
      this.toggleStyles(active);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var currentActive = this.props.active;
      var prevActive = prevProps.active;
      if (prevActive !== currentActive) this.toggleStyles(currentActive);
    }
  }, {
    key: "toggleStyles",
    value: function toggleStyles(active) {
      var containerRef = this.containerRef.current;
      if (!containerRef) return;

      if (active) {
        containerRef.style.setProperty('display', 'flex', 'important');
      } else {
        containerRef.style.removeProperty('display');
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          active = _this$props.active,
          children = _this$props.children,
          className = _this$props.className,
          content = _this$props.content,
          disabled = _this$props.disabled,
          inverted = _this$props.inverted,
          page = _this$props.page,
          simple = _this$props.simple,
          verticalAlign = _this$props.verticalAlign;
      var classes = (0, _classnames.default)('ui', (0, _lib.useKeyOnly)(active, 'active transition visible'), (0, _lib.useKeyOnly)(disabled, 'disabled'), (0, _lib.useKeyOnly)(inverted, 'inverted'), (0, _lib.useKeyOnly)(page, 'page'), (0, _lib.useKeyOnly)(simple, 'simple'), (0, _lib.useVerticalAlignProp)(verticalAlign), 'dimmer', className);
      var rest = (0, _lib.getUnhandledProps)(DimmerInner, this.props);
      var ElementType = (0, _lib.getElementType)(DimmerInner, this.props);
      var childrenContent = _lib.childrenUtils.isNil(children) ? content : children;
      return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
        className: classes,
        onClick: this.handleClick,
        ref: this.containerRef
      }), childrenContent && _react.default.createElement("div", {
        className: "content",
        ref: this.contentRef
      }, childrenContent));
    }
  }]);
  return DimmerInner;
}(_react.Component);

exports.default = DimmerInner;
(0, _defineProperty2.default)(DimmerInner, "handledProps", ["active", "as", "children", "className", "content", "disabled", "inverted", "onClick", "onClickOutside", "page", "simple", "verticalAlign"]);
DimmerInner.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** An active dimmer will dim its parent container. */
  active: _propTypes.default.bool,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** A disabled dimmer cannot be activated */
  disabled: _propTypes.default.bool,

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: _propTypes.default.func,

  /**
   * Handles click outside Dimmer's content, but inside Dimmer area.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClickOutside: _propTypes.default.func,

  /** A dimmer can be formatted to have its colors inverted. */
  inverted: _propTypes.default.bool,

  /** A dimmer can be formatted to be fixed to the page. */
  page: _propTypes.default.bool,

  /** A dimmer can be controlled with simple prop. */
  simple: _propTypes.default.bool,

  /** A dimmer can have its content top or bottom aligned. */
  verticalAlign: _propTypes.default.oneOf(['bottom', 'top'])
} : {};