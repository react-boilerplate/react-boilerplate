import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getElementType, getUnhandledProps, useKeyOnly } from '../../lib';
import PlaceholderHeader from './PlaceholderHeader';
import PlaceholderImage from './PlaceholderImage';
import PlaceholderLine from './PlaceholderLine';
import PlaceholderParagraph from './PlaceholderParagraph';
/**
 * A placeholder is used to reserve splace for content that soon will appear in a layout.
 */

function Placeholder(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      fluid = props.fluid,
      inverted = props.inverted;
  var classes = cx('ui', useKeyOnly(fluid, 'fluid'), useKeyOnly(inverted, 'inverted'), 'placeholder', className);
  var rest = getUnhandledProps(Placeholder, props);
  var ElementType = getElementType(Placeholder, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? content : children);
}

Placeholder.handledProps = ["as", "children", "className", "content", "fluid", "inverted"];
Placeholder.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A fluid placeholder takes up the width of its container. */
  fluid: PropTypes.bool,

  /** A placeholder can have their colors inverted. */
  inverted: PropTypes.bool
} : {};
Placeholder.Header = PlaceholderHeader;
Placeholder.Image = PlaceholderImage;
Placeholder.Line = PlaceholderLine;
Placeholder.Paragraph = PlaceholderParagraph;
export default Placeholder;