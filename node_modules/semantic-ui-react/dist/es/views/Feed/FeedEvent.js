import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { createShorthand, customPropTypes, getElementType, getUnhandledProps } from '../../lib';
import FeedContent from './FeedContent';
import FeedLabel from './FeedLabel';
/**
 * A feed contains an event.
 */

function FeedEvent(props) {
  var content = props.content,
      children = props.children,
      className = props.className,
      date = props.date,
      extraImages = props.extraImages,
      extraText = props.extraText,
      image = props.image,
      icon = props.icon,
      meta = props.meta,
      summary = props.summary;
  var classes = cx('event', className);
  var rest = getUnhandledProps(FeedEvent, props);
  var ElementType = getElementType(FeedEvent, props);
  var hasContentProp = content || date || extraImages || extraText || meta || summary;
  var contentProps = {
    content: content,
    date: date,
    extraImages: extraImages,
    extraText: extraText,
    meta: meta,
    summary: summary
  };
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), createShorthand(FeedLabel, function (val) {
    return {
      icon: val
    };
  }, icon, {
    autoGenerateKey: false
  }), createShorthand(FeedLabel, function (val) {
    return {
      image: val
    };
  }, image, {
    autoGenerateKey: false
  }), hasContentProp && React.createElement(FeedContent, contentProps), children);
}

FeedEvent.handledProps = ["as", "children", "className", "content", "date", "extraImages", "extraText", "icon", "image", "meta", "summary"];
FeedEvent.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for FeedContent. */
  content: customPropTypes.itemShorthand,

  /** Shorthand for FeedDate. */
  date: customPropTypes.itemShorthand,

  /** Shorthand for FeedExtra with images. */
  extraImages: customPropTypes.itemShorthand,

  /** Shorthand for FeedExtra with content. */
  extraText: customPropTypes.itemShorthand,

  /** An event can contain icon label. */
  icon: customPropTypes.itemShorthand,

  /** An event can contain image label. */
  image: customPropTypes.itemShorthand,

  /** Shorthand for FeedMeta. */
  meta: customPropTypes.itemShorthand,

  /** Shorthand for FeedSummary. */
  summary: customPropTypes.itemShorthand
} : {};
export default FeedEvent;