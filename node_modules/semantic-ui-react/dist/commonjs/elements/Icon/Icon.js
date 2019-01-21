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

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _without2 = _interopRequireDefault(require("lodash/without"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _lib = require("../../lib");

var _IconGroup = _interopRequireDefault(require("./IconGroup"));

/**
 * An icon is a glyph used to represent something else.
 * @see Image
 */
var Icon =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2.default)(Icon, _PureComponent);

  function Icon() {
    (0, _classCallCheck2.default)(this, Icon);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Icon).apply(this, arguments));
  }

  (0, _createClass2.default)(Icon, [{
    key: "getIconAriaOptions",
    value: function getIconAriaOptions() {
      var ariaOptions = {};
      var _this$props = this.props,
          ariaLabel = _this$props['aria-label'],
          ariaHidden = _this$props['aria-hidden'];

      if ((0, _isNil2.default)(ariaLabel)) {
        ariaOptions['aria-hidden'] = 'true';
      } else {
        ariaOptions['aria-label'] = ariaLabel;
      }

      if (!(0, _isNil2.default)(ariaHidden)) {
        ariaOptions['aria-hidden'] = ariaHidden;
      }

      return ariaOptions;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          bordered = _this$props2.bordered,
          circular = _this$props2.circular,
          className = _this$props2.className,
          color = _this$props2.color,
          corner = _this$props2.corner,
          disabled = _this$props2.disabled,
          fitted = _this$props2.fitted,
          flipped = _this$props2.flipped,
          inverted = _this$props2.inverted,
          link = _this$props2.link,
          loading = _this$props2.loading,
          name = _this$props2.name,
          rotated = _this$props2.rotated,
          size = _this$props2.size;
      var classes = (0, _classnames.default)(color, name, size, (0, _lib.useKeyOnly)(bordered, 'bordered'), (0, _lib.useKeyOnly)(circular, 'circular'), (0, _lib.useKeyOnly)(disabled, 'disabled'), (0, _lib.useKeyOnly)(fitted, 'fitted'), (0, _lib.useKeyOnly)(inverted, 'inverted'), (0, _lib.useKeyOnly)(link, 'link'), (0, _lib.useKeyOnly)(loading, 'loading'), (0, _lib.useKeyOrValueAndKey)(corner, 'corner'), (0, _lib.useValueAndKey)(flipped, 'flipped'), (0, _lib.useValueAndKey)(rotated, 'rotated'), 'icon', className);
      var rest = (0, _lib.getUnhandledProps)(Icon, this.props);
      var ElementType = (0, _lib.getElementType)(Icon, this.props);
      var ariaOptions = this.getIconAriaOptions();
      return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, ariaOptions, {
        className: classes
      }));
    }
  }]);
  return Icon;
}(_react.PureComponent);

(0, _defineProperty2.default)(Icon, "defaultProps", {
  as: 'i'
});
(0, _defineProperty2.default)(Icon, "Group", _IconGroup.default);
(0, _defineProperty2.default)(Icon, "handledProps", ["aria-hidden", "aria-label", "as", "bordered", "circular", "className", "color", "corner", "disabled", "fitted", "flipped", "inverted", "link", "loading", "name", "rotated", "size"]);
Icon.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Formatted to appear bordered. */
  bordered: _propTypes.default.bool,

  /** Icon can formatted to appear circular. */
  circular: _propTypes.default.bool,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Color of the icon. */
  color: _propTypes.default.oneOf(_lib.SUI.COLORS),

  /** Icons can display a smaller corner icon. */
  corner: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['top left', 'top right', 'bottom left', 'bottom right'])]),

  /** Show that the icon is inactive. */
  disabled: _propTypes.default.bool,

  /** Fitted, without space to left or right of Icon. */
  fitted: _propTypes.default.bool,

  /** Icon can flipped. */
  flipped: _propTypes.default.oneOf(['horizontally', 'vertically']),

  /** Formatted to have its colors inverted for contrast. */
  inverted: _propTypes.default.bool,

  /** Icon can be formatted as a link. */
  link: _propTypes.default.bool,

  /** Icon can be used as a simple loader. */
  loading: _propTypes.default.bool,

  /** Name of the icon. */
  name: _lib.customPropTypes.suggest(_lib.SUI.ALL_ICONS_IN_ALL_CONTEXTS),

  /** Icon can rotated. */
  rotated: _propTypes.default.oneOf(['clockwise', 'counterclockwise']),

  /** Size of the icon. */
  size: _propTypes.default.oneOf((0, _without2.default)(_lib.SUI.SIZES, 'medium')),

  /** Icon can have an aria label. */
  'aria-hidden': _propTypes.default.string,

  /** Icon can have an aria label. */
  'aria-label': _propTypes.default.string
} : {};
Icon.create = (0, _lib.createShorthandFactory)(Icon, function (value) {
  return {
    name: value
  };
});
var _default = Icon;
exports.default = _default;