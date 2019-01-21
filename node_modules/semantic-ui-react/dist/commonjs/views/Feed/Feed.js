"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _without2 = _interopRequireDefault(require("lodash/without"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _lib = require("../../lib");

var _FeedContent = _interopRequireDefault(require("./FeedContent"));

var _FeedDate = _interopRequireDefault(require("./FeedDate"));

var _FeedEvent = _interopRequireDefault(require("./FeedEvent"));

var _FeedExtra = _interopRequireDefault(require("./FeedExtra"));

var _FeedLabel = _interopRequireDefault(require("./FeedLabel"));

var _FeedLike = _interopRequireDefault(require("./FeedLike"));

var _FeedMeta = _interopRequireDefault(require("./FeedMeta"));

var _FeedSummary = _interopRequireDefault(require("./FeedSummary"));

var _FeedUser = _interopRequireDefault(require("./FeedUser"));

/**
 * A feed presents user activity chronologically.
 */
function Feed(props) {
  var children = props.children,
      className = props.className,
      events = props.events,
      size = props.size;
  var classes = (0, _classnames.default)('ui', size, 'feed', className);
  var rest = (0, _lib.getUnhandledProps)(Feed, props);
  var ElementType = (0, _lib.getElementType)(Feed, props);

  if (!_lib.childrenUtils.isNil(children)) {
    return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
      className: classes
    }), children);
  }

  var eventElements = (0, _map2.default)(events, function (eventProps) {
    var childKey = eventProps.childKey,
        date = eventProps.date,
        meta = eventProps.meta,
        summary = eventProps.summary,
        eventData = (0, _objectWithoutProperties2.default)(eventProps, ["childKey", "date", "meta", "summary"]);
    var finalKey = childKey || [date, meta, summary].join('-');
    return _react.default.createElement(_FeedEvent.default, (0, _extends2.default)({
      date: date,
      key: finalKey,
      meta: meta,
      summary: summary
    }, eventData));
  });
  return _react.default.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes
  }), eventElements);
}

Feed.handledProps = ["as", "children", "className", "events", "size"];
Feed.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _lib.customPropTypes.as,

  /** Primary content. */
  children: _propTypes.default.node,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Shorthand array of props for FeedEvent. */
  events: _lib.customPropTypes.collectionShorthand,

  /** A feed can have different sizes. */
  size: _propTypes.default.oneOf((0, _without2.default)(_lib.SUI.SIZES, 'mini', 'tiny', 'medium', 'big', 'huge', 'massive'))
} : {};
Feed.Content = _FeedContent.default;
Feed.Date = _FeedDate.default;
Feed.Event = _FeedEvent.default;
Feed.Extra = _FeedExtra.default;
Feed.Label = _FeedLabel.default;
Feed.Like = _FeedLike.default;
Feed.Meta = _FeedMeta.default;
Feed.Summary = _FeedSummary.default;
Feed.User = _FeedUser.default;
var _default = Feed;
exports.default = _default;