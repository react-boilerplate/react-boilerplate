"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _Radio = _interopRequireDefault(require("../../addons/Radio"));

var _FormField = _interopRequireDefault(require("./FormField"));

/**
 * Sugar for <Form.Field control={Radio} />.
 * @see Form
 * @see Radio
 */
function FormRadio(props) {
  var control = props.control;
  var rest = (0, _lib.getUnhandledProps)(FormRadio, props);
  var ElementType = (0, _lib.getElementType)(FormRadio, props);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    control: control
  }));
}

FormRadio.handledProps = ["as", "control"];
FormRadio.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** A FormField control prop. */
  control: _FormField.default.propTypes.control
} : {};
FormRadio.defaultProps = {
  as: _FormField.default,
  control: _Radio.default
};
var _default = FormRadio;
exports.default = _default;