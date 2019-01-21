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

var _Statistic = _interopRequireDefault(require("./Statistic"));

/**
 * A group of statistics.
 */
function StatisticGroup(props) {
  var children = props.children,
      className = props.className,
      color = props.color,
      content = props.content,
      horizontal = props.horizontal,
      inverted = props.inverted,
      items = props.items,
      size = props.size,
      widths = props.widths;
  var classes = (0, _classnames.default)('ui', color, size, (0, _lib.useKeyOnly)(horizontal, 'horizontal'), (0, _lib.useKeyOnly)(inverted, 'inverted'), (0, _lib.useWidthProp)(widths), 'statistics', className);
  var rest = (0, _lib.getUnhandledProps)(StatisticGroup, props);
  var ElementType = (0, _lib.getElementType)(StatisticGroup, props);

  if (!_lib.childrenUtils.isNil(children)) {
    return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
      className: classes
    }), children);
  }

  if (!_lib.childrenUtils.isNil(content)) {
    return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
      className: classes
    }), content);
  }

  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), (0, _map2.default)(items, function (item) {
    return _Statistic.default.create(item);
  }));
}

StatisticGroup.handledProps = ["as", "children", "className", "color", "content", "horizontal", "inverted", "items", "size", "widths"];
StatisticGroup.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** A statistic group can be formatted to be different colors. */
  color: _propTypes.default.oneOf(_lib.SUI.COLORS),

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** A statistic group can present its measurement horizontally. */
  horizontal: _propTypes.default.bool,

  /** A statistic group can be formatted to fit on a dark background. */
  inverted: _propTypes.default.bool,

  /** Array of props for Statistic. */
  items: _lib.customPropTypes.collectionShorthand,

  /** A statistic group can vary in size. */
  size: _propTypes.default.oneOf((0, _without2.default)(_lib.SUI.SIZES, 'big', 'massive', 'medium')),

  /** A statistic group can have its items divided evenly. */
  widths: _propTypes.default.oneOf(_lib.SUI.WIDTHS)
} : {};
var _default = StatisticGroup;
exports.default = _default;