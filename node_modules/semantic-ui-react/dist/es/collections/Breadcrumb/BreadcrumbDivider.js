import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _isNil from "lodash/isNil";
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { childrenUtils, createShorthandFactory, customPropTypes, getUnhandledProps, getElementType } from '../../lib';
import Icon from '../../elements/Icon';
/**
 * A divider sub-component for Breadcrumb component.
 */

function BreadcrumbDivider(props) {
  var children = props.children,
      className = props.className,
      content = props.content,
      icon = props.icon;
  var classes = cx('divider', className);
  var rest = getUnhandledProps(BreadcrumbDivider, props);
  var ElementType = getElementType(BreadcrumbDivider, props);

  if (!_isNil(icon)) {
    return Icon.create(icon, {
      defaultProps: _objectSpread({}, rest, {
        className: classes
      }),
      autoGenerateKey: false
    });
  }

  if (!_isNil(content)) {
    return React.createElement(ElementType, _extends({}, rest, {
      className: classes
    }), content);
  }

  return React.createElement(ElementType, _extends({}, rest, {
    className: classes
  }), childrenUtils.isNil(children) ? '/' : children);
}

BreadcrumbDivider.handledProps = ["as", "children", "className", "content", "icon"];
BreadcrumbDivider.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: customPropTypes.as,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Render as an `Icon` component with `divider` class instead of a `div`. */
  icon: customPropTypes.itemShorthand
} : {};
BreadcrumbDivider.create = createShorthandFactory(BreadcrumbDivider, function (icon) {
  return {
    icon: icon
  };
});
export default BreadcrumbDivider;