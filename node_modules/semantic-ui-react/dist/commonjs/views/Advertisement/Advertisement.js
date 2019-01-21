"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

/**
 * An ad displays third-party promotional content.
 */
function Advertisement(props) {
  var centered = props.centered,
      children = props.children,
      className = props.className,
      content = props.content,
      test = props.test,
      unit = props.unit;
  var classes = (0, _classnames.default)('ui', unit, (0, _lib.useKeyOnly)(centered, 'centered'), (0, _lib.useKeyOnly)(test, 'test'), 'ad', className);
  var rest = (0, _lib.getUnhandledProps)(Advertisement, props);
  var ElementType = (0, _lib.getElementType)(Advertisement, props);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes,
    "data-text": test
  }), _lib.childrenUtils.isNil(children) ? content : children);
}

Advertisement.handledProps = ["as", "centered", "children", "className", "content", "test", "unit"];
Advertisement.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Center the advertisement. */
  centered: _propTypes.default.bool,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** Text to be displayed on the advertisement. */
  test: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.number, _propTypes.default.string]),

  /** Varies the size of the advertisement. */
  unit: _propTypes.default.oneOf(['medium rectangle', 'large rectangle', 'vertical rectangle', 'small rectangle', 'mobile banner', 'banner', 'vertical banner', 'top banner', 'half banner', 'button', 'square button', 'small button', 'skyscraper', 'wide skyscraper', 'leaderboard', 'large leaderboard', 'mobile leaderboard', 'billboard', 'panorama', 'netboard', 'half page', 'square', 'small square']).isRequired
} : {};
var _default = Advertisement;
exports.default = _default;