"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _without2 = _interopRequireDefault(require("lodash/without"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _TableCell = _interopRequireDefault(require("./TableCell"));

/**
 * A table can have rows.
 */
function TableRow(props) {
  var active = props.active,
      cellAs = props.cellAs,
      cells = props.cells,
      children = props.children,
      className = props.className,
      disabled = props.disabled,
      error = props.error,
      negative = props.negative,
      positive = props.positive,
      textAlign = props.textAlign,
      verticalAlign = props.verticalAlign,
      warning = props.warning;
  var classes = (0, _classnames.default)((0, _lib.useKeyOnly)(active, 'active'), (0, _lib.useKeyOnly)(disabled, 'disabled'), (0, _lib.useKeyOnly)(error, 'error'), (0, _lib.useKeyOnly)(negative, 'negative'), (0, _lib.useKeyOnly)(positive, 'positive'), (0, _lib.useKeyOnly)(warning, 'warning'), (0, _lib.useTextAlignProp)(textAlign), (0, _lib.useVerticalAlignProp)(verticalAlign), className);
  var rest = (0, _lib.getUnhandledProps)(TableRow, props);
  var ElementType = (0, _lib.getElementType)(TableRow, props);

  if (!_lib.childrenUtils.isNil(children)) {
    return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
      className: classes
    }), children);
  }

  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), (0, _map2.default)(cells, function (cell) {
    return _TableCell.default.create(cell, {
      defaultProps: {
        as: cellAs
      }
    });
  }));
}

TableRow.handledProps = ["active", "as", "cellAs", "cells", "children", "className", "disabled", "error", "negative", "positive", "textAlign", "verticalAlign", "warning"];
TableRow.defaultProps = {
  as: 'tr',
  cellAs: 'td'
};
TableRow.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** A row can be active or selected by a user. */
  active: _propTypes.default.bool,

  /** An element type to render as (string or function). */
  cellAs: _lib.customPropTypes.as,

  /** Shorthand array of props for TableCell. */
  cells: _lib.customPropTypes.collectionShorthand,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** A row can be disabled. */
  disabled: _propTypes.default.bool,

  /** A row may call attention to an error or a negative value. */
  error: _propTypes.default.bool,

  /** A row may let a user know whether a value is bad. */
  negative: _propTypes.default.bool,

  /** A row may let a user know whether a value is good. */
  positive: _propTypes.default.bool,

  /** A table row can adjust its text alignment. */
  textAlign: _propTypes.default.oneOf((0, _without2.default)(_lib.SUI.TEXT_ALIGNMENTS, 'justified')),

  /** A table row can adjust its vertical alignment. */
  verticalAlign: _propTypes.default.oneOf(_lib.SUI.VERTICAL_ALIGNMENTS),

  /** A row may warn a user. */
  warning: _propTypes.default.bool
} : {};
TableRow.create = (0, _lib.createShorthandFactory)(TableRow, function (cells) {
  return {
    cells: cells
  };
});
var _default = TableRow;
exports.default = _default;