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
 * A statistic can contain a numeric, icon, image, or text value.
 */
function StatisticValue(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      text = props.text;
  var classes = (0, _classnames.default)((0, _lib.useKeyOnly)(text, 'text'), 'value', className);
  var rest = (0, _lib.getUnhandledProps)(StatisticValue, props);
  var ElementType = (0, _lib.getElementType)(StatisticValue, props);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), _lib.childrenUtils.isNil(children) ? content : children);
}

StatisticValue.handledProps = ["as", "children", "className", "content", "text"];
StatisticValue.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** Format the value with smaller font size to fit nicely beside number values. */
  text: _propTypes.default.bool
} : {};
StatisticValue.create = (0, _lib.createShorthandFactory)(StatisticValue, function (content) {
  return {
    content: content
  };
});
var _default = StatisticValue;
exports.default = _default;