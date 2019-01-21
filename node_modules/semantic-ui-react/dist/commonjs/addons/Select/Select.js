"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Dropdown = _interopRequireDefault(require("../../modules/Dropdown"));

/**
 * A Select is sugar for <Dropdown selection />.
 * @see Dropdown
 * @see Form
 */
function Select(props) {
  return _react.default.createElement(_Dropdown.default, (0, _extends2.default)({}, props, {
    selection: true
  }));
}

Select.handledProps = ["options"];
Select.propTypes = process.env.NODE_ENV !== "production" ? {
  /** Array of Dropdown.Item props e.g. `{ text: '', value: '' }` */
  options: _propTypes.default.arrayOf(_propTypes.default.shape(_Dropdown.default.Item.propTypes)).isRequired
} : {};
Select.Divider = _Dropdown.default.Divider;
Select.Header = _Dropdown.default.Header;
Select.Item = _Dropdown.default.Item;
Select.Menu = _Dropdown.default.Menu;
var _default = Select;
exports.default = _default;