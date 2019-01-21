"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _Button = _interopRequireDefault(require("../../elements/Button"));

var _FormField = _interopRequireDefault(require("./FormField"));

/**
 * Sugar for <Form.Field control={Button} />.
 * @see Button
 * @see Form
 */
function FormButton(props) {
  var control = props.control;
  var rest = (0, _lib.getUnhandledProps)(FormButton, props);
  var ElementType = (0, _lib.getElementType)(FormButton, props);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    control: control
  }));
}

FormButton.handledProps = ["as", "control"];
FormButton.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** A FormField control prop. */
  control: _FormField.default.propTypes.control
} : {};
FormButton.defaultProps = {
  as: _FormField.default,
  control: _Button.default
};
var _default = FormButton;
exports.default = _default;