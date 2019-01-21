import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, createShorthandFactory, customPropTypes, getElementType, getUnhandledProps, useKeyOnly } from '../../lib';
/**
 * A content sub-component for Accordion component.
 */

function AccordionContent(props) {
  var active = props.active,
      children = props.children,
      className = props.className,
      content = props.content;
  var classes = cx('content', useKeyOnly(active, 'active'), className);
  var rest = getUnhandledProps(AccordionContent, props);
  var ElementType = getElementType(AccordionContent, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

AccordionContent.handledProps = ["active", "as", "children", "className", "content"];
AccordionContent.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Whether or not the content is visible. */
  active: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand
} : {};
AccordionContent.create = createShorthandFactory(AccordionContent, function (content) {
  return {
    content: content
  };
});
export default AccordionContent;