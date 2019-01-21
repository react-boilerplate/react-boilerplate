"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _without2 = _interopRequireDefault(require("lodash/without"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _Icon = _interopRequireDefault(require("../../elements/Icon"));

/**
 * A table row can have cells.
 */
function TableCell(props) {
  var active = props.active,
      children = props.children,
      className = props.className,
      collapsing = props.collapsing,
      content = props.content,
      disabled = props.disabled,
      error = props.error,
      icon = props.icon,
      negative = props.negative,
      positive = props.positive,
      selectable = props.selectable,
      singleLine = props.singleLine,
      textAlign = props.textAlign,
      verticalAlign = props.verticalAlign,
      warning = props.warning,
      width = props.width;
  var classes = (0, _classnames.default)((0, _lib.useKeyOnly)(active, 'active'), (0, _lib.useKeyOnly)(collapsing, 'collapsing'), (0, _lib.useKeyOnly)(disabled, 'disabled'), (0, _lib.useKeyOnly)(error, 'error'), (0, _lib.useKeyOnly)(negative, 'negative'), (0, _lib.useKeyOnly)(positive, 'positive'), (0, _lib.useKeyOnly)(selectable, 'selectable'), (0, _lib.useKeyOnly)(singleLine, 'single line'), (0, _lib.useKeyOnly)(warning, 'warning'), (0, _lib.useTextAlignProp)(textAlign), (0, _lib.useVerticalAlignProp)(verticalAlign), (0, _lib.useWidthProp)(width, 'wide'), className);
  var rest = (0, _lib.getUnhandledProps)(TableCell, props);
  var ElementType = (0, _lib.getElementType)(TableCell, props);

  if (!_lib.childrenUtils.isNil(children)) {
    return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
      className: classes
    }), children);
  }

  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), _Icon.default.create(icon), content);
}

TableCell.handledProps = ["active", "as", "children", "className", "collapsing", "content", "disabled", "error", "icon", "negative", "positive", "selectable", "singleLine", "textAlign", "verticalAlign", "warning", "width"];
TableCell.defaultProps = {
  as: 'td'
};
TableCell.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** A cell can be active or selected by a user. */
  active: _propTypes.default.bool,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** A cell can be collapsing so that it only uses as much space as required. */
  collapsing: _propTypes.default.bool,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** A cell can be disabled. */
  disabled: _propTypes.default.bool,

  /** A cell may call attention to an error or a negative value. */
  error: _propTypes.default.bool,

  /** Add an Icon by name, props object, or pass an <Icon /> */
  icon: _lib.customPropTypes.itemShorthand,

  /** A cell may let a user know whether a value is bad. */
  negative: _propTypes.default.bool,

  /** A cell may let a user know whether a value is good. */
  positive: _propTypes.default.bool,

  /** A cell can be selectable. */
  selectable: _propTypes.default.bool,

  /** A cell can specify that its contents should remain on a single line and not wrap. */
  singleLine: _propTypes.default.bool,

  /** A table cell can adjust its text alignment. */
  textAlign: _propTypes.default.oneOf((0, _without2.default)(_lib.SUI.TEXT_ALIGNMENTS, 'justified')),

  /** A table cell can adjust its text alignment. */
  verticalAlign: _propTypes.default.oneOf(_lib.SUI.VERTICAL_ALIGNMENTS),

  /** A cell may warn a user. */
  warning: _propTypes.default.bool,

  /** A table can specify the width of individual columns independently. */
  width: _propTypes.default.oneOf(_lib.SUI.WIDTHS)
} : {};
TableCell.create = (0, _lib.createShorthandFactory)(TableCell, function (content) {
  return {
    content: content
  };
});
var _default = TableCell;
exports.default = _default;