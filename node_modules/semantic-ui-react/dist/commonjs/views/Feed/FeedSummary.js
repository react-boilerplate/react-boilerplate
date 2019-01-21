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

var _FeedDate = _interopRequireDefault(require("./FeedDate"));

var _FeedUser = _interopRequireDefault(require("./FeedUser"));

/**
 * A feed can contain a summary.
 */
function FeedSummary(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      date = props.date,
      user = props.user;
  var classes = (0, _classnames.default)('summary', className);
  var rest = (0, _lib.getUnhandledProps)(FeedSummary, props);
  var ElementType = (0, _lib.getElementType)(FeedSummary, props);

  if (!_lib.childrenUtils.isNil(children)) {
    return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
      className: classes
    }), children);
  }

  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), (0, _lib.createShorthand)(_FeedUser.default, function (val) {
    return {
      content: val
    };
  }, user, {
    autoGenerateKey: false
  }), content, (0, _lib.createShorthand)(_FeedDate.default, function (val) {
    return {
      content: val
    };
  }, date, {
    autoGenerateKey: false
  }));
}

FeedSummary.handledProps = ["as", "children", "className", "content", "date", "user"];
FeedSummary.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,

  /** Shorthand for FeedDate. */
  date: _lib.customPropTypes.itemShorthand,

  /** Shorthand for FeedUser. */
  user: _lib.customPropTypes.itemShorthand
} : {};
var _default = FeedSummary;
exports.default = _default;