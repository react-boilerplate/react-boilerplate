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

var _TableBody = _interopRequireDefault(require("./TableBody"));

var _TableCell = _interopRequireDefault(require("./TableCell"));

var _TableFooter = _interopRequireDefault(require("./TableFooter"));

var _TableHeader = _interopRequireDefault(require("./TableHeader"));

var _TableHeaderCell = _interopRequireDefault(require("./TableHeaderCell"));

var _TableRow = _interopRequireDefault(require("./TableRow"));

/**
 * A table displays a collections of data grouped into rows.
 */
function Table(props) {
  var attached = props.attached,
      basic = props.basic,
      celled = props.celled,
      children = props.children,
      className = props.className,
      collapsing = props.collapsing,
      color = props.color,
      columns = props.columns,
      compact = props.compact,
      definition = props.definition,
      fixed = props.fixed,
      footerRow = props.footerRow,
      headerRow = props.headerRow,
      inverted = props.inverted,
      padded = props.padded,
      renderBodyRow = props.renderBodyRow,
      selectable = props.selectable,
      singleLine = props.singleLine,
      size = props.size,
      sortable = props.sortable,
      stackable = props.stackable,
      striped = props.striped,
      structured = props.structured,
      tableData = props.tableData,
      textAlign = props.textAlign,
      unstackable = props.unstackable,
      verticalAlign = props.verticalAlign;
  var classes = (0, _classnames.default)('ui', color, size, (0, _lib.useKeyOnly)(celled, 'celled'), (0, _lib.useKeyOnly)(collapsing, 'collapsing'), (0, _lib.useKeyOnly)(definition, 'definition'), (0, _lib.useKeyOnly)(fixed, 'fixed'), (0, _lib.useKeyOnly)(inverted, 'inverted'), (0, _lib.useKeyOnly)(selectable, 'selectable'), (0, _lib.useKeyOnly)(singleLine, 'single line'), (0, _lib.useKeyOnly)(sortable, 'sortable'), (0, _lib.useKeyOnly)(stackable, 'stackable'), (0, _lib.useKeyOnly)(striped, 'striped'), (0, _lib.useKeyOnly)(structured, 'structured'), (0, _lib.useKeyOnly)(unstackable, 'unstackable'), (0, _lib.useKeyOrValueAndKey)(attached, 'attached'), (0, _lib.useKeyOrValueAndKey)(basic, 'basic'), (0, _lib.useKeyOrValueAndKey)(compact, 'compact'), (0, _lib.useKeyOrValueAndKey)(padded, 'padded'), (0, _lib.useTextAlignProp)(textAlign), (0, _lib.useVerticalAlignProp)(verticalAlign), (0, _lib.useWidthProp)(columns, 'column'), 'table', className);
  var rest = (0, _lib.getUnhandledProps)(Table, props);
  var ElementType = (0, _lib.getElementType)(Table, props);

  if (!_lib.childrenUtils.isNil(children)) {
    return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
      className: classes
    }), children);
  }

  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), headerRow && _react.default.createElement(_TableHeader.default, null, _TableRow.default.create(headerRow, {
    defaultProps: {
      cellAs: 'th'
    }
  })), _react.default.createElement(_TableBody.default, null, renderBodyRow && (0, _map2.default)(tableData, function (data, index) {
    return _TableRow.default.create(renderBodyRow(data, index));
  })), footerRow && _react.default.createElement(_TableFooter.default, null, _TableRow.default.create(footerRow)));
}

Table.handledProps = ["as", "attached", "basic", "celled", "children", "className", "collapsing", "color", "columns", "compact", "definition", "fixed", "footerRow", "headerRow", "inverted", "padded", "renderBodyRow", "selectable", "singleLine", "size", "sortable", "stackable", "striped", "structured", "tableData", "textAlign", "unstackable", "verticalAlign"];
Table.defaultProps = {
  as: 'table'
};
Table.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Attach table to other content */
  attached: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['top', 'bottom'])]),

  /** A table can reduce its complexity to increase readability. */
  basic: _propTypes.default.oneOfType([_propTypes.default.oneOf(['very']), _propTypes.default.bool]),

  /** A table may be divided each row into separate cells. */
  celled: _propTypes.default.bool,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** A table can be collapsing, taking up only as much space as its rows. */
  collapsing: _propTypes.default.bool,

  /** A table can be given a color to distinguish it from other tables. */
  color: _propTypes.default.oneOf(_lib.SUI.COLORS),

  /** A table can specify its column count to divide its content evenly. */
  columns: _propTypes.default.oneOf(_lib.SUI.WIDTHS),

  /** A table may sometimes need to be more compact to make more rows visible at a time. */
  compact: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['very'])]),

  /** A table may be formatted to emphasize a first column that defines a rows content. */
  definition: _propTypes.default.bool,

  /**
   * A table can use fixed a special faster form of table rendering that does not resize table cells based on content
   */
  fixed: _propTypes.default.bool,

  /** Shorthand for a TableRow to be placed within Table.Footer. */
  footerRow: _lib.customPropTypes.itemShorthand,

  /** Shorthand for a TableRow to be placed within Table.Header. */
  headerRow: _lib.customPropTypes.itemShorthand,

  /** A table's colors can be inverted. */
  inverted: _propTypes.default.bool,

  /** A table may sometimes need to be more padded for legibility. */
  padded: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['very'])]),

  /**
   * Mapped over `tableData` and should return shorthand for each Table.Row to be placed within Table.Body.
   *
   * @param {*} data - An element in the `tableData` array.
   * @param {number} index - The index of the current element in `tableData`.
   * @returns {*} Shorthand for a Table.Row.
   */
  renderBodyRow: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['children']), _lib.customPropTypes.demand(['tableData']), _propTypes.default.func]),

  /** A table can have its rows appear selectable. */
  selectable: _propTypes.default.bool,

  /** A table can specify that its cell contents should remain on a single line and not wrap. */
  singleLine: _propTypes.default.bool,

  /** A table can also be small or large. */
  size: _propTypes.default.oneOf((0, _without2.default)(_lib.SUI.SIZES, 'mini', 'tiny', 'medium', 'big', 'huge', 'massive')),

  /** A table may allow a user to sort contents by clicking on a table header. */
  sortable: _propTypes.default.bool,

  /** A table can specify how it stacks table content responsively. */
  stackable: _propTypes.default.bool,

  /** A table can stripe alternate rows of content with a darker color to increase contrast. */
  striped: _propTypes.default.bool,

  /** A table can be formatted to display complex structured data. */
  structured: _propTypes.default.bool,

  /** Data to be passed to the renderBodyRow function. */
  tableData: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['children']), _lib.customPropTypes.demand(['renderBodyRow']), _propTypes.default.array]),

  /** A table can adjust its text alignment. */
  textAlign: _propTypes.default.oneOf((0, _without2.default)(_lib.SUI.TEXT_ALIGNMENTS, 'justified')),

  /** A table can specify how it stacks table content responsively. */
  unstackable: _propTypes.default.bool,

  /** A table can adjust its text alignment. */
  verticalAlign: _propTypes.default.oneOf(_lib.SUI.VERTICAL_ALIGNMENTS)
} : {};
Table.Body = _TableBody.default;
Table.Cell = _TableCell.default;
Table.Footer = _TableFooter.default;
Table.Header = _TableHeader.default;
Table.HeaderCell = _TableHeaderCell.default;
Table.Row = _TableRow.default;
var _default = Table;
exports.default = _default;