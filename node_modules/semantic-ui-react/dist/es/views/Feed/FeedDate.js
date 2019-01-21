import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps } from '../../lib';
/**
 * An event or an event summary can contain a date.
 */

function FeedDate(props) {
  var children = props.children,
      className = props.className,
      content = props.content;
  var classes = cx('date', className);
  var rest = getUnhandledProps(FeedDate, props);
  var ElementType = getElementType(FeedDate, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

FeedDate.handledProps = ["as", "children", "className", "content"];
FeedDate.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand
} : {};
export default FeedDate;