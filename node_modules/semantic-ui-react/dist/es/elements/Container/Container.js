import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps, SUI, useKeyOnly, useTextAlignProp } from '../../lib';
/**
 * A container limits content to a maximum width.
 */

function Container(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      fluid = props.fluid,
      text = props.text,
      textAlign = props.textAlign;
  var classes = cx('ui', useKeyOnly(text, 'text'), useKeyOnly(fluid, 'fluid'), useTextAlignProp(textAlign), 'container', className);
  var rest = getUnhandledProps(Container, props);
  var ElementType = getElementType(Container, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

Container.handledProps = ["as", "children", "className", "content", "fluid", "text", "textAlign"];
Container.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Container has no maximum width. */
  fluid: PropTypes.bool,

  /** Reduce maximum width to more naturally accommodate text. */
  text: PropTypes.bool,

  /** Align container text. */
  textAlign: PropTypes.oneOf(SUI.TEXT_ALIGNMENTS)
} : {};
export default Container;