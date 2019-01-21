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

var _keyboardKey = _interopRequireDefault(require("keyboard-key"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _lib = require("../../lib");

/**
 * An internal icon sub-component for Rating component
 */
var RatingIcon =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(RatingIcon, _Component);

  function RatingIcon() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, RatingIcon);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(RatingIcon)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleClick", function (e) {
      (0, _invoke2.default)(_this.props, 'onClick', e, _this.props);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleKeyUp", function (e) {
      (0, _invoke2.default)(_this.props, 'onKeyUp', e, _this.props);

      switch (_keyboardKey.default.getCode(e)) {
        case _keyboardKey.default.Enter:
        case _keyboardKey.default.Spacebar:
          e.preventDefault();
          (0, _invoke2.default)(_this.props, 'onClick', e, _this.props);
          break;

        default:
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleMouseEnter", function (e) {
      (0, _invoke2.default)(_this.props, 'onMouseEnter', e, _this.props);
    });
    return _this;
  }

  (0, _createClass2.default)(RatingIcon, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          active = _this$props.active,
          className = _this$props.className,
          selected = _this$props.selected;
      var classes = (0, _classnames.default)((0, _lib.useKeyOnly)(active, 'active'), (0, _lib.useKeyOnly)(selected, 'selected'), 'icon', className);
      var rest = (0, _lib.getUnhandledProps)(RatingIcon, this.props);
      var ElementType = (0, _lib.getElementType)(RatingIcon, this.props);
      return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
        className: classes,
        onClick: this.handleClick,
        onKeyUp: this.handleKeyUp,
        onMouseEnter: this.handleMouseEnter,
        tabIndex: 0,
        role: "radio"
      }));
    }
  }]);
  return RatingIcon;
}(_react.Component);

exports.default = RatingIcon;
(0, _defineProperty2.default)(RatingIcon, "defaultProps", {
  as: 'i'
});
(0, _defineProperty2.default)(RatingIcon, "handledProps", ["active", "as", "className", "index", "onClick", "onKeyUp", "onMouseEnter", "selected"]);
RatingIcon.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Indicates activity of an icon. */
  active: _propTypes.default.bool,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** An index of icon inside Rating. */
  index: _propTypes.default.number,

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: _propTypes.default.func,

  /**
   * Called on keyup.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onKeyUp: _propTypes.default.func,

  /**
   * Called on mouseenter.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onMouseEnter: _propTypes.default.func,

  /** Indicates selection of an icon. */
  selected: _propTypes.default.bool
} : {};