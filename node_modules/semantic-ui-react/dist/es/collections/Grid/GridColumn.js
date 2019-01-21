import _extends from "@babel/runtime/helpers/extends";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { customPropTypes, createShorthandFactory, getElementType, getUnhandledProps, SUI, useKeyOnly, useMultipleProp, useTextAlignProp, useValueAndKey, useVerticalAlignProp, useWidthProp } from '../../lib';
/**
 * A column sub-component for Grid.
 */

function GridColumn(props) {
  var children = props.children,
      className = props.className,
      computer = props.computer,
      color = props.color,
      floated = props.floated,
      largeScreen = props.largeScreen,
      mobile = props.mobile,
      only = props.only,
      stretched = props.stretched,
      tablet = props.tablet,
      textAlign = props.textAlign,
      verticalAlign = props.verticalAlign,
      widescreen = props.widescreen,
      width = props.width;
  var classes = cx(color, useKeyOnly(stretched, 'stretched'), useMultipleProp(only, 'only'), useTextAlignProp(textAlign), useValueAndKey(floated, 'floated'), useVerticalAlignProp(verticalAlign), useWidthProp(computer, 'wide computer'), useWidthProp(largeScreen, 'wide large screen'), useWidthProp(mobile, 'wide mobile'), useWidthProp(tablet, 'wide tablet'), useWidthProp(widescreen, 'wide widescreen'), useWidthProp(width, 'wide'), 'column', className);
  var rest = getUnhandledProps(GridColumn, props);
  var ElementType = getElementType(GridColumn, props);
  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), children);
}

GridColumn.handledProps = ["as", "children", "className", "color", "computer", "floated", "largeScreen", "mobile", "only", "stretched", "tablet", "textAlign", "verticalAlign", "widescreen", "width"];
GridColumn.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** A grid column can be colored. */
  color: PropTypes.oneOf(SUI.COLORS),

  /** A column can specify a width for a computer. */
  computer: customPropTypes.every([customPropTypes.disallow(['width']), PropTypes.oneOf(SUI.WIDTHS)]),

  /** A column can sit flush against the left or right edge of a row. */
  floated: PropTypes.oneOf(SUI.FLOATS),

  /** A column can specify a width for a large screen device. */
  largeScreen: customPropTypes.every([customPropTypes.disallow(['width']), PropTypes.oneOf(SUI.WIDTHS)]),

  /** A column can specify a width for a mobile device. */
  mobile: customPropTypes.every([customPropTypes.disallow(['width']), PropTypes.oneOf(SUI.WIDTHS)]),

  /** A column can appear only for a specific device, or screen sizes. */
  only: customPropTypes.multipleProp(SUI.VISIBILITY),

  /** A column can stretch its contents to take up the entire grid or row height. */
  stretched: PropTypes.bool,

  /** A column can specify a width for a tablet device. */
  tablet: customPropTypes.every([customPropTypes.disallow(['width']), PropTypes.oneOf(SUI.WIDTHS)]),

  /** A column can specify its text alignment. */
  textAlign: PropTypes.oneOf(SUI.TEXT_ALIGNMENTS),

  /** A column can specify its vertical alignment to have all its columns vertically centered. */
  verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS),

  /** A column can specify a width for a wide screen device. */
  widescreen: customPropTypes.every([customPropTypes.disallow(['width']), PropTypes.oneOf(SUI.WIDTHS)]),

  /** Represents width of column. */
  width: customPropTypes.every([customPropTypes.disallow(['computer', 'largeScreen', 'mobile', 'tablet', 'widescreen']), PropTypes.oneOf(SUI.WIDTHS)])
} : {};
GridColumn.create = createShorthandFactory(GridColumn, function (children) {
  return {
    children: children
  };
});
export default GridColumn;