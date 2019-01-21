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

var _Icon = _interopRequireDefault(require("../Icon/Icon"));

/**
 * A list item can contain an icon.
 */
function ListIcon(props) {
  var className = props.className,
      verticalAlign = props.verticalAlign;
  var classes = (0, _classnames.default)((0, _lib.useVerticalAlignProp)(verticalAlign), className);
  var rest = (0, _lib.getUnhandledProps)(ListIcon, props);
  return _react.default.createElement(_Icon.default, (0, _extends2.default)({}, rest, {
    className: classes
  }));
}

ListIcon.handledProps = ["className", "verticalAlign"];
ListIcon.propTypes = process.env.NODE_ENV !== "production" ? {
  /** Additional classes. */
  className: _propTypes.default.string,

  /** An element inside a list can be vertically aligned. */
  verticalAlign: _propTypes.default.oneOf(_lib.SUI.VERTICAL_ALIGNMENTS)
} : {};
ListIcon.create = (0, _lib.createShorthandFactory)(ListIcon, function (name) {
  return {
    name: name
  };
});
var _default = ListIcon;
exports.default = _default;