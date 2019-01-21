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

/**
 * A Radio is sugar for <Checkbox radio />.
 * Useful for exclusive groups of sliders or toggles.
 * @see Checkbox
 * @see Form
 */
function Radio(props) {
  var slider = props.slider,
      toggle = props.toggle,
      type = props.type;
  var rest = (0, _lib.getUnhandledProps)(Radio, props); // const ElementType = getElementType(Radio, props)
  // radio, slider, toggle are exclusive
  // use an undefined radio if slider or toggle are present

  var radio = !(slider || toggle) || undefined;
  return _react.default.createElement(_Checkbox.default, (0, _extends2.default)({}, rest, {
    type: type,
    radio: radio,
    slider: slider,
    toggle: toggle
  }));
}

Radio.handledProps = ["slider", "toggle", "type"];
Radio.propTypes = process.env.NODE_ENV !== "production" ? {
  /** Format to emphasize the current selection state. */
  slider: _Checkbox.default.propTypes.slider,

  /** Format to show an on or off choice. */
  toggle: _Checkbox.default.propTypes.toggle,

  /** HTML input type, either checkbox or radio. */
  type: _Checkbox.default.propTypes.type
} : {};
Radio.defaultProps = {
  type: 'radio'
};
var _default = Radio;
exports.default = _default;