"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _Select = _interopRequireDefault(require("../../addons/Select"));

var _Dropdown = _interopRequireDefault(require("../../modules/Dropdown"));

var _FormField = _interopRequireDefault(require("./FormField"));

/**
 * Sugar for <Form.Field control={Select} />.
 * @see Form
 * @see Select
 */
function FormSelect(props) {
  var control = props.control,
      options = props.options;
  var rest = (0, _lib.getUnhandledProps)(FormSelect, props);
  var ElementType = (0, _lib.getElementType)(FormSelect, props);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    control: control,
    options: options
  }));
}

FormSelect.handledProps = ["as", "control", "options"];
FormSelect.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** A FormField control prop. */
  control: _FormField.default.propTypes.control,

  /** Array of Dropdown.Item props e.g. `{ text: '', value: '' }` */
  options: _propTypes.default.arrayOf(_propTypes.default.shape(_Dropdown.default.Item.propTypes)).isRequired
} : {};
FormSelect.defaultProps = {
  as: _FormField.default,
  control: _Select.default
};
var _default = FormSelect;
exports.default = _default;