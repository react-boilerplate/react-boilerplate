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

/**
 * A column sub-component for Grid.
 */
function GridColumn(props) {
  var children = props.children,
      className = props.className,
      computer = props.computer,
      color = props.color,
      floated = props.floated,
      largeScreen = props.largeScreen,
      mobile = props.mobile,
      only = props.only,
      stretched = props.stretched,
      tablet = props.tablet,
      textAlign = props.textAlign,
      verticalAlign = props.verticalAlign,
      widescreen = props.widescreen,
      width = props.width;
  var classes = (0, _classnames.default)(color, (0, _lib.useKeyOnly)(stretched, 'stretched'), (0, _lib.useMultipleProp)(only, 'only'), (0, _lib.useTextAlignProp)(textAlign), (0, _lib.useValueAndKey)(floated, 'floated'), (0, _lib.useVerticalAlignProp)(verticalAlign), (0, _lib.useWidthProp)(computer, 'wide computer'), (0, _lib.useWidthProp)(largeScreen, 'wide large screen'), (0, _lib.useWidthProp)(mobile, 'wide mobile'), (0, _lib.useWidthProp)(tablet, 'wide tablet'), (0, _lib.useWidthProp)(widescreen, 'wide widescreen'), (0, _lib.useWidthProp)(width, 'wide'), 'column', className);
  var rest = (0, _lib.getUnhandledProps)(GridColumn, props);
  var ElementType = (0, _lib.getElementType)(GridColumn, props);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), children);
}

GridColumn.handledProps = ["as", "children", "className", "color", "computer", "floated", "largeScreen", "mobile", "only", "stretched", "tablet", "textAlign", "verticalAlign", "widescreen", "width"];
GridColumn.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** A grid column can be colored. */
  color: _propTypes.default.oneOf(_lib.SUI.COLORS),

  /** A column can specify a width for a computer. */
  computer: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['width']), _propTypes.default.oneOf(_lib.SUI.WIDTHS)]),

  /** A column can sit flush against the left or right edge of a row. */
  floated: _propTypes.default.oneOf(_lib.SUI.FLOATS),

  /** A column can specify a width for a large screen device. */
  largeScreen: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['width']), _propTypes.default.oneOf(_lib.SUI.WIDTHS)]),

  /** A column can specify a width for a mobile device. */
  mobile: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['width']), _propTypes.default.oneOf(_lib.SUI.WIDTHS)]),

  /** A column can appear only for a specific device, or screen sizes. */
  only: _lib.customPropTypes.multipleProp(_lib.SUI.VISIBILITY),

  /** A column can stretch its contents to take up the entire grid or row height. */
  stretched: _propTypes.default.bool,

  /** A column can specify a width for a tablet device. */
  tablet: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['width']), _propTypes.default.oneOf(_lib.SUI.WIDTHS)]),

  /** A column can specify its text alignment. */
  textAlign: _propTypes.default.oneOf(_lib.SUI.TEXT_ALIGNMENTS),

  /** A column can specify its vertical alignment to have all its columns vertically centered. */
  verticalAlign: _propTypes.default.oneOf(_lib.SUI.VERTICAL_ALIGNMENTS),

  /** A column can specify a width for a wide screen device. */
  widescreen: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['width']), _propTypes.default.oneOf(_lib.SUI.WIDTHS)]),

  /** Represents width of column. */
  width: _lib.customPropTypes.every([_lib.customPropTypes.disallow(['computer', 'largeScreen', 'mobile', 'tablet', 'widescreen']), _propTypes.default.oneOf(_lib.SUI.WIDTHS)])
} : {};
GridColumn.create = (0, _lib.createShorthandFactory)(GridColumn, function (children) {
  return {
    children: children
  };
});
var _default = GridColumn;
exports.default = _default;