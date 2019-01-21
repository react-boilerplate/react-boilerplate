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
 * A content sub-component for Accordion component.
 */
function AccordionContent(props) {
  var active = props.active,
      children = props.children,
      className = props.className,
      content = props.content;
  var classes = (0, _classnames.default)('content', (0, _lib.useKeyOnly)(active, 'active'), className);
  var rest = (0, _lib.getUnhandledProps)(AccordionContent, props);
  var ElementType = (0, _lib.getElementType)(AccordionContent, props);
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), _lib.childrenUtils.isNil(children) ? content : children);
}

AccordionContent.handledProps = ["active", "as", "children", "className", "content"];
AccordionContent.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Whether or not the content is visible. */
  active: _propTypes.default.bool,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand
} : {};
AccordionContent.create = (0, _lib.createShorthandFactory)(AccordionContent, function (content) {
  return {
    content: content
  };
});
var _default = AccordionContent;
exports.default = _default;