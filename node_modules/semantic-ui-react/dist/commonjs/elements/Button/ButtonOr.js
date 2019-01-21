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
 * Button groups can contain conditionals.
 */
function ButtonOr(props) {
  var className = props.className,
      text = props.text;
  var classes = (0, _classnames.default)('or', className);
  var rest = (0, _lib.getUnhandledProps)(ButtonOr, props);
  var ElementType = (0, _lib.getElementType)(ButtonOr, props);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes,
    "data-text": text
  }));
}

ButtonOr.handledProps = ["as", "className", "text"];
ButtonOr.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Or buttons can have their text localized, or adjusted by using the text prop. */
  text: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
} : {};
var _default = ButtonOr;
exports.default = _default;