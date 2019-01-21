import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, createShorthandFactory, customPropTypes, getElementType, getUnhandledProps } from '../../lib';

function StepDescription(props) {
  var children = props.children,
      className = props.className,
      content = props.content;
  var classes = cx('description', className);
  var rest = getUnhandledProps(StepDescription, props);
  var ElementType = getElementType(StepDescription, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

StepDescription.handledProps = ["as", "children", "className", "content"];
StepDescription.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand
} : {};
StepDescription.create = createShorthandFactory(StepDescription, function (content) {
  return {
    content: content
  };
});
export default StepDescription;