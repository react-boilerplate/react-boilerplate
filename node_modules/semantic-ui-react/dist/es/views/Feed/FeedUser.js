import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps } from '../../lib';
/**
 * A feed can contain a user element.
 */

function FeedUser(props) {
  var children = props.children,
      className = props.className,
      content = props.content;
  var classes = cx('user', className);
  var rest = getUnhandledProps(FeedUser, props);
  var ElementType = getElementType(FeedUser, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

FeedUser.handledProps = ["as", "children", "className", "content"];
FeedUser.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand
} : {};
FeedUser.defaultProps = {
  as: 'a'
};
export default FeedUser;