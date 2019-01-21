import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, createShorthand, customPropTypes, getElementType, getUnhandledProps } from '../../lib';
import FeedDate from './FeedDate';
import FeedExtra from './FeedExtra';
import FeedMeta from './FeedMeta';
import FeedSummary from './FeedSummary';

function FeedContent(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      extraImages = props.extraImages,
      extraText = props.extraText,
      date = props.date,
      meta = props.meta,
      summary = props.summary;
  var classes = cx('content', className);
  var rest = getUnhandledProps(FeedContent, props);
  var ElementType = getElementType(FeedContent, props);

  if (!childrenUtils.isNil(children)) {
    return React.createElement(ElementType, _extends({}, rest, {
      className: classes
    }), children);
  }

  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), createShorthand(FeedDate, function (val) {
    return {
      content: val
    };
  }, date, {
    autoGenerateKey: false
  }), createShorthand(FeedSummary, function (val) {
    return {
      content: val
    };
  }, summary, {
    autoGenerateKey: false
  }), content, createShorthand(FeedExtra, function (val) {
    return {
      text: true,
      content: val
    };
  }, extraText, {
    autoGenerateKey: false
  }), createShorthand(FeedExtra, function (val) {
    return {
      images: val
    };
  }, extraImages, {
    autoGenerateKey: false
  }), createShorthand(FeedMeta, function (val) {
    return {
      content: val
    };
  }, meta, {
    autoGenerateKey: false
  }));
}

FeedContent.handledProps = ["as", "children", "className", "content", "date", "extraImages", "extraText", "meta", "summary"];
FeedContent.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** An event can contain a date. */
  date: customPropTypes.itemShorthand,

  /** Shorthand for FeedExtra with images. */
  extraImages: FeedExtra.propTypes.images,

  /** Shorthand for FeedExtra with text. */
  extraText: customPropTypes.itemShorthand,

  /** Shorthand for FeedMeta. */
  meta: customPropTypes.itemShorthand,

  /** Shorthand for FeedSummary. */
  summary: customPropTypes.itemShorthand
} : {};
export default FeedContent;