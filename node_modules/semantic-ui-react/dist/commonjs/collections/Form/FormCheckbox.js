"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _Checkbox = _interopRequireDefault(require("../../modules/Checkbox"));

var _FormField = _interopRequireDefault(require("./FormField"));

/**
 * Sugar for <Form.Field control={Checkbox} />.
 * @see Checkbox
 * @see Form
 */
function FormCheckbox(props) {
  var control = props.control;
  var rest = (0, _lib.getUnhandledProps)(FormCheckbox, props);
  var ElementType = (0, _lib.getElementType)(FormCheckbox, props);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    control: control
  }));
}

FormCheckbox.handledProps = ["as", "control"];
FormCheckbox.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** A FormField control prop. */
  control: _FormField.default.propTypes.control
} : {};
FormCheckbox.defaultProps = {
  as: _FormField.default,
  control: _Checkbox.default
};
var _default = FormCheckbox;
exports.default = _default;