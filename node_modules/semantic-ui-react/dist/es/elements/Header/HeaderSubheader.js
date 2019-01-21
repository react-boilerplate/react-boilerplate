import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, createShorthandFactory, customPropTypes, getElementType, getUnhandledProps } from '../../lib';
/**
 * Headers may contain subheaders.
 */

function HeaderSubheader(props) {
  var children = props.children,
      className = props.className,
      content = props.content;
  var classes = cx('sub header', className);
  var rest = getUnhandledProps(HeaderSubheader, props);
  var ElementType = getElementType(HeaderSubheader, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

HeaderSubheader.handledProps = ["as", "children", "className", "content"];
HeaderSubheader.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand
} : {};
HeaderSubheader.create = createShorthandFactory(HeaderSubheader, function (content) {
  return {
    content: content
  };
});
export default HeaderSubheader;