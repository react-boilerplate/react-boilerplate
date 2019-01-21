import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, createShorthandFactory, customPropTypes, getElementType, getUnhandledProps } from '../../lib';
import StepDescription from './StepDescription';
import StepTitle from './StepTitle';
/**
 * A step can contain a content.
 */

function StepContent(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      description = props.description,
      title = props.title;
  var classes = cx('content', className);
  var rest = getUnhandledProps(StepContent, props);
  var ElementType = getElementType(StepContent, props);

  if (!childrenUtils.isNil(children)) {
    return React.createElement(ElementType, _extends({}, rest, {
      className: classes
    }), children);
  }

  if (!childrenUtils.isNil(content)) {
    return React.createElement(ElementType, _extends({}, rest, {
      className: classes
    }), content);
  }

  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), StepTitle.create(title, {
    autoGenerateKey: false
  }), StepDescription.create(description, {
    autoGenerateKey: false
  }));
}

StepContent.handledProps = ["as", "children", "className", "content", "description", "title"];
StepContent.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Shorthand for StepDescription. */
  description: customPropTypes.itemShorthand,

  /** Shorthand for StepTitle. */
  title: customPropTypes.itemShorthand
} : {};
StepContent.create = createShorthandFactory(StepContent, function (content) {
  return {
    content: content
  };
});
export default StepContent;