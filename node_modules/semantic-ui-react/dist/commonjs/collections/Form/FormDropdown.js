"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _Dropdown = _interopRequireDefault(require("../../modules/Dropdown"));

var _FormField = _interopRequireDefault(require("./FormField"));

/**
 * Sugar for <Form.Field control={Dropdown} />.
 * @see Dropdown
 * @see Form
 */
function FormDropdown(props) {
  var control = props.control;
  var rest = (0, _lib.getUnhandledProps)(FormDropdown, props);
  var ElementType = (0, _lib.getElementType)(FormDropdown, props);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    control: control
  }));
}

FormDropdown.handledProps = ["as", "control"];
FormDropdown.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** A FormField control prop. */
  control: _FormField.default.propTypes.control
} : {};
FormDropdown.defaultProps = {
  as: _FormField.default,
  control: _Dropdown.default
};
var _default = FormDropdown;
exports.default = _default;