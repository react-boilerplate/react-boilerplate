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

var _StepDescription = _interopRequireDefault(require("./StepDescription"));

var _StepTitle = _interopRequireDefault(require("./StepTitle"));

/**
 * A step can contain a content.
 */
function StepContent(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      description = props.description,
      title = props.title;
  var classes = (0, _classnames.default)('content', className);
  var rest = (0, _lib.getUnhandledProps)(StepContent, props);
  var ElementType = (0, _lib.getElementType)(StepContent, props);

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
  }), _StepTitle.default.create(title, {
    autoGenerateKey: false
  }), _StepDescription.default.create(description, {
    autoGenerateKey: false
  }));
}

StepContent.handledProps = ["as", "children", "className", "content", "description", "title"];
StepContent.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** Shorthand for StepDescription. */
  description: _lib.customPropTypes.itemShorthand,

  /** Shorthand for StepTitle. */
  title: _lib.customPropTypes.itemShorthand
} : {};
StepContent.create = (0, _lib.createShorthandFactory)(StepContent, function (content) {
  return {
    content: content
  };
});
var _default = StepContent;
exports.default = _default;