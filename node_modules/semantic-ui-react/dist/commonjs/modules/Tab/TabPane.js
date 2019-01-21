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

var _Segment = _interopRequireDefault(require("../../elements/Segment/Segment"));

/**
 * A tab pane holds the content of a tab.
 */
function TabPane(props) {
  var active = props.active,
      children = props.children,
      className = props.className,
      content = props.content,
      loading = props.loading;
  var classes = (0, _classnames.default)((0, _lib.useKeyOnly)(active, 'active'), (0, _lib.useKeyOnly)(loading, 'loading'), 'tab', className);
  var rest = (0, _lib.getUnhandledProps)(TabPane, props);
  var ElementType = (0, _lib.getElementType)(TabPane, props);
  var calculatedDefaultProps = {};

  if (ElementType === _Segment.default) {
    calculatedDefaultProps.attached = 'bottom';
  }

  return _react.default.createElement(ElementType, (0, _extends2.default)({}, calculatedDefaultProps, rest, {
    className: classes
  }), _lib.childrenUtils.isNil(children) ? content : children);
}

TabPane.handledProps = ["active", "as", "children", "className", "content", "loading"];
TabPane.defaultProps = {
  as: _Segment.default,
  active: true
};
TabPane.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** A tab pane can be active. */
  active: _propTypes.default.bool,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** A Tab.Pane can display a loading indicator. */
  loading: _propTypes.default.bool
} : {};
TabPane.create = (0, _lib.createShorthandFactory)(TabPane, function (content) {
  return {
    content: content
  };
});
var _default = TabPane;
exports.default = _default;