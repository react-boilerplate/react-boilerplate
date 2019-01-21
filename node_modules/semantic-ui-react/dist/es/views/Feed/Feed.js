import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/extends";
import _without from "lodash/without";
import _map from "lodash/map";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps, SUI } from '../../lib';
import FeedContent from './FeedContent';
import FeedDate from './FeedDate';
import FeedEvent from './FeedEvent';
import FeedExtra from './FeedExtra';
import FeedLabel from './FeedLabel';
import FeedLike from './FeedLike';
import FeedMeta from './FeedMeta';
import FeedSummary from './FeedSummary';
import FeedUser from './FeedUser';
/**
 * A feed presents user activity chronologically.
 */

function Feed(props) {
  var children = props.children,
      className = props.className,
      events = props.events,
      size = props.size;
  var classes = cx('ui', size, 'feed', className);
  var rest = getUnhandledProps(Feed, props);
  var ElementType = getElementType(Feed, props);

  if (!childrenUtils.isNil(children)) {
    return React.createElement(ElementType, _extends({}, rest, {
      className: classes
    }), children);
  }

  var eventElements = _map(events, function (eventProps) {
    var childKey = eventProps.childKey,
        date = eventProps.date,
        meta = eventProps.meta,
        summary = eventProps.summary,
        eventData = _objectWithoutProperties(eventProps, ["childKey", "date", "meta", "summary"]);

    var finalKey = childKey || [date, meta, summary].join('-');
    return React.createElement(FeedEvent, _extends({
      date: date,
      key: finalKey,
      meta: meta,
      summary: summary
    }, eventData));
  });

  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), eventElements);
}

Feed.handledProps = ["as", "children", "className", "events", "size"];
Feed.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand array of props for FeedEvent. */
  events: customPropTypes.collectionShorthand,

  /** A feed can have different sizes. */
  size: PropTypes.oneOf(_without(SUI.SIZES, 'mini', 'tiny', 'medium', 'big', 'huge', 'massive'))
} : {};
Feed.Content = FeedContent;
Feed.Date = FeedDate;
Feed.Event = FeedEvent;
Feed.Extra = FeedExtra;
Feed.Label = FeedLabel;
Feed.Like = FeedLike;
Feed.Meta = FeedMeta;
Feed.Summary = FeedSummary;
Feed.User = FeedUser;
export default Feed;