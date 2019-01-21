"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _Input = _interopRequireDefault(require("../../elements/Input"));

var _FormField = _interopRequireDefault(require("./FormField"));

/**
 * Sugar for <Form.Field control={Input} />.
 * @see Form
 * @see Input
 */
function FormInput(props) {
  var control = props.control;
  var rest = (0, _lib.getUnhandledProps)(FormInput, props);
  var ElementType = (0, _lib.getElementType)(FormInput, props);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    control: control
  }));
}

FormInput.handledProps = ["as", "control"];
FormInput.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** A FormField control prop. */
  control: _FormField.default.propTypes.control
} : {};
FormInput.defaultProps = {
  as: _FormField.default,
  control: _Input.default
};
var _default = FormInput;
exports.default = _default;