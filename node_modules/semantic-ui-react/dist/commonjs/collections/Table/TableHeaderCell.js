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

var _TableCell = _interopRequireDefault(require("./TableCell"));

/**
 * A table can have a header cell.
 */
function TableHeaderCell(props) {
  var as = props.as,
      className = props.className,
      sorted = props.sorted;
  var classes = (0, _classnames.default)((0, _lib.useValueAndKey)(sorted, 'sorted'), className);
  var rest = (0, _lib.getUnhandledProps)(TableHeaderCell, props);
  return _react.default.createElement(_TableCell.default, (0, _extends2.default)({}, rest, {
    as: as,
    className: classes
  }));
}

TableHeaderCell.handledProps = ["as", "className", "sorted"];
TableHeaderCell.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** A header cell can be sorted in ascending or descending order. */
  sorted: _propTypes.default.oneOf(['ascending', 'descending'])
} : {};
TableHeaderCell.defaultProps = {
  as: 'th'
};
var _default = TableHeaderCell;
exports.default = _default;