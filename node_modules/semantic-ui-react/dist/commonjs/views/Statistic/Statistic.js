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

var _StatisticGroup = _interopRequireDefault(require("./StatisticGroup"));

var _StatisticLabel = _interopRequireDefault(require("./StatisticLabel"));

var _StatisticValue = _interopRequireDefault(require("./StatisticValue"));

/**
 * A statistic emphasizes the current value of an attribute.
 */
function Statistic(props) {
  var children = props.children,
      className = props.className,
      color = props.color,
      content = props.content,
      floated = props.floated,
      horizontal = props.horizontal,
      inverted = props.inverted,
      label = props.label,
      size = props.size,
      text = props.text,
      value = props.value;
  var classes = (0, _classnames.default)('ui', color, size, (0, _lib.useValueAndKey)(floated, 'floated'), (0, _lib.useKeyOnly)(horizontal, 'horizontal'), (0, _lib.useKeyOnly)(inverted, 'inverted'), 'statistic', className);
  var rest = (0, _lib.getUnhandledProps)(Statistic, props);
  var ElementType = (0, _lib.getElementType)(Statistic, props);

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
  }), _StatisticValue.default.create(value, {
    defaultProps: {
      text: text
    },
    autoGenerateKey: false
  }), _StatisticLabel.default.create(label, {
    autoGenerateKey: false
  }));
}

Statistic.handledProps = ["as", "children", "className", "color", "content", "floated", "horizontal", "inverted", "label", "size", "text", "value"];
Statistic.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** A statistic can be formatted to be different colors. */
  color: _propTypes.default.oneOf(_lib.SUI.COLORS),

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** A statistic can sit to the left or right of other content. */
  floated: _propTypes.default.oneOf(_lib.SUI.FLOATS),

  /** A statistic can present its measurement horizontally. */
  horizontal: _propTypes.default.bool,

  /** A statistic can be formatted to fit on a dark background. */
  inverted: _propTypes.default.bool,

  /** Label content of the Statistic. */
  label: _lib.customPropTypes.contentShorthand,

  /** A statistic can vary in size. */
  size: _propTypes.default.oneOf((0, _without2.default)(_lib.SUI.SIZES, 'big', 'massive', 'medium')),

  /** Format the StatisticValue with smaller font size to fit nicely beside number values. */
  text: _propTypes.default.bool,

  /** Value content of the Statistic. */
  value: _lib.customPropTypes.contentShorthand
} : {};
Statistic.Group = _StatisticGroup.default;
Statistic.Label = _StatisticLabel.default;
Statistic.Value = _StatisticValue.default;
Statistic.create = (0, _lib.createShorthandFactory)(Statistic, function (content) {
  return {
    content: content
  };
});
var _default = Statistic;
exports.default = _default;