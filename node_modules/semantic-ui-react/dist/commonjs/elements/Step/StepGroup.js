"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _values2 = _interopRequireDefault(require("lodash/values"));

var _keys2 = _interopRequireDefault(require("lodash/keys"));

var _without2 = _interopRequireDefault(require("lodash/without"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _pickBy2 = _interopRequireDefault(require("lodash/pickBy"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _Step = _interopRequireDefault(require("./Step"));

var numberMap = process.env.NODE_ENV !== "production" ? (0, _pickBy2.default)(_lib.numberToWordMap, function (val, key) {
  return key <= 8;
}) : {};;
/**
 * A set of steps.
 */

function StepGroup(props) {
  var attached = props.attached,
      children = props.children,
      className = props.className,
      content = props.content,
      fluid = props.fluid,
      items = props.items,
      ordered = props.ordered,
      size = props.size,
      stackable = props.stackable,
      unstackable = props.unstackable,
      vertical = props.vertical,
      widths = props.widths;
  var classes = (0, _classnames.default)('ui', size, (0, _lib.useKeyOnly)(fluid, 'fluid'), (0, _lib.useKeyOnly)(ordered, 'ordered'), (0, _lib.useKeyOnly)(unstackable, 'unstackable'), (0, _lib.useKeyOnly)(vertical, 'vertical'), (0, _lib.useKeyOrValueAndKey)(attached, 'attached'), (0, _lib.useValueAndKey)(stackable, 'stackable'), (0, _lib.useWidthProp)(widths), 'steps', className);
  var rest = (0, _lib.getUnhandledProps)(StepGroup, props);
  var ElementType = (0, _lib.getElementType)(StepGroup, props);

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
    return _Step.default.create(item);
  }));
}

StepGroup.handledProps = ["as", "attached", "children", "className", "content", "fluid", "items", "ordered", "size", "stackable", "unstackable", "vertical", "widths"];
StepGroup.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Steps can be attached to other elements. */
  attached: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.oneOf(['top', 'bottom'])]),

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** A fluid step takes up the width of its container. */
  fluid: _propTypes.default.bool,

  /** Shorthand array of props for Step. */
  items: _lib.customPropTypes.collectionShorthand,

  /** A step can show a ordered sequence of steps. */
  ordered: _propTypes.default.bool,

  /** Steps can have different sizes. */
  size: _propTypes.default.oneOf((0, _without2.default)(_lib.SUI.SIZES, 'medium')),

  /** A step can stack vertically only on smaller screens. */
  stackable: _propTypes.default.oneOf(['tablet']),

  /** A step can prevent itself from stacking on mobile. */
  unstackable: _propTypes.default.bool,

  /** A step can be displayed stacked vertically. */
  vertical: _propTypes.default.bool,

  /** Steps can be divided evenly inside their parent. */
  widths: _propTypes.default.oneOf((0, _toConsumableArray2.default)((0, _keys2.default)(numberMap)).concat((0, _toConsumableArray2.default)((0, _keys2.default)(numberMap).map(Number)), (0, _toConsumableArray2.default)((0, _values2.default)(numberMap))))
} : {};
var _default = StepGroup;
exports.default = _default;