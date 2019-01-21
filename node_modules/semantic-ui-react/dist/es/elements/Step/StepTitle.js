import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, createShorthandFactory, customPropTypes, getElementType, getUnhandledProps } from '../../lib';
/**
 * A step can contain a title.
 */

function StepTitle(props) {
  var children = props.children,
      className = props.className,
      content = props.content;
  var classes = cx('title', className);
  var rest = getUnhandledProps(StepTitle, props);
  var ElementType = getElementType(StepTitle, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

StepTitle.handledProps = ["as", "children", "className", "content"];
StepTitle.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand
} : {};
StepTitle.create = createShorthandFactory(StepTitle, function (content) {
  return {
    content: content
  };
});
export default StepTitle;