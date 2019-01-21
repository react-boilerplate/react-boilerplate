import _extends from "@babel/runtime/helpers/extends";
import _without from "lodash/without";
import _each from "lodash/each";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, customPropTypes, getUnhandledProps, getElementType, SUI } from '../../lib';
import BreadcrumbDivider from './BreadcrumbDivider';
import BreadcrumbSection from './BreadcrumbSection';
/**
 * A breadcrumb is used to show hierarchy between content.
 */

function Breadcrumb(props) {
  var children = props.children,
      className = props.className,
      divider = props.divider,
      icon = props.icon,
      sections = props.sections,
      size = props.size;
  var classes = cx('ui', size, 'breadcrumb', className);
  var rest = getUnhandledProps(Breadcrumb, props);
  var ElementType = getElementType(Breadcrumb, props);

  if (!childrenUtils.isNil(children)) {
    return React.createElement(ElementType, _extends({}, rest, {
      className: classes
    }), children);
  }

  var childElements = [];

  _each(sections, function (section, index) {
    // section
    var breadcrumbElement = BreadcrumbSection.create(section);
    childElements.push(breadcrumbElement); // divider

    if (index !== sections.length - 1) {
      var key = "".concat(breadcrumbElement.key, "_divider") || JSON.stringify(section);
      childElements.push(BreadcrumbDivider.create({
        content: divider,
        icon: icon,
        key: key
      }));
    }
  });

  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childElements);
}

Breadcrumb.handledProps = ["as", "children", "className", "divider", "icon", "sections", "size"];
Breadcrumb.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content of the Breadcrumb.Divider. */
  divider: customPropTypes.every([customPropTypes.disallow(['icon']), customPropTypes.contentShorthand]),

  /** For use with the sections prop. Render as an `Icon` component with `divider` class instead of a `div` in
   *  Breadcrumb.Divider. */
  icon: customPropTypes.every([customPropTypes.disallow(['divider']), customPropTypes.itemShorthand]),

  /** Shorthand array of props for Breadcrumb.Section. */
  sections: customPropTypes.collectionShorthand,

  /** Size of Breadcrumb. */
  size: PropTypes.oneOf(_without(SUI.SIZES, 'medium'))
} : {};
Breadcrumb.Divider = BreadcrumbDivider;
Breadcrumb.Section = BreadcrumbSection;
export default Breadcrumb;